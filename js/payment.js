// payment.js - JavaScript untuk halaman pembayaran

document.addEventListener('DOMContentLoaded', function() {
    
    // Timer Configuration
    let timeRemaining = 300; // 5 minutes in seconds (5:00)
    let timerInterval;
    
    const timerElement = document.getElementById('timer');
    const timerDisplay = document.querySelector('.timer-display');
    const confirmBtn = document.getElementById('confirmBtn');
    
    // Format time display (MM:SS)
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}.${secs.toString().padStart(2, '0')}`;
    }
    
    // Update timer display
    function updateTimer() {
        timerElement.textContent = formatTime(timeRemaining);
        
        // Warning state when time is less than 1 minute
        if (timeRemaining <= 60) {
            timerDisplay.classList.add('warning');
            timerElement.classList.add('warning');
        }
        
        // Time expired
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            handleTimeExpired();
        }
        
        timeRemaining--;
    }
    
    // Start countdown timer
    function startTimer() {
        timerInterval = setInterval(updateTimer, 1000);
        updateTimer(); // Initial call
    }
    
    // Handle time expired
    function handleTimeExpired() {
        timerElement.textContent = '00.00';
        showNotification('Waktu pembayaran telah habis. Silakan buat pesanan baru.', 'error');
        
        // Disable QR code
        const qrWrapper = document.querySelector('.qr-code-wrapper');
        if (qrWrapper) {
            qrWrapper.style.opacity = '0.5';
            qrWrapper.style.pointerEvents = 'none';
        }
        
        // Change button text
        confirmBtn.textContent = 'Kembali ke Menu';
    }
    
    // Cancel order button - Handle both "Batalkan Pesanan" and "Kembali ke Menu"
    confirmBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (confirmBtn.textContent === 'Batalkan Pesanan') {
            console.log('Batalkan Pesanan clicked');
            showCancelConfirmationModal();
        } else if (confirmBtn.textContent === 'Kembali ke Menu') {
            window.location.href = 'menu.html';
        }
    });
    
    // Show cancel confirmation modal
    function showCancelConfirmationModal() {
        console.log('showCancelConfirmationModal called');
        
        // Create modal overlay
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay-cancel';
        modalOverlay.id = 'modalOverlayCancel';
        
        // Create modal content
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content-cancel';
        
        modalContent.innerHTML = `
            <div class="modal-header-cancel">
                <h2>Batalkan Pesanan</h2>
            </div>
            <div class="modal-body-cancel">
                <p>Apakah Anda yakin ingin membatalkan pesanan ini?</p>
                <p class="modal-warning">Pesanan yang dibatalkan tidak dapat dikembalikan.</p>
            </div>
            <div class="modal-footer-cancel">
                <button class="modal-btn-cancel modal-btn-no" id="cancelNo">Tidak</button>
                <button class="modal-btn-cancel modal-btn-yes" id="cancelYes">Ya, Batalkan</button>
            </div>
        `;
        
        modalOverlay.appendChild(modalContent);
        document.body.appendChild(modalOverlay);
        
        console.log('Modal added to DOM');
        
        // Trigger animation
        setTimeout(() => {
            modalOverlay.classList.add('show');
            console.log('Show class added to modal');
        }, 10);
        
        // Handle "Tidak" button
        document.getElementById('cancelNo').addEventListener('click', function() {
            console.log('Tidak button clicked');
            closeCancelModal();
        });
        
        // Handle "Ya, Batalkan" button
        document.getElementById('cancelYes').addEventListener('click', function() {
            console.log('Ya, Batalkan button clicked');
            clearInterval(timerInterval);
            closeCancelModal();
            showLoadingOverlay();
            
            setTimeout(() => {
                hideLoadingOverlay();
                showNotification('Pesanan telah dibatalkan', 'warning');
                
                setTimeout(() => {
                    window.location.href = 'checkout.html';
                }, 1500);
            }, 1000);
        });
        
        // Close modal when clicking overlay
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                console.log('Overlay clicked');
                closeCancelModal();
            }
        });
    }
    
    // Close cancel modal
    function closeCancelModal() {
        const modalOverlay = document.getElementById('modalOverlayCancel');
        if (modalOverlay) {
            modalOverlay.classList.remove('show');
            setTimeout(() => {
                modalOverlay.remove();
            }, 300);
        }
    }
    
    // Simulate payment check (for demo purposes)
    function checkPaymentStatus() {
        // In real application, this would check with backend
        // For demo, we'll simulate a random payment success after some time
        
        const randomDelay = Math.floor(Math.random() * 30000) + 60000; // 1-1.5 minutes
        
        setTimeout(() => {
            // Uncomment to test payment success
            // handlePaymentSuccess();
        }, randomDelay);
    }
    
    // Handle successful payment
    function handlePaymentSuccess() {
        clearInterval(timerInterval);
        showLoadingOverlay();
        
        setTimeout(() => {
            hideLoadingOverlay();
            showNotification('Pembayaran berhasil! Terima kasih atas pesanan Anda.', 'success');
            
            setTimeout(() => {
                window.location.href = 'payment-success.html';
            }, 2000);
        }, 1500);
    }
    
    // Show notification
    function showNotification(message, type = 'success') {
        // Remove existing notification
        const existing = document.querySelector('.payment-status');
        if (existing) {
            existing.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `payment-status ${type} show`;
        
        const icon = type === 'success' ? '✓' : 
                     type === 'error' ? '✗' : 
                     type === 'warning' ? '⚠' : 'ℹ';
        
        notification.innerHTML = `
            <span class="status-icon">${icon}</span>
            <span class="status-message">${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        // Auto hide after 4 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }
    
    // Show loading overlay
    function showLoadingOverlay() {
        let overlay = document.querySelector('.loading-overlay');
        
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'loading-overlay';
            overlay.innerHTML = '<div class="loading-spinner"></div>';
            document.body.appendChild(overlay);
        }
        
        overlay.classList.add('show');
    }
    
    // Hide loading overlay
    function hideLoadingOverlay() {
        const overlay = document.querySelector('.loading-overlay');
        if (overlay) {
            overlay.classList.remove('show');
        }
    }
    
    // QR Code click handler (for testing)
    const qrCode = document.querySelector('.qr-code-wrapper');
    if (qrCode) {
        qrCode.addEventListener('click', function() {
            // In real app, this might open camera or payment app
            showNotification('Arahkan aplikasi pembayaran Anda ke QR code ini', 'info');
        });
        
        // Add pointer cursor
        qrCode.style.cursor = 'pointer';
    }
    
    // Handle page visibility (pause/resume timer when tab is hidden/visible)
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            // Page is hidden - could pause timer or show warning
            console.log('Page hidden - timer continues in background');
        } else {
            // Page is visible again
            console.log('Page visible - timer running');
        }
    });
    
    // Prevent accidental page close
    window.addEventListener('beforeunload', function(e) {
        if (timeRemaining > 0 && timeRemaining < 300) {
            e.preventDefault();
            e.returnValue = 'Pembayaran sedang berlangsung. Yakin ingin meninggalkan halaman?';
            return e.returnValue;
        }
    });
    
    // Initialize
    startTimer();
    checkPaymentStatus();
    
    // Add instruction hover effect
    const instructionItems = document.querySelectorAll('.instructions-list li');
    instructionItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.3s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 100 * index);
    });
    
    console.log('Payment page loaded successfully');
    console.log('Timer started: 5:00 minutes');
});

// Modal Functions for Cancel Order
function openCancelOrderModal() {
    const modal = document.getElementById('cancelOrderModal');
    if (modal) {
        modal.classList.add('active');
    }
}

function closeCancelOrderModal() {
    const modal = document.getElementById('cancelOrderModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function confirmCancelOrder() {
    closeCancelOrderModal();
    
    // Show loading or notification
    const notification = document.createElement('div');
    notification.className = 'payment-status warning show';
    notification.innerHTML = `
        <span class="status-icon">⚠</span>
        <span class="status-message">Pesanan telah dibatalkan</span>
    `;
    document.body.appendChild(notification);
    
    // Redirect to checkout after 1.5 seconds
    setTimeout(() => {
        window.location.href = 'checkout.html';
    }, 1500);
}