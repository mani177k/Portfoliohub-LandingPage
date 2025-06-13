const monthlyBtn = document.getElementById('monthly');
        const yearlyBtn = document.getElementById('yearly');
        const monthlyPrices = document.querySelectorAll('.price-monthly');
        const yearlyPrices = document.querySelectorAll('.price-yearly');

        function togglePricing(isYearly) {
            monthlyBtn.classList.toggle('active', !isYearly);
            yearlyBtn.classList.toggle('active', isYearly);
            
            monthlyPrices.forEach(price => {
                price.style.display = isYearly ? 'none' : 'block';
            });
            
            yearlyPrices.forEach(price => {
                price.style.display = isYearly ? 'block' : 'none';
            });
        }

        monthlyBtn.addEventListener('click', () => togglePricing(false));
        yearlyBtn.addEventListener('click', () => togglePricing(true));

        // Add scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.pricing-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';
            observer.observe(card);
        });

        // Add click effects to buttons
        document.querySelectorAll('.cta-button').forEach(button => {
            button.addEventListener('click', function(e) {
                // Create ripple effect
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255,255,255,0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });

        // Add CSS for ripple animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);