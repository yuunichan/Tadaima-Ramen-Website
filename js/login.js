/* login.js
   Demo client-side login logic dengan notifikasi modern.
   - Menggunakan ReservationNotification.showSuccess & showError
   - Demo admin credentials: "admin" atau "admin@restoran.com" + "admin123"
   - Di production → ganti dengan autentikasi server-side yang aman!
*/

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('loginForm');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  if (!form || !emailInput || !passwordInput) return;

  // Pastikan modul notifikasi sudah ada
  if (!window.ReservationNotification) {
    console.warn('ReservationNotification tidak ditemukan. Pastikan notification.js di-load sebelum login.js');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      ReservationNotification?.showError({
        message: 'Mohon lengkapi email/username dan kata sandi!',
        duration: 4000
      });
      return;
    }

    const normalized = email.toLowerCase();

    const adminEmails = ['admin', 'admin@restoran.com'];
    const adminPassword = 'admin123'; // hanya untuk demo!

    // Cek apakah mencoba login sebagai admin
    if (adminEmails.includes(normalized)) {
      if (password === adminPassword) {
        sessionStorage.setItem('role', 'admin');

        ReservationNotification.showSuccess({
          message: 'Login admin berhasil! Mengalihkan ke dashboard...',
          duration: 2500,
          onClose: () => {
            window.location.href = 'admin/dashboard.html';
          }
        });
      } else {
        ReservationNotification.showError({
          message: 'Kata sandi admin salah. Silakan coba lagi.',
          duration: 4500
        });
      }
      return;
    }

    // Login sebagai customer (demo: terima semua kredensial selain admin)
    sessionStorage.setItem('role', 'customer');

    ReservationNotification.showSuccess({
      message: 'Login pelanggan berhasil! Mengalihkan ke menu...',
      duration: 2200,
      onClose: () => {
        window.location.href = 'customer/menu.html';
      }
    });
  });

  // Toggle visibility password (tetap dipertahankan)
  const passwordIcon = passwordInput.previousElementSibling;
  if (passwordIcon) {
    let visible = false;
    passwordIcon.style.cursor = 'pointer';
    passwordIcon.addEventListener('click', function () {
      visible = !visible;
      passwordInput.type = visible ? 'text' : 'password';
      passwordIcon.textContent = visible ? '🔓' : '🔒';
      // Optional: ganti ikon ke SVG yang lebih bagus jika mau
    });
  }
});