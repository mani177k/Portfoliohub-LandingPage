 const upiOptions = document.querySelectorAll('.upi-option');
        let selectedApp = '';

        upiOptions.forEach(option => {
            option.addEventListener('click', () => {
                upiOptions.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                selectedApp = option.dataset.app;
            });
        });

        // Amount calculation
        const amountInput = document.getElementById('amount');
        const summaryAmount = document.getElementById('summaryAmount');
        const summaryTotal = document.getElementById('summaryTotal');

        amountInput.addEventListener('input', () => {
            const amount = parseFloat(amountInput.value) || 0;
            summaryAmount.textContent = `₹${amount.toFixed(2)}`;
            summaryTotal.textContent = `₹${amount.toFixed(2)}`;
        });

        // Form submission
        document.getElementById('paymentForm').addEventListener('submit', (e) => {
            e.preventDefault();
            
            const amount = amountInput.value;
            const description = document.getElementById('description').value;
            const upiId = document.getElementById('upiId').value;
            
            if (!selectedApp) {
                alert('Please select a UPI app');
                return;
            }
            
            if (!amount || amount <= 0) {
                alert('Please enter a valid amount');
                return;
            }
            
            // Simulate payment processing
            const payButton = document.querySelector('.pay-button');
            payButton.textContent = '🔄 Processing...';
            payButton.disabled = true;
            
            setTimeout(() => {
                alert(`Payment of ₹${amount} initiated via ${selectedApp.toUpperCase()}!\n\nDescription: ${description}\nThis is a demo - no actual payment was processed.`);
                payButton.textContent = '🔐 Pay Securely';
                payButton.disabled = false;
            }, 2000);
        });

        // Add some interactive animations
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.style.transform = 'scale(1.02)';
            });
            
            input.addEventListener('blur', () => {
                input.parentElement.style.transform = 'scale(1)';
            });
        });