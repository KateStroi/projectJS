function cards() {
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

    async function getResource(url) {
        let res = await fetch(url);
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
    
        return await res.json();
    }
}
module.exports = cards;