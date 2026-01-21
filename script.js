const shoes = [
  // LƯU Ý: Đường dẫn ảnh dùng ../imgweb vì file html nằm trong thư mục html
  { id: 1, name: "Nike Air Force 1 '07", price: 2490000, brand: "Nike", image: "nike_1.png", desc: "Biểu tượng thời trang đường phố." },
  { id: 2, name: "Nike Air Max Pulse", price: 4500000, brand: "Nike", image: "nike_2.png", desc: "Sự kết hợp hoàn hảo giữa êm ái." },
  { id: 3, name: "Nike Pegasus 40", price: 3200000, brand: "Nike", image: "nike_3.png", desc: "Dòng giày chạy bộ huyền thoại." },
  { id: 4, name: "Nike Court Legacy", price: 1900000, brand: "Nike", image: "nike_4.png", desc: "Phong cách tennis cổ điển." },
  { id: 5, name: "Nike Dunk Low Retro", price: 3500000, brand: "Nike", image: "nike_5.png", desc: "Cực kỳ cá tính và nổi bật." },
  { id: 6, name: "Adidas Samba OG", price: 2800000, brand: "Adidas", image: "adidas_1.png", desc: "Mẫu giày 'quốc dân' hiện nay." },
  { id: 7, name: "Adidas Gazelle Bold", price: 3100000, brand: "Adidas", image: "adidas_2.png", desc: "Đế cao tôn dáng." },
  { id: 8, name: "Adidas Campus 00s", price: 2300000, brand: "Adidas", image: "adidas_3.png", desc: "Vẻ đẹp vượt thời gian." },
  { id: 9, name: "Adidas Ultraboost", price: 5000000, brand: "Adidas", image: "adidas_4.png", desc: "Công nghệ đệm Boost êm ái." },
  { id: 10, name: "Adidas Forum Low", price: 2500000, brand: "Adidas", image: "adidas_5.png", desc: "Phong cách bóng rổ 80s." },
  { id: 11, name: "Jordan 1 Low Panda", price: 3800000, brand: "Jordan", image: "jordan_1.png", desc: "Phối màu trắng đen dễ mặc." },
  { id: 12, name: "Jordan 1 Mid Grey", price: 4200000, brand: "Jordan", image: "jordan_2.png", desc: "Màu xám thanh lịch." },
  { id: 13, name: "Jordan Stay Loyal 2", price: 3600000, brand: "Jordan", image: "jordan_3.png", desc: "Bảo vệ cổ chân tốt." },
  { id: 14, name: "Jordan 1 High OG", price: 5500000, brand: "Jordan", image: "jordan_4.png", desc: "Đẳng cấp High-top." },
  { id: 15, name: "Jordan 4 Retro", price: 6200000, brand: "Jordan", image: "jordan_5.png", desc: "Thiết kế hầm hố." },
  { id: 16, name: "Puma Suede Classic", price: 2100000, brand: "Puma", image: "puma_3.png", desc: "Da lộn mềm mại." },
  { id: 17, name: "Puma RS-X Efekt", price: 3200000, brand: "Puma", image: "puma_1.png", desc: "Chunky hiện đại." },
  { id: 18, name: "Puma Cali Dream", price: 2600000, brand: "Puma", image: "puma_2.png", desc: "Trẻ trung năng động." },
  { id: 19, name: "Puma MB.01 Lamelo", price: 3900000, brand: "Puma", image: "puma_4.png", desc: "Giày bóng rổ hiệu năng." },
  { id: 20, name: "Puma Mayze Wedge", price: 2900000, brand: "Puma", image: "puma_5.png", desc: "Đế xuồng cá tính." }
];

// --- RENDER TRANG CHỦ ---
function renderShoes(list) {
  const grid = document.getElementById("productGrid");
  if (!grid) return;

  if (list.length === 0) {
    grid.innerHTML = "<p style='grid-column: 1/-1; text-align:center'>Không tìm thấy sản phẩm nào.</p>";
    return;
  }
  grid.innerHTML = list.map((s) => `
    <div class="shoe-card">
      <img src="${s.image}" onclick="location.href='detail.html?id=${s.id}'" alt="${s.name}">
      <h4>${s.name}</h4>
      <p>${s.price.toLocaleString()}đ</p>
      <button class="add-cart-btn" onclick="addToCart(${s.id})">Thêm vào giỏ</button>
    </div>
  `).join("");
}

// --- RENDER CHI TIẾT SẢN PHẨM ---
function renderDetailPage() {
  const container = document.getElementById("productDetailContainer");
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));
  const product = shoes.find((s) => s.id === id);

  if (!product) {
    container.innerHTML = "<h2>Sản phẩm không tồn tại!</h2>";
    return;
  }

  container.innerHTML = `
    <div class="detail-wrapper">
      <div class="detail-img">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="detail-info">
        <h2 class="detail-name">${product.name}</h2>
        <p class="detail-brand">Thương hiệu: <strong>${product.brand}</strong></p>
        <p class="detail-price">${product.price.toLocaleString()}đ</p>
        <p class="detail-desc">${product.desc}</p>
        <button class="add-cart-btn" onclick="addToCart(${product.id})">THÊM VÀO GIỎ NGAY</button>
      </div>
    </div>
  `;
}

// --- LOGIC GIỎ HÀNG ---
function addToCart(id) {
  const userLogin = localStorage.getItem("userLogin");
  if (!userLogin) {
    alert("Vui lòng đăng nhập để mua hàng!");
    window.location.href = "login.html";
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let product = shoes.find((s) => s.id === id);
  let item = cart.find((i) => i.id === id);

  if (item) item.qty++;
  else cart.push({ ...product, qty: 1 });

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`Đã thêm "${product.name}" vào giỏ hàng!`);
}

// --- XỬ LÝ SỰ KIỆN KHI LOAD TRANG ---
document.addEventListener("DOMContentLoaded", () => {
    // 1. Render sản phẩm nếu ở trang chủ
    if (document.getElementById("productGrid")) renderShoes(shoes);

    // 2. Xử lý Lọc Brand
    const brandLinks = document.querySelectorAll("[data-brand]");
    brandLinks.forEach((btn) => {
        btn.onclick = (e) => {
            e.preventDefault();
            brandLinks.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            const brand = btn.dataset.brand;
            document.getElementById("categoryTitle").innerText = brand === "Tất cả" ? "Tất cả sản phẩm" : `Giày ${brand}`;

            const filtered = shoes.filter((s) => brand === "Tất cả" || s.brand === brand);
            renderShoes(filtered);
        };
    });

    // 3. Xử lý tìm kiếm
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.oninput = () => {
            const key = searchInput.value.toLowerCase();
            renderShoes(shoes.filter((s) => s.name.toLowerCase().includes(key)));
        };
    }

    // 4. Check trạng thái đăng nhập
    const userLogin = JSON.parse(localStorage.getItem("userLogin"));
    const loginLink = document.querySelector(".nav-actions a[href='login.html']");
    if (userLogin && loginLink) {
        // Đổi nút Đăng nhập thành tên user
        loginLink.outerHTML = `<span style="color:white; margin-right:10px">Hi, ${userLogin.username}</span> <button onclick="logout()" style="cursor:pointer; background:#dc2626; color:white; border:none; padding:5px 10px; border-radius:5px">Thoát</button>`;
    }
});

function logout() {
    localStorage.removeItem("userLogin");
    location.reload();

}
