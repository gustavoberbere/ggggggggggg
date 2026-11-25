import { requirePost, sendJson } from '../_lib.js';

export default async function handler(req, res) {
  if (!requirePost(req, res)) return;
  if (process.env.MISTICPAY_WEBHOOK_TOKEN && req.headers['x-webhook-token'] !== process.env.MISTICPAY_WEBHOOK_TOKEN) {
    return sendJson(res, 401, { message: 'Não autorizado.' });
  }
  return res.status(204).end();
}
