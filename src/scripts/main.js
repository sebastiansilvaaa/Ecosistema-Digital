/* main.js — Lógica básica de la página principal */

// ---- Menú hamburguesa (móvil) ----
const menuToggle = document.getElementById('menuToggle');
const navbar = document.querySelector('.navbar');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('navbar--open');
  });
}

// ---- Formulario de contacto ----
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validación básica en el cliente
    if (!name || !email || !message) {
      showFeedback('Por favor, completa todos los campos.', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      showFeedback('Introduce un correo electrónico válido.', 'error');
      return;
    }

    // Simulación de envío (se reemplazará con llamada real al backend)
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando…';

    setTimeout(() => {
      contactForm.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = 'Enviar mensaje';
      showFeedback('¡Mensaje enviado! Te responderemos pronto. 🎉', 'success');
    }, 1200);
  });
}

function showFeedback(msg, type) {
  if (!formFeedback) return;
  formFeedback.textContent = msg;
  formFeedback.className = 'form-feedback ' + type;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ---- Scroll suave para anclas internas ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      navbar.classList.remove('navbar--open');
    }
  });
});

// ---- Navbar activa según scroll ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar__links a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === '#' + entry.target.id
        );
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => observer.observe(section));
