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
     

    new MenuCard(
        "src/img/tabs/vegy.jpg",
        "vegy", 
        "The One", 
        "The \"One\" - is the best menu you have ever seen!", 
        "9",
        ".menu .container",
        "menu__item"
    ).render();

    new MenuCard(
        "src/img/tabs/elite.jpg",
        "elite", 
        "The Second", 
        "The \"Second\" - is the best menu you have ever seen!", 
        "9",
        ".menu .container",
        "menu__item"
    ).render();

    new MenuCard(
        "src/img/tabs/post.jpg",
        "post", 
        "The Third", 
        "The \"Third\" - is the best menu you have ever seen!", 
        "9",
        ".menu .container", 
    ).render();
        
    // Forms

    const forms = document.querySelectorAll('form');
    const message = {
        loading: "src/img/form/spinner.svg",
        success: "Thanks!",
        failure: "Something went wrong.."
    };

    forms.forEach (item => {
        postData(item);
    });

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement("img");
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            statusMessage.textContent = message.loading;
            form.appendChild(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);
 
            const formData = new FormData(form);

            const object = {};
            formData.forEach (function(value, key) {
               object[key] = value;                 
            });
       
            fetch('server.php', { 
                method: "POST",
                headers: {
                    'Content-type': 'applicatio/json'
                },
                body: JSON.stringify(object)
            })
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            })
            .then(data => data.text())
            .then(() => {
                form.reset();
            })
            .catch(() => {
                showThanksModal(message.failure);
            }); 
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        
        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML =`
            <div class="modal__content">
                <div class="modal__close" data-close>x</div>
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
});