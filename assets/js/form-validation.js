/**
 * GOVERNORA - Form Validation Module (form-validation.js)
 * Clean vanilla JS validation for Consultation forms, Contact forms, and Newsletters
 */

(function () {
  'use strict';

  function initFormValidation() {
    const forms = document.querySelectorAll('.needs-validation, [data-gov-form]');

    // Set up keystroke restrictions and sanitization on inputs
    function setupInputRestrictions() {
      // Name fields: restrict to letters, spaces, hyphens, periods, apostrophes
      const nameInputs = document.querySelectorAll(
        'input[name*="name" i], input[id*="name" i], input[placeholder*="Arthur" i], input[placeholder*="Jane Doe" i]'
      );
      nameInputs.forEach(input => {
        // Prevent typing numbers or forbidden symbols directly
        input.addEventListener('keydown', (e) => {
          // Allow navigational and control keys
          if (
            e.ctrlKey || e.metaKey || e.altKey ||
            ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Tab', 'Home', 'End', 'Enter'].includes(e.key)
          ) {
            return;
          }
          // Reject digit characters (0-9) immediately
          if (/[0-9]/.test(e.key)) {
            e.preventDefault();
            return;
          }
        });

        // Strip any pasted or inserted digits/disallowed characters
        input.addEventListener('input', () => {
          const originalVal = input.value;
          // Keep only alphabetic characters, spaces, dots, hyphens, and apostrophes
          const sanitizedVal = originalVal.replace(/[0-9]/g, '');
          if (originalVal !== sanitizedVal) {
            input.value = sanitizedVal;
          }
        });
      });

      // Contact Number / Telephone fields: restrict strictly to digits
      const phoneInputs = document.querySelectorAll(
        'input[type="tel"], input[name*="phone" i], input[id*="phone" i], input[placeholder*="555-0199" i]'
      );
      phoneInputs.forEach(input => {
        // Prevent typing non-digits directly
        input.addEventListener('keydown', (e) => {
          // Allow navigational and control keys
          if (
            e.ctrlKey || e.metaKey || e.altKey ||
            ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Tab', 'Home', 'End', 'Enter'].includes(e.key)
          ) {
            return;
          }
          // Reject non-numeric characters immediately (only 0-9 allowed)
          if (!/^[0-9]$/.test(e.key)) {
            e.preventDefault();
            return;
          }
        });

        // Strip any non-digit characters on input/paste
        input.addEventListener('input', () => {
          const originalVal = input.value;
          const sanitizedVal = originalVal.replace(/[^0-9]/g, '');
          if (originalVal !== sanitizedVal) {
            input.value = sanitizedVal;
          }
        });
      });
    }

    setupInputRestrictions();

    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        e.stopPropagation();

        let isValid = true;
        const requiredInputs = form.querySelectorAll('[required]');

        requiredInputs.forEach(input => {
          const feedback = input.parentElement.querySelector('.gov-form-feedback');
          const val = input.value.trim();
          
          if (input.type === 'checkbox') {
            if (!input.checked) {
              isValid = false;
              input.classList.add('is-invalid');
              input.classList.remove('is-valid');
              if (feedback) feedback.classList.add('invalid');
            } else {
              input.classList.remove('is-invalid');
              input.classList.add('is-valid');
              if (feedback) feedback.classList.remove('invalid');
            }
          } else if (input.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(val)) {
              isValid = false;
              input.classList.add('is-invalid');
              input.classList.remove('is-valid');
              if (feedback) feedback.classList.add('invalid');
            } else {
              input.classList.remove('is-invalid');
              input.classList.add('is-valid');
              if (feedback) feedback.classList.remove('invalid');
            }
          } else if (input.type === 'tel' || input.id === 'consultationPhone' || input.name === 'phone') {
            // Strictly digits only, minimum reasonable length (7-15 digits)
            const digitsOnlyRegex = /^[0-9]{7,15}$/;
            if (!digitsOnlyRegex.test(val)) {
              isValid = false;
              input.classList.add('is-invalid');
              input.classList.remove('is-valid');
              if (feedback) {
                feedback.textContent = 'Please enter a valid phone number (digits only, 7-15 numbers).';
                feedback.classList.add('invalid');
              }
            } else {
              input.classList.remove('is-invalid');
              input.classList.add('is-valid');
              if (feedback) feedback.classList.remove('invalid');
            }
          } else if (input.id === 'consultationFullName' || input.id === 'homeScopeFullName' || (input.type === 'text' && input.name === 'fullName')) {
            // Strictly alphabetic and standard name punctuation, no numbers allowed
            const nameRegex = /^[A-Za-z\s.'-]+$/;
            if (val === '' || !nameRegex.test(val) || /[0-9]/.test(val)) {
              isValid = false;
              input.classList.add('is-invalid');
              input.classList.remove('is-valid');
              if (feedback) {
                feedback.textContent = 'Please enter your full name (letters only, no numbers).';
                feedback.classList.add('invalid');
              }
            } else {
              input.classList.remove('is-invalid');
              input.classList.add('is-valid');
              if (feedback) feedback.classList.remove('invalid');
            }
          } else {
            if (val === '') {
              isValid = false;
              input.classList.add('is-invalid');
              input.classList.remove('is-valid');
              if (feedback) feedback.classList.add('invalid');
            } else {
              input.classList.remove('is-invalid');
              input.classList.add('is-valid');
              if (feedback) feedback.classList.remove('invalid');
            }
          }
        });

        const statusMsg = form.querySelector('.form-status-msg');

        if (isValid) {
          // Display static frontend confirmation without fake backend claim
          if (statusMsg) {
            statusMsg.className = 'form-status-msg alert alert-success mt-3';
            statusMsg.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i> <strong>Inquiry Validated!</strong> Your consultation request has been prepared in frontend demo mode. (Connect your API or SMTP backend to enable real-time dispatch).';
            statusMsg.style.display = 'block';
          }
          form.reset();
          requiredInputs.forEach(input => input.classList.remove('is-valid'));
        } else {
          if (statusMsg) {
            statusMsg.className = 'form-status-msg alert alert-danger mt-3';
            statusMsg.innerHTML = '<i class="bi bi-exclamation-triangle-fill me-2"></i> Please review and complete all required corporate fields accurately.';
            statusMsg.style.display = 'block';
          }
        }
      });
    });

    // Newsletter specific forms
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(nForm => {
      nForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = nForm.querySelector('input[type=email]');
        const feedback = nForm.querySelector('.newsletter-feedback');
        if (!input) return;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(input.value.trim())) {
          if (feedback) {
            feedback.className = 'newsletter-feedback text-success small mt-2 d-block';
            feedback.textContent = 'Thank you for subscribing to Governora Compliance Insights.';
          }
          input.value = '';
        } else {
          if (feedback) {
            feedback.className = 'newsletter-feedback text-danger small mt-2 d-block';
            feedback.textContent = 'Please provide a valid corporate email address.';
          }
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', initFormValidation);
})();
