// Hamburger menu toggle for mobile
const navToggle = document.getElementById('navToggle');
const navList = document.querySelector('.nav-list');

navToggle.addEventListener('click', () => {
  navList.classList.toggle('show');
});

// Close nav on link click (mobile UX)
document.querySelectorAll('.nav-list a').forEach(link => {
  link.addEventListener('click', () => {
    navList.classList.remove('show');
  });
});
