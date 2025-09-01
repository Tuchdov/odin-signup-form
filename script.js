      // Theme toggle functionality
        function toggleTheme() {
            const html = document.documentElement;
            const themeIcon = document.getElementById('theme-icon');
            const currentTheme = html.getAttribute('data-theme');
            
            if (currentTheme === 'dark') {
                html.removeAttribute('data-theme');
                themeIcon.textContent = '🌙';
                localStorage.setItem('theme', 'light');
            } else {
                html.setAttribute('data-theme', 'dark');
                themeIcon.textContent = '☀️';
                localStorage.setItem('theme', 'dark'); //can we change this to sessionStorage?

            }
        }

             // Initialize theme from localStorage or system preference
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const themeIcon = document.getElementById('theme-icon');

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.textContent = '☀️';
    } else {
        themeIcon.textContent = '🌙';
    }
    }

// Form validation
const form = document.getElementById('signupForm');
const inputs = form.querySelectorAll('input');

// Validation rules
const validationRules = {
first_name: {
    required: true,
    minLength: 1,
    pattern: /^[a-zA-Z\s'-]+$/,
    message: 'First name is required and should contain only letters, spaces, apostrophes, and hyphens'
},
last_name: {
    required: true,
    minLength: 1,
    pattern: /^[a-zA-Z\s'-]+$/,
    message: 'Last name is required and should contain only letters, spaces, apostrophes, and hyphens'
},
email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address'
},
phone_number: {
    required: false,
    pattern: /^[\+]?[1-9][\d]{0,15}$/,
    message: 'Please enter a valid phone number'
},
password: {
    required: true,
    minLength: 8,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
    message: 'Password must be at least 8 characters with uppercase, lowercase, and number'
},
confirm_password: {
    required: true,
    minLength: 8,
    custom: (value) => value === document.getElementById('password').value,
    message: 'Passwords do not match'
}
};

  function validateField(input) {
            const rules = validationRules[input.name];
            const value = input.value.trim();
            const errorElement = document.getElementById(`${input.name}-error`);
            const errorSpan = errorElement.querySelector('span');

            let isValid = true;
            let errorMessage ='';
            if (rules) {
                if (rules.required && !value) {
                    // Check required and no value
                    isValid = false;
                    errorMessage = `${input.labels[0].textContent.replace(' *',  '') } is required` ;
                }
                    // Check minimum length
                else if (rules.minLength && value.length < rules.minLength) {
                    isValid = false;
                    errorMessage = `Must be at least ${rules.minLength} charecters long`; }
                    // Check pattern
                else if (value && rules.pattern && !rules.pattern.test(value) ){
                    errorMessage = rules.message;
                }
                    // Check custom validation
                else if (value && rules.custom && !rules.custom(value)) {
                    isValid = false;
                    errorMessage = rules.message;
                }
        }
                    // Update UI
            if (isValid && value) {
                input.classList.remove('invalid');
                input.classList.add('valid');
                errorElement.classList.remove('show');
                input.setAttribute('aria-invalid', 'false');
            } else if (!isValid) {
                input.classList.remove('valid');
                input.classList.add('invalid');
                errorSpan.textContent = errorMessage;
                errorElement.classList.add('show');
                input.setAttribute('aria-invalid', 'true');
            } else {
                input.classList.remove('valid', 'invalid');
                errorElement.classList.remove('show');
                input.removeAttribute('aria-invalid');
            }

            return isValid;
        }

        // Add event listeners for real time validation
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input)); // every time the user get's out of focus fir the element
            input.addEventListener('input', ()=> { // everytime the user changes the input check that its valid
                // clear error state on input
                if (input.classList.contains('invalid')) {
                    validateField(input);
                }
                // special handling for password confirmation
                if (input.name === 'password'){
                    const confirmInput = document.getElementById('confirm_password')
                    if (confirmInput.value){
                        validateField(confirmInput);
                    }
                }
            });
        });

        // Form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            let isFormValid = true;
            inputs.forEach(input => {
                const isFieldValid = validateField(Input);
                if (!isFieldValid) {
                    isFormValid = false;
                }
            });

            if (isFormValid){
                // simulate form submission
                const button = form.querySelector('button[type="submit"]');
                button.disabled = true;
                button.textContent = 'Creating Account...';

                setTimeout(() =>{
                    alert('Account created successfully! (This is a demo)')
                    button.disabled = false
                    button.textContent = 'Create Account';
                    form.reset();
                    inputs.forEach(input => {
                        input.classList.remove('show');
                    });
                }, 2000); 
            } else {
                // Focus firtst invalid field
                const firstInvalid = form.querySelector('.invalid');
                if (firstInvalid) {
                    firstInvalid.focus();
                }
            }
        });


        // Initialize theme on page load
document.addEventListener('DOMContentLoaded', initializeTheme);
// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // Note: Removed localStorage check for Claude.ai compatibility
    const themeIcon = document.getElementById('theme-icon');
    if (e.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.textContent = '☀️';
    } else {
        document.documentElement.removeAttribute('data-theme');
        themeIcon.textContent = '🌙';
    }
});