import tabs from './modules/tabs';
import calculator from './modules/calculator';
import cards from './modules/cards';
import forms from './modules/forms';
import modal, {openModal}  from './modules/modal';
import slider from './modules/slider';
import timer from './modules/timer'; 

window.addEventListener('DOMContentLoaded', () => {
    const modalTimer = setInterval(() => openModal('.modal', modalTimer), 50000);

    tabs('.tabheader__item', '.tabcontent', '.tabcontainer', 'tabheader__item_active');
    calculator();
    cards();
    forms('form', modalTimer);
    modal('[data-modal]', '.modal');
    timer('.timer', '2021-08-10');
    slider({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner',
    });
});