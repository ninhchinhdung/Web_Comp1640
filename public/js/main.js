// Main JavaScript file for client-side interactions

document.addEventListener('DOMContentLoaded', () => {
    console.log('Express MVC Project loaded successfully!');

    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add animation to feature cards on scroll
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

    document.querySelectorAll('.feature-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Form validation
    const forms = document.querySelectorAll('.user-form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            const name = form.querySelector('#name');
            const email = form.querySelector('#email');

            if (name && name.value.trim() === '') {
                e.preventDefault();
                alert('Vui lòng nhập tên!');
                name.focus();
                return;
            }

            if (email && email.value.trim() === '') {
                e.preventDefault();
                alert('Vui lòng nhập email!');
                email.focus();
                return;
            }

            if (email && !isValidEmail(email.value)) {
                e.preventDefault();
                alert('Email không hợp lệ!');
                email.focus();
                return;
            }
        });
    });

    // Email validation helper
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Add active class to current nav link
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPath ||
            (currentPath.startsWith('/users') && link.getAttribute('href') === '/users')) {
            link.style.color = '#667eea';
        }
    });
});
