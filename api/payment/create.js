import { createMisticPayment, requirePost, sendJson } from '../_lib.js';

export default async function handler(req, res) {
  if (!requirePost(req, res)) return;
  try {
    const result = await createMisticPayment(req.body);
    return sendJson(res, result.status, result.body);
  } catch (error) {
    return sendJson(res, 500, { message: error.message || 'Erro inesperado ao criar o Pix.' });
  }
}
