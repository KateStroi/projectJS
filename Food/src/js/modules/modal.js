function closeModal(modalSelector) {
    const modalWindow = document.querySelector(modalSelector);
    modalWindow.classList.remove('show');
    document.body.style.overflow = '';
}

function openModal(modalSelector, modalTimer) {
    const modalWindow = document.querySelector(modalSelector);
    modalWindow.classList.add('show');
    document.body.style.overflow = 'hidded';

    console.log(modalTimer);
    if (modalTimer) {
        clearInterval(modalTimer);
    }
} 

function modal(triggerSelector, modalSelector, modalTimer) {
    // Modal 
    const modalTrigger = document.querySelectorAll(triggerSelector),
    modalWindow = document.querySelector(modalSelector);

    modalTrigger.forEach(item => {
        item.addEventListener('click', () => openModal(modalSelector, modalTimer));
    });

    modalWindow.addEventListener('click', (e) => { 
        if (e.target === modalWindow || e.target.getAttribute('data-close') == '') { 
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modalWindow.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimer);

            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
        
}

export default modal;
export {closeModal};
export {openModal};