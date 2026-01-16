// keranjang.js - JavaScript untuk halaman keranjang

document.addEventListener('DOMContentLoaded', function() {
    // Select All functionality
    const selectAll = document.getElementById('selectAll');
    const itemCheckboxes = document.querySelectorAll('.item-checkbox');
    
    if (selectAll) {
        selectAll.addEventListener('change', function() {
            itemCheckboxes.forEach(checkbox => {
                checkbox.checked = selectAll.checked;
            });
            updateSummary();
        });
    }

    // Individual checkbox change
    itemCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const allChecked = Array.from(itemCheckboxes).every(cb => cb.checked);
            selectAll.checked = allChecked;
            updateSummary();
        });
    });

    // Quantity controls
    const minusButtons = document.querySelectorAll('.qty-btn.minus');
    const plusButtons = document.querySelectorAll('.qty-btn.plus');
    const qtyInputs = document.querySelectorAll('.qty-input');

    minusButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.nextElementSibling;
            let value = parseInt(input.value);
            if (value > 1) {
                input.value = value - 1;
                updateSummary();
            }
        });
    });

    plusButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.previousElementSibling;
            let value = parseInt(input.value);
            input.value = value + 1;
            updateSummary();
        });
    });

    qtyInputs.forEach(input => {
        input.addEventListener('change', function() {
            if (parseInt(this.value) < 1) {
                this.value = 1;
            }
            updateSummary();
        });
    });

    // Delete button
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            if (confirm('Apakah Anda yakin ingin menghapus item ini dari keranjang?')) {
                const cartItem = this.closest('.cart-item');
                cartItem.style.transition = 'opacity 0.3s, transform 0.3s';
                cartItem.style.opacity = '0';
                cartItem.style.transform = 'translateX(-20px)';
                
                setTimeout(() => {
                    cartItem.remove();
                    updateItemCount();
                    updateSummary();
                }, 300);
            }
        });
    });

    // Clear cart
    const clearCart = document.querySelector('.clear-cart');
    if (clearCart) {
        clearCart.addEventListener('click', function(e) {
            e.preventDefault();
            const checkedItems = document.querySelectorAll('.item-checkbox:checked');
            
            if (checkedItems.length === 0) {
                alert('Silakan pilih item yang ingin dihapus');
                return;
            }
            
            if (confirm(`Hapus ${checkedItems.length} item terpilih?`)) {
                checkedItems.forEach(checkbox => {
                    const cartItem = checkbox.closest('.cart-item');
                    cartItem.style.transition = 'opacity 0.3s, transform 0.3s';
                    cartItem.style.opacity = '0';
                    cartItem.style.transform = 'translateX(-20px)';
                    
                    setTimeout(() => {
                        cartItem.remove();
                        updateItemCount();
                        updateSummary();
                    }, 300);
                });
            }
        });
    }

    // Voucher button
    const voucherBtn = document.querySelector('.voucher-btn');
    if (voucherBtn) {
        voucherBtn.addEventListener('click', function() {
            const voucherInput = document.querySelector('.voucher-input');
            const code = voucherInput.value.trim().toUpperCase();
            
            if (code === '') {
                alert('Silakan masukkan kode voucher');
                return;
            }
            
            // Simulasi validasi voucher
            if (code === 'DISKON10') {
                alert('Voucher berhasil diterapkan! Diskon 10%');
                voucherInput.value = '';
                updateSummary(0.1); // 10% discount
            } else {
                alert('Kode voucher tidak valid');
            }
        });
    }

    // Checkout button
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            const checkedItems = document.querySelectorAll('.item-checkbox:checked');
            
            if (checkedItems.length === 0) {
                alert('Silakan pilih item yang ingin di-checkout');
                return;
            }
            
            // Redirect to checkout page or show checkout modal
            alert(`Checkout ${checkedItems.length} item - Total: ${document.querySelector('.total-amount').textContent}`);
            window.location.href = 'checkout.html';
        });
    }

    // Suggestion add buttons
    const suggestionBtns = document.querySelectorAll('.suggestion-add-btn');
    suggestionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const item = this.closest('.suggestion-item');
            const itemName = item.querySelector('h4').textContent;
            
            // Animation feedback
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
            
            alert(`${itemName} ditambahkan ke keranjang!`);
        });
    });

    // Navigation arrows for suggestions
    const prevBtn = document.querySelector('.nav-arrow.prev');
    const nextBtn = document.querySelector('.nav-arrow.next');
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function() {
            const container = document.querySelector('.suggestions-list');
            container.scrollBy({ left: -300, behavior: 'smooth' });
        });
        
        nextBtn.addEventListener('click', function() {
            const container = document.querySelector('.suggestions-list');
            container.scrollBy({ left: 300, behavior: 'smooth' });
        });
    }

    // Helper Functions
    function updateItemCount() {
        const items = document.querySelectorAll('.cart-item');
        const itemCount = document.querySelector('.item-count');
        if (itemCount) {
            itemCount.textContent = `(${items.length} Item${items.length !== 1 ? '' : ''})`;
        }
    }

    function updateSummary(discount = 0) {
        const cartItems = document.querySelectorAll('.cart-item');
        let subtotal = 0;
        let checkedCount = 0;

        cartItems.forEach(item => {
            const checkbox = item.querySelector('.item-checkbox');
            if (checkbox && checkbox.checked) {
                const priceText = item.querySelector('.item-price').textContent;
                const price = parseInt(priceText.replace(/[^0-9]/g, ''));
                const qty = parseInt(item.querySelector('.qty-input').value);
                subtotal += price * qty;
                checkedCount++;
            }
        });

        const ppn = subtotal * 0.1;
        const discountAmount = subtotal * discount;
        const total = subtotal + ppn - discountAmount;

        // Update UI
        const subtotalEl = document.querySelector('.summary-details .summary-row:first-child span:last-child');
        const ppnEl = document.querySelector('.summary-details .summary-row:last-child span:last-child');
        const totalEl = document.querySelector('.total-amount');
        const subtotalLabel = document.querySelector('.summary-details .summary-row:first-child span:first-child');

        if (subtotalEl) subtotalEl.textContent = `Rp ${subtotal.toLocaleString('id-ID')}`;
        if (ppnEl) ppnEl.textContent = `Rp ${Math.round(ppn).toLocaleString('id-ID')}`;
        if (totalEl) totalEl.textContent = `Rp ${Math.round(total).toLocaleString('id-ID')}`;
        if (subtotalLabel) subtotalLabel.textContent = `Subtotal (${checkedCount} Produk)`;
    }

    // Initial update
    updateSummary();
});