function slider() {
    

    //Sliders
    const offerSlider = document.querySelector('.offer__slider'),
          offerSlides = offerSlider.querySelectorAll('.offer__slide'), 
          offerSliderWrapper = document.querySelector('.offer__slider-wrapper'),
          offerSlidesField = document.querySelector('.offer__slider-inner'),
          width = window.getComputedStyle(offerSliderWrapper).width,
          current = offerSlider.querySelector('#current'), 
          total = offerSlider.querySelector('#total'), 
          btnNext = offerSlider.querySelector('.offer__slider-next'),
          btnPrev = offerSlider.querySelector('.offer__slider-prev');

    let offerSlideIndex = 1; 
    let offset = 0;
    
    //type 1

    // function addZero(figures) {
    //     if (figures > 0 && figures < 10) {
    //         return '0' + figures;
    //     } else { return figures; }
    // }

    // function insertTotal(selector, where) {  
    //     const total = offerSlider.querySelector(where);
    //     const selectorTotal = selector.length; 
    //     total.textContent = addZero(selectorTotal);
    //     return selectorTotal;
    // } 

    // function insertCurrent(index) {
    //     current.textContent = addZero(index);
    // } 

    // const totalSlide = insertTotal(offerSlides, '#total');    
    // setActiveSlide();

    // function setActiveSlide() {
    //     insertCurrent(offerSlideIndex);
              
    //     if (offerSlideIndex > totalSlide) { 
    //         insertCurrent(offerSlideIndex = 1);  
    //     } else if (offerSlideIndex < 1) {
    //         insertCurrent(offerSlideIndex = totalSlide);
    //     } 
        
    //     offerSlide.forEach((item, index) => {  
    //         index = index + 1;
    //         item.classList.add('hide');

    //         if (index == offerSlideIndex) {
    //             item.classList.add('show');  
    //             item.classList.remove('hide');    
    //         } else {
    //             item.classList.add('hide');
    //             item.classList.remove('show');
    //         }
    //     });
    // }
    
    // btnNext.addEventListener('click', () => {  
    //     insertCurrent(++offerSlideIndex);  
    //     setActiveSlide();
    // });  

    // btnPrev.addEventListener('click', () => { 
    //     insertCurrent(--offerSlideIndex);   
    //     setActiveSlide();
    // });

    //type 2

    if (offerSlides.length < 10) {
        total.textContent = `0${offerSlides.length}`;
        current.textContent = `0${offerSlideIndex}`;
    } else {
        total.textContent = offerSlides.length;
        current.textContent = offerSlideIndex;
    }

    offerSlidesField.style.width = 100 * offerSlides.length + '%';
    offerSlidesField.style.display = 'flex';
    offerSlidesField.style.transition = '0.5s all';

    offerSliderWrapper.style.overflow = 'hidden';


    offerSlides.forEach(slide => {
        slide.style.width = width;
    });

    offerSlider.style.position = 'relative';

    const indicators = document.createElement('ol'),
          dots = [];

    function setActiveDot() { 
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[offerSlideIndex - 1].style.opacity = 1;
    }

    function addZero() {
        if(offerSlides.length < 10) {
            current.textContent = `0${offerSlideIndex}`;
        } else {
            current.textContent =  offerSlideIndex;
        }
    }
    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    indicators.classList.add('carousel-indicators');

    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;

    offerSlider.append(indicators);
    
    for(let i=0; i < offerSlides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;

        if(i == 0) {
            dot.style.opacity = "1";
        }

        indicators.append(dot);
        dots.push(dot);
    }

    btnNext.addEventListener('click',() => {
        if (offset == deleteNotDigits(width) * (offerSlides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }
        
        offerSlidesField.style.transform = `translateX(-${offset}px)`;

        if (offerSlideIndex == offerSlides.length) {
            offerSlideIndex = 1;
        } else {
            offerSlideIndex++;
        }

        addZero();
        setActiveDot();
    });

    btnPrev.addEventListener('click',() => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (offerSlides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }
        
        offerSlidesField.style.transform = `translateX(-${offset}px)`;

        if (offerSlideIndex == 1) {
            offerSlideIndex = offerSlides.length;
        } else {
            offerSlideIndex--;
        }

        addZero();
        setActiveDot();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            offerSlideIndex = slideTo;
            offset = offset = deleteNotDigits(width) * (slideTo - 1);
            offerSlidesField.style.transform = `translateX(-${offset}px)`;

            addZero();            
            setActiveDot();
        });
    });
}

module.exports = slider;