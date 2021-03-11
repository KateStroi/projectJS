'use strict';

window.addEventListener('DOMContentLoaded', () => {
    // Tabs
    const tabParent = document.querySelector('.tabcontainer'),
           tabsContent = document.querySelectorAll('.tabcontent'),
           tabs = document.querySelectorAll('.tabheader__item');

    function enableTab(i = 0) {
        tabs[i].classList.add('tabheader__item_active');
        tabsContent[i].classList.remove('disable');
        tabsContent[i].classList.add('show');
    }

    function disableTab() {        
        tabsContent.forEach((item, i) => {
            item.classList.add('disable');
            item.classList.remove('show');
        });
           
        tabs.forEach((item, i) => {
            item.classList.remove('tabheader__item_active');
        });
    }
       
    tabParent.addEventListener('click', (event) => {
        const target = event.target;

        if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if(item === target) {
                    disableTab();
                    enableTab(i);
                }
            });
        }
    });

    disableTab();
    enableTab();

    // Timer 
    const deadline = '2021-03-10';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor( (t/(1000*60*60*24)) ),
            seconds = Math.floor( (t/1000) % 60 ),
            minutes = Math.floor( (t/1000/60) % 60 ),
            hours = Math.floor( (t/(1000*60*60) % 24) );

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num){
        if (num >= 0 && num < 10) { 
            return '0' + num;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const final = getTimeRemaining(endtime);
 

        if (final.total > 0) {  

            const timer = document.querySelector(selector),
                days = timer.querySelector("#days"),
                hours = timer.querySelector('#hours'),
                minutes = timer.querySelector('#minutes'),
                seconds = timer.querySelector('#seconds'),
                timeInterval = setInterval(updateClock, 1000);

            updateClock();
        
            function updateClock() {
                const t = getTimeRemaining(endtime);

                days.innerHTML = getZero(t.days);
                hours.innerHTML = getZero(t.hours);
                minutes.innerHTML = getZero(t.minutes);
                seconds.innerHTML = getZero(t.seconds);

                if (t.total <= 0) {
                    clearInterval(timeInterval);
                    days.innerHTML = "00";
                    hours.innerHTML = "00";
                    minutes.innerHTML = "00";
                    seconds.innerHTML = "00";
                }
            }
        }
    }

    setClock('.timer', deadline);

    // Modal 
    const modalTrigger = document.querySelectorAll('[data-modal]'),
    modalWindow = document.querySelector('.modal'),
    modalBtnClose = modalWindow.querySelector('[data-close]'); 

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

    modalBtnClose.addEventListener('click', closeModal );

    modalWindow.addEventListener('click', (e) => { 
        if (e.target === modalWindow) { 
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modalWindow.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimer = setInterval(openModal, 5000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();

            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
});