// =============================================================
// Header: cambia de estilo al hacer scroll
// =============================================================
const header = document.getElementById('site-header');

function updateHeaderState() {
  if (window.scrollY > 40) {
    header.classList.add('is-scrolled');
  } else {
    header.classList.remove('is-scrolled');
  }
}

updateHeaderState();
window.addEventListener('scroll', updateHeaderState, { passive: true });

// =============================================================
// Menú móvil
// =============================================================
const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');

menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

mainNav.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// =============================================================
// Formulario de contacto (placeholder de envío)
// =============================================================
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // TODO: conectar con el backend / servicio de envío de correo real.
  console.log('Formulario enviado:', Object.fromEntries(new FormData(contactForm)));

  contactForm.reset();
  alert('Gracias por tu mensaje. Te responderemos muy pronto.');
});
// =============================================================
// Animación de Scroll para el Vídeo (Reducción suave)
// =============================================================
const videoWrapper = document.querySelector('.video-wrapper');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const maxScroll = 600; 
  
  let progress = Math.min(scrollY / maxScroll, 1);
  let currentScale = 1 - (progress * 0.05); 
  
  if (videoWrapper) {
    if (scrollY > 10) {
      videoWrapper.style.animation = 'none';
    }
    videoWrapper.style.transform = `scale(${currentScale})`;
  }
}, { passive: true });