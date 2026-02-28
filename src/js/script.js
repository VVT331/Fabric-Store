import '/src/sass/style.scss';

import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';



try {
    const swiperHead = new Swiper('.head__swiper', {

        modules: [Pagination, Autoplay],
        direction: 'horizontal',
        autoplay: {
            delay: 4000,

        },

        slidesPerView: 1,
        spaceBetween: 20,
        slidesPerView: 'auto',
        loop: true,
        pagination: {
            el: ".head__swiper-pagination",
            clickable: true,
        },

        breakpoints: {
            480: {
                direction: "vertical",
            }
        }
    });
} catch (e) {

}

try {
    const swiperPopular = new Swiper('.popular__swiper', {

        modules: [Pagination, Navigation, Autoplay],
        direction: 'horizontal',

        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        pagination: {
            el: ".popular__navigation-pag",
            clickable: true,
        },
        navigation: {
            nextEl: '.icon-right',
            prevEl: '.icon-left',
        },

        breakpoints: {
            480: {
                slidesPerView: 2
            },
            1000: {
                slidesPerView: 3
            }
        },




    });
} catch (e) {

}


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
});