// Reservation Management JavaScript

// Sample reservation data
let reservations = [
    {
        id: '01',
        customerName: 'Ayu Sinaga',
        phone: '+628126578960',
        email: 'ayu@gmail.com',
        dateTime: '2025-01-25 19:00',
        guests: 4,
        table: 'Table 1',
        status: 'confirmed',
        notes: 'Birthday celebration'
    },
    {
        id: '02',
        customerName: 'Budi Santoso',
        phone: '+628123456789',
        email: 'budi@gmail.com',
        dateTime: '2025-01-26 18:30',
        guests: 2,
        table: 'Table 2',
        status: 'pending',
        notes: 'Window seat preferred'
    },
    {
        id: '03',
        customerName: 'Siti Nurhaliza',
        phone: '+628129876543',
        email: 'siti@gmail.com',
        dateTime: '2025-01-26 20:00',
        guests: 6,
        table: 'Table 3',
        status: 'confirmed',
        notes: 'Family gathering'
    },
    {
        id: '04',
        customerName: 'Ahmad Wijaya',
        phone: '+628125555555',
        email: 'ahmad@gmail.com',
        dateTime: '2025-01-27 19:30',
        guests: 3,
        table: 'Table 4',
        status: 'pending',
        notes: 'No spicy dishes'
    },
    {
        id: '05',
        customerName: 'Dewi Lestari',
        phone: '+628124444444',
        email: 'dewi@gmail.com',
        dateTime: '2025-01-28 18:00',
        guests: 5,
        table: 'Table 5',
        status: 'completed',
        notes: 'Corporate meeting'
    }
];

let editingReservationId = null;

// DOM Elements
const reservasiTableBody = document.getElementById('reservasiTableBody');
const reservasiModal = document.getElementById('reservasiModal');
const deleteModal = document.getElementById('deleteModal');
const viewModal = document.getElementById('viewModal');
const reservasiForm = document.getElementById('reservasiForm');
const searchInput = document.getElementById('searchInput');
const statusFilter = document.getElementById('statusFilter');

// Modal Controls
const btnAddReservasi = document.getElementById('btnAddReservasi');
const closeModal = document.getElementById('closeModal');
const btnCancel = document.getElementById('btnCancel');
const closeDeleteModal = document.getElementById('closeDeleteModal');
const btnCancelDelete = document.getElementById('btnCancelDelete');
const closeViewModal = document.getElementById('closeViewModal');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing reservations...');
    renderReservations();
    updateStatistics();
    setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
    console.log('Setting up event listeners...');

    if (btnAddReservasi) {
        btnAddReservasi.addEventListener('click', function(e) {
            console.log('Add Reservation button clicked');
            e.preventDefault();
            openAddReservasi();
        });
    }

    if (reservasiForm) {
        reservasiForm.addEventListener('submit', handleFormSubmit);
    }

    // Search and filter
    if (searchInput) {
        searchInput.addEventListener('input', filterReservations);
    }

    if (statusFilter) {
        statusFilter.addEventListener('change', filterReservations);
    }

    // Close modal on outside click
    if (reservasiModal) {
        reservasiModal.addEventListener('click', function(e) {
            if (e.target === reservasiModal) {
                closeReservasiModal();
            }
        });
    }

    if (deleteModal) {
        deleteModal.addEventListener('click', function(e) {
            if (e.target === deleteModal) {
                closeDeleteModalFunc();
            }
        });
    }

    if (viewModal) {
        viewModal.addEventListener('click', function(e) {
            if (e.target === viewModal) {
                closeViewModalFunc();
            }
        });
    }
}

// Render Reservations
function renderReservations(reservationsToRender = reservations) {
    console.log('Rendering reservations...');
    reservasiTableBody.innerHTML = '';

    if (reservationsToRender.length === 0) {
        reservasiTableBody.innerHTML = `
            <tr>
                <td colspan="10" style="text-align: center; padding: 3rem; color: #999;">
                    <p style="font-size: 1.2rem;">No reservations found</p>
                </td>
            </tr>
        `;
        return;
    }

    reservationsToRender.forEach(reservation => {
        const row = createReservationRow(reservation);
        reservasiTableBody.appendChild(row);
    });
}

// Create Reservation Row
function createReservationRow(reservation) {
    const row = document.createElement('tr');

    const dateTimeObj = new Date(reservation.dateTime.replace(' ', 'T'));
    const formattedDate = dateTimeObj.toLocaleDateString('id-ID');
    const formattedTime = dateTimeObj.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

    row.innerHTML = `
        <td><strong>${reservation.id}</strong></td>
        <td>${reservation.customerName}</td>
        <td>${reservation.phone}</td>
        <td>${reservation.email}</td>
        <td>${formattedDate} ${formattedTime}</td>
        <td>${reservation.guests}</td>
        <td>${reservation.table}</td>
        <td>
            <span class="status-badge ${reservation.status}">
                ${capitalizeFirstLetter(reservation.status)}
            </span>
        </td>
        <td>${reservation.notes || '-'}</td>
        <td>
            <div class="action-buttons">
                <button class="btn-action btn-view" onclick="viewReservation('${reservation.id}')">View</button>
                <button class="btn-action btn-delete" onclick="confirmDelete('${reservation.id}')">Cancel</button>
            </div>
        </td>
    `;

    return row;
}

// Helper function to capitalize first letter
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Open Add Reservasi Modal
window.openAddReservasi = function() {
    console.log('openAddReservasi called');

    editingReservationId = null;

    const modalTitle = document.getElementById('modalTitle');
    const modalSubtitle = document.getElementById('modalSubtitle');
    const formTitle = document.getElementById('formTitle');
    const btnSubmit = document.getElementById('btnSubmit');
    const reservasiIdInput = document.getElementById('reservasiId');

    if (modalTitle) modalTitle.textContent = 'Add New Reservation';
    if (modalSubtitle) modalSubtitle.textContent = 'Create a new customer reservation';
    if (formTitle) formTitle.textContent = 'Add New Reservation';
    if (btnSubmit) btnSubmit.innerHTML = '<span>💾</span> Save Reservation';

    // Generate new reservation ID
    const nextId = String(reservations.length + 1).padStart(3, '0');
    if (reservasiIdInput) reservasiIdInput.value = `RES-2025-${nextId}`;

    // Reset form
    if (reservasiForm) reservasiForm.reset();

    // Set default status to pending
    const statusSelect = document.getElementById('statusSelect');
    if (statusSelect) statusSelect.value = 'pending';

    if (reservasiModal) {
        console.log('Opening reservasi modal');
        reservasiModal.classList.add('active');
    }
};

// Edit Reservation
window.editReservation = function(reservationId) {
    const reservation = reservations.find(r => r.id === reservationId);
    if (!reservation) return;

    editingReservationId = reservationId;

    const modalTitle = document.getElementById('modalTitle');
    const modalSubtitle = document.getElementById('modalSubtitle');
    const formTitle = document.getElementById('formTitle');
    const btnSubmit = document.getElementById('btnSubmit');

    if (modalTitle) modalTitle.textContent = `Edit Reservation - ${reservation.customerName}`;
    if (modalSubtitle) modalSubtitle.textContent = 'Edit reservation details';
    if (formTitle) formTitle.textContent = `Edit Reservation`;
    if (btnSubmit) btnSubmit.innerHTML = '<span>💾</span> Update Reservation';

    // Fill form
    document.getElementById('reservasiId').value = reservation.id;
    document.getElementById('customerName').value = reservation.customerName;
    document.getElementById('phoneNumber').value = reservation.phone;
    document.getElementById('emailAddress').value = reservation.email;
    document.getElementById('reservationDateTime').value = reservation.dateTime.replace(' ', 'T');
    document.getElementById('numberOfGuests').value = reservation.guests;
    document.getElementById('tableSelect').value = reservation.table;
    document.getElementById('statusSelect').value = reservation.status;
    document.getElementById('specialNotes').value = reservation.notes;

    if (reservasiModal) {
        reservasiModal.classList.add('active');
    }
};

// View Reservation Details
window.viewReservation = function(reservationId) {
    const reservation = reservations.find(r => r.id === reservationId);
    if (!reservation) return;

    const dateTimeObj = new Date(reservation.dateTime.replace(' ', 'T'));
    const formattedDate = dateTimeObj.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const formattedTime = dateTimeObj.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

    const detailView = document.getElementById('reservasiDetailView');
    detailView.innerHTML = `
        <div class="detail-view-header">
            <h2 class="detail-view-name">${reservation.customerName}</h2>
            <p class="detail-view-position">${reservation.id}</p>
            <div class="detail-view-status status-badge ${reservation.status}">
                ${capitalizeFirstLetter(reservation.status)}
            </div>
        </div>

        <div class="detail-view-section">
            <h3 class="detail-section-title">
                <span>📋</span>
                Reservation Details
            </h3>
            <div class="detail-info-grid">
                <div class="detail-info-item">
                    <span class="detail-info-label">Reservation ID</span>
                    <span class="detail-info-value">
                        <span>🆔</span>
                        ${reservation.id}
                    </span>
                </div>
                <div class="detail-info-item">
                    <span class="detail-info-label">Customer Name</span>
                    <span class="detail-info-value">
                        <span>👤</span>
                        ${reservation.customerName}
                    </span>
                </div>
                <div class="detail-info-item">
                    <span class="detail-info-label">Phone Number</span>
                    <span class="detail-info-value">
                        <span>📱</span>
                        ${reservation.phone}
                    </span>
                </div>
                <div class="detail-info-item">
                    <span class="detail-info-label">Email Address</span>
                    <span class="detail-info-value">
                        <span>📧</span>
                        ${reservation.email}
                    </span>
                </div>
                <div class="detail-info-item">
                    <span class="detail-info-label">Date & Time</span>
                    <span class="detail-info-value">
                        <span>📅</span>
                        ${formattedDate} at ${formattedTime}
                    </span>
                </div>
                <div class="detail-info-item">
                    <span class="detail-info-label">Number of Guests</span>
                    <span class="detail-info-value">
                        <span>👥</span>
                        ${reservation.guests} Guests
                    </span>
                </div>
                <div class="detail-info-item">
                    <span class="detail-info-label">Table</span>
                    <span class="detail-info-value">
                        <span>🪑</span>
                        ${reservation.table}
                    </span>
                </div>
                <div class="detail-info-item">
                    <span class="detail-info-label">Status</span>
                    <span class="detail-info-value">
                        <span>⏱️</span>
                        ${capitalizeFirstLetter(reservation.status)}
                    </span>
                </div>
            </div>
        </div>

        ${reservation.notes ? `
        <div class="detail-view-section">
            <h3 class="detail-section-title">
                <span>📝</span>
                Special Notes
            </h3>
            <div style="background: #f9f9f9; padding: 1rem; border-radius: 8px; border-left: 3px solid var(--accent);">
                ${reservation.notes}
            </div>
        </div>
        ` : ''}

        <div class="detail-view-actions">
            <button class="btn-cancel" onclick="closeViewModalFunc()">Close</button>
            <button class="btn-submit" onclick="closeViewModalFunc(); editReservation('${reservation.id}')">
                <span>✏️</span>
                Edit Reservation
            </button>
        </div>
    `;

    if (viewModal) {
        viewModal.classList.add('active');
    }
};

// Handle Form Submit
function handleFormSubmit(e) {
    e.preventDefault();

    const dateTimeInput = document.getElementById('reservationDateTime').value;
    const formattedDateTime = dateTimeInput.replace('T', ' ');

    const reservationData = {
        id: document.getElementById('reservasiId').value,
        customerName: document.getElementById('customerName').value,
        phone: document.getElementById('phoneNumber').value,
        email: document.getElementById('emailAddress').value,
        dateTime: formattedDateTime,
        guests: parseInt(document.getElementById('numberOfGuests').value),
        table: document.getElementById('tableSelect').value,
        status: document.getElementById('statusSelect').value,
        notes: document.getElementById('specialNotes').value
    };

    if (editingReservationId) {
        // Update existing reservation
        const index = reservations.findIndex(r => r.id === editingReservationId);
        if (index !== -1) {
            reservations[index] = reservationData;
        }
    } else {
        // Add new reservation
        reservations.push(reservationData);
    }

    renderReservations();
    updateStatistics();
    closeReservasiModal();

    alert(editingReservationId ? 'Reservation updated successfully!' : 'Reservation created successfully!');
}

// Confirm Delete
window.confirmDelete = function(reservationId) {
    const reservation = reservations.find(r => r.id === reservationId);
    if (!reservation) return;

    const deleteInfo = document.getElementById('reservasiDeleteInfo');
    deleteInfo.innerHTML = `
        <div style="text-align: center;">
            <h4 style="margin: 0 0 0.5rem 0;">${reservation.customerName}</h4>
            <p style="margin: 0; color: #999;">ID: ${reservation.id}</p>
            <p style="margin: 0.5rem 0 0 0; color: #999;">📅 ${reservation.dateTime}</p>
        </div>
    `;

    // Store reservation ID for deletion
    document.getElementById('btnConfirmDelete').onclick = () => deleteReservation(reservationId);

    if (deleteModal) {
        deleteModal.classList.add('active');
    }
};

// Delete Reservation
function deleteReservation(reservationId) {
    reservations = reservations.filter(r => r.id !== reservationId);
    renderReservations();
    updateStatistics();
    closeDeleteModalFunc();

    alert('Reservation cancelled successfully!');
}

// Close Modals
window.closeReservasiModal = function() {
    console.log('closeReservasiModal called');
    if (reservasiModal) {
        reservasiModal.classList.remove('active');
    }
    if (reservasiForm) {
        reservasiForm.reset();
    }
    editingReservationId = null;
};

function closeDeleteModalFunc() {
    console.log('closeDeleteModalFunc called');
    if (deleteModal) {
        deleteModal.classList.remove('active');
    }
}

window.closeDeleteModalFunc = closeDeleteModalFunc;

window.closeViewModalFunc = function() {
    console.log('closeViewModalFunc called');
    if (viewModal) {
        viewModal.classList.remove('active');
    }
};

// Filter Reservations
function filterReservations() {
    const searchTerm = searchInput.value.toLowerCase();
    const statusValue = statusFilter.value;

    let filtered = reservations;

    // Filter by search term
    if (searchTerm) {
        filtered = filtered.filter(r =>
            r.customerName.toLowerCase().includes(searchTerm) ||
            r.id.toLowerCase().includes(searchTerm) ||
            r.email.toLowerCase().includes(searchTerm) ||
            r.phone.toLowerCase().includes(searchTerm)
        );
    }

    // Filter by status
    if (statusValue) {
        filtered = filtered.filter(r => r.status === statusValue);
    }

    renderReservations(filtered);
}

// Update Statistics
function updateStatistics() {
    const total = reservations.length;
    const today = new Date().toLocaleDateString('id-ID');
    const todayReservations = reservations.filter(r => {
        const resDate = new Date(r.dateTime.replace(' ', 'T')).toLocaleDateString('id-ID');
        return resDate === today;
    }).length;
    const pending = reservations.filter(r => r.status === 'pending').length;

    document.getElementById('totalReservations').textContent = total;
    document.getElementById('todayReservations').textContent = todayReservations;
    document.getElementById('pendingReservations').textContent = pending;
}
