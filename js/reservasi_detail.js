// reservasi_detail.js - JavaScript untuk halaman detail meja reservasi

document.addEventListener('DOMContentLoaded', function() {
    
    // Get table details from URL parameters (if available)
    const urlParams = new URLSearchParams(window.location.search);
    const tableNumber = urlParams.get('table') || 'A03';
    const tableStatus = urlParams.get('status') || 'tersedia';
    
    // Reserve button
    const reserveBtn = document.querySelector('.reserve-detail-button');
    
    if (reserveBtn) {
        reserveBtn.addEventListener('click', function() {
            handleReservation();
        });
    }
    
    // Handle reservation process
    function handleReservation() {
        // Check if table is available
        const availabilityBadge = document.querySelector('.availability-badge');
        const status = availabilityBadge ? availabilityBadge.textContent.toLowerCase() : 'tersedia';
        
        if (status !== 'tersedia') {
            showNotification('Maaf, meja ini sedang tidak tersedia', 'error');
            return;
        }
        
        // Show confirmation dialog
        const confirmReservation = confirm(
            `Apakah Anda yakin ingin melakukan reservasi untuk Meja No. ${tableNumber}?\n\n` +
            'Anda akan diarahkan ke halaman form reservasi.'
        );
        
        if (confirmReservation) {
            // Show loading state
            showLoadingState();
            
            // Simulate API call
            setTimeout(() => {
                hideLoadingState();
                showNotification('Reservasi berhasil! Mengarahkan ke form...', 'success');
                
                // Redirect to reservation form
                setTimeout(() => {
                    window.location.href = `form_reservasi.html?table=${tableNumber}`;
                }, 1500);
            }, 1000);
        }
    }
    
    // Show loading state
    function showLoadingState() {
        const detailCard = document.querySelector('.detail-card');
        const reserveBtn = document.querySelector('.reserve-detail-button');
        
        if (detailCard) {
            detailCard.classList.add('loading');
        }
        
        if (reserveBtn) {
            reserveBtn.disabled = true;
            reserveBtn.innerHTML = `
                <svg class="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" opacity="0.25"/>
                    <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor"/>
                </svg>
                Memproses...
            `;
        }
    }
    
    // Hide loading state
    function hideLoadingState() {
        const detailCard = document.querySelector('.detail-card');
        const reserveBtn = document.querySelector('.reserve-detail-button');
        
        if (detailCard) {
            detailCard.classList.remove('loading');
        }
        
        if (reserveBtn) {
            reserveBtn.disabled = false;
            reserveBtn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 4H5C3.89 4 3.01 4.9 3.01 6L3 20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V10H19V20ZM19 8H5V6H19V8ZM9 14H7V12H9V14ZM13 14H11V12H13V14ZM17 14H15V12H17V14ZM9 18H7V16H9V18ZM13 18H11V16H13V18ZM17 18H15V16H17V18Z" fill="currentColor"/>
                </svg>
                Lakukan Reservasi
            `;
        }
    }
    
    // Show notification
    function showNotification(message, type = 'success') {
        // Remove existing notification
        const existing = document.querySelector('.reservation-success-message');
        if (existing) {
            existing.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `reservation-success-message ${type} show`;
        
        const icon = type === 'success' ? '✓' : 
                     type === 'error' ? '✗' : 
                     type === 'warning' ? '⚠' : 'ℹ';
        
        notification.innerHTML = `
            <span class="success-icon">${icon}</span>
            <span class="success-text">${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        // Auto hide after 4 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }
    
    // Add image gallery functionality (if multiple images available)
    const tableImage = document.querySelector('.table-detail-image img');
    if (tableImage) {
        tableImage.addEventListener('click', function() {
            // Could open lightbox/modal with larger image
            console.log('Image clicked - could open lightbox');
        });
        
        // Add hover effect
        tableImage.style.cursor = 'pointer';
    }
    
    // Animate facility items on scroll
    const facilityItems = document.querySelectorAll('.facility-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 50);
            }
        });
    }, { threshold: 0.1 });
    
    facilityItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'all 0.3s ease';
        observer.observe(item);
    });
    
    // Update page title
    document.title = `Detail Meja ${tableNumber} - Restoran`;
    
    // Add spinner animation style
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .spinner {
            animation: spin 1s linear infinite;
        }
    `;
    document.head.appendChild(style);
    
    // Check availability status and update UI
    function updateAvailabilityUI() {
        const badge = document.querySelector('.availability-badge');
        const reserveBtn = document.querySelector('.reserve-detail-button');
        
        if (badge && tableStatus.toLowerCase() === 'dipesan') {
            badge.textContent = 'Dipesan';
            badge.style.background = 'var(--danger)';
            
            if (reserveBtn) {
                reserveBtn.disabled = true;
                reserveBtn.style.opacity = '0.5';
                reserveBtn.style.cursor = 'not-allowed';
                reserveBtn.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
                    </svg>
                    Meja Tidak Tersedia
                `;
            }
        }
    }
    
    // Initialize
    updateAvailabilityUI();
    
    console.log('Reservation detail page loaded successfully');
    console.log('Table:', tableNumber);
    console.log('Status:', tableStatus);
});