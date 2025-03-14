const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.modal__close');
const contenedorProductos = document.getElementById('contenedor-productos');

contenedorProductos.addEventListener('click', (e) => {
    if (e.target.closest('.country-item')) {
        e.preventDefault();
        modal.classList.add('modal--show');
    }
});

closeModal.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.remove('modal--show');
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('modal--show');
    }
});
