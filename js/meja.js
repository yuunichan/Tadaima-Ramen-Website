// Sample Data
let tables = [
    {
        id: 1,
        number: 'A01',
        location: 'outdoor',
        capacity: 2,
        status: 'tersedia',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400'
    },
    {
        id: 2,
        number: 'A02',
        location: 'indoor',
        capacity: 4,
        status: 'booking',
        image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400'
    },
    {
        id: 3,
        number: 'A03',
        location: 'indoor',
        capacity: 2,
        status: 'tersedia',
        image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400'
    },
    {
        id: 4,
        number: 'A04',
        location: 'indoor',
        capacity: 4,
        status: 'booking',
        image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400'
    },
    {
        id: 5,
        number: 'A05',
        location: 'outdoor',
        capacity: 4,
        status: 'booking',
        image: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=400'
    },
    {
        id: 6,
        number: 'A06',
        location: 'outdoor',
        capacity: 6,
        status: 'tersedia',
        image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400'
    },
    {
        id: 7,
        number: 'A07',
        location: 'outdoor',
        capacity: 8,
        status: 'tersedia',
        image: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=400'
    },
    {
        id: 8,
        number: 'A08',
        location: 'indoor',
        capacity: 4,
        status: 'tersedia',
        image: 'https://images.unsplash.com/photo-1530062845289-9109b2c9c868?w=400'
    },
    {
        id: 9,
        number: 'A09',
        location: 'outdoor',
        capacity: 4,
        status: 'booking',
        image: 'https://images.unsplash.com/photo-1515669097368-22e68427d265?w=400'
    }
];

let editingId = null;
let deleteId = null;
let currentFilters = {
    status: 'all',
    location: 'all',
    search: ''
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderTable();
    updateStats();
    setupEventListeners();
});

// Event Listeners
function setupEventListeners() {
    // Add Table Button
    document.getElementById('btnAddTable').addEventListener('click', openAddModal);

    // Close Modals
    document.getElementById('closeModal').addEventListener('click', closeModal);
    document.getElementById('closeDeleteModal').addEventListener('click', closeDeleteModal);
    document.getElementById('btnCancel').addEventListener('click', closeModal);
    document.getElementById('btnCancelDelete').addEventListener('click', closeDeleteModal);

    // Form Submit
    document.getElementById('formTable').addEventListener('submit', handleSubmit);

    // Delete Confirm
    document.getElementById('btnConfirmDelete').addEventListener('click', handleDelete);

    // Upload Area
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');

    uploadArea.addEventListener('click', () => fileInput.click());
    
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--primary)';
        uploadArea.style.background = '#fff8f4';
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = '#e0e0e0';
        uploadArea.style.background = 'white';
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#e0e0e0';
        uploadArea.style.background = 'white';
        
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleImageUpload(file);
        }
    });

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            handleImageUpload(file);
        }
    });

    // Toggle Buttons
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const group = this.parentElement;
            const hiddenInput = group.nextElementSibling;
            
            group.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            hiddenInput.value = this.dataset.value;
        });
    });

    // Filter Buttons
    document.querySelectorAll('.filter-btn[data-status]').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn[data-status]').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilters.status = this.dataset.status;
            renderTable();
        });
    });

    document.querySelectorAll('.filter-btn[data-location]').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn[data-location]').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilters.location = this.dataset.location;
            renderTable();
        });
    });

    // Search
    document.getElementById('searchInput').addEventListener('input', function(e) {
        currentFilters.search = e.target.value.toLowerCase();
        renderTable();
    });

    // Close modal on outside click
    window.addEventListener('click', function(e) {
        const modalTable = document.getElementById('modalTable');
        const modalDelete = document.getElementById('modalDelete');
        
        if (e.target === modalTable) {
            closeModal();
        }
        if (e.target === modalDelete) {
            closeDeleteModal();
        }
    });
}

// Image Upload Handler
function handleImageUpload(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById('uploadPlaceholder').style.display = 'none';
        document.getElementById('previewImage').style.display = 'block';
        document.getElementById('previewImage').src = e.target.result;
    };
    reader.readAsDataURL(file);
}

// Render Table
function renderTable() {
    const tbody = document.getElementById('tableBody');
    const filtered = tables.filter(table => {
        const matchStatus = currentFilters.status === 'all' || table.status === currentFilters.status;
        const matchLocation = currentFilters.location === 'all' || table.location === currentFilters.location;
        const matchSearch = table.number.toLowerCase().includes(currentFilters.search);
        return matchStatus && matchLocation && matchSearch;
    });

    tbody.innerHTML = filtered.map((table, index) => `
        <tr>
            <td>${index + 1}</td>
            <td class="table-number-cell">No. ${table.number}</td>
            <td>
                <span class="location-badge ${table.location}">
  ${
    table.location === 'outdoor'
      ? `
        <svg xmlns="http://www.w3.org/2000/svg"
             width="16"
             height="16"
             fill="currentColor"
             class="bi bi-signpost"
             viewBox="0 0 16 16">
          <path d="M7 1.414V4H2a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h5v6h2v-6h3.532a1 1 0 0 0 .768-.36l1.933-2.32a.5.5 0 0 0 0-.64L13.3 4.36a1 1 0 0 0-.768-.36H9V1.414a1 1 0 0 0-2 0M12.532 5l1.666 2-1.666 2H2V5z"/>
        </svg>
        <span>Outdoor</span>
      `
      : `
        <svg xmlns="http://www.w3.org/2000/svg"
             width="16"
             height="16"
             fill="currentColor"
             class="bi bi-house-door-fill"
             viewBox="0 0 16 16">
          <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5"/>
        </svg>
        <span>Indoor</span>
      `
  }
</span>

            </td>
            <td>
                <span class="capacity-cell">
                    👥 ${table.capacity} orang
                </span>
            </td>
            <td>
                <span class="status-badge ${table.status}">
                    ${table.status === 'tersedia' ? 'Tersedia' : 'Booking'}
                </span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn-edit" onclick="openEditModal(${table.id})">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
</svg> Edit
                    </button>
                    <button class="btn-delete" onclick="openDeleteModal(${table.id})">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
</svg> Hapus
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Update Stats
function updateStats() {
    const total = tables.length;
    const available = tables.filter(t => t.status === 'tersedia').length;
    const booked = tables.filter(t => t.status === 'booking').length;

    document.getElementById('totalTables').textContent = total;
    document.getElementById('availableTables').textContent = available;
    document.getElementById('bookedTables').textContent = booked;
}

// Open Add Modal
function openAddModal() {
    editingId = null;
    document.getElementById('modalTitle').textContent = 'Tambah Meja Baru';
    document.getElementById('btnSubmit').textContent = 'Tambah Meja';
    document.getElementById('statusGroup').style.display = 'none';
    
    // Reset form
    document.getElementById('formTable').reset();
    document.getElementById('uploadPlaceholder').style.display = 'flex';
    document.getElementById('previewImage').style.display = 'none';
    document.getElementById('previewImage').src = '';
    document.getElementById('location').value = 'outdoor';
    document.getElementById('capacity').value = 2;
    
    // Reset toggle buttons
    document.querySelectorAll('.button-group').forEach(group => {
        group.querySelectorAll('.toggle-btn').forEach(btn => btn.classList.remove('active'));
        group.querySelector('[data-value="outdoor"]')?.classList.add('active');
    });
    
    document.getElementById('modalTable').classList.add('show');
}

// Open Edit Modal
function openEditModal(id) {
    editingId = id;
    const table = tables.find(t => t.id === id);
    
    if (!table) return;
    
    document.getElementById('modalTitle').textContent = `Edit Meja ${table.number}`;
    document.getElementById('btnSubmit').textContent = 'Simpan Perubahan';
    document.getElementById('statusGroup').style.display = 'block';
    
    // Fill form
    document.getElementById('tableNumber').value = table.number;
    document.getElementById('capacity').value = table.capacity;
    document.getElementById('location').value = table.location;
    document.getElementById('status').value = table.status;
    
    // Set image
    if (table.image) {
        document.getElementById('uploadPlaceholder').style.display = 'none';
        document.getElementById('previewImage').style.display = 'block';
        document.getElementById('previewImage').src = table.image;
    }
    
    // Set toggle buttons
    document.querySelectorAll('.button-group').forEach(group => {
        const hiddenInput = group.nextElementSibling;
        group.querySelectorAll('.toggle-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.value === hiddenInput.value) {
                btn.classList.add('active');
            }
        });
    });
    
    document.getElementById('modalTable').classList.add('show');
}

// Close Modal
function closeModal() {
    document.getElementById('modalTable').classList.remove('show');
    editingId = null;
}

// Handle Submit
function handleSubmit(e) {
    e.preventDefault();
    
    const formData = {
        number: document.getElementById('tableNumber').value,
        location: document.getElementById('location').value,
        capacity: parseInt(document.getElementById('capacity').value),
        status: document.getElementById('status').value || 'tersedia',
        image: document.getElementById('previewImage').src || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400'
    };
    
    if (editingId) {
        // Update existing table
        const index = tables.findIndex(t => t.id === editingId);
        if (index !== -1) {
            tables[index] = { ...tables[index], ...formData };
        }
    } else {
        // Add new table
        const newId = Math.max(...tables.map(t => t.id), 0) + 1;
        tables.push({ id: newId, ...formData });
    }
    
    renderTable();
    updateStats();
    closeModal();
}

// Open Delete Modal
function openDeleteModal(id) {
    deleteId = id;
    const table = tables.find(t => t.id === id);
    
    if (!table) return;
    
    document.getElementById('deleteTableNumber').textContent = table.number;
    document.getElementById('deleteTableLocation').textContent = table.location === 'outdoor' ? 'Outdoor' : 'Indoor';
    document.getElementById('deleteTableCapacity').textContent = `${table.capacity} orang`;
    
    document.getElementById('modalDelete').classList.add('show');
}

// Close Delete Modal
function closeDeleteModal() {
    document.getElementById('modalDelete').classList.remove('show');
    deleteId = null;
}

// Handle Delete
function handleDelete() {
    if (deleteId) {
        tables = tables.filter(t => t.id !== deleteId);
        renderTable();
        updateStats();
        closeDeleteModal();
    }
}

// Make functions global for onclick handlers
window.openEditModal = openEditModal;
window.openDeleteModal = openDeleteModal;