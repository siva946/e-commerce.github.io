let cart = [];

function updateCartDisplay() {
  const cartItemsDiv = document.getElementById('cart-items');
  const checkoutBtn = document.getElementById('checkout-btn');
  if (cart.length === 0) {
    cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
    checkoutBtn.disabled = true;
    return;
  }
  let html = '<ul class="cart-list">';
  let total = 0;
  cart.forEach((item, idx) => {
    html += `<li>${item.name} <span>($${item.price})</span> <button class="remove-item" data-idx="${idx}">Remove</button></li>`;
    total += item.price;
  });
  html += `</ul><div class="cart-total">Total: <strong>$${total}</strong></div>`;
  cartItemsDiv.innerHTML = html;
  checkoutBtn.disabled = false;

  // Remove item event
  document.querySelectorAll('.remove-item').forEach(btn => {
    btn.onclick = function() {
      const idx = parseInt(this.getAttribute('data-idx'));
      cart.splice(idx, 1);
      updateCartDisplay();
    };
  });
}

function getAllProductsFromDOM() {
  const productCards = document.querySelectorAll('.product-card');
  const products = [];
  productCards.forEach((card, idx) => {
    const name = card.querySelector('h3').textContent;
    const priceText = card.querySelector('p').textContent;
    const price = parseFloat(priceText.replace(/[^\d.]/g, ''));
    const img = card.querySelector('img').getAttribute('src');
    products.push({ id: idx + 1, name, price, img });
  });
  return products;
}

document.addEventListener('DOMContentLoaded', function() {
  const products = getAllProductsFromDOM();
  document.querySelectorAll('.add-to-cart').forEach((btn, idx) => {
    btn.onclick = function() {
      cart.push(products[idx]);
      updateCartDisplay();
    };
  });
  updateCartDisplay();
});

document.getElementById('checkout-btn').onclick = function() {
  if (cart.length === 0) return;
  alert('Thank you for your purchase! (Demo only)');
  cart = [];
  updateCartDisplay();
};
