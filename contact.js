document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');

    function displayError(errorElement, message) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    function hideError(errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }

    function displayFormStatus(message, isError = true) {
        formStatus.textContent = message;
        formStatus.className = '';
        formStatus.classList.add(isError ? 'error' : 'success');
    }

    function hideFormStatus() {
         formStatus.textContent = '';
         formStatus.className = '';
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        let formIsValid = true;

        hideError(nameError);
        hideError(emailError);
        hideError(messageError);
        hideFormStatus();

        if (nameInput.value.trim() === '') {
            displayError(nameError, 'Name is required.');
            formIsValid = false;
        }

        if (emailInput.value.trim() === '') {
            displayError(emailError, 'Email is required.');
            formIsValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            displayError(emailError, 'Please enter a valid email address.');
            formIsValid = false;
        }

        if (messageInput.value.trim() === '') {
            displayError(messageError, 'Message is required.');
            formIsValid = false;
        }

        if (formIsValid) {
            displayFormStatus('Message sent successfully!', false);
            contactForm.reset();
        } else {
            displayFormStatus('Please fix the errors above.', true);
        }
    });

    nameInput.addEventListener('input', function() { hideError(nameError); hideFormStatus(); });
    emailInput.addEventListener('input', function() { hideError(emailError); hideFormStatus(); });
    messageInput.addEventListener('input', function() { hideError(messageError); hideFormStatus(); });
     emailInput.addEventListener('blur', function() {
         if (emailInput.value.trim() !== '' && !isValidEmail(emailInput.value.trim())) {
             displayError(emailError, 'Please enter a valid email address.');
         } else {
             hideError(emailError);
         }
     });
});