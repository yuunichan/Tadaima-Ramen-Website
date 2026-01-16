// pemesanan.js - JavaScript untuk halaman pemesanan/checkout

document.addEventListener('DOMContentLoaded', function () {

    // Payment method selection
    const paymentOptions = document.querySelectorAll('input[name="payment"]');
    paymentOptions.forEach(option => {
        option.addEventListener('change', function () {
            console.log('Metode pembayaran dipilih:', this.value);
            // You can add visual feedback or additional logic here
        });
    });

    // Delete item buttons
    const deleteButtons = document.querySelectorAll('.delete-item-btn');
    deleteButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const orderItem = this.closest('.order-item');
            const itemName = orderItem.querySelector('.item-name').textContent;

            if (confirm(`Apakah Anda yakin ingin menghapus "${itemName}" dari pesanan?`)) {
                // Add removing animation class
                orderItem.classList.add('removing');

                // Remove item after animation
                setTimeout(() => {
                    orderItem.remove();
                    updateOrderSummary();
                    updateItemCount();

                    // Check if cart is empty
                    const remainingItems = document.querySelectorAll('.order-item');
                    if (remainingItems.length === 0) {
                        showEmptyCartMessage();
                    }
                }, 300);
            }
        });
    });

    // Continue payment button
    const continueBtn = document.querySelector('.continue-payment-btn');
    if (continueBtn) {
        continueBtn.addEventListener('click', function () {
            const selectedPayment = document.querySelector('input[name="payment"]:checked');

            if (!selectedPayment) {
                alert('Silakan pilih metode pembayaran terlebih dahulu');
                return;
            }

            const orderItems = document.querySelectorAll('.order-item');
            if (orderItems.length === 0) {
                alert('Keranjang Anda kosong');
                return;
            }

            const paymentMethod = selectedPayment.value.toUpperCase();
            const totalAmount = document.querySelector('.total-amount').textContent;

            // Show confirmation
            const confirmMsg = `Lanjutkan pembayaran dengan ${paymentMethod}?\n\nTotal: ${totalAmount}`;
            if (confirm(confirmMsg)) {
                // Simulate payment processing
                processPayment(paymentMethod, totalAmount);
                window.location.href = 'payment.html';

            }
        });
    }

    // Helper Functions
    function updateItemCount() {
        const items = document.querySelectorAll('.order-item');
        const itemCount = document.querySelector('.item-count');
        if (itemCount) {
            const count = items.length;
            itemCount.textContent = `(${count} Item${count !== 1 ? '' : ''})`;
        }
    }

    function updateOrderSummary() {
        const orderItems = document.querySelectorAll('.order-item');
        let subtotal = 0;

        orderItems.forEach(item => {
            const priceText = item.querySelector('.item-total-price').textContent;
            const price = parseInt(priceText.replace(/[^0-9]/g, ''));
            subtotal += price;
        });

        // Fixed costs
        const ongkir = 15000;
        const biayaLayanan = 2000;
        const total = subtotal + ongkir + biayaLayanan;

        // Update UI
        const subtotalEl = document.querySelector('.summary-details .summary-row:nth-child(1) .summary-value');
        const totalEl = document.querySelector('.total-amount');

        if (subtotalEl) {
            subtotalEl.textContent = `Rp ${subtotal.toLocaleString('id-ID')}`;
        }

        if (totalEl) {
            totalEl.textContent = `Rp ${total.toLocaleString('id-ID')}`;
        }
    }

    function showEmptyCartMessage() {
        const checkoutLeft = document.querySelector('.checkout-left');
        if (checkoutLeft) {
            checkoutLeft.innerHTML = `
                <div style="text-align: center; padding: 3rem;">
                    <h2 style="font-size: 1.5rem; color: #666; margin-bottom: 1rem;">
                        Keranjang Anda Kosong
                    </h2>
                    <p style="color: #999; margin-bottom: 2rem;">
                        Silakan tambahkan item ke keranjang terlebih dahulu
                    </p>
                    <a href="menu.html" style="display: inline-block; padding: 0.8rem 2rem; background: var(--primary); color: white; text-decoration: none; border-radius: 10px; font-weight: 600;">
                        Lihat Menu
                    </a>
                </div>
            `;
        }

        // Disable payment button
        const continueBtn = document.querySelector('.continue-payment-btn');
        if (continueBtn) {
            continueBtn.disabled = true;
            continueBtn.style.opacity = '0.5';
            continueBtn.style.cursor = 'not-allowed';
        }
    }

    function processPayment(method, amount) {
        // Show loading state
        const continueBtn = document.querySelector('.continue-payment-btn');
        const originalText = continueBtn.textContent;
        continueBtn.textContent = 'Memproses...';
        continueBtn.disabled = true;

        // Simulate payment processing delay
        setTimeout(() => {
            continueBtn.textContent = originalText;
            continueBtn.disabled = false;

            // Show success message
            alert(`Pembayaran berhasil diproses!\n\nMetode: ${method}\nTotal: ${amount}\n\nTerima kasih atas pesanan Anda!`);

            // Redirect to success page or home
            // window.location.href = 'payment-success.html';
        }, 2000);
    }

    // Payment option hover effect
    const paymentLabels = document.querySelectorAll('.payment-option label');
    paymentLabels.forEach(label => {
        label.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-2px)';
        });

        label.addEventListener('mouseleave', function () {
            const radio = this.previousElementSibling;
            if (!radio.checked) {
                this.style.transform = 'translateY(0)';
            }
        });
    });

    // Format currency on load
    function formatCurrency(number) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(number);
    }

    // Initialize
    updateItemCount();

    console.log('Pemesanan page loaded successfully');
});