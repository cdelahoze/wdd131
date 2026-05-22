/**
 * WDD 131 – Personal Presentation
 * Cristian De La Hoz Escorcia
 *
 * Funcionalidades:
 *  1. Typed-text animation en el hero
 *  2. Hamburger / nav móvil
 *  3. Modo oscuro con localStorage
 *  4. Scroll-reveal con IntersectionObserver
 *  5. Skill-bars animadas con IntersectionObserver
 *  6. Proyectos renderizados dinámicamente desde un array
 *  7. Filtro de proyectos por categoría
 *  8. Formulario de contacto con validación + localStorage
 *  9. Contador de caracteres en el textarea
 * 10. Footer: año actual y última modificación
 */

'use strict';

/* ══════════════════════════════════════════════
   1. PROYECTOS (datos)
   ══════════════════════════════════════════════ */
const projectsData = [
  {
    emoji: '🏠',
    title: 'Página de Inicio – WDD 131',
    desc: 'Página principal del curso con perfil personal, recursos web y diseño CSS Grid responsivo.',
    tags: ['html', 'css'],
    labels: ['HTML5', 'CSS Grid', 'Flexbox'],
    url: '../index.html',
  },
  {
    emoji: '⛪',
    title: 'Templos – Array & DOM',
    desc: 'Galería de templos generada dinámicamente desde un array con Flexbox responsivo y filtros por categoría.',
    tags: ['html', 'css', 'js'],
    labels: ['HTML5', 'CSS Flexbox', 'JS Array'],
    url: '../temples.html',
  },
  {
    emoji: '🔍',
    title: 'Templos Filtrados – Fetch API',
    desc: 'Consume un endpoint JSON y renderiza tarjetas con filtrado dinámico por año y nombre.',
    tags: ['js'],
    labels: ['Fetch API', 'JSON', 'DOM'],
    url: '../filtered-temples.html',
  },
  {
    emoji: '📝',
    title: 'Formulario de Revisión',
    desc: 'Formulario con validación JavaScript, localStorage para persistir datos y campo de calificación.',
    tags: ['html', 'css', 'js'],
    labels: ['Forms', 'localStorage', 'JS'],
    url: '../review.html',
  },
  {
    emoji: '🌍',
    title: 'Datos de Lugar – Fetch + DOM',
    desc: 'Página que consulta la API WeatherAPI y muestra información del lugar con manejo de errores.',
    tags: ['js'],
    labels: ['Fetch API', 'Async/Await', 'DOM'],
    url: '../place.html',
  },
  {
    emoji: '📱',
    title: 'Media Queries',
    desc: 'Demostración de diseño adaptable: mobile-first con breakpoints para tablet y desktop.',
    tags: ['html', 'css'],
    labels: ['Media Queries', 'Responsive', 'CSS'],
    url: '../week02/media-query.html',
  },
  {
    emoji: '🖼️',
    title: 'Imágenes Responsivas',
    desc: 'Uso de <picture>, srcset, sizes y lazy loading para optimizar imágenes en distintas resoluciones.',
    tags: ['html', 'css'],
    labels: ['Lazy Load', 'srcset', 'WebP'],
    url: '../week03/responsive-images.html',
  },
  {
    emoji: '🎓',
    title: 'Proyecto Final – TakTaim',
    desc: 'Plataforma de aprendizaje de inglés con slideshow dinámico, fetch de datos y login funcional.',
    tags: ['html', 'css', 'js'],
    labels: ['Proyecto Final', 'Fetch', 'Slideshow'],
    url: '../project/index.html',
  },
];

/* ══════════════════════════════════════════════
   2. TYPED TEXT ANIMATION
   ══════════════════════════════════════════════ */
function initTyped() {
  const el = document.getElementById('typed-role');
  if (!el) return;

  const phrases = [
    'Desarrollador Web Frontend',
    'Estudiante BYU-Idaho',
    'Entusiasta de JavaScript',
    'Aprendiz de por vida 🎓',
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let deleting = false;
  const typingSpeed = 80;
  const deletingSpeed = 45;
  const pauseEnd = 1800;
  const pauseStart = 400;

  function tick() {
    const current = phrases[phraseIdx];

    if (deleting) {
      charIdx--;
      el.textContent = current.slice(0, charIdx);
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        setTimeout(tick, pauseStart);
        return;
      }
      setTimeout(tick, deletingSpeed);
    } else {
      charIdx++;
      el.textContent = current.slice(0, charIdx);
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(tick, pauseEnd);
        return;
      }
      setTimeout(tick, typingSpeed);
    }
  }
  tick();
}

/* ══════════════════════════════════════════════
   3. HAMBURGER MENU
   ══════════════════════════════════════════════ */
function initHamburger() {
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('main-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('open', !open);
  });

  // Cerrar al hacer clic en enlace de nav
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('open');
    });
  });
}

/* ══════════════════════════════════════════════
   4. MODO OSCURO
   ══════════════════════════════════════════════ */
function initThemeToggle() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;

  const savedTheme = localStorage.getItem('wdd131-theme') || 'light';
  applyTheme(savedTheme);

  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('wdd131-theme', next);
  });

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    btn.textContent = theme === 'dark' ? '☀️' : '🌙';
    btn.setAttribute('aria-label', theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
  }
}

/* ══════════════════════════════════════════════
   5. SCROLL REVEAL
   ══════════════════════════════════════════════ */
function initScrollReveal() {
  const targets = document.querySelectorAll(
    '.about-grid, .skills-grid, .tech-badges, .projects-grid, .contact-wrapper, .hero-content, .hero-card'
  );

  targets.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  targets.forEach(el => observer.observe(el));
}

/* ══════════════════════════════════════════════
   6. SKILL BARS
   ══════════════════════════════════════════════ */
function initSkillBars() {
  const fills = document.querySelectorAll('.skill-bar-fill');
  if (!fills.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fill = entry.target;
          const target = fill.getAttribute('data-target') || '0';
          // Delay pequeño para que se note la animación
          setTimeout(() => {
            fill.style.width = `${target}%`;
          }, 200);
          observer.unobserve(fill);
        }
      });
    },
    { threshold: 0.3 }
  );

  fills.forEach(fill => observer.observe(fill));
}

/* ══════════════════════════════════════════════
   7. RENDERIZAR PROYECTOS
   ══════════════════════════════════════════════ */
function renderProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  grid.innerHTML = projectsData
    .map(
      (p) => `
      <article class="project-card reveal" data-tags="${p.tags.join(' ')}">
        <div class="project-card-header">${p.emoji}</div>
        <div class="project-card-body">
          <h3 class="project-card-title">${p.title}</h3>
          <p class="project-card-desc">${p.desc}</p>
          <div class="project-tags">
            ${p.labels.map(l => `<span class="project-tag">${l}</span>`).join('')}
          </div>
        </div>
        <div class="project-card-footer">
          <a href="${p.url}" class="project-link" target="_blank" rel="noopener noreferrer">
            Ver proyecto →
          </a>
        </div>
      </article>`
    )
    .join('');

  // Activar scroll-reveal en las nuevas tarjetas
  const newReveal = grid.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  newReveal.forEach(el => observer.observe(el));
}

/* ══════════════════════════════════════════════
   8. FILTROS DE PROYECTOS
   ══════════════════════════════════════════════ */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const grid = document.getElementById('projects-grid');
  if (!filterBtns.length || !grid) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Actualizar botón activo
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      const cards = grid.querySelectorAll('.project-card');

      cards.forEach(card => {
        const tags = card.getAttribute('data-tags') || '';
        if (filter === 'all' || tags.includes(filter)) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* ══════════════════════════════════════════════
   9. FORMULARIO DE CONTACTO
   ══════════════════════════════════════════════ */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameInput    = form.querySelector('#name');
  const emailInput   = form.querySelector('#email');
  const messageInput = form.querySelector('#message');
  const charCount    = document.getElementById('char-count');
  const successMsg   = document.getElementById('form-success');
  const senderSpan   = document.getElementById('sender-name');

  /* ── Contador de caracteres ── */
  if (messageInput && charCount) {
    messageInput.addEventListener('input', () => {
      const len = messageInput.value.length;
      charCount.textContent = `${len} / 500 caracteres`;
      charCount.style.color = len > 450 ? '#e74c3c' : '';
      if (len > 500) {
        messageInput.value = messageInput.value.slice(0, 500);
      }
    });
  }

  /* ── Validación en tiempo real ── */
  function validateField(input, errorId, validate) {
    const errorEl = document.getElementById(errorId);
    input.addEventListener('blur', () => {
      const msg = validate(input.value.trim());
      if (msg) {
        input.classList.add('invalid');
        if (errorEl) errorEl.textContent = msg;
      } else {
        input.classList.remove('invalid');
        if (errorEl) errorEl.textContent = '';
      }
    });
    input.addEventListener('input', () => {
      if (input.classList.contains('invalid')) {
        const msg = validate(input.value.trim());
        if (!msg) {
          input.classList.remove('invalid');
          if (errorEl) errorEl.textContent = '';
        }
      }
    });
  }

  if (nameInput) {
    validateField(nameInput, 'name-error', val =>
      val.length < 2 ? 'El nombre debe tener al menos 2 caracteres.' : ''
    );
  }
  if (emailInput) {
    validateField(emailInput, 'email-error', val =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ? '' : 'Ingresa un correo electrónico válido.'
    );
  }
  if (messageInput) {
    validateField(messageInput, 'message-error', val =>
      val.length < 10 ? 'El mensaje debe tener al menos 10 caracteres.' : ''
    );
  }

  /* ── Submit ── */
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = nameInput?.value.trim() || '';
    const email   = emailInput?.value.trim() || '';
    const subject = form.querySelector('#subject')?.value.trim() || '';
    const message = messageInput?.value.trim() || '';

    // Validar antes de guardar
    let valid = true;

    if (name.length < 2) {
      nameInput?.classList.add('invalid');
      const el = document.getElementById('name-error');
      if (el) el.textContent = 'El nombre debe tener al menos 2 caracteres.';
      valid = false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      emailInput?.classList.add('invalid');
      const el = document.getElementById('email-error');
      if (el) el.textContent = 'Ingresa un correo electrónico válido.';
      valid = false;
    }
    if (message.length < 10) {
      messageInput?.classList.add('invalid');
      const el = document.getElementById('message-error');
      if (el) el.textContent = 'El mensaje debe tener al menos 10 caracteres.';
      valid = false;
    }

    if (!valid) return;

    // Guardar en localStorage
    const entry = {
      name,
      email,
      subject,
      message,
      date: new Date().toISOString(),
    };

    const saved = JSON.parse(localStorage.getItem('wdd131-messages') || '[]');
    saved.push(entry);
    localStorage.setItem('wdd131-messages', JSON.stringify(saved));

    // Mostrar mensaje de éxito
    if (senderSpan) senderSpan.textContent = name;
    successMsg?.classList.remove('hidden');
    form.reset();
    if (charCount) charCount.textContent = '0 / 500 caracteres';

    // Ocultar éxito después de 5s
    setTimeout(() => successMsg?.classList.add('hidden'), 5000);
  });
}

/* ══════════════════════════════════════════════
   10. FOOTER – AÑO Y ÚLTIMA MODIFICACIÓN
   ══════════════════════════════════════════════ */
function initFooter() {
  const yearEl = document.getElementById('footer-year');
  const modEl  = document.getElementById('footer-modified');

  if (yearEl) {
    yearEl.textContent = `© ${new Date().getFullYear()} Cristian De La Hoz Escorcia`;
  }
  if (modEl) {
    modEl.textContent = `Última modificación: ${document.lastModified}`;
  }
}

/* ══════════════════════════════════════════════
   INIT
   ══════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initTyped();
  initHamburger();
  initThemeToggle();
  initScrollReveal();
  renderProjects();       // Debe ir antes que filters y skill bars
  initProjectFilters();
  initSkillBars();
  initContactForm();
  initFooter();
});
