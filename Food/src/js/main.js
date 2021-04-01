//'use strict';

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

    // Dynamic menu card

    class MenuCard {
        constructor(imgSrc, alt, title, desk, prise, parentSelector, ...classes) {
            this.imgSrc = imgSrc;
            this.alt = alt;
            this.title = title;
            this.desk = desk;
            this.prise = prise;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        } 

        changeToUAH() {
            this.prise = this.prise * this.transfer;
        }

        render() { 
            const element = document.createElement('div');
            
            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `  
                <img src=${this.imgSrc} alt=${this.alt}>
                <h3 class="menu__item-subtitle">Menu "${this.title}"</h3>
                <div class="menu__item-descr">${this.desk}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Price:</div>
                    <div class="menu__item-total"><span>${this.prise}</span> UAH/day</div>
                </div> 
            `;

            this.parent.append(element);
        }
    }
     getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        }); 
        
    // Forms

    const forms = document.querySelectorAll('form');
    const message = {
        loading: 'src/img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        let res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });
    
        return await res.json();
    };

    async function getResource(url) {
        let res = await fetch(url);
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
    
        return await res.json();
    }

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);
        
            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }

    //Slider
    const offerSlider = document.querySelector('.offer__slider'),
          offerSlide = offerSlider.querySelectorAll('.offer__slide'), 
          current = offerSlider.querySelector('#current'), 
          btnNext = offerSlider.querySelector('.offer__slider-next'),
          btnPrev = offerSlider.querySelector('.offer__slider-prev');
    let offerSlideIndex = 1; 

    function addZero(figures) {
        if (figures > 0 && figures < 10) {
            return '0' + figures;
        } else { return figures; }
    }

    function insertTotal(selector, where) {  
        const total = offerSlider.querySelector(where);
        const selectorTotal = selector.length; 
        total.textContent = addZero(selectorTotal);
        return selectorTotal;
    } 

    function insertCurrent(index) {
        current.textContent = addZero(index);
    } 

    const totalSlide = insertTotal(offerSlide, '#total');    
    setActiveSlide();

    function setActiveSlide() {
        insertCurrent(offerSlideIndex);
              
        if (offerSlideIndex > totalSlide) { 
            insertCurrent(offerSlideIndex = 1);  
        } else if (offerSlideIndex < 1) {
            insertCurrent(offerSlideIndex = totalSlide);
        } 
        
        offerSlide.forEach((item, index) => {  
            index = index + 1;
            item.classList.add('hide');

            if (index == offerSlideIndex) {
                item.classList.add('show');  
                item.classList.remove('hide');    
            } else {
                item.classList.add('hide');
                item.classList.remove('show');
            }
        });
    }
    
    btnNext.addEventListener('click', () => {  
        insertCurrent(++offerSlideIndex);  
        setActiveSlide();
    });  

    btnPrev.addEventListener('click', () => { 
        insertCurrent(--offerSlideIndex);   
        setActiveSlide();
    });
});