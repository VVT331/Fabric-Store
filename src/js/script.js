import '/src/sass/style.scss';


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