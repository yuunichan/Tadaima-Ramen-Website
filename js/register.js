// Form validation and handling
document.getElementById('registerForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const fullname = document.getElementById('fullname').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm_password').value;

  // Validation
  if (!fullname) {
    alert('Nama lengkap tidak boleh kosong');
    return;
  }

  if (!email || !isValidEmail(email)) {
    alert('Email tidak valid');
    return;
  }

  if (!phone || phone.length < 9) {
    alert('Nomor telepon harus minimal 9 angka');
    return;
  }

  if (!username || username.length < 3) {
    alert('Username harus minimal 3 karakter');
    return;
  }

  if (!password || password.length < 8) {
    alert('Kata sandi harus minimal 8 karakter');
    return;
  }

  if (password !== confirmPassword) {
    alert('Kata sandi dan konfirmasi kata sandi tidak cocok');
    return;
  }

  // If all validations pass
  console.log('Form submitted with data:', {
    fullname,
    email,
    phone,
    username,
  });

  // TODO: Send data to server/API
  alert('Pendaftaran berhasil! Silakan login dengan akun Anda.');
  window.location.href = '../login_page.html';
});

// Email validation helper
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
