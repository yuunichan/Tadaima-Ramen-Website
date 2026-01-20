# 📌 Testing Dropdown Menu User Profile

## Cara Test Dropdown Menu:

### 1. **Test di Beranda**
- Buka file: `beranda.html` di browser
- Lihat navbar di bagian atas
- **Klik ikon user** (👤) di sebelah kanan navbar
- Dropdown menu seharusnya muncul dengan opsi:
  - 👤 Profil Saya
  - 🚪 Logout

### 2. **Test di Menu**
- Buka file: `customer/menu.html` di browser
- **Klik ikon user** (👤) di sebelah kanan navbar
- Dropdown menu seharusnya muncul

### 3. **Test Klik Profil Saya**
- Dropdown menu terbuka
- **Klik "Profil Saya"**
- Seharusnya menuju ke halaman `customer/user_profile.html`

### 4. **Test Logout Modal**
- Dropdown menu terbuka
- **Klik "Logout"**
- Popup logout seharusnya muncul dengan pesan konfirmasi
- Klik "Batal" untuk menutup
- Klik "Ya, Logout" untuk logout (redirect ke login_page.html)

### 5. **Test Tutup Dropdown**
- Dropdown menu terbuka
- **Klik di area lain halaman**
- Dropdown seharusnya tertutup otomatis

---

## File yang Berubah:

✅ **css/styles.css**
- Tambah `.nav-menu li { position: relative; }`
- Update `.user-dropdown` dengan z-index lebih tinggi
- Update `.dropdown-item` styling

✅ **js/logout.js**
- Update `toggleUserDropdown()` dengan console logging

✅ **beranda.html**
- Tambah dropdown menu di navbar
- Tambah logout modal

✅ **customer/menu.html**
- Tambah dropdown menu di navbar
- Logout modal sudah ada dari sebelumnya

✅ **customer/user_profile.html**
- Tambah dropdown menu di navbar
- Logout modal sudah ada

---

## Jika Dropdown Tidak Muncul:

### 1. **Buka Developer Console** (F12)
   - Lihat apakah ada error di console
   - Cek apakah `toggleUserDropdown` function dipanggil

### 2. **Cek di Elements (Inspect)**
   - Klik kanan user icon → Inspect
   - Lihat apakah `user-dropdown` div ada di HTML
   - Lihat apakah class `active` ditambahkan saat diklik

### 3. **Pastikan CSS Dimuat**
   - Buka Network tab (F12)
   - Scroll cari file `styles.css`
   - Pastikan status 200 (berhasil dimuat)

---

## Test File Terpisah:

Untuk debugging lebih mudah, ada file test terpisah:
- **test_dropdown.html** - Halaman test standalone untuk dropdown menu

Buka dengan browser dan ikuti instruksi di halaman test.

---

## CSS yang Diperlukan:

Semua CSS sudah ada di `css/styles.css`:

```css
.nav-menu li {
    position: relative;
}

.user-dropdown {
    display: none;
    position: absolute;
    top: 100%;
    right: 0;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    min-width: 200px;
    z-index: 2000;
    margin-top: 0.5rem;
    overflow: visible;
}

.user-dropdown.active {
    display: block;
    animation: dropdownSlideDown 0.3s ease-out;
}

.dropdown-item {
    display: block;
    width: 100%;
    padding: 0.8rem 1.5rem;
    text-decoration: none;
    color: var(--text);
    border: none;
    background: none;
    cursor: pointer;
    text-align: left;
    font-size: 0.95rem;
    transition: all 0.2s;
    font-family: inherit;
}

.dropdown-item:hover {
    background: #f5f5f5;
    color: var(--primary);
    padding-left: 2rem;
}
```

---

## JavaScript yang Diperlukan:

Di `js/logout.js` sudah ada:

```javascript
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
    
    if (dropdown && userBtn && !userBtn.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove('active');
    }
});
```

---

✅ **Semuanya sudah disetup dengan benar!**
