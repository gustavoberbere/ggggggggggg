import crypto from 'node:crypto';
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
await loadEnv(path.join(root, '.env'));
const port = Number(process.env.PORT || 3000);
const pendingPayments = new Map();
const catalog = {
  liplegging: { name: 'Liplegging SONNA', price: 149.90, bundles: { 1: 149.90, 2: 233.22, 3: 293.85 } },
  short: { name: 'Short SONNA', price: 129.90, bundles: { 1: 129.90, 2: 187.06, 3: 245.51 } },
  manguito: { name: 'Faixa LipCompress SONNA para os Braços', price: 29.90, offerPrice: 29.90, bundles: { 1: 29.90 } }
};

async function loadEnv(filename) {
  try { const content = await readFile(filename, 'utf8'); content.split(/\r?\n/).forEach((line) => { const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/); if (match && !process.env[match[1]]) process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, ''); }); } catch {}
}
function digits(value = '') { return String(value).replace(/\D/g, ''); }
function money(value) { return Math.round(value * 100) / 100; }
function sendJson(res, status, value) { res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }); res.end(JSON.stringify(value)); }
function basicAuth() { const id = process.env.MISTICPAY_CLIENT_ID; const secret = process.env.MISTICPAY_CLIENT_SECRET; return (!id || !secret || id.includes('coloque_') || secret.includes('coloque_')) ? null : `Basic ${Buffer.from(`${id}:${secret}`).toString('base64')}`; }
async function bodyJson(req) { const chunks = []; let size = 0; for await (const chunk of req) { size += chunk.length; if (size > 100000) throw new Error('Dados muito grandes.'); chunks.push(chunk); } return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}'); }
function resolveOrder(items, shipping) {
  if (!Array.isArray(items) || items.length === 0 || items.length > 5) throw new Error('Carrinho inválido.');
  const accepted = items.map((item) => { const product = catalog[item.product]; if (!product) throw new Error('Produto inválido.'); const bundle = Math.max(1, Math.min(3, Number(item.bundle) || 1)); const cartQuantity = Math.max(1, Math.min(Number(item.cartQuantity) || 1, 3)); const price = item.product === 'manguito' && item.offer === true ? product.offerPrice : (product.bundles?.[bundle] || product.price); const selections = Array.isArray(item.selections) ? item.selections.slice(0, bundle).map((choice) => ({ color: String(choice?.color || '').slice(0, 40), size: String(choice?.size || '').slice(0, 12) })) : []; return { product: item.product, name: product.name, price, bundle, cartQuantity, quantity: bundle * cartQuantity, color: String(item.color || '').slice(0, 40), size: String(item.size || '').slice(0, 12), selections }; });
  const subtotal = money(accepted.reduce((sum, item) => sum + item.price * item.cartQuantity, 0)); const shippingValue = shipping === 'express' ? 37.90 : 0;
  return { items: accepted, subtotal, discount: money(subtotal * 0.03), shipping: shippingValue, total: money(subtotal * 0.97 + shippingValue) };
}
function normalizeState(value = '') { return String(value).trim().toUpperCase(); }

async function createPayment(req, res) {
  try {
    const auth = basicAuth(); if (!auth) return sendJson(res, 503, { message: 'Configure as chaves da MisticPay no arquivo .env antes de gerar o Pix.' });
    const request = await bodyJson(req); const order = resolveOrder(request.items, request.shipping); const customer = request.customer || {}; const name = String(customer.name || '').trim(); const document = digits(customer.document);
    if (name.length < 3 || document.length !== 11) return sendJson(res, 422, { message: 'Informe nome completo e CPF válido para gerar o Pix.' });
    const transactionId = `sonna-${Date.now()}-${crypto.randomUUID().slice(0, 8)}`;
    const response = await fetch('https://api.misticpay.com/api/transactions/create', { method: 'POST', headers: { Authorization: auth, 'Content-Type': 'application/json', 'X-Request-Id': transactionId }, body: JSON.stringify({ amount: order.total, payerName: name, payerDocument: document, transactionId, description: `SONNA — ${order.items.map((item) => item.name).join(', ')}`, ...(process.env.MISTICPAY_WEBHOOK_URL ? { projectWebhook: process.env.MISTICPAY_WEBHOOK_URL } : {}) }) });
    const payload = await response.json().catch(() => ({})); if (!response.ok) return sendJson(res, response.status, { message: payload.message || 'Não foi possível gerar o Pix. Tente novamente.', requestId: payload.requestId });
    const payment = payload.data || {}; if (!payment.transactionId || !(payment.qrCodeBase64 || payment.qrcodeUrl) || !payment.copyPaste) throw new Error('A resposta de pagamento não trouxe os dados do QR Code.');
    pendingPayments.set(String(payment.transactionId), { order, createdAt: Date.now(), state: normalizeState(payment.transactionState || 'PENDENTE') });
    return sendJson(res, 200, { transactionId: String(payment.transactionId), qrCode: payment.qrCodeBase64 || payment.qrcodeUrl, copyPaste: payment.copyPaste, amount: order.total, expiresIn: 1800 });
  } catch (error) { return sendJson(res, 500, { message: error.message || 'Erro inesperado ao criar o Pix.' }); }
}
async function checkPayment(_req, res, transactionId) {
  const auth = basicAuth(); if (!auth) return sendJson(res, 503, { message: 'MisticPay ainda não configurada.' });
  try { const response = await fetch('https://api.misticpay.com/api/transactions/check', { method: 'POST', headers: { Authorization: auth, 'Content-Type': 'application/json' }, body: JSON.stringify({ transactionId }) }); const payload = await response.json().catch(() => ({})); if (!response.ok) return sendJson(res, response.status, { message: payload.message || 'Não foi possível consultar o pagamento.' }); const state = normalizeState(payload.transaction?.transactionState || payload.data?.transactionState || 'PENDENTE'); if (pendingPayments.has(transactionId)) pendingPayments.get(transactionId).state = state; return sendJson(res, 200, { state, paid: state === 'COMPLETO', failed: state === 'FALHA' }); } catch { return sendJson(res, 502, { message: 'Não foi possível consultar a MisticPay agora.' }); }
}
async function webhook(req, res) {
  if (process.env.MISTICPAY_WEBHOOK_TOKEN && req.headers['x-webhook-token'] !== process.env.MISTICPAY_WEBHOOK_TOKEN) return sendJson(res, 401, { message: 'Não autorizado.' });
  try { const body = await bodyJson(req); const id = String(body.transactionId || body.data?.transactionId || body.transaction?.transactionId || ''); const state = normalizeState(body.transactionState || body.data?.transactionState || body.transaction?.transactionState); if (id && pendingPayments.has(id)) pendingPayments.get(id).state = state; res.writeHead(204); res.end(); } catch { sendJson(res, 400, { message: 'Webhook inválido.' }); }
}
async function lookupCep(res, rawCep) {
  const cep = digits(rawCep);
  if (cep.length !== 8) return sendJson(res, 422, { message: 'Informe um CEP com 8 números.' });
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const address = await response.json();
    if (!response.ok || address.erro) return sendJson(res, 404, { message: 'CEP não encontrado.' });
    return sendJson(res, 200, { city: address.localidade || '', state: address.uf || '', street: address.logradouro || '', neighborhood: address.bairro || '' });
  } catch {
    return sendJson(res, 502, { message: 'Não foi possível consultar o CEP agora.' });
  }
}
const mime = { '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.html': 'text/html; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.ico': 'image/x-icon' };
async function serveStatic(pathname, res) {
  const requestedPath = path.normalize(pathname).replace(/^([/\\])+/, '');
  const staticAliases = { 'products/liplegging-sonna': 'products/liplegging-sonna.html', 'products/short-sonna': 'products/short-sonna.html', 'products/manguito-sonna': 'products/manguito-sonna.html' };
  const safePath = staticAliases[requestedPath] || requestedPath;
  let filename = path.join(root, 'public', safePath || 'index.html'); if (!filename.startsWith(path.join(root, 'public'))) return sendJson(res, 403, { message: 'Acesso negado.' });
  try { if ((await stat(filename)).isDirectory()) filename = path.join(filename, 'index.html'); const content = await readFile(filename); res.writeHead(200, { 'Content-Type': mime[path.extname(filename)] || 'application/octet-stream', 'X-Content-Type-Options': 'nosniff' }); res.end(content); } catch { const content = await readFile(path.join(root, 'public', 'index.html')); res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }); res.end(content); }
}
createServer(async (req, res) => {
  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`); const paymentMatch = url.pathname.match(/^\/api\/payment\/([^/]+)\/status$/); const cepMatch = url.pathname.match(/^\/api\/cep\/(\d{8})$/);
  if (req.method === 'GET' && url.pathname === '/cart.js') return sendJson(res, 200, { items: [], item_count: 0, total_price: 0 });
  if (req.method === 'POST' && /^\/cart\/(add|change|clear)\.js$/.test(url.pathname)) return sendJson(res, 200, { items: [], item_count: 0, total_price: 0 });
  if (req.method === 'POST' && url.pathname === '/api/payment/create') return createPayment(req, res);
  if (req.method === 'GET' && paymentMatch) return checkPayment(req, res, decodeURIComponent(paymentMatch[1]));
  if (req.method === 'GET' && cepMatch) return lookupCep(res, cepMatch[1]);
  if (req.method === 'POST' && url.pathname === '/api/payment/webhook') return webhook(req, res);
  if (url.pathname.startsWith('/api/')) return sendJson(res, 404, { message: 'Rota não encontrada.' });
  return serveStatic(url.pathname, res);
}).listen(port, () => console.log(`SONNA Checkout em http://localhost:${port}`));
