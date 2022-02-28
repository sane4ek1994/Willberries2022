import Swiper, { Navigation, Autoplay } from 'swiper';

export const slider = () => {
    const swiper = new Swiper('.slider', {

        loop: true,
        modules: [Navigation, Autoplay],
        // Navigation arrows
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
          },
        navigation: {
          nextEl: '.slider-button-next',
          prevEl: '.slider-button-prev',
        },
      });
}