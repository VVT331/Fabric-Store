import '/src/sass/style.scss';

import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const swiper = new Swiper('.swiper', {

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
        el: ".swiper-pagination",
        clickable: true,
    },

    breakpoints: {
        480: {
            direction: "vertical",
        }
    }
});

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