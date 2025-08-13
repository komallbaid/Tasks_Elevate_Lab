const form = document.getElementById('contactForm');

const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');

const successMsg = document.getElementById('successMsg');

// Email regex pattern
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

form.addEventListener('submit', function (e) {
  e.preventDefault(); // prevent actual form submission
  let valid = true;

  // Clear previous messages
  nameError.textContent = '';
  emailError.textContent = '';
  messageError.textContent = '';
  successMsg.textContent = '';

  // Validate name
  if (nameInput.value.trim() === '') {
    nameError.textContent = 'Name is required';
    valid = false;
  }

  // Validate email
  if (emailInput.value.trim() === '') {
    emailError.textContent = 'Email is required';
    valid = false;
  } else if (!emailPattern.test(emailInput.value.trim())) {
    emailError.textContent = 'Enter a valid email';
    valid = false;
  }

  // Validate message
  if (messageInput.value.trim() === '') {
    messageError.textContent = 'Message cannot be empty';
    valid = false;
  } else if (messageInput.value.trim().length < 10) {
    messageError.textContent = 'Message should be at least 10 characters';
    valid = false;
  }

  // If valid, show success
  if (valid) {
    successMsg.textContent = 'Form submitted successfully!';
    form.reset();
  }
});
