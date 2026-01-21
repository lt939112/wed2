const list = document.getElementById("cartList");
const actionDiv = document.getElementById("cartActions");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  if (!list) return;
  if (cart.length === 0) {
    list.innerHTML = "<p style='text-align:center'>Giỏ hàng trống.</p>";
    if (actionDiv) actionDiv.style.display = "none";
    return;
  }

  if (actionDiv) actionDiv.style.display = "flex";
  let total = 0;

  list.innerHTML = cart.map((item, index) => {
      const itemTotal = item.price * item.qty;
      total += itemTotal;
      return `
      <li>
        <div style="display:flex; justify-content:space-between;">
            <strong>${item.name}</strong>
            <button onclick="removeItem(${index})" style="background:#dc2626; color:white; border:none; padding:5px; border-radius:4px; cursor:pointer">Xóa</button>
        </div>
        <div style="display:flex; justify-content:space-between; margin-top:10px">
            <div>
                <button onclick="changeQty(${index}, -1)">-</button>
                <span style="margin:0 10px">${item.qty}</span>
                <button onclick="changeQty(${index}, 1)">+</button>
            </div>
            <strong>${itemTotal.toLocaleString()}đ</strong>
        </div>
      </li>
    `;
    }).join("");

  list.innerHTML += `<div style="margin-top:20px; font-size:20px; text-align:right; font-weight:bold; color:#dc2626">Tổng: ${total.toLocaleString()}đ</div>`;
}

function changeQty(index, delta) {
  cart[index].qty += delta;
  if (cart[index].qty <= 0) cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function removeItem(index) {
  if (confirm("Xóa sản phẩm này?")) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }
}

function checkout() {
  if (confirm("Xác nhận thanh toán?")) {
    alert("Thanh toán thành công!");
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.href = "index.html";
  }
}

document.addEventListener("DOMContentLoaded", renderCart);