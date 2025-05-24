document.addEventListener('DOMContentLoaded', function() {
    // Global event handlers and utilities
    initializeNavigation();
    setupFormValidation();
    setupMobileMenu();
});

/**
 * Initializes navigation functionality
 */
function initializeNavigation() {
    // Add active class to current nav item
    const currentPath = window.location.pathname;
    document.querySelectorAll('nav a').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.parentElement.classList.add('active');
        }
    });
}

/**
 * Sets up form validation for all forms
 */
function setupFormValidation() {
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!form.checkValidity()) {
                e.preventDefault();
                highlightInvalidFields(form);
            }
        });
    });
}

/**
 * Highlights invalid form fields
 * @param {HTMLFormElement} form - The form to check
 */
function highlightInvalidFields(form) {
    form.querySelectorAll('input, select, textarea').forEach(field => {
        if (!field.validity.valid) {
            field.classList.add('invalid');
            // Add error message if it doesn't exist
            if (!field.nextElementSibling?.classList.contains('error-message')) {
                const errorMsg = document.createElement('div');
                errorMsg.className = 'error-message';
                errorMsg.textContent = field.validationMessage || 'This field is required';
                field.parentNode.insertBefore(errorMsg, field.nextSibling);
            }
        } else {
            field.classList.remove('invalid');
            // Remove any existing error message
            if (field.nextElementSibling?.classList.contains('error-message')) {
                field.nextElementSibling.remove();
            }
        }
    });
}

/**
 * Sets up mobile menu functionality
 */
function setupMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            const nav = document.querySelector('nav ul');
            nav.classList.toggle('show');
        });
    }
}

/**
 * Formats currency values according to locale and currency
 * @param {number} value - The value to format
 * @param {string} currency - Currency code (USD, EUR, etc)
 * @returns {string} Formatted currency string
 */
function formatCurrency(value, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    }).format(value);
}

/**
 * Handles PDF export functionality
 * @param {Object} data - The data to include in PDF
 */
function exportToPDF(data) {
    // This would normally use a library like jsPDF
    console.log('Exporting to PDF:', data);
    alert('This feature will be implemented soon!');
}

/**
 * Handles CSV export functionality
 * @param {Object} data - The data to include in CSV
 */
function exportToCSV(data) {
    // Create CSV content
    const csvContent = [
        ['Meeting Cost Summary'],
        ['Title', data.title],
        ['Duration (minutes)', data.duration],
        ['Participants', data.participants],
        ['Total Cost', `${data.currency}${data.cost}`]
    ].map(row => row.join(',')).join('\n');
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `meeting_cost_${Date.now()}.csv`);
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}