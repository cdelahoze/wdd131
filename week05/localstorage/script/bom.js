// Referencias a elementos del DOM
// `input`: campo donde el usuario escribe "Libro Capítulo" (ej. "Alma 5")
const input = document.querySelector('#favchap');
// `button`: botón que añade el capítulo a la lista
const button = document.querySelector('button');
// `list`: el elemento <ul> donde se mostrarán los capítulos
const list = document.querySelector('ul');

// Intentar recuperar la lista desde localStorage mediante getChapterList()
// Si no existe aún (por ejemplo, primera visita) se usa un array vacío.
// Esto es el "compound OR" del enunciado: getChapterList() || []
let chaptersArray = getChapterList() || [];

// Al cargar la página, reconstruimos la lista en pantalla con lo guardado
chaptersArray.forEach(chapter => {
  displayList(chapter); // por cada capítulo guardado, mostrarlo en la UI
});

// Listener del botón "Add Chapter". Solo actúa si el input no está vacío.
button.addEventListener('click', () => {
  if (input.value != '') {
    // 1) Mostrar el nuevo capítulo en la lista
    displayList(input.value);
    // 2) Añadir el valor al array en memoria
    chaptersArray.push(input.value);
    // 3) Guardar el array actualizado en localStorage
    setChapterList();
    // 4) Limpiar el campo y devolverle el foco
    input.value = '';
    input.focus();
  }
});

// Crea y añade un elemento <li> a la lista visual para el `item` dado.
// También añade el botón de borrar y su comportamiento.
function displayList(item) {
  let li = document.createElement('li');
  let deletebutton = document.createElement('button');

  // El texto del <li> será el capítulo (p. ej. "Alma 5")
  li.textContent = item;

  // Botón para borrar el capítulo de la lista
  deletebutton.textContent = '❌';
  deletebutton.classList.add('delete');

  // Insertar en el DOM
  li.append(deletebutton);
  list.append(li);

  // Cuando se pulsa el botón ❌:
  // - se elimina el <li> del DOM
  // - se actualiza el array y el localStorage llamando a deleteChapter()
  deletebutton.addEventListener('click', function () {
    list.removeChild(li);
    deleteChapter(li.textContent); // pasar el texto completo (incluye ❌)
    input.focus();
  });
}

// Guarda `chaptersArray` en localStorage bajo la clave 'myFavBOMList'.
// Se usa JSON.stringify porque localStorage solo almacena strings.
function setChapterList() {
  localStorage.setItem('myFavBOMList', JSON.stringify(chaptersArray));
}

// Recupera la cadena desde localStorage y la convierte a array con JSON.parse.
// Si la clave no existe, devuelve null (por eso usamos `|| []` arriba).
function getChapterList() {
  return JSON.parse(localStorage.getItem('myFavBOMList'));
}

// Elimina un capítulo del array y actualiza localStorage.
// Nota: `chapter` aquí llega con el carácter '❌' al final porque se pasa
// `li.textContent` desde displayList(). Por eso se corta el último carácter.
function deleteChapter(chapter) {
  // Quitar el último carácter (la X) del texto recibido
  chapter = chapter.slice(0, chapter.length - 1);
  // Filtrar el array para eliminar el capítulo
  chaptersArray = chaptersArray.filter(item => item !== chapter);
  // Guardar cambios en localStorage
  setChapterList();
}