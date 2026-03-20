"use strict";


document.addEventListener('DOMContentLoaded', () => {

    // menu

    const open = document.querySelector('.header__burger'),
        close = document.querySelector('.header__menu-close'),
        menu = document.querySelector('.header__menu');

    open.addEventListener('click', () => {
        menu.classList.add('header__menu_active');
        document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', () => {
        menu.classList.remove('header__menu_active');
        document.body.style.overflow = '';
    });

    // footer

    const bntMenu = document.querySelectorAll('.footer__menu-btn'),
        elementsMenu = document.querySelectorAll('.footer__menu-elements'),
        arrowsBtnMenu = document.querySelectorAll('.icon-down'),
        bodyWidth = window.innerWidth;

    function toggleFooterMenu(i) {
        if (elementsMenu[i].classList.contains('footer__menu_active') && arrowsBtnMenu[i].classList.contains('footer__menu-btn_active')) {
            elementsMenu[i].classList.remove('footer__menu_active');
            arrowsBtnMenu[i].classList.remove('footer__menu-btn_active');
        } else {
            elementsMenu[i].classList.add('footer__menu_active');
            arrowsBtnMenu[i].classList.add('footer__menu-btn_active');
        }
    }

    if (bodyWidth < 768) {
        bntMenu.forEach((btn, i) => {
            btn.addEventListener('click', () => {
                toggleFooterMenu(i);
            });
        });
    } else {
        elementsMenu.forEach((element) => {
            element.classList.add('footer__menu_active');
        });
        arrowsBtnMenu.forEach((arrow) => {
            arrow.classList.add('footer__menu-btn_active');
        });
    }

    // getting data from the server

    const getData = async (url) => {
        const resources = await fetch(url);

        if (!resources.ok) {
            throw new Error(`Couldn't get the ${url}, status: ${resources.status}`);
        }

        return await resources.json();
    }

    // slide formation Popular

    const allSlides = [];

    class SlideFormationPopular {
        constructor(img, altimg, title, size, price, parentSelector) {
            this.img = img;
            this.altimg = altimg;
            this.title = title;
            this.size = size;
            this.price = price;
            this.parentSelector = document.querySelector(parentSelector);

        }

        formation() {
            const slide = document.createElement('div');
            slide.classList.add('popular__slider-slide');
            slide.innerHTML = `
                <div class="popular__slider-slide-img">
                    <img src=${this.img} alt=${this.altimg}>
                </div>
                <h4 class="title-h4">${this.title}</h4>
                <div class="popular__slider-slide-info">
                     <p class="title-txt">${this.size}cm</p>
                     <p class="title-txt">€${this.price}</p>
                </div>
                `;
            this.parentSelector.append(slide);
            allSlides.push(slide);
        }
    }

    getData("http://localhost:3000/catalogPopular")
        .then((data) => {
            data.forEach(({ img, altimg, title, size, price }) => {
                const slide = new SlideFormationPopular(img, altimg, title, size, price, '.popular__slider-tape').formation();
            });
            initSliderPopular();
        });

    // sliderPopular

    function initSliderPopular() {
        const
            wrapperSlider = document.querySelector('.popular__slider-wrapper'),
            tapeSlider = document.querySelector('.popular__slider-tape'),
            widthWrapper = window.getComputedStyle(wrapperSlider).width,
            navSlider = document.querySelector('.popular__slider-navigation'),
            navButtons = navSlider.querySelectorAll('button'),
            dotsWrapper = document.createElement('ol'),
            prevSlider = document.querySelector('.icon-left'),
            nextSlider = document.querySelector('.icon-right'),
            widthWindow = window.innerWidth;

        let slideIndex = 1,
            offset = 0,
            dots = [];

        dotsWrapper.classList.add('popular__slider-dots');
        navButtons[0].after(dotsWrapper);

        for (let i = 0; i < allSlides.length; i++) {
            const dotSlider = document.createElement('li');
            dotSlider.setAttribute('data-dot', i + 1);
            dotSlider.classList.add('popular__slider-dot');
            dotsWrapper.append(dotSlider);
            dots.push(dotSlider);

            if (i == 0) {
                dotSlider.style.opacity = 1;
            }

        }

        tapeSlider.style.width = (100 * allSlides.length) + '%';

        allSlides.forEach((slide) => {
            slide.style.width = showallSlidesWrapper(widthWrapper, widthWindow);
        });

        function showallSlidesWrapper(widthSlide, width) {
            if (width <= 480) {
                return widthSlide
            } else if (width >= 480 && width < 1000) {
                return widthSlide / 2
            } else if (width >= 1000) {
                return widthSlide / 3
            }
        }

        function moveSliderRight(width) {

            if (width <= 480) {
                if (offset == +widthWrapper.slice(0, widthWrapper.length - 2) * (allSlides.length - 1)) {
                    offset = 0;
                } else {
                    offset += +widthWrapper.slice(0, widthWrapper.length - 2);
                }
            } else if (width >= 480 && width < 1000) {

                if (offset == +widthWrapper.slice(0, widthWrapper.length - 2) * (allSlides.length - 1) / 2) {
                    offset = 0;
                } else {
                    offset += +widthWrapper.slice(0, widthWrapper.length - 2) / 2;
                }
            } else if (width >= 1000) {
                if (offset == +widthWrapper.slice(0, widthWrapper.length - 2) * (allSlides.length - 1) / 3) {
                    offset = 0;
                } else {
                    offset += +widthWrapper.slice(0, widthWrapper.length - 2) / 3;
                }
            }
            tapeSlider.style.transform = `translateX(-${offset}px)`;


            if (slideIndex == allSlides.length) {
                slideIndex = 1;
            } else {
                slideIndex++;
            }

            dots.forEach((dot) => {
                dot.style.opacity = 0.3;
            });
            dots[slideIndex - 1].style.opacity = 1;

        }

        function moveSliderLeft(width) {
            if (width <= 480) {
                if (offset == 0) {
                    offset = +widthWrapper.slice(0, widthWrapper.length - 2) * (allSlides.length - 1)
                } else {
                    offset -= +widthWrapper.slice(0, widthWrapper.length - 2);
                }
            } else if (width >= 480 && width < 1000) {
                if (offset == 0) {
                    offset = +widthWrapper.slice(0, widthWrapper.length - 2) * (allSlides.length - 1) / 2
                } else {
                    offset -= +widthWrapper.slice(0, widthWrapper.length - 2) / 2;
                }
            } else if (width >= 1000) {
                if (offset == 0) {
                    offset = +widthWrapper.slice(0, widthWrapper.length - 2) * (allSlides.length - 1) / 3
                } else {
                    offset -= +widthWrapper.slice(0, widthWrapper.length - 2) / 3;
                }
            }

            tapeSlider.style.transform = `translateX(-${offset}px)`;

            if (slideIndex == 1) {
                slideIndex = allSlides.length;
            } else {
                slideIndex--;
            }

            dots.forEach((dot) => {
                dot.style.opacity = 0.3;
            });
            dots[slideIndex - 1].style.opacity = 1;

        }

        nextSlider.addEventListener('click', () => {
            moveSliderRight(widthWindow);
        });

        prevSlider.addEventListener('click', () => {
            moveSliderLeft(widthWindow);
        });

        dots.forEach((dot) => {
            dot.addEventListener('click', (e) => {
                const dotActive = e.target.getAttribute('data-dot');

                slideIndex = dotActive;
                moveThroughPoints(widthWindow, dotActive);

                dots.forEach((dot) => {
                    dot.style.opacity = 0.3;
                });
                dots[slideIndex - 1].style.opacity = 1;
            });
        });

        function moveThroughPoints(width, numberAttribute) {
            if (width <= 480) {
                offset = +widthWrapper.slice(0, widthWrapper.length - 2) * (numberAttribute - 1);
            } else if (width >= 480 && width < 1000) {
                offset = +widthWrapper.slice(0, widthWrapper.length - 2) * (numberAttribute - 1) / 2;
            } else if (width >= 1000) {
                offset = +widthWrapper.slice(0, widthWrapper.length - 2) * (numberAttribute - 1) / 3;
            }

            tapeSlider.style.transform = `translateX(-${offset}px)`;
        }
    }

    // headSlider

    const sliderHead = document.querySelector('.head__slider'),
        sliderWrapper = sliderHead.querySelector('.head__slider-wrapper'),
        sliderWrapperWidth = window.getComputedStyle(sliderWrapper).width,
        sliderWrapperHeight = window.getComputedStyle(sliderWrapper).height,
        sliderTape = sliderHead.querySelector('.head__slider-tape'),
        sliderallSlides = sliderHead.querySelectorAll('.head__slider-slide'),
        widthWindowHeader = window.innerWidth,
        sliderDotsWrapper = document.createElement('ol');

    let slideIndexHead = 1,
        offsetHead = 0,
        dotsHead = [];

    sliderHead.append(sliderDotsWrapper);
    sliderDotsWrapper.classList.add('head__slider-dots');

    for (let i = 0; i < sliderallSlides.length; i++) {
        const sliderDot = document.createElement('li');
        sliderDot.setAttribute('data-head-dot', i + 1);
        sliderDot.classList.add('head__slider-dot');
        sliderDotsWrapper.append(sliderDot);
        dotsHead.push(sliderDot);

        if (i == 0) {
            sliderDot.style.opacity = 1;
        }
    }

    dotsHead.forEach((dot, i) => {
        if (i == 0) {
            dot.style.opacity = 1;
        } else {
            dot.style.opacity = 0.3;
        }

    });

    sliderallSlides.forEach((slide) => {
        slide.style.width = sliderWrapperWidth;
        slide.style.height = sliderWrapperHeight; // 768px
    });

    sliderTape.style.width = (100 * sliderallSlides.length) + '%';
    sliderTape.style.height = (100 * sliderallSlides.length) + '%'; // 768px

    function showNextSlide(width) {

        if (offsetHead >= +sliderWrapperWidth.slice(0, sliderWrapperWidth.length - 2) * (sliderallSlides.length - 1)) {
            offsetHead = 0;
        } else {
            offsetHead += +sliderWrapperWidth.slice(0, sliderWrapperWidth.length - 2);
        }


        if (width < 768) {
            sliderTape.style.transform = `translateX(-${offsetHead}px)`;
        } else {
            sliderTape.style.transform = `translateY(-${offsetHead}px)`;
        }

        if (slideIndexHead == sliderallSlides.length) {
            slideIndexHead = 1;
        } else {
            slideIndexHead++;
        }

        dotsHead.forEach((dot) => {
            dot.style.opacity = 0.3;
        });
        dotsHead[slideIndexHead - 1].style.opacity = 1;
    }

    dotsHead.forEach((dot) => {
        dot.addEventListener('click', (e) => {
            const dotActiveHead = e.target.getAttribute('data-head-dot');
            slideIndexHead = dotActiveHead;

            offsetHead = +sliderWrapperWidth.slice(0, sliderWrapperWidth.length - 2) * (dotActiveHead - 1);

            if (widthWindow < 768) {
                sliderTape.style.transform = `translateX(-${offsetHead}px)`;
            } else {
                sliderTape.style.transform = `translateY(-${offsetHead}px)`;
            }

            dotsHead.forEach((dot) => {
                dot.style.opacity = 0.3;
            });
            dotsHead[slideIndexHead - 1].style.opacity = 1;
        });
    });

    setInterval(() => {
        showNextSlide(widthWindowHeader);
    }, 4000);

});