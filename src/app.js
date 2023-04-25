import { cursorComponent } from "./cursor";
import { gsap } from "gsap";
const isMobile = window.matchMedia("(max-width: 768px)").matches;

const init = () => {
    const sliderItems = document.querySelectorAll('.slider__item');
    const intervalDuration = 6000; // 2 segundos
    
    let activeIndex = 0;
    
    let tl = gsap.timeline();

    const setTimeline = (target) => {
        tl.fromTo(target, { left: '0' }, { left: '-25vw', duration: 1})
        .fromTo(target, { left: '-25vw' }, { left: '0', duration: 1, delay: 4 });        
    }

    // setTimeline(curtain);

    // Añade la clase "active" al primer elemento
    sliderItems[activeIndex].classList.add('active');
    // gsap.to(curtain, { left: '-25vw', stagger: 0.2 })
    // setTimeline(curtains);


    // Función que cambia el elemento activo
    const changeActive = () => {    
        tl.clear();
      // Remueve la clase "active" del elemento actual
      const previousIndex = activeIndex;
      sliderItems[previousIndex].classList.remove('active');
    
      // Incrementa el índice del elemento activo
      activeIndex++;
      // Si el índice supera el número de elementos, vuelve al primero
      if (activeIndex >= sliderItems.length) {
        activeIndex = 0;
      }
      // Añade la clase "active" al nuevo elemento activo
      sliderItems[activeIndex].classList.add('active');
    
      // Obtiene todos los elementos .curtain dentro del slide activo
      const curtains = sliderItems[activeIndex].querySelectorAll('.curtain');

      setTimeline(curtains);
      
      // Crea una animación para cada elemento .curtain usando stagger
    //   gsap.fromTo(curtains, { left: '25vw' }, { left: '0', duration: 0.5, stagger: 0.2 });


    // tl.fromTo(curtains, { left: '-25vw' }, { left: '0', duration: 0.5, stagger: 0.2, delay: 3 });

    // tl.fromTo(curtains, { left: '0' }, { left: '-25vw', duration: 0.5, stagger: 0.2 })
    


};

    setTimeout(() => {
        changeActive();
        // Inicia el intervalo para cambiar el elemento activo
        setInterval(changeActive, intervalDuration);
    }, 500);


    

  if (!isMobile) {
    cursorComponent();
  }
}

init();