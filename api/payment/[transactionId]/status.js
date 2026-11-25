import { basicAuth, sendJson } from '../../_lib.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return sendJson(res, 405, { message: 'Método não permitido.' });
  }
  const auth = basicAuth();
  if (!auth) return sendJson(res, 503, { message: 'MisticPay ainda não configurada no Vercel.' });
  try {
    const response = await fetch('https://api.misticpay.com/api/transactions/check', {
      method: 'POST',
      headers: { Authorization: auth, 'Content-Type': 'application/json' },
      body: JSON.stringify({ transactionId: req.query.transactionId }),
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) return sendJson(res, response.status, { message: payload.message || 'Não foi possível consultar o pagamento.' });
    const state = String(payload.transaction?.transactionState || payload.data?.transactionState || 'PENDENTE').trim().toUpperCase();
    return sendJson(res, 200, { state, paid: state === 'COMPLETO', failed: state === 'FALHA' });
  } catch {
    return sendJson(res, 502, { message: 'Não foi possível consultar a MisticPay agora.' });
  }
}
