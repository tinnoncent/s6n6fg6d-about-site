const revealItems = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => observer.observe(item));

const glow = document.querySelector('.cursor-glow');

window.addEventListener('pointermove', (event) => {
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
});

document.querySelectorAll('.signal-button').forEach((button) => {
  button.addEventListener('click', (event) => {
    if (button.getAttribute('href') === '#') event.preventDefault();
  });
});
