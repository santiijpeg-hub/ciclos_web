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

// =============================================================
// Carrusel de Logos Continuo y Fluido (JavaScript Marquee)
// =============================================================
const track = document.querySelector('.marquee-track');

if (track) {
  // Duplicamos el contenido exactamente una vez para el bucle continuo
  track.innerHTML += track.innerHTML;

  let scrollPos = 0;
  const speed = 0.8;

  function step() {
    scrollPos += speed;
    
    const firstGroupWidth = track.scrollWidth / 2;
    if (scrollPos >= firstGroupWidth) {
      scrollPos = 0;
    }

    track.style.transform = `translateX(-${scrollPos}px)`;
    requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

// =============================================================
// Animación Bidireccional de Títulos al hacer Scroll
// =============================================================
const titlesToAnimate = document.querySelectorAll('.clients-title, .section-title');

if ('IntersectionObserver' in window) {
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.15
  };

  const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Aparece deslizándose desde abajo al hacer scroll hacia él
        entry.target.classList.add('is-visible');
      } else {
        // Desaparece al salir de la pantalla (scroll arriba o abajo)
        entry.target.classList.remove('is-visible');
      }
    });
  }, observerOptions);

  titlesToAnimate.forEach((title) => titleObserver.observe(title));
}
// =============================================================
// Animación Bidireccional de Títulos y Carrusel al hacer Scroll
// =============================================================
const elementsToAnimate = document.querySelectorAll('.clients-title, .section-title, .marquee-container');

if ('IntersectionObserver' in window) {
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Aparece deslizándose desde abajo al hacer scroll
        entry.target.classList.add('is-visible');
      } else {
        // Se oculta al salir de la pantalla (scroll arriba o abajo)
        entry.target.classList.remove('is-visible');
      }
    });
  }, observerOptions);

  elementsToAnimate.forEach((element) => scrollObserver.observe(element));
}