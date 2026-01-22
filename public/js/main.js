// Main JavaScript file for Express MVC Application

// DOM Ready
document.addEventListener('DOMContentLoaded', function () {
    console.log('Express MVC Application loaded');

    // Initialize features
    initDeleteConfirmations();
    initFormValidation();
});

// Delete confirmations
function initDeleteConfirmations() {
    const deleteForms = document.querySelectorAll('form[action*="/delete"]');

    deleteForms.forEach(form => {
        form.addEventListener('submit', function (e) {
            const confirmed = confirm('Are you sure you want to delete this item? This action cannot be undone.');
            if (!confirmed) {
                e.preventDefault();
            }
        });
    });
}

// Form validation
function initFormValidation() {
    const forms = document.querySelectorAll('form.form');

    forms.forEach(form => {
        form.addEventListener('submit', function (e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#dc3545';
                } else {
                    field.style.borderColor = '#e0e0e0';
                }
            });

            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields');
            }
        });

        // Reset border color on input
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('input', function () {
                this.style.borderColor = '#e0e0e0';
            });
        });
    });
}

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Utility function to format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
}
