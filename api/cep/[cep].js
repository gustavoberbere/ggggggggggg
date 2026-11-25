import { digits, sendJson } from '../_lib.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return sendJson(res, 405, { message: 'Método não permitido.' });
  }
  const cep = digits(req.query.cep);
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
