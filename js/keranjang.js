// keranjang.js - JavaScript untuk halaman keranjang

document.addEventListener('DOMContentLoaded', function() {
    // Select All functionality
    const selectAll = document.getElementById('selectAll');
    const itemCheckboxes = document.querySelectorAll('.item-checkbox');

    if (selectAll) {
        selectAll.addEventListener('change', function() {
            itemCheckboxes.forEach(checkbox => checkbox.checked = selectAll.checked);
            updateSummary();
        });
    }

    itemCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const allChecked = Array.from(itemCheckboxes).every(cb => cb.checked);
            if (selectAll) selectAll.checked = allChecked;
            updateSummary();
        });
    });

    // Quantity controls
    document.querySelectorAll('.qty-btn.minus').forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.nextElementSibling;
            let value = parseInt(input.value) || 1;
            if (value > 1) input.value = value - 1;
            updateSummary();
        });
    });

    document.querySelectorAll('.qty-btn.plus').forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.previousElementSibling;
            let value = parseInt(input.value) || 1;
            input.value = value + 1;
            updateSummary();
        });
    });

    document.querySelectorAll('.qty-input').forEach(input => {
        input.addEventListener('change', function() {
            if (parseInt(this.value) < 1 || isNaN(parseInt(this.value))) this.value = 1;
            updateSummary();
        });
    });

    // Delete single item
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const cartItem = this.closest('.cart-item');
            const itemName = cartItem.querySelector('.item-name')?.textContent || 'item ini';

            if (confirm(`Hapus ${itemName} dari keranjang?`)) {
                cartItem.style.transition = 'opacity 0.3s, transform 0.3s';
                cartItem.style.opacity = '0';
                cartItem.style.transform = 'translateX(-20px)';

                setTimeout(() => {
                    cartItem.remove();
                    updateItemCount();
                    updateSummary();
                    ReservationNotification.showSuccess({
                        message: `${itemName} berhasil dihapus dari keranjang`,
                        duration: 3000
                    });
                }, 300);
            }
        });
    });

    // Clear selected items
    const clearCart = document.querySelector('.clear-cart');
    if (clearCart) {
        clearCart.addEventListener('click', function(e) {
            e.preventDefault();
            const checked = document.querySelectorAll('.item-checkbox:checked');

            if (checked.length === 0) {
                ReservationNotification.showError({
                    message: 'Silakan pilih item yang ingin dihapus',
                    duration: 4000
                });
                return;
            }

            if (confirm(`Hapus ${checked.length} item terpilih?`)) {
                checked.forEach(cb => {
                    const item = cb.closest('.cart-item');
                    item.style.transition = 'opacity 0.3s, transform 0.3s';
                    item.style.opacity = '0';
                    item.style.transform = 'translateX(-20px)';

                    setTimeout(() => item.remove(), 300);
                });

                setTimeout(() => {
                    updateItemCount();
                    updateSummary();
                    ReservationNotification.showSuccess({
                        message: `${checked.length} item berhasil dihapus`,
                        duration: 3500
                    });
                }, 400);
            }
        });
    }

    // Voucher
    const voucherBtn = document.querySelector('.voucher-btn');
    if (voucherBtn) {
        voucherBtn.addEventListener('click', function() {
            const input = document.querySelector('.voucher-input');
            const code = input?.value.trim().toUpperCase() || '';

            if (!code) {
                ReservationNotification.showError({ message: 'Masukkan kode voucher', duration: 4000 });
                return;
            }

            if (code === 'DISKON10') {
                ReservationNotification.showSuccess({ message: 'Voucher DISKON10 diterapkan! Diskon 10%', duration: 5000 });
                input.value = '';
                updateSummary(0.1);
            } else {
                ReservationNotification.showError({ message: 'Kode voucher tidak valid', duration: 5000 });
            }
        });
    }

    // Checkout
   // Checkout button
const checkoutBtn = document.querySelector('.checkout-btn');
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function() {
        const checkedItems = document.querySelectorAll('.item-checkbox:checked');
        
        if (checkedItems.length === 0) {
            ReservationNotification.showError({
                message: 'Silakan pilih minimal satu item untuk checkout',
                duration: 4000
            });
            return;
        }
        
        const totalText = document.querySelector('.total-amount')?.textContent || 'Rp 0';
        
        ReservationNotification.showSuccess({
            message: `Checkout berhasil diproses untuk ${checkedItems.length} item<br>Total: ${totalText}`,
            duration: 6000,
            style: 'payment'
        });

        // Redirect ke halaman checkout (path relatif dari keranjang.html)
        setTimeout(() => {
            window.location.href = 'checkout.html';   // ← PERBAIKAN UTAMA DI SINI
        }, 1800);  // tunggu notifikasi selesai ~1.8 detik
    });
}

    // Suggestion add
    document.querySelectorAll('.suggestion-add-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const item = this.closest('.suggestion-item');
            const name = item.querySelector('h4')?.textContent || 'Item';

            this.style.transform = 'scale(1.2)';
            setTimeout(() => this.style.transform = 'scale(1)', 200);

            ReservationNotification.showSuccess({
                message: `${name} berhasil ditambahkan ke keranjang!`,
                duration: 3500
            });
        });
    });

    // Suggestion navigation
    const prev = document.querySelector('.nav-arrow.prev');
    const next = document.querySelector('.nav-arrow.next');
    if (prev && next) {
        prev.addEventListener('click', () => document.querySelector('.suggestions-list')?.scrollBy({ left: -300, behavior: 'smooth' }));
        next.addEventListener('click', () => document.querySelector('.suggestions-list')?.scrollBy({ left: 300, behavior: 'smooth' }));
    }

    // Helpers
    function updateItemCount() {
        const count = document.querySelectorAll('.cart-item').length;
        const el = document.querySelector('.item-count');
        if (el) el.textContent = `(${count} Item${count !== 1 ? '' : ''})`;
    }

    function updateSummary(discountRate = 0) {
        let subtotal = 0;
        let checkedCount = 0;

        document.querySelectorAll('.cart-item').forEach(item => {
            const cb = item.querySelector('.item-checkbox');
            if (cb?.checked) {
                const priceStr = item.querySelector('.item-price')?.textContent || '0';
                const price = parseInt(priceStr.replace(/[^0-9]/g, '')) || 0;
                const qty = parseInt(item.querySelector('.qty-input')?.value || '1');
                subtotal += price * qty;
                checkedCount++;
            }
        });

        const ppn = subtotal * 0.1;
        const discount = subtotal * discountRate;
        const total = subtotal + ppn - discount;

        const subtotalEl = document.querySelector('.summary-details .summary-row:first-child span:last-child');
        const ppnEl     = document.querySelector('.summary-details .summary-row:last-child span:last-child');
        const totalEl   = document.querySelector('.total-amount');
        const labelEl   = document.querySelector('.summary-details .summary-row:first-child span:first-child');

        if (subtotalEl) subtotalEl.textContent = `Rp ${subtotal.toLocaleString('id-ID')}`;
        if (ppnEl) ppnEl.textContent = `Rp ${Math.round(ppn).toLocaleString('id-ID')}`;
        if (totalEl) totalEl.textContent = `Rp ${Math.round(total).toLocaleString('id-ID')}`;
        if (labelEl) labelEl.textContent = `Subtotal (${checkedCount} Produk)`;
    }

    // Init
    updateSummary();
    updateItemCount();
});