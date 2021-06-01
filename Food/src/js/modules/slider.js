function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    

    //Sliders
    const slider = document.querySelector(container),
          slides = slider.querySelectorAll(slide), 
          sliderWrapper = document.querySelector(wrapper),
          slidesField = document.querySelector(field),
          width = window.getComputedStyle(sliderWrapper).width,
          current = slider.querySelector(currentCounter), 
          total = slider.querySelector(totalCounter), 
          btnNext = slider.querySelector(nextArrow),
          btnPrev = slider.querySelector(prevArrow);

    let slideIndex = 1; 
    let offset = 0;
    
    //type 1

    // function addZero(figures) {
    //     if (figures > 0 && figures < 10) {
    //         return '0' + figures;
    //     } else { return figures; }
    // }

    // function insertTotal(selector, where) {  
    //     const total = slider.querySelector(where);
    //     const selectorTotal = selector.length; 
    //     total.textContent = addZero(selectorTotal);
    //     return selectorTotal;
    // } 

    // function insertCurrent(index) {
    //     current.textContent = addZero(index);
    // } 

    // const totalSlide = insertTotal(slides, '#total');    
    // setActiveSlide();

    // function setActiveSlide() {
    //     insertCurrent(slideIndex);
              
    //     if (slideIndex > totalSlide) { 
    //         insertCurrent(slideIndex = 1);  
    //     } else if (slideIndex < 1) {
    //         insertCurrent(slideIndex = totalSlide);
    //     } 
        
    //     slide.forEach((item, index) => {  
    //         index = index + 1;
    //         item.classList.add('hide');

    //         if (index == slideIndex) {
    //             item.classList.add('show');  
    //             item.classList.remove('hide');    
    //         } else {
    //             item.classList.add('hide');
    //             item.classList.remove('show');
    //         }
    //     });
    // }
    
    // btnNext.addEventListener('click', () => {  
    //     insertCurrent(++slideIndex);  
    //     setActiveSlide();
    // });  

    // btnPrev.addEventListener('click', () => { 
    //     insertCurrent(--slideIndex);   
    //     setActiveSlide();
    // });

    //type 2

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    sliderWrapper.style.overflow = 'hidden';


    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
          dots = [];

    function setActiveDot() { 
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    }

    function addZero() {
        if(slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent =  slideIndex;
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

    slider.append(indicators);
    
    for(let i=0; i < slides.length; i++) {
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
        if (offset == deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }
        
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        addZero();
        setActiveDot();
    });

    btnPrev.addEventListener('click',() => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }
        
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        addZero();
        setActiveDot();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = offset = deleteNotDigits(width) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;

            addZero();            
            setActiveDot();
        });
    });
}

export default slider;