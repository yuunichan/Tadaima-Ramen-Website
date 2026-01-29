/**
 * Reservation Notification Module
 * Menampilkan notifikasi sukses reservasi dengan animasi
 */

const ReservationNotification = {
  /**
   * Menampilkan notifikasi sukses
   * @param {Object} options - Konfigurasi notifikasi
   * @param {string} options.message - Pesan notifikasi
   * @param {number} options.duration - Durasi tampil (ms), default 5000
   * @param {boolean} options.autoClose - Tutup otomatis, default true
   * @param {Function} options.onClose - Callback saat ditutup
   * @param {string} options.style - Tipe style: 'default' atau 'payment'
   */
  showSuccess(options = {}) {
    const {
      message = 'Reservasi Berhasil Dikonfirmasi!',
      duration = 5000,
      autoClose = true,
      onClose = null,
      style = 'default',
    } = options;

    // Buat container notifikasi jika belum ada
    let container = document.getElementById('notification-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'notification-container';
      if (style === 'payment') {
        container.classList.add('payment-style');
      } else {
        container.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 9999;
          max-width: 400px;
        `;
      }
      document.body.appendChild(container);
    } else {
      // Update class jika style berubah
      if (style === 'payment') {
        container.classList.add('payment-style');
      }
    }

    // Buat elemen notifikasi
    const notification = document.createElement('div');
    notification.className = 'notification notification-success';
    notification.innerHTML = `
      <div class="notification-content">
        <div class="notification-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <div class="notification-message">${message}</div>
        <button class="notification-close" aria-label="Tutup notifikasi">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div class="notification-progress"></div>
    `;

    // Tambahkan ke container
    container.appendChild(notification);

    // Trigger animasi
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);

    // Handler tombol tutup
    const closeBtn = notification.querySelector('.notification-close');
    const closeNotification = () => {
      notification.classList.remove('show');
      setTimeout(() => {
        notification.remove();
        if (onClose) onClose();
      }, 300);
    };

    closeBtn.addEventListener('click', closeNotification);

    // Auto close
    if (autoClose) {
      setTimeout(closeNotification, duration);
    }

    return notification;
  },

  /**
   * Menampilkan notifikasi error
   */
  showError(options = {}) {
    const { message = 'Terjadi Kesalahan!', duration = 5000, autoClose = true, style = 'default' } = options;

    let container = document.getElementById('notification-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'notification-container';
      if (style === 'payment') {
        container.classList.add('payment-style');
      } else {
        container.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 9999;
          max-width: 400px;
        `;
      }
      document.body.appendChild(container);
    }

    const notification = document.createElement('div');
    notification.className = 'notification notification-error';
    notification.innerHTML = `
      <div class="notification-content">
        <div class="notification-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>
        <div class="notification-message">${message}</div>
        <button class="notification-close" aria-label="Tutup notifikasi">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div class="notification-progress"></div>
    `;

    container.appendChild(notification);
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);

    const closeBtn = notification.querySelector('.notification-close');
    const closeNotification = () => {
      notification.classList.remove('show');
      setTimeout(() => {
        notification.remove();
      }, 300);
    };

    closeBtn.addEventListener('click', closeNotification);

    if (autoClose) {
      setTimeout(closeNotification, duration);
    }

    return notification;
  },

  /**
   * Menampilkan notifikasi info
   */
  showInfo(options = {}) {
    const { message = 'Informasi', duration = 4000, autoClose = true, style = 'default' } = options;

    let container = document.getElementById('notification-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'notification-container';
      if (style === 'payment') {
        container.classList.add('payment-style');
      } else {
        container.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 9999;
          max-width: 400px;
        `;
      }
      document.body.appendChild(container);
    }

    const notification = document.createElement('div');
    notification.className = 'notification notification-info';
    notification.innerHTML = `
      <div class="notification-content">
        <div class="notification-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        </div>
        <div class="notification-message">${message}</div>
        <button class="notification-close" aria-label="Tutup notifikasi">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div class="notification-progress"></div>
    `;

    container.appendChild(notification);
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);

    const closeBtn = notification.querySelector('.notification-close');
    const closeNotification = () => {
      notification.classList.remove('show');
      setTimeout(() => {
        notification.remove();
      }, 300);
    };

    closeBtn.addEventListener('click', closeNotification);

    if (autoClose) {
      setTimeout(closeNotification, duration);
    }

    return notification;
  },

  /**
   * Menghapus semua notifikasi
   */
  clearAll() {
    const container = document.getElementById('notification-container');
    if (container) {
      container.innerHTML = '';
    }
  },
};

// Export untuk use di modul lain
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ReservationNotification;
}
