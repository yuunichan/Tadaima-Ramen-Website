/* login.js
   Demo client-side login logic.
   - Decides admin vs customer automatically based on credentials (no dropdown needed)
   - Demo admin credentials: username/email: "admin" or "admin@restoran.com" with password "admin123"
   - In production, replace this with secure server-side authentication and never store real credentials in client-side code
*/

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('loginForm');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  if (!form || !emailInput || !passwordInput) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      alert('Mohon lengkapi semua field!');
      return;
    }

    const normalized = email.toLowerCase();

    const adminEmails = ['admin', 'admin@restoran.com'];
    const adminPassword = 'admin123'; // demo only

    // If user matches admin account, require admin password
    if (adminEmails.includes(normalized)) {
      if (password === adminPassword) {
        sessionStorage.setItem('role', 'admin');
        alert('Login admin berhasil. Mengalihkan ke dashboard admin...');
        window.location.href = 'admin.html';
      } else {
        alert('Login admin gagal. Periksa email/username dan kata sandi.');
      }
      return;
    }

    // Otherwise treat as customer (for demo: accept any credentials)
    sessionStorage.setItem('role', 'customer');
    alert('Login pelanggan berhasil. Mengalihkan ke menu...');
    window.location.href = 'customer/menu_login.html';
  });

  // Optional: toggle password visibility by clicking the icon span before the input
  const passwordIcon = passwordInput.previousElementSibling;
  if (passwordIcon) {
    let visible = false;
    passwordIcon.style.cursor = 'pointer';
    passwordIcon.addEventListener('click', function () {
      visible = !visible;
      passwordInput.type = visible ? 'text' : 'password';
      passwordIcon.textContent = visible ? '🔓' : '🔒';
    });
  }
});
