function modal() {
    // Modal 
    const modalTrigger = document.querySelectorAll('[data-modal]'),
    modalWindow = document.querySelector('.modal');

    function openModal() {
        modalWindow.classList.add('show');
        document.body.style.overflow = 'hidded';

        clearInterval(modalTimer);
    }    
    
    function closeModal() {
        modalWindow.classList.remove('show');
        document.body.style.overflow = '';
    }

    modalTrigger.forEach(item => {
        item.addEventListener('click', openModal);
    });

    modalWindow.addEventListener('click', (e) => { 
        if (e.target === modalWindow || e.target.getAttribute('data-close') == '') { 
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modalWindow.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimer = setInterval(openModal, 50000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();

            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
        
}

module.exports = modal;