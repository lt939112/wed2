document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.getElementById("openConsult");
  const modal = document.getElementById("consultModal");
  const closeBtn = document.getElementById("closeConsult");
  const consultForm = document.getElementById("consultFormInner");

  // Mở popup
  if (openBtn) {
    openBtn.onclick = () => (modal.style.display = "flex");
  }

  // Đóng popup
  if (closeBtn) {
    closeBtn.onclick = () => (modal.style.display = "none");
  }

  // Click ngoài thì đóng
  window.onclick = (e) => {
    if (e.target == modal) modal.style.display = "none";
  };

  // XỬ LÝ GỬI FORM (SỬA LỖI RELOAD TRANG)
  if (consultForm) {
    consultForm.onsubmit = (e) => {
      e.preventDefault(); // QUAN TRỌNG: Ngăn chặn tải lại trang
      
      const name = document.getElementById("consultName").value;
      
      alert(`Cảm ơn ${name}! Chúng tôi đã nhận được yêu cầu tư vấn.`);
      
      consultForm.reset();
      modal.style.display = "none";
    };
  }
});