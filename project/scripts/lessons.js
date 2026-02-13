

// Gallery: load lessons.json and render all items with overlay
const gallery = document.querySelector(".gallery");
let allLessons = []; // Guardar todas las lecciones

// Verificar y cargar el último filtro usado desde localStorage
function loadLastFilter() {
  const lastCourseId = localStorage.getItem("lastSelectedCourse");
  if (lastCourseId) {
    return parseInt(lastCourseId, 10);
  }
  return null;
}

// Guardar el filtro seleccionado en localStorage
function saveLastFilter(courseId) {
  if (courseId) {
    localStorage.setItem("lastSelectedCourse", courseId.toString());
  } else {
    localStorage.removeItem("lastSelectedCourse");
  }
}

async function loadLessons() {
  try {
    const res = await fetch("./scripts/lessons.json");
    if (!res.ok) throw new Error("No se pudo cargar lessons.json");
    const data = await res.json();
    allLessons = data; // Guardar en memoria
    
    // Cargar el último filtro usado
    const lastCourseId = loadLastFilter();
    if (lastCourseId) {
      filterLessonsByCourse(lastCourseId);
    } else {
      renderAll(data); // Mostrar todas al inicio
    }
  } catch (e) {
    console.error(e);
  }
}

async function loadCourses() {
  try {
    const res = await fetch("./scripts/courses.json");
    if (!res.ok) throw new Error("No se pudo cargar courses.json");
    const data = await res.json();
    renderCourseDropdowns(data);
  } catch (e) {
    console.error(`Error loading courses: ${e}`);
  }
}

function renderCourseDropdowns(courses) {
  const navElement = document.querySelector(".navigation");
  
  if (!navElement || !Array.isArray(courses)) {
    console.warn("Navigation not found or courses not array");
    return;
  }

  // Eliminar dropdowns existentes
  navElement.querySelectorAll(".dropdown").forEach((item) => item.remove());

  // Agrupar cursos por categoría
  const grouped = courses.reduce((acc, course) => {
    if (!course || !course.category) return acc;
    const category = String(course.category).trim();
    if (!category) return acc;
    if (!acc[category]) acc[category] = [];
    acc[category].push(course);
    return acc;
  }, {});

  const preferredOrder = ["Beginner", "Intermediate", "Advanced"];
  const categories = [
    ...preferredOrder.filter((category) => grouped[category]),
    ...Object.keys(grouped)
      .filter((category) => !preferredOrder.includes(category))
      .sort(),
  ];

  // Buscar el enlace "Log in" para insertar antes de él
  const loginLink = navElement.querySelector('a[href="login.html"]');
  const lastCourseId = loadLastFilter();

  categories.forEach((category) => {
    const dropdown = document.createElement("div");
    dropdown.className = "dropdown";

    const button = document.createElement("button");
    button.className = "dropbtn";
    button.type = "button";
    button.appendChild(document.createTextNode(`${category} `));

    const icon = document.createElement("i");
    icon.className = "fa fa-caret-down";
    button.appendChild(icon);

    const content = document.createElement("div");
    content.className = "dropdown-content";

    const coursesInCategory = grouped[category]
      .slice()
      .sort((a, b) => (a.idCourse || 0) - (b.idCourse || 0));

    coursesInCategory.forEach((course) => {
      const link = document.createElement("a");
      link.href = "#";
      const name = course.name || (course.idCourse ? `Course ${course.idCourse}` : "Course");
      link.textContent = name;
      
      // Marcar visualmente el curso seleccionado
      if (lastCourseId === course.idCourse) {
        link.style.fontWeight = "bold";
        link.style.backgroundColor = "#f0f0f0";
      }
      
      // Agregar evento click para filtrar lecciones
      link.addEventListener("click", (e) => {
        e.preventDefault();
        filterLessonsByCourse(course.idCourse);
        
        // Actualizar estilos visuales
        content.querySelectorAll("a").forEach(a => {
          a.style.fontWeight = "normal";
          a.style.backgroundColor = "";
        });
        link.style.fontWeight = "bold";
        link.style.backgroundColor = "#f0f0f0";
      });
      
      content.appendChild(link);
    });

    // Agregar opción para mostrar todos
    const showAllLink = document.createElement("a");
    showAllLink.href = "#";
    showAllLink.textContent = "Show All";
    showAllLink.style.borderTop = "1px solid #ddd";
    showAllLink.style.marginTop = "5px";
    showAllLink.addEventListener("click", (e) => {
      e.preventDefault();
      saveLastFilter(null);
      renderAll(allLessons);
      
      // Actualizar título
      const titleElement = document.querySelector(".lessons");
      if (titleElement) {
        titleElement.textContent = "Lessons";
      }
      
      // Actualizar estilos visuales
      content.querySelectorAll("a").forEach(a => {
        a.style.fontWeight = "normal";
        a.style.backgroundColor = "";
      });
    });
    content.appendChild(showAllLink);

    dropdown.appendChild(button);
    dropdown.appendChild(content);

    // Insertar antes del enlace "Log in"
    if (loginLink) {
      navElement.insertBefore(dropdown, loginLink);
    } else {
      navElement.appendChild(dropdown);
    }
  });
}

function filterLessonsByCourse(courseId) {
  if (!courseId) {
    renderAll(allLessons); // Mostrar todas si no hay filtro
    saveLastFilter(null);
    return;
  }
  
  const filtered = allLessons.filter(lesson => lesson.courseId === courseId);
  renderAll(filtered);
  saveLastFilter(courseId); // Guardar en localStorage
  
  // Actualizar título para mostrar qué curso está seleccionado
  const titleElement = document.querySelector(".lessons");
  if (titleElement) {
    const courseName = filtered.length > 0 ? filtered[0].course : `Course ${courseId}`;
    titleElement.textContent = `Lessons - ${courseName}`;
  }
}

function renderAll(data) {
  if (!gallery || !Array.isArray(data)) return;
  gallery.innerHTML = "";

  if (data.length === 0) {
    gallery.innerHTML = '<p style="text-align: center; padding: 2rem;">No lessons found for this course.</p>';
    return;
  }

  data.forEach((item) => {
    const wrapper = document.createElement("div");
    wrapper.className = "gallery-item";

    const link = document.createElement("a");
    // Link to ourclass.html passing the lesson identifier - usando template literal
    link.href = `./ourclass.html?lesson=${encodeURIComponent(item.lesson)}`;

    const container = document.createElement("div");
    container.className = "image-container";

    const lessonImg = document.createElement("img");
    const imageSrc = `./images/${item.filename || item.img || ""}`;
    
    // Implementar lazy loading con placeholder
    lessonImg.setAttribute("data-src", imageSrc);
    lessonImg.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='320'%3E%3Crect width='480' height='320' fill='%23ddd'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='18' fill='%23999'%3ELoading...%3C/text%3E%3C/svg%3E";
    lessonImg.alt = item.name || item.originalname || "";
    lessonImg.className = "image";
    lessonImg.loading = "lazy"; // Native lazy loading

    const overlay = document.createElement("img");
    overlay.src = "./images/marco_foto.webp";
    overlay.alt = "Overlay";
    overlay.className = "overlay-image";
    overlay.loading = "lazy"; // También para el overlay

    container.appendChild(lessonImg);
    container.appendChild(overlay);
    link.appendChild(container);

    const desc = document.createElement("div");
    desc.className = "desc";
    desc.textContent = item.desc || "";

    wrapper.appendChild(link);
    wrapper.appendChild(desc);

    gallery.appendChild(wrapper);
  });

  // Usar Intersection Observer para lazy loading con efecto de fade-in
  setupLazyLoading();
}

function setupLazyLoading() {
  const images = document.querySelectorAll("img[data-src]");
  
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.getAttribute("data-src");
          
          if (src) {
            img.src = src;
            img.removeAttribute("data-src");
            img.classList.add("loaded");
          }
          
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: "50px 0px", // Cargar 50px antes de entrar al viewport
      threshold: 0.01
    });

    images.forEach((img) => imageObserver.observe(img));
  } else {
    // Fallback para navegadores sin IntersectionObserver
    images.forEach((img) => {
      const src = img.getAttribute("data-src");
      if (src) {
        img.src = src;
        img.removeAttribute("data-src");
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (gallery) loadLessons();
  loadCourses();
});