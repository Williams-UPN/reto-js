/****************************************************
 * 1) LÓGICA PARA MOSTRAR/OCULTAR MENÚ
 ****************************************************/
// Obtenemos el botón "Menu" y el botón "Cerrar" (si está presente) y el contenedor del menú (aside)
const openMenuButton = document.getElementById('open-menu');
const closeMenuButton = document.getElementById('close-menu');
const asideElement = document.querySelector('aside');

// Cuando se hace clic en "Menu", mostramos el menú lateral añadiendo la clase que lo hace visible
openMenuButton.addEventListener('click', () => {
  asideElement.classList.add('aside-visible');
});

// Si el botón "Cerrar" está presente, lo usamos para ocultar el menú removiendo la clase
if (closeMenuButton) {
  closeMenuButton.addEventListener('click', () => {
    asideElement.classList.remove('aside-visible');
  });
}


/****************************************************
 * 2) VARIABLES, ARREGLOS Y FUNCIONES
 ****************************************************/
// Definimos arrays con textos para que los botones tengan títulos aleatorios y divertidos
const labelsAleatorio = [
  "¡Sorpresa! 🎲",
  "Azar Mágico 🎲",
  "¿Quién sale primero? 🎲"
];
const labelsAlfabetico = [
  "A-B-C Mágico 🔤",
  "¡Letras Geniales! 🔤",
  "Alfabeto Sorpresa 🔤"
];

// Función que elige un elemento aleatorio de un array, para darle un toque dinámico a los botones
function nombreAleatorio(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Seleccionamos los botones que activarán las funciones de orden aleatorio o alfabético
const btnAleatorio = document.getElementById("btn-aleatorio");
const btnAlfabetico = document.getElementById("btn-alfabetico");

// Asignamos textos aleatorios a los botones para que cada vez que se cargue se vean diferentes
btnAleatorio.textContent = nombreAleatorio(labelsAleatorio);
btnAlfabetico.textContent = nombreAleatorio(labelsAlfabetico);

// Tomamos los primeros 12 países de countriesData, que debe estar definido en countries.js
const slicedCountries = countriesData.slice(0, 12);

// Referenciamos donde mostraremos los países y el título principal que se actualizará según la acción
const container = document.getElementById('contenedor-productos');
const tituloPrincipal = document.getElementById('titulo-principal');

// Mapeo para relacionar cada continente con su imagen (SVG)
const continentToSvg = {
  "Africa": "africa.svg",
  "Antarctica": "Antarctica.svg",
  "Asia": "asia.svg",
  "Europe": "europe.svg",
  "Oceania": "oceania.svg",
  "North America": "america.svg",
  "South America": "america.svg"
};

// Función que se encarga de mostrar la información de cada país en la interfaz
function renderCountries(array) {
  // Limpiamos el contenedor para evitar duplicados
  container.innerHTML = '';
  // Por cada país, creamos un div y le asignamos la información necesaria
  array.forEach(country => {
    const name = country.name?.common || 'N/A';
    const capital = country.capital?.[0] || 'N/A';
    const population = country.population?.toLocaleString() || 'N/A';
    const continentsArr = country.continents || [];
    const mainContinent = continentsArr[0] || 'Unknown';

    const countryDiv = document.createElement('div');
    countryDiv.classList.add('country-item');
    countryDiv.innerHTML = `<h2>${name}</h2>`;

    // Guardamos datos importantes en atributos del elemento, para usarlos en el modal
    countryDiv.dataset.countryName = name;
    countryDiv.dataset.countryCapital = capital;
    countryDiv.dataset.countryPopulation = population;
    countryDiv.dataset.countryContinent = mainContinent;

    // Añadimos el país al contenedor
    container.appendChild(countryDiv);
  });
}
// Renderizamos inicialmente los 12 países
renderCountries(slicedCountries);

// Función para generar mensajes aleatorios cuando se selecciona la opción "Aleatorio"
function mensajeAleatorioAleatorio() {
  const opciones = [
    "¡El azar te sorprende! 😲",
    "¡Sorpresa aleatoria, prepárate! 🤪",
    "¡Azar en acción, disfruta! 😵",
    "¡Muchísima gente, increíble! 😮",
    "¡Multitud en acción, wow! 😲",
    "¡Población máxima, prepárate! 🚀"
  ];
  return opciones[Math.floor(Math.random() * opciones.length)];
}

// Función para generar mensajes aleatorios para la opción "Alfabético"
function mensajeAleatorioAlfabetico() {
  const opciones = [
    "¡Paises en orden, genial! 🔠",
    "¡Alfabeto mágico, vamos! ✨",
    "¡Orden alfabético, descubre más! 📚"
  ];
  return opciones[Math.floor(Math.random() * opciones.length)];
}

// Función para mezclar el array de países, usando el algoritmo Fisher-Yates
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


/****************************************************
 * 3) EVENTOS BOTONES "ALEATORIO" Y "ALFABÉTICO"
 ****************************************************/
// Al hacer clic en el botón "Aleatorio"
btnAleatorio.addEventListener('click', () => {
  // Actualizamos el título principal con un mensaje aleatorio
  tituloPrincipal.textContent = mensajeAleatorioAleatorio();
  // Barajamos el array de países para cambiar el orden
  shuffleArray(slicedCountries);
  // Volvemos a mostrar los países en la interfaz
  renderCountries(slicedCountries);
  // Cerramos el menú lateral (si se estaba mostrando)
  asideElement.classList.remove('aside-visible');
});

// Al hacer clic en el botón "Alfabético"
btnAlfabetico.addEventListener('click', () => {
  // Actualizamos el título principal con un mensaje diferente
  tituloPrincipal.textContent = mensajeAleatorioAlfabetico();
  // Ordenamos el array de países alfabéticamente
  slicedCountries.sort((a, b) => {
    const nameA = a.name?.common?.toLowerCase() || '';
    const nameB = b.name?.common?.toLowerCase() || '';
    return nameA.localeCompare(nameB);
  });
  // Renderizamos nuevamente la lista de países ordenados
  renderCountries(slicedCountries);
  // Cerramos el menú lateral automáticamente
  asideElement.classList.remove('aside-visible');
});


/****************************************************
 * 4) LÓGICA DEL MODAL
 ****************************************************/
// Obtenemos elementos del modal para poder manipularlos
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.modal__close');
const modalTitle = document.querySelector('.modal__title');
const modalParagraph = document.querySelector('.modal__paragraph');
const continentImg = document.getElementById('continent-image');

// Cuando se hace clic en un país, mostramos el modal con su información
container.addEventListener('click', (e) => {
  // Buscamos el elemento padre con la clase "country-item"
  const card = e.target.closest('.country-item');
  if (card) {
    e.preventDefault();

    // Extraemos los datos almacenados en el elemento
    const name = card.dataset.countryName;
    const capital = card.dataset.countryCapital;
    const population = card.dataset.countryPopulation;
    const continent = card.dataset.countryContinent;
    const svgFile = continentToSvg[continent] || 'modal.svg';

    // Rellenamos el contenido del modal con la información del país
    modalTitle.textContent = name;
    modalParagraph.innerHTML = `
      <strong>Capital:</strong> ${capital}<br>
      <strong>Población:</strong> ${population}<br>
      <strong>Continente:</strong> ${continent}
    `;
    // Actualizamos la imagen del continente según el país seleccionado
    continentImg.src = `images/${svgFile}`;

    // Hacemos visible el modal
    modal.classList.add('modal--show');
  }
});

// Cuando se hace clic en "Cerrar" dentro del modal, lo ocultamos
closeModal.addEventListener('click', (e) => {
  e.preventDefault();
  modal.classList.remove('modal--show');
});

// Si se hace clic fuera del contenedor del modal, también lo cerramos
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('modal--show');
  }
});
