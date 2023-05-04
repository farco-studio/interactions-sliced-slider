import { cursorComponent } from "./cursor";
import { gsap } from "gsap";
import { setSplitText } from "./setSplitText";

const isMobile = window.matchMedia("(max-width: 768px)").matches;
const arrow = document.querySelector('.slider__content svg');
const initialPosition = -260;

const drawLines = () => {
  const lines = document.querySelectorAll('.line');

  console.log('lines', lines);

  gsap.set(lines, { backgroundColor: '#D6FFAC', yPercent: 100 });
  gsap.fromTo(lines, { yPercent: 100 }, { yPercent: 0, duration: 2, stagger: 0.2, ease: "power4.out" });

}


const animateTextChars = (item) => {
  let textChars = item.querySelectorAll("span");

  gsap.fromTo(
    arrow,
    {
      x: -20,
      autoAlpha: 0,
    },
    {
      duration: 1,
      delay: 0.6,
      x: 0,
      ease: "power4.out",
      autoAlpha: 1,
    }
  );


  gsap.fromTo(
    textChars,
    {
      x: initialPosition,
      transformOrigin: "top center",
      rotationX: 75,
      rotationY: -20,
      autoAlpha: 0,
    },
    {
      duration: 1,
      x: 0,
      stagger: 0.05,
      ease: "power4.out",
      rotationX: 0,
      rotationY: 0,
      autoAlpha: 1,
    }
  );
};

const init = () => {
  const sliderItems = document.querySelectorAll('.slider .slider__item');
  const intervalDuration = 6000; // 6 segundos
  const itemsTexts = document.querySelectorAll('.slider__item .main-title');
  const itemLastText = document.querySelector('.slide__text.country');
  let timeout = null;

  let activeIndex = 0;
  let tl = gsap.timeline({ paused: true });


  [...itemsTexts].forEach((item) => {
    setSplitText(item);
    animateTextChars(item);
  });


  // Función que cambia el elemento activo
  const changeActive = () => {
    resetInterval();
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
    const activeCurtains = sliderItems[activeIndex].querySelectorAll('.curtain');
    const previousCurtains = sliderItems[previousIndex].querySelectorAll('.curtain');
  
    // Detiene la animación actual y reinicia el timeline
    tl.pause().restart();
  
    // Agrega los tweens para abrir y cerrar las cortinas
    tl.clear()
      .set(previousCurtains, { left: '0', top: '0'})
      .to(previousCurtains, { left: !isMobile ? '-25vw' : null, top: isMobile ? '-25vh' : null ,  duration: 0.4, stagger: 0.1, ease: "Power1.easeOut" })
      .set(previousCurtains, { left: !isMobile ? '-25vw' : null, top: isMobile ? '-25vh' : null  })
      .set(activeCurtains, { left: '0', top: '0' })
      .to(activeCurtains, { left: !isMobile ? '25vw' : null, top: isMobile ? '25vh' : null,  duration: 0.4, stagger: 0.1, ease: "Power1.easeOut" })
      .to(activeCurtains, { left: "0", top: '0', duration: 0.4, delay: 3.9, stagger: {
        each: 0.1,
        from: "end"
      }, ease: "Power1.easeOut" })
      .set(previousCurtains, { left: '-25vw' });
  
    // Inicia la animación del timeline
    tl.play();
  };

  // Función que reinicia el intervalo
  const resetInterval = () => {
    // Si existe un intervalo, lo elimina
    if (timeout) {
      clearTimeout(timeout);
    }
    // Inicia un nuevo intervalo
  };

  // Función que cambia el elemento activo
  timeout = setTimeout(() => {
    changeActive();
    setInterval(changeActive, intervalDuration) // 6 segundos
  }, 400);

  

  // Añade la clase "active" al primer elemento
  sliderItems[activeIndex].classList.add('active');

};

// Inicia la aplicación

drawLines();


setTimeout(() => {
  init();
}, 400);



    