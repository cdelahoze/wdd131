// Slideshow implementation
let currentSlide = 0;
let slides = [];
let slideInterval;

async function loadSlideshow() {
  try {
    const res = await fetch("./scripts/slideshow.json");
    if (!res.ok) throw new Error("No se pudo cargar slideshow.json");
    const data = await res.json();
    slides = data;
    renderSlideshow();
    startAutoSlide();
  } catch (e) {
    console.error("Error loading slideshow:", e);
  }
}

function renderSlideshow() {
  const wrapper = document.querySelector(".slideshow-wrapper");
  const dotsContainer = document.querySelector(".slide-dots");
  
  if (!wrapper || !dotsContainer) return;

  // Limpiar contenido existente
  wrapper.innerHTML = "";
  dotsContainer.innerHTML = "";

  slides.forEach((slide, index) => {
    // Crear slide
    const slideDiv = document.createElement("div");
    slideDiv.className = `slide ${index === 0 ? "active" : ""}`;

    // Crear imagen con srcset para responsive
    const img = document.createElement("img");
    img.src = `./images/${slide.src}`;
    img.srcset = slide.srcset.split(", ").map(s => `./images/${s}`).join(", ");
    img.sizes = slide.sizes;
    img.alt = slide.alt;
    img.loading = index === 0 ? "eager" : "lazy";

    // Crear contenido overlay
    const content = document.createElement("div");
    content.className = "slide-content";

    const h1 = document.createElement("h1");
    h1.textContent = slide.h1;
    h1.style.color = slide.textColor || "#1a1a1a";

    const p = document.createElement("p");
    p.textContent = slide.text;
    p.style.color = slide.textColor || "#1a1a1a";

    content.appendChild(h1);
    content.appendChild(p);
    slideDiv.appendChild(img);
    slideDiv.appendChild(content);
    wrapper.appendChild(slideDiv);

    // Crear dot indicator
    const dot = document.createElement("span");
    dot.className = `dot ${index === 0 ? "active" : ""}`;
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });
}

function showSlide(index) {
  const slideElements = document.querySelectorAll(".slide");
  const dotElements = document.querySelectorAll(".dot");

  if (!slideElements.length) return;

  // Remover active de todos
  slideElements.forEach(slide => slide.classList.remove("active"));
  dotElements.forEach(dot => dot.classList.remove("active"));

  // Ajustar índice si está fuera de rango
  if (index >= slides.length) {
    currentSlide = 0;
  } else if (index < 0) {
    currentSlide = slides.length - 1;
  } else {
    currentSlide = index;
  }

  // Activar slide y dot actual
  slideElements[currentSlide].classList.add("active");
  dotElements[currentSlide].classList.add("active");
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function prevSlide() {
  showSlide(currentSlide - 1);
}

function goToSlide(index) {
  stopAutoSlide();
  showSlide(index);
  startAutoSlide();
}

function startAutoSlide() {
  stopAutoSlide();
  slideInterval = setInterval(nextSlide, 5000);
}

function stopAutoSlide() {
  if (slideInterval) {
    clearInterval(slideInterval);
  }
}

// Event listeners para los controles
document.addEventListener("DOMContentLoaded", () => {
  loadSlideshow();

  const prevBtn = document.querySelector(".slide-control.prev");
  const nextBtn = document.querySelector(".slide-control.next");

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      stopAutoSlide();
      prevSlide();
      startAutoSlide();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      stopAutoSlide();
      nextSlide();
      startAutoSlide();
    });
  }

  // Pausar slideshow cuando el usuario pasa el mouse sobre él
  const container = document.querySelector(".slideshow-container");
  if (container) {
    container.addEventListener("mouseenter", stopAutoSlide);
    container.addEventListener("mouseleave", startAutoSlide);
  }

  // Soporte para teclado
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      stopAutoSlide();
      prevSlide();
      startAutoSlide();
    } else if (e.key === "ArrowRight") {
      stopAutoSlide();
      nextSlide();
      startAutoSlide();
    }
  });
});