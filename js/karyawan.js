// Employee Management JavaScript

// Sample employee data
let employees = [
    {
        id: 'EMP-2025-001',
        name: 'Ayu Enissa Maretty Sinaga',
        position: 'Restaurant Manager',
        phone: '+628126578960',
        email: 'ayusinaga@gmail.com',
        status: 'active',
        photo: null,
        completion: 95
    },
    {
        id: 'EMP-2025-002',
        name: 'Abeloisa Chelsea Pardosi',
        position: 'Restaurant Manager',
        phone: '+628126578960',
        email: 'ayusinaga@gmail.com',
        status: 'active',
        photo: null,
        completion: 95
    },
    {
        id: 'EMP-2025-003',
        name: 'Aan Gusdinardi Kusuma',
        position: 'Restaurant Manager',
        phone: '+628126578960',
        email: 'aankusuma@gmail.com',
        status: 'active',
        photo: null,
        completion: 95
    },
    {
        id: 'EMP-2025-004',
        name: 'Abiyah Swasti Telambenua',
        position: 'Restaurant Manager',
        phone: '+628126578960',
        email: 'ayusinaga@gmail.com',
        status: 'active',
        photo: null,
        completion: 95
    }
];

let editingEmployeeId = null;
let currentPhotoData = null;

// DOM Elements
const employeeGrid = document.getElementById('employeeGrid');
const employeeModal = document.getElementById('employeeModal');
const deleteModal = document.getElementById('deleteModal');
const viewModal = document.getElementById('viewModal');
const employeeForm = document.getElementById('employeeForm');
const searchInput = document.getElementById('searchInput');
const statusFilter = document.getElementById('statusFilter');

// Modal Controls
const btnAddEmployee = document.getElementById('btnAddEmployee');
const closeModal = document.getElementById('closeModal');
const btnCancel = document.getElementById('btnCancel');
const closeDeleteModal = document.getElementById('closeDeleteModal');
const btnCancelDelete = document.getElementById('btnCancelDelete');
const closeViewModal = document.getElementById('closeViewModal');

// Photo Upload
const photoInput = document.getElementById('photoInput');
const photoUploadBtn = document.getElementById('photoUploadBtn');
const photoPreview = document.getElementById('photoPreview');

// Status Toggle
const statusButtons = document.querySelectorAll('.status-btn');
const employmentStatus = document.getElementById('employmentStatus');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderEmployees();
    updateStatistics();
    setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
    // Modal controls
    btnAddEmployee.addEventListener('click', openAddModal);
    closeModal.addEventListener('click', closeEmployeeModal);
    btnCancel.addEventListener('click', closeEmployeeModal);
    closeDeleteModal.addEventListener('click', closeDeleteModalFunc);
    btnCancelDelete.addEventListener('click', closeDeleteModalFunc);
    closeViewModal.addEventListener('click', closeViewModalFunc);

    // Form submission
    employeeForm.addEventListener('submit', handleFormSubmit);

    // Photo upload
    photoUploadBtn.addEventListener('click', () => photoInput.click());
    photoInput.addEventListener('change', handlePhotoUpload);

    // Status toggle
    statusButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            statusButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            employmentStatus.value = this.dataset.status;
        });
    });

    // Search and filter
    searchInput.addEventListener('input', filterEmployees);
    statusFilter.addEventListener('change', filterEmployees);

    // Close modal on outside click
    employeeModal.addEventListener('click', function(e) {
        if (e.target === employeeModal) {
            closeEmployeeModal();
        }
    });

    deleteModal.addEventListener('click', function(e) {
        if (e.target === deleteModal) {
            closeDeleteModalFunc();
        }
    });

    viewModal.addEventListener('click', function(e) {
        if (e.target === viewModal) {
            closeViewModalFunc();
        }
    });
}

// Render Employees
function renderEmployees(employeesToRender = employees) {
    employeeGrid.innerHTML = '';
    
    if (employeesToRender.length === 0) {
        employeeGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: #999;">
                <p style="font-size: 1.2rem;">No employees found</p>
            </div>
        `;
        return;
    }

    employeesToRender.forEach(employee => {
        const card = createEmployeeCard(employee);
        employeeGrid.appendChild(card);
    });
}

// Create Employee Card
function createEmployeeCard(employee) {
    const card = document.createElement('div');
    card.className = 'employee-card';
    
    const avatarContent = employee.photo 
        ? `<img src="${employee.photo}" alt="${employee.name}">` 
        : employee.name.charAt(0).toUpperCase();

    card.innerHTML = `
        <div class="employee-card-header">
            <div class="employee-main-info">
                <div class="employee-avatar">${avatarContent}</div>
                <div class="employee-name-info">
                    <h3>${employee.name}</h3>
                    <p>${employee.position}</p>
                </div>
            </div>
            <div class="employee-menu" onclick="viewEmployee('${employee.id}')">⋮</div>
        </div>
        
        <div class="employee-status-badge ${employee.status}">
            <span class="status-badge-dot"></span>
            ${employee.status === 'active' ? 'Active' : 'Inactive'}
        </div>
        
        <div class="employee-completion">
            <span class="completion-icon">🎯</span>
            <span class="completion-text">${employee.completion} %</span>
        </div>
        
        <div class="employee-details">
            <div class="detail-item">
                <span class="detail-icon">📧</span>
                <span>${employee.email}</span>
            </div>
            <div class="detail-item">
                <span class="detail-icon">📱</span>
                <span>${employee.phone}</span>
            </div>
            <div class="detail-item">
                <span class="detail-icon">📍</span>
                <span>Medan, Sumatera Utara</span>
            </div>
        </div>
        
        <div class="employee-actions">
            <button class="btn-edit" onclick="editEmployee('${employee.id}')">
                <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
</svg></span>
                Edit
            </button>
            <button class="btn-delete" onclick="confirmDelete('${employee.id}')">
                <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
</svg></span>
                Hapus
            </button>
        </div>
    `;
    
    return card;
}

// Open Add Modal
function openAddModal() {
    editingEmployeeId = null;
    currentPhotoData = null;
    
    document.getElementById('modalTitle').textContent = 'Add New Employee';
    document.getElementById('modalSubtitle').textContent = 'Add new team member to the system';
    document.getElementById('formTitle').textContent = 'Add New Employee';
    document.getElementById('btnSubmit').innerHTML = '<span>💾</span> Save Employee';
    
    // Generate new employee ID
    const nextId = String(employees.length + 1).padStart(3, '0');
    document.getElementById('employeeId').value = `EMP-2025-${nextId}`;
    
    // Reset form
    employeeForm.reset();
    photoPreview.innerHTML = '<span class="user-icon">👤</span>';
    
    // Reset status to active
    statusButtons.forEach(b => b.classList.remove('active'));
    statusButtons[0].classList.add('active');
    employmentStatus.value = 'active';
    
    employeeModal.classList.add('active');
}

// Edit Employee
window.editEmployee = function(employeeId) {
    const employee = employees.find(e => e.id === employeeId);
    if (!employee) return;
    
    editingEmployeeId = employeeId;
    currentPhotoData = employee.photo;
    
    document.getElementById('modalTitle').textContent = `Edit Employee - ${employee.name}`;
    document.getElementById('modalSubtitle').textContent = 'Edit employee information';
    document.getElementById('formTitle').textContent = `Edit Employee - ${employee.name}`;
    document.getElementById('btnSubmit').innerHTML = '<span>💾</span> Update Employee';
    
    // Fill form
    document.getElementById('employeeId').value = employee.id;
    document.getElementById('fullName').value = employee.name;
    document.getElementById('phoneNumber').value = employee.phone;
    document.getElementById('emailAddress').value = employee.email;
    document.getElementById('position').value = employee.position;
    
    // Set photo
    if (employee.photo) {
        photoPreview.innerHTML = `<img src="${employee.photo}" alt="${employee.name}">`;
    } else {
        photoPreview.innerHTML = '<span class="user-icon">👤</span>';
    }
    
    // Set status
    statusButtons.forEach(b => b.classList.remove('active'));
    const activeBtn = Array.from(statusButtons).find(b => b.dataset.status === employee.status);
    if (activeBtn) activeBtn.classList.add('active');
    employmentStatus.value = employee.status;
    
    employeeModal.classList.add('active');
};

// View Employee Details
window.viewEmployee = function(employeeId) {
    const employee = employees.find(e => e.id === employeeId);
    if (!employee) return;
    
    const avatarContent = employee.photo 
        ? `<img src="${employee.photo}" alt="${employee.name}">` 
        : employee.name.charAt(0).toUpperCase();
    
    const detailView = document.getElementById('employeeDetailView');
    detailView.innerHTML = `
        <div class="detail-view-header">
            <div class="detail-view-avatar">${avatarContent}</div>
            <h2 class="detail-view-name">${employee.name}</h2>
            <p class="detail-view-position">${employee.position}</p>
            <div class="detail-view-status employee-status-badge ${employee.status}">
                <span class="status-badge-dot"></span>
                ${employee.status === 'active' ? 'Active' : 'Inactive'}
            </div>
        </div>
        
        <div class="detail-view-section">
            <h3 class="detail-section-title">
                <span>ℹ️</span>
                Personal Information
            </h3>
            <div class="detail-info-grid">
                <div class="detail-info-item">
                    <span class="detail-info-label">Employee ID</span>
                    <span class="detail-info-value">
                        <span>🆔</span>
                        ${employee.id}
                    </span>
                </div>
                <div class="detail-info-item">
                    <span class="detail-info-label">Full Name</span>
                    <span class="detail-info-value">
                        <span>👤</span>
                        ${employee.name}
                    </span>
                </div>
                <div class="detail-info-item">
                    <span class="detail-info-label">Phone Number</span>
                    <span class="detail-info-value">
                        <span>📱</span>
                        ${employee.phone}
                    </span>
                </div>
                <div class="detail-info-item">
                    <span class="detail-info-label">Email Address</span>
                    <span class="detail-info-value">
                        <span>📧</span>
                        ${employee.email}
                    </span>
                </div>
                <div class="detail-info-item">
                    <span class="detail-info-label">Position</span>
                    <span class="detail-info-value">
                        <span>💼</span>
                        ${employee.position}
                    </span>
                </div>
                <div class="detail-info-item">
                    <span class="detail-info-label">Status</span>
                    <span class="detail-info-value">
                        <span>⏰</span>
                        ${employee.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                </div>
            </div>
        </div>
        
        <div class="detail-view-actions">
            <button class="btn-cancel" onclick="closeViewModalFunc()">Close</button>
            <button class="btn-submit" onclick="closeViewModalFunc(); editEmployee('${employee.id}')">
                <span>✏️</span>
                Edit Profile
            </button>
        </div>
    `;
    
    viewModal.classList.add('active');
};

// Handle Photo Upload
function handlePhotoUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(event) {
        currentPhotoData = event.target.result;
        photoPreview.innerHTML = `<img src="${currentPhotoData}" alt="Preview">`;
    };
    reader.readAsDataURL(file);
}

// Handle Form Submit
function handleFormSubmit(e) {
    e.preventDefault();
    
    const employeeData = {
        id: document.getElementById('employeeId').value,
        name: document.getElementById('fullName').value,
        phone: document.getElementById('phoneNumber').value,
        email: document.getElementById('emailAddress').value,
        position: document.getElementById('position').value,
        status: employmentStatus.value,
        photo: currentPhotoData,
        completion: 95
    };
    
    if (editingEmployeeId) {
        // Update existing employee
        const index = employees.findIndex(e => e.id === editingEmployeeId);
        if (index !== -1) {
            employees[index] = employeeData;
        }
    } else {
        // Add new employee
        employees.push(employeeData);
    }
    
    renderEmployees();
    updateStatistics();
    closeEmployeeModal();
    
    // Show success message (you can implement a toast notification here)
    alert(editingEmployeeId ? 'Employee updated successfully!' : 'Employee added successfully!');
}

// Confirm Delete
window.confirmDelete = function(employeeId) {
    const employee = employees.find(e => e.id === employeeId);
    if (!employee) return;
    
    const deleteInfo = document.getElementById('employeeDeleteInfo');
    const avatarContent = employee.photo 
        ? `<img src="${employee.photo}" alt="${employee.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">` 
        : employee.name.charAt(0).toUpperCase();
    
    deleteInfo.innerHTML = `
        <div class="delete-employee-avatar">${avatarContent}</div>
        <div class="delete-employee-details">
            <h4>${employee.name}</h4>
            <p>ID: ${employee.id}</p>
        </div>
    `;
    
    // Store employee ID for deletion
    document.getElementById('btnConfirmDelete').onclick = () => deleteEmployee(employeeId);
    
    deleteModal.classList.add('active');
};

// Delete Employee
function deleteEmployee(employeeId) {
    employees = employees.filter(e => e.id !== employeeId);
    renderEmployees();
    updateStatistics();
    closeDeleteModalFunc();
    
    // Show success message
    alert('Employee deleted successfully!');
}

// Close Modals
function closeEmployeeModal() {
    employeeModal.classList.remove('active');
    employeeForm.reset();
    editingEmployeeId = null;
    currentPhotoData = null;
}

function closeDeleteModalFunc() {
    deleteModal.classList.remove('active');
}

window.closeViewModalFunc = function() {
    viewModal.classList.remove('active');
};

// Filter Employees
function filterEmployees() {
    const searchTerm = searchInput.value.toLowerCase();
    const statusValue = statusFilter.value;
    
    let filtered = employees;
    
    // Filter by search term
    if (searchTerm) {
        filtered = filtered.filter(e => 
            e.name.toLowerCase().includes(searchTerm) ||
            e.id.toLowerCase().includes(searchTerm) ||
            e.email.toLowerCase().includes(searchTerm)
        );
    }
    
    // Filter by status
    if (statusValue) {
        filtered = filtered.filter(e => e.status === statusValue);
    }
    
    renderEmployees(filtered);
}

// Update Statistics
function updateStatistics() {
    const total = employees.length;
    const active = employees.filter(e => e.status === 'active').length;
    const inactive = employees.filter(e => e.status === 'inactive').length;
    
    document.getElementById('totalEmployees').textContent = total;
    document.getElementById('employeesLeave').textContent = inactive;
    document.getElementById('newEmployees').textContent = total; // This could be filtered by date
    document.getElementById('activeEmployees').textContent = active;
}