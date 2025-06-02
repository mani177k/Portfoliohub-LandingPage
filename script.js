 document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        // Animate rating bars on load
        window.addEventListener('load', () => {
            document.querySelectorAll('.rating-fill').forEach(fill => {
                const width = fill.style.width;
                fill.style.width = '0%';
                setTimeout(() => {
                    fill.style.width = width;
                }, 500);
            });
        });

        // Add like functionality
        document.querySelectorAll('.review-action').forEach(action => {
            if (action.textContent.includes('👍')) {
                action.addEventListener('click', () => {
                    const count = parseInt(action.textContent.match(/\d+/)[0]);
                    action.innerHTML = `👍 ${count + 1}`;
                    action.style.color = '#6366f1';
                });
            }
        });