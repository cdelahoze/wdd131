// Output the current year in the first paragraph
const currentYearEl = document.getElementById("currentyear");
if (currentYearEl)
  currentYearEl.innerHTML = `&#169; ${new Date().getFullYear()} Cristian Moisés De La Hoz Escorcia`;

// Output the last modified date in the second paragraph
const lastModEl = document.getElementById("lastModified");
if (lastModEl) lastModEl.innerHTML = `Last Modified: ${document.lastModified}`;

// Menu toggle functionality
const menuToggle = document.getElementById("menu-toggle");
const navigation = document.querySelector(".navigation");
const logoImg = document.querySelector(".logo-container img");

// Login / Register form toggles
const loginForm = document.getElementById("login");
const registerForm = document.getElementById("register");
const registerLink = document.getElementById("register-link");
const confirmed = document.getElementById("confirmed");

// Hide register form by default (in case CSS didn't apply)
if (registerForm) {
  registerForm.style.display = registerForm.style.display || "none";
}

if (registerLink) {
  registerLink.addEventListener("click", (e) => {
    e.preventDefault();
    if (registerForm) registerForm.style.display = "block";
    if (loginForm) loginForm.style.display = "none";
    if (confirmed) {
      confirmed.style.opacity = "0";
      confirmed.style.display = "none";
    }
  });
}

// When register form is submitted, show login form and hide register
if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (confirmed) {
      confirmed.style.display = "block";
      requestAnimationFrame(() => {
        confirmed.style.opacity = "1";
      });
    }

    const fiveSeconds = 5 * 1000;
    setTimeout(() => {
      if (confirmed) {
        confirmed.style.opacity = "0";
        setTimeout(() => {
          confirmed.style.display = "none";
        }, 500);
      }
      if (registerForm) registerForm.style.display = "none";
      if (loginForm) {
        loginForm.style.display = "block";
        const first = loginForm.querySelector("input");
        if (first) first.focus();
      }
    }, fiveSeconds);
  });
}

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    navigation.classList.toggle("open");
  });
}

// Cerrar menú móvil al hacer clic en un enlace de navegación interna
if (navigation) {
  const navLinks = navigation.querySelectorAll('a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (navigation.classList.contains("open")) {
        navigation.classList.remove("open");
      }
    });
  });
}

// Handle navigation clicks — scroll to section and mark active link
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.navigation a[href^="#"]');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);

      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      // Update active link
      navLinks.forEach(l => l.classList.remove('active-link'));
      link.classList.add('active-link');
    });
  });

  // Mark active link on scroll using IntersectionObserver
  const sections = document.querySelectorAll('main section[id]');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(l => {
            l.classList.toggle('active-link', l.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { threshold: 0.4 }
  );
  sections.forEach(s => observer.observe(s));
});