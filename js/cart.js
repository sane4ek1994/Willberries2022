function cart() {
    const cartBtn = document.querySelector('.button-cart'),
          cart = document.getElementById('modal-cart'),
          closeBtn = document.querySelector('.modal-close');




    function showModal(item) {
        item.style.display = 'flex';
    }

    function closeModal(item) {
        item.style.display = '';
    }

    cartBtn.addEventListener('click', () => showModal(cart));
    closeBtn.addEventListener('click', () => closeModal(cart));

}

cart();