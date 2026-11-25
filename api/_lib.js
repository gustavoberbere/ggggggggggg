import crypto from 'node:crypto';

const catalog = {
  liplegging: { name: 'Liplegging SONNA', price: 149.9, bundles: { 1: 149.9, 2: 233.22, 3: 293.85 } },
  short: { name: 'Short SONNA', price: 129.9, bundles: { 1: 129.9, 2: 187.06, 3: 245.51 } },
  manguito: { name: 'Faixa LipCompress SONNA para os Braços', price: 9.9, offerPrice: 5.4, bundles: { 1: 9.9 } },
};

export function sendJson(res, status, value) {
  res.status(status).setHeader('Cache-Control', 'no-store').json(value);
}

export function digits(value = '') {
  return String(value).replace(/\D/g, '');
}

export function basicAuth() {
  const id = process.env.MISTICPAY_CLIENT_ID;
  const secret = process.env.MISTICPAY_CLIENT_SECRET;
  if (!id || !secret || id.includes('coloque_') || secret.includes('coloque_')) return null;
  return `Basic ${Buffer.from(`${id}:${secret}`).toString('base64')}`;
}

export function requirePost(req, res) {
  if (req.method === 'POST') return true;
  res.setHeader('Allow', 'POST');
  sendJson(res, 405, { message: 'Método não permitido.' });
  return false;
}

export function resolveOrder(items, shipping) {
  if (!Array.isArray(items) || items.length === 0 || items.length > 5) throw new Error('Carrinho inválido.');
  const accepted = items.map((item) => {
    const product = catalog[item.product];
    if (!product) throw new Error('Produto inválido.');
    const bundle = Math.max(1, Math.min(3, Number(item.bundle) || 1));
    const cartQuantity = Math.max(1, Math.min(Number(item.cartQuantity) || 1, 3));
    const price = item.product === 'manguito' && item.offer === true
      ? product.offerPrice
      : (product.bundles?.[bundle] || product.price);
    return { name: product.name, price, cartQuantity };
  });
  const round = (value) => Math.round(value * 100) / 100;
  const subtotal = round(accepted.reduce((sum, item) => sum + item.price * item.cartQuantity, 0));
  const delivery = shipping === 'express' ? 37.9 : 0;
  return { items: accepted, total: round(subtotal * 0.97 + delivery) };
}

export async function createMisticPayment(body) {
  const auth = basicAuth();
  if (!auth) return { status: 503, body: { message: 'Configure as chaves da MisticPay no Vercel antes de gerar o Pix.' } };

  const order = resolveOrder(body?.items, body?.shipping);
  const customer = body?.customer || {};
  const name = String(customer.name || '').trim();
  const document = digits(customer.document);
  if (name.length < 3 || document.length !== 11) {
    return { status: 422, body: { message: 'Informe nome completo e CPF válido para gerar o Pix.' } };
  }

  const transactionId = `sonna-${Date.now()}-${crypto.randomUUID().slice(0, 8)}`;
  const response = await fetch('https://api.misticpay.com/api/transactions/create', {
    method: 'POST',
    headers: { Authorization: auth, 'Content-Type': 'application/json', 'X-Request-Id': transactionId },
    body: JSON.stringify({
      amount: order.total,
      payerName: name,
      payerDocument: document,
      transactionId,
      description: `SONNA — ${order.items.map((item) => item.name).join(', ')}`,
      ...(process.env.MISTICPAY_WEBHOOK_URL ? { projectWebhook: process.env.MISTICPAY_WEBHOOK_URL } : {}),
    }),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    return { status: response.status, body: { message: payload.message || 'Não foi possível gerar o Pix. Tente novamente.', requestId: payload.requestId } };
  }

  const payment = payload.data || {};
  if (!payment.transactionId || !(payment.qrCodeBase64 || payment.qrcodeUrl) || !payment.copyPaste) {
    throw new Error('A resposta da MisticPay não trouxe os dados do QR Code.');
  }
  return {
    status: 200,
    body: {
      transactionId: String(payment.transactionId),
      qrCode: payment.qrCodeBase64 || payment.qrcodeUrl,
      copyPaste: payment.copyPaste,
      amount: order.total,
      expiresIn: 1800,
    },
  };
}
