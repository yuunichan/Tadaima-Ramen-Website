// js/notification.js - Modul Notifikasi Modern

const ReservationNotification = {
  showSuccess(options = {}) {
    const {
      message = 'Operasi Berhasil!',
      duration = 5000,
      autoClose = true,
      onClose = null,
      style = 'default'
    } = options;

    let container = document.getElementById('notification-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'notification-container';
      container.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        max-width: 400px;
      `;
      document.body.appendChild(container);
    }

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
        <button class="notification-close" aria-label="Tutup">×</button>
      </div>
      <div class="notification-progress"></div>
    `;

    container.appendChild(notification);

    setTimeout(() => notification.classList.add('show'), 10);

    const closeBtn = notification.querySelector('.notification-close');
    const close = () => {
      notification.classList.remove('show');
      setTimeout(() => {
        notification.remove();
        if (onClose) onClose();
      }, 300);
    };

    closeBtn.addEventListener('click', close);

    if (autoClose) {
      setTimeout(close, duration);
    }
  },

  showError(options = {}) {
    const { message = 'Terjadi Kesalahan', duration = 5000, autoClose = true } = options;

    let container = document.getElementById('notification-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'notification-container';
      container.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        max-width: 400px;
      `;
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
        <button class="notification-close" aria-label="Tutup">×</button>
      </div>
      <div class="notification-progress"></div>
    `;

    container.appendChild(notification);
    setTimeout(() => notification.classList.add('show'), 10);

    const closeBtn = notification.querySelector('.notification-close');
    const close = () => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    };

    closeBtn.addEventListener('click', close);

    if (autoClose) setTimeout(close, duration);
  },

  // Bisa ditambah showInfo jika perlu nanti
};

window.ReservationNotification = ReservationNotification; // agar bisa diakses global