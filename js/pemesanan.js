// pemesanan.js - JavaScript untuk halaman pemesanan/checkout

document.addEventListener('DOMContentLoaded', function () {
  // Update total & jumlah item saat halaman dimuat
  updateItemCount();
  updateOrderSummary();

  // Payment method selection (opsional log)
  document.querySelectorAll('input[name="payment"]').forEach(option => {
    option.addEventListener('change', function () {
      console.log('Metode pembayaran dipilih:', this.value);
    });
  });

  // Tombol hapus item
  document.querySelectorAll('.delete-item-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const orderItem = this.closest('.order-item');
      const itemName = orderItem.querySelector('.item-name')?.textContent || 'item ini';

      if (confirm(`Hapus "${itemName}" dari pesanan?`)) {
        orderItem.style.transition = 'opacity 0.3s, transform 0.3s';
        orderItem.style.opacity = '0';
        orderItem.style.transform = 'translateX(-20px)';

        setTimeout(() => {
          orderItem.remove();
          updateItemCount();
          updateOrderSummary();

          ReservationNotification.showSuccess({
            message: `${itemName} berhasil dihapus dari pesanan`,
            duration: 3500
          });

          if (document.querySelectorAll('.order-item').length === 0) {
            showEmptyCartMessage();
          }
        }, 300);
      }
    });
  });

  // Tombol Lanjutkan Pembayaran – langsung delay 1800ms lalu redirect
  const continueBtn = document.querySelector('.continue-payment-btn');
  if (continueBtn) {
    continueBtn.addEventListener('click', function () {
      const selectedPayment = document.querySelector('input[name="payment"]:checked');

      // Validasi metode pembayaran
      if (!selectedPayment) {
        ReservationNotification.showError({
          message: 'Silakan pilih metode pembayaran terlebih dahulu',
          duration: 4000
        });
        return;
      }

      // Validasi keranjang tidak kosong
      const orderItems = document.querySelectorAll('.order-item');
      if (orderItems.length === 0) {
        ReservationNotification.showError({
          message: 'Pesanan Anda kosong. Silakan tambah item terlebih dahulu',
          duration: 4000
        });
        return;
      }

      const paymentMethod = selectedPayment.value.toUpperCase();
      const totalAmount = document.querySelector('.total-amount')?.textContent || 'Rp 0';

      // Tampilkan loading state pada tombol
      const originalText = continueBtn.textContent;
      continueBtn.textContent = 'Memproses...';
      continueBtn.disabled = true;

      // Notifikasi sukses langsung + info proses
      ReservationNotification.showSuccess({
        message: `Pembayaran dengan <strong>${paymentMethod}</strong> sedang diproses...<br>Total: ${totalAmount}`,
        duration: 2500,  // notifikasi muncul selama ~2.5 detik
        autoClose: true
      });

      // Delay 1800 ms lalu redirect
      setTimeout(() => {
        continueBtn.textContent = originalText;
        continueBtn.disabled = false;

        // Redirect ke halaman selanjutnya
        window.location.href = 'payment.html';  // GANTI sesuai kebutuhan: 'payment-success.html', 'konfirmasi.html', dll
      }, 1800);
    });
  }

  // ================= Helper Functions =================

  function updateItemCount() {
    const items = document.querySelectorAll('.order-item');
    const countEl = document.querySelector('.item-count');
    if (countEl) {
      const count = items.length;
      countEl.textContent = `(${count} Item${count !== 1 ? '' : ''})`;
    }
  }

  function updateOrderSummary() {
    let subtotal = 0;

    document.querySelectorAll('.order-item').forEach(item => {
      const priceText = item.querySelector('.item-total-price')?.textContent || '0';
      const price = parseInt(priceText.replace(/[^0-9]/g, '')) || 0;
      subtotal += price;
    });

    const ongkir = 15000;
    const biayaLayanan = 2000;
    const total = subtotal + ongkir + biayaLayanan;

    const subtotalEl = document.querySelector('.summary-details .summary-row:nth-child(1) .summary-value');
    const totalEl = document.querySelector('.total-amount');

    if (subtotalEl) subtotalEl.textContent = `Rp ${subtotal.toLocaleString('id-ID')}`;
    if (totalEl) totalEl.textContent = `Rp ${total.toLocaleString('id-ID')}`;
  }

  function showEmptyCartMessage() {
    const checkoutLeft = document.querySelector('.checkout-left');
    if (checkoutLeft) {
      checkoutLeft.innerHTML = `
        <div style="text-align: center; padding: 3rem 1rem;">
          <h2 style="font-size: 1.6rem; color: #444; margin-bottom: 1rem;">
            Pesanan Anda Kosong
          </h2>
          <p style="color: #777; margin-bottom: 2rem;">
            Silakan kembali ke menu dan tambahkan item favorit Anda
          </p>
          <a href="menu.html" style="display: inline-block; padding: 0.9rem 2.2rem; background: var(--primary); color: white; text-decoration: none; border-radius: 10px; font-weight: 600;">
            Lihat Menu
          </a>
        </div>
      `;
    }

    if (continueBtn) {
      continueBtn.disabled = true;
      continueBtn.style.opacity = '0.5';
      continueBtn.style.cursor = 'not-allowed';
      continueBtn.textContent = 'Keranjang Kosong';
    }

    ReservationNotification.showInfo({
      message: 'Pesanan Anda saat ini kosong. Silakan tambahkan item terlebih dahulu.',
      duration: 5000
    });
  }

  console.log('Halaman pemesanan dimuat');
});