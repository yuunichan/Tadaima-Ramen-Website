// User Profile JavaScript

// Toggle User Dropdown Menu
function toggleUserDropdown() {
    const dropdown = document.getElementById('userDropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
    const userBtn = document.querySelector('.user-profile-btn');
    const dropdown = document.getElementById('userDropdown');
    
    if (dropdown && !userBtn.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove('active');
    }
});

// Show specific section
function showSection(e, sectionId) {
    e.preventDefault();
    
    // Remove active class from all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from all nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to selected section and link
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.add('active');
    }
    
    // Add active class to clicked link
    event.target.classList.add('active');
}

// Edit Profile
function editProfile() {
    alert('Fitur edit profil akan segera tersedia!');
    // TODO: Implementasi form edit profil
}

// Cancel Reservation
function cancelReservation(reservationId) {
    if (confirm(`Yakin ingin membatalkan reservasi ${reservationId}?`)) {
        alert(`Reservasi ${reservationId} telah dibatalkan.`);
        // TODO: Implementasi cancel reservation ke backend
    }
}

// Initialize - set first section as active on page load
document.addEventListener('DOMContentLoaded', function() {
    const firstSection = document.querySelector('.content-section');
    if (firstSection) {
        firstSection.classList.add('active');
    }
    
    const firstNavLink = document.querySelector('.nav-link');
    if (firstNavLink) {
        firstNavLink.classList.add('active');
    }
    
    console.log('User Profile page loaded');
});
