// Logout Modal Functions

// Toggle User Dropdown Menu
function toggleUserDropdown() {
    console.log('toggleUserDropdown called');
    const dropdown = document.getElementById('userDropdown');
    console.log('Dropdown element found:', dropdown !== null);
    
    if (dropdown) {
        dropdown.classList.toggle('active');
        console.log('Dropdown active status:', dropdown.classList.contains('active'));
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
    const userBtn = document.querySelector('.user-profile-btn');
    const dropdown = document.getElementById('userDropdown');
    
    if (dropdown && userBtn && !userBtn.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove('active');
    }
});

// Open logout modal
function openLogoutModal(event) {
    if (event) {
        event.preventDefault();
    }
    const modal = document.getElementById('logoutModal');
    if (modal) {
        modal.classList.add('active');
    }
    
    // Close dropdown if open
    const dropdown = document.getElementById('userDropdown');
    if (dropdown) {
        dropdown.classList.remove('active');
    }
}

// Close logout modal
function closeLogoutModal() {
    const modal = document.getElementById('logoutModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Confirm logout and redirect
function confirmLogout() {
    // Clear local storage if you're using it for session management
    localStorage.removeItem('adminToken');
    localStorage.removeItem('customerToken');
    localStorage.removeItem('userSession');
    
    // Redirect to login page
    window.location.href = '../login_page.html';
}

// Close modal when clicking outside of it
document.addEventListener('DOMContentLoaded', function() {
    const logoutModal = document.getElementById('logoutModal');
    
    if (logoutModal) {
        logoutModal.addEventListener('click', function(event) {
            if (event.target === logoutModal) {
                closeLogoutModal();
            }
        });
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modal = document.getElementById('logoutModal');
        if (modal && modal.classList.contains('active')) {
            closeLogoutModal();
        }
    }
});
