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
// Animación Bidireccional al hacer Scroll (Títulos, Carrusel y Proyectos)
// =============================================================
const elementsToAnimate = document.querySelectorAll(
  '.clients-title, .section-title, .marquee-container, .project-card'
);

if ('IntersectionObserver' in window) {
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      } else {
        entry.target.classList.remove('is-visible');
      }
    });
  }, observerOptions);

  elementsToAnimate.forEach((element) => scrollObserver.observe(element));
}

/* === ANIMACIÓN PRELOADER === */
window.addEventListener('load', () => {
  // Espera 1.8 segundos y luego desliza la pantalla negra hacia arriba
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.classList.add('preloader-hidden');
    }
  }, 1000); 
});


// ==========================================
// EFECTO HOVER SERVICIOS CON LÍMITES ESTRICTOS (ARRIBA Y ABAJO AJUSTABLE)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  const serviceItems = document.querySelectorAll('.service-item');
  const movingTextBox = document.getElementById('moving-text-box');
  const dynamicSubtitle = document.getElementById('dynamic-subtitle');
  const dynamicText = document.getElementById('dynamic-text');
  const servicesList = document.getElementById('services-list'); 

  if(serviceItems.length > 0 && movingTextBox && servicesList) {
    serviceItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        
        // 1. Quitar estado activo a todos y dárselo al actual
        serviceItems.forEach(el => el.classList.remove('active'));
        item.classList.add('active');
        
        // 2. Cambiar los textos AL INSTANTE
        dynamicSubtitle.textContent = item.getAttribute('data-subtitle');
        dynamicText.textContent = item.getAttribute('data-text');

        // 3. Mover la caja de la izquierda calculando límites
        if (window.innerWidth > 900) {
          
          const itemCenter = item.offsetTop + (item.offsetHeight / 2);
          let targetY = itemCenter - (movingTextBox.offsetHeight / 2);
          
          // --- AQUÍ ESTÁ EL AJUSTE ---
          // Cambia este número para subir o bajar el límite inferior a tu gusto.
          // Cuanto más alto sea el número, más arriba se frenará la caja.
          const ajusteInferior = 60; 
          
          // Calculamos el tope restando tu ajuste artificial
          const maxY = servicesList.offsetHeight - movingTextBox.offsetHeight - ajusteInferior;
          
          // Aplicamos los topes de seguridad:
          if (targetY < 0) targetY = 0; // Tope superior estricto en 0
          if (targetY > maxY) targetY = maxY; // Tope inferior ajustable
          
          movingTextBox.style.transform = `translateY(${targetY}px)`;
        }
        
      });
    });
  }
});