# Projeto completo SONNA + checkout interno

Este pacote mantém a página principal da Liplegging na raiz (`/`), além das páginas de Short e Manguito. Imagens e conteúdo de venda continuam locais. O carrinho e a compra direta guardam o kit, as cores e os tamanhos escolhidos antes de abrir o checkout interno.

## Funil incluído

1. Página principal original e páginas de produto, com seleção de kit, cor e tamanho.
2. Adicionar ao carrinho ou Comprar agora, ambos levando as escolhas salvas ao funil.
3. Identificação: nome, e-mail, CPF e WhatsApp.
4. Entrega: consulta de CEP, endereço, entrega grátis ou expresso.
5. Pix com 3% de desconto e oferta do manguito.
6. Ajuste ou remoção de quantidades no resumo, sem perder os dados já preenchidos.
7. Tela de processamento, QR Code, Pix copia-e-cola, cronômetro e confirmação por status.

## Rodar

```bash
cp .env.example .env
npm start
```

Abra `http://localhost:3000`. A página inicial já é a página de venda da Liplegging.

## MisticPay

No arquivo `.env`, preencha `MISTICPAY_CLIENT_ID` e `MISTICPAY_CLIENT_SECRET` com uma chave de acesso que tenha os escopos `TRANSACTION_CREATE` e `TRANSACTION_READ`.

As chaves ficam somente no servidor. Sem elas, o checkout funciona até o botão Finalizar compra e mostra um aviso seguro em vez de criar uma cobrança.
