// Seleccionamos el modal, el botón para cerrarlo y el contenedor donde se muestran los productos (tarjetas de países)
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.modal__close');
const contenedorProductos = document.getElementById('contenedor-productos');

// Escuchamos los clics dentro del contenedor de productos
contenedorProductos.addEventListener('click', (e) => {
  // Si el clic se dio en un elemento que es o está dentro de una tarjeta de país (.country-item)
  if (e.target.closest('.country-item')) {
    e.preventDefault(); // Prevenir cualquier comportamiento por defecto del clic
    modal.classList.add('modal--show'); // Mostramos el modal añadiéndole la clase que lo hace visible
  }
});

// Cuando el usuario hace clic en el botón de "Cerrar" del modal...
closeModal.addEventListener('click', (e) => {
  e.preventDefault(); // Evitamos el comportamiento por defecto del enlace
  modal.classList.remove('modal--show'); // Ocultamos el modal removiendo la clase
});

// También permitimos cerrar el modal si el usuario hace clic fuera del contenido (en la parte oscura)
modal.addEventListener('click', (e) => {
  // Si el clic fue exactamente en el modal (y no en su contenido interno)
  if (e.target === modal) {
    modal.classList.remove('modal--show'); // Ocultamos el modal
  }
});
