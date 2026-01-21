document.addEventListener("DOMContentLoaded", () => {
  const loginBlock = document.getElementById("loginFormBlock");
  const regBlock = document.getElementById("registerFormBlock");
  
  // Nút chuyển đổi
  const btnShowReg = document.getElementById("btnShowRegister");
  const btnShowLogin = document.getElementById("btnShowLogin");

  if (btnShowReg) {
    btnShowReg.onclick = (e) => {
      e.preventDefault();
      loginBlock.style.display = "none";
      regBlock.style.display = "block";
    };
  }

  if (btnShowLogin) {
    btnShowLogin.onclick = (e) => {
      e.preventDefault();
      regBlock.style.display = "none";
      loginBlock.style.display = "block";
    };
  }

  // Xử lý Đăng Ký
  const regForm = document.getElementById("registerForm");
  if (regForm) {
    regForm.onsubmit = (e) => {
      e.preventDefault();
      const user = document.getElementById("regUser").value;
      const pass = document.getElementById("regPass").value;
      let accounts = JSON.parse(localStorage.getItem("accounts")) || [];

      if (accounts.some((acc) => acc.username === user)) {
        alert("Tài khoản đã tồn tại!");
        return;
      }
      accounts.push({ username: user, password: pass });
      localStorage.setItem("accounts", JSON.stringify(accounts));
      alert("Đăng ký thành công! Vui lòng đăng nhập.");
      location.reload();
    };
  }

  // Xử lý Đăng Nhập
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.onsubmit = (e) => {
      e.preventDefault();
      const user = document.getElementById("loginUser").value;
      const pass = document.getElementById("loginPass").value;
      const accounts = JSON.parse(localStorage.getItem("accounts")) || [];

      const found = accounts.find((acc) => acc.username === user && acc.password === pass);
      if (found) {
        localStorage.setItem("userLogin", JSON.stringify(found));
        alert("Đăng nhập thành công!");
        window.location.href = "index.html";
      } else {
        alert("Sai tài khoản hoặc mật khẩu!");
      }
    };
  }
});