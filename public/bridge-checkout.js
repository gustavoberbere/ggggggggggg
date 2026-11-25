(() => {
  'use strict';
  const KEY = 'sonna_checkout_state_v1';
  const pageProducts = { 'liplegging-sonna.html': 'liplegging', 'short-sonna.html': 'short', 'manguito-sonna.html': 'manguito' };
  const catalog = {
    liplegging: { title: 'Liplegging SONNA', price: 149.90, bundles: { 1: 149.90, 2: 233.22, 3: 293.85 } },
    short: { title: 'Short SONNA', price: 129.90, bundles: { 1: 129.90, 2: 187.06, 3: 245.51 } },
    manguito: { title: 'Faixa LipCompress SONNA para os Braços', price: 9.90, bundles: { 1: 9.90 } }
  };
  const currentProduct = pageProducts[location.pathname.split('/').pop()] || (location.pathname === '/' || location.pathname.endsWith('/index.html') ? 'liplegging' : null);
  const fromProductPage = /\/products\//.test(location.pathname);
  const projectPath = fromProductPage ? '../' : './';
  const checkoutUrl = `${projectPath}checkout.html`;
  const homeUrl = `${projectPath}index.html`;
  if (window.SONNA?.routes && /\/public\//.test(location.pathname)) window.SONNA.routes.cart = '/public/cart';
  const money = (value) => Number(value || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const read = () => { try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { return {}; } };
  const save = (state) => localStorage.setItem(KEY, JSON.stringify(state));
  const baseState = () => ({ cart: [], customer: null, address: null, shipping: 'free', payment: 'pix', offer: false, pix: null, step: 'checkout' });
  const stateWithCart = (cart) => ({ ...baseState(), ...read(), cart, pix: null, step: 'checkout' });
  function productJson() { try { return JSON.parse(document.querySelector('[data-product-json]')?.textContent || 'null'); } catch { return null; } }
  function choicesFromForm(form) {
    const product = productJson(); const names = (product?.options || []).map((name) => typeof name === 'string' ? name : name.name);
    const colorIndex = names.findIndex((name) => /cor|color/i.test(name)); const sizeIndex = names.findIndex((name) => /tamanho|size/i.test(name));
    const kit = form.querySelector('input[name="kit"]:checked'); const bundle = Math.max(1, Math.min(3, Number(kit?.value || 1)));
    const units = [...form.querySelectorAll('.unit')];
    const selections = (units.length ? units : [form]).map((unit) => {
      const values = [...unit.querySelectorAll('select[data-option]')].sort((a, b) => Number(a.dataset.option) - Number(b.dataset.option)).map((select) => select.value);
      return { color: values[colorIndex] || 'Padrão', size: values[sizeIndex] || 'Único' };
    });
    while (selections.length < bundle) selections.push({ ...selections[0] });
    return { product: currentProduct, bundle, quantity: bundle, selections: selections.slice(0, bundle), color: selections[0]?.color || 'Padrão', size: selections[0]?.size || 'Único' };
  }
  function addToCart(item) {
    const current = read(); const cart = Array.isArray(current.cart) ? current.cart : [];
    const same = cart.find((line) => line.product === item.product && line.bundle === item.bundle && JSON.stringify(line.selections) === JSON.stringify(item.selections) && !line.offer);
    if (same) same.cartQuantity = Math.min(3, Number(same.cartQuantity || 1) + 1); else cart.push({ ...item, cartQuantity: 1 });
    save(stateWithCart(cart));
  }
  const cartLines = () => (read().cart || []).filter((line) => catalog[line.product]);
  function lineTotal(line) { const product = catalog[line.product]; return (line.offer ? 5.40 : (product.bundles[line.bundle] || product.price)) * Number(line.cartQuantity || 1); }
  function paintCart() {
    const lines = cartLines(), items = document.querySelector('[data-cart-items]'), empty = document.querySelector('[data-cart-empty]'), foot = document.querySelector('[data-cart-foot]');
    if (items) items.innerHTML = lines.map((line, index) => {
      const product = catalog[line.product]; const variants = (line.selections || [{ color: line.color, size: line.size }]).map((choice) => `${choice.color} · ${choice.size}`).join('<br>');
      return `<article class="cart-item" style="padding:12px 0;border-bottom:1px solid #eadfd8"><div style="display:flex;justify-content:space-between;gap:12px"><div><strong>${product.title}</strong><small style="display:block;margin-top:4px">${variants}</small><small>${line.bundle > 1 ? line.bundle + ' unidades' : '1 unidade'}</small></div><div style="text-align:right"><strong>${money(lineTotal(line))}</strong><button type="button" data-local-remove="${index}" style="display:block;border:0;background:none;color:#512F30;text-decoration:underline;cursor:pointer;margin:8px 0 0 auto">Remover</button></div></div></article>`;
    }).join('');
    if (empty) empty.hidden = lines.length > 0; if (foot) foot.hidden = lines.length === 0;
    const total = lines.reduce((sum, line) => sum + lineTotal(line), 0);
    document.querySelectorAll('[data-cart-total]').forEach((node) => { node.textContent = money(total); });
    document.querySelectorAll('[data-cart-count]').forEach((node) => { node.textContent = lines.reduce((sum, line) => sum + Number(line.bundle || 1) * Number(line.cartQuantity || 1), 0); });
    document.querySelectorAll('[data-local-remove]').forEach((button) => button.addEventListener('click', () => { const state = read(); state.cart.splice(Number(button.dataset.localRemove), 1); save(stateWithCart(state.cart)); paintCart(); }));
  }
  function openCart() { paintCart(); const drawer = document.querySelector('[data-cart-drawer]'); if (!drawer) return location.assign(checkoutUrl); if (typeof drawer.showModal === 'function' && !drawer.open) drawer.showModal(); else drawer.setAttribute('open', ''); }
  function checkoutNow() { if (cartLines().length) location.assign(checkoutUrl); }
  function addBuyNowButton() {
    const add = document.querySelector('[data-product-form] [data-add-button]'); if (!add || add.parentElement.querySelector('[data-buy-now]')) return;
    const direct = document.createElement('button'); direct.type = 'button'; direct.className = add.className; direct.dataset.buyNow = '1'; direct.textContent = 'Comprar agora'; direct.style.marginTop = '10px'; add.insertAdjacentElement('afterend', direct);
    direct.addEventListener('click', () => { const form = direct.closest('[data-product-form]'); if (!form || !currentProduct) return; addToCart(choicesFromForm(form)); checkoutNow(); });
  }
  function localizeMainMenu() {
    const destinations = {
      'Início': `${projectPath}index.html`,
      'Liplegging': `${projectPath}products/liplegging-sonna.html`,
      'Short': `${projectPath}products/short-sonna.html`,
      'Compressão para os Braços': `${projectPath}products/manguito-sonna.html`,
      'Central de ajuda': `${projectPath}index.html#duvidas`
    };
    document.querySelectorAll('.site-header__nav a, .mobile-nav a').forEach((link) => {
      const destination = destinations[link.textContent.trim()];
      if (destination) { link.setAttribute('href', destination); link.removeAttribute('target'); }
    });
    const localProducts = {
      '/products/liplegging-sonna': `${projectPath}products/liplegging-sonna.html`,
      '/products/short-sonna': `${projectPath}products/short-sonna.html`,
      '/products/manguito-sonna': `${projectPath}products/manguito-sonna.html`,
      '/products/sonna-sculpt': `${homeUrl}#produtos`
    };
    document.querySelectorAll('a[href]').forEach((link) => {
      const href = link.getAttribute('href') || '';
      if (localProducts[href]) link.setAttribute('href', localProducts[href]);
      if (href === '/') link.setAttribute('href', homeUrl);
      if (href === '/pages/central-de-ajuda') link.setAttribute('href', `${homeUrl}#duvidas`);
    });
  }
  document.addEventListener('submit', (event) => {
    const form = event.target.closest('[data-product-form]');
    if (form && currentProduct) { event.preventDefault(); event.stopImmediatePropagation(); addToCart(choicesFromForm(form)); openCart(); return; }
    if (event.target.closest('form[action*="/cart"]')) { event.preventDefault(); event.stopImmediatePropagation(); checkoutNow(); }
  }, true);
  document.addEventListener('click', (event) => {
    const cart = event.target.closest('[data-open-cart]');
    if (cart) { event.preventDefault(); event.stopImmediatePropagation(); openCart(); return; }
    const checkout = event.target.closest('[data-cart-checkout]');
    if (checkout) { event.preventDefault(); event.stopImmediatePropagation(); checkoutNow(); }
  }, true);
  document.addEventListener('DOMContentLoaded', () => {
    localizeMainMenu();
    document.querySelectorAll('a[href]').forEach((link) => { const href = link.getAttribute('href') || ''; if (/^https?:\/\//i.test(href) && !href.includes(location.hostname)) { link.setAttribute('href', homeUrl); link.removeAttribute('target'); } });
    document.querySelectorAll('[data-upsell]').forEach((node) => { node.hidden = true; });
    addBuyNowButton(); paintCart();
  });
})();
