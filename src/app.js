import { cursorComponent } from "./cursor";
import { gsap } from "gsap";

const isMobile = window.matchMedia("(max-width: 768px)").matches;

const init = () => {
  const sliderItems = document.querySelectorAll('.slider__item');
  const intervalDuration = 6000; // 6 segundos
  const curtains = document.querySelectorAll('.curtain');
  let timeout = null;

  let activeIndex = 0;
  let tl = gsap.timeline({ paused: true });

  const drawLines = () => {
    const lines = document.querySelectorAll('.line');

    gsap.set(lines, { backgroundColor: '#D6FFAC' });

    gsap.fromTo(lines, { yPercent: 100 }, { yPercent: 0, duration: 2, stagger: 0.2, ease: "power4.out" });

  }
  
  drawLines();


  // Función que reproduce la animación al cargar la página
const playAnimationOnLoad = () => {
  const activeCurtains = document.querySelectorAll('.slider__item.active .curtain');
  gsap.to(activeCurtains, { left: "-25vw", stagger: 0.2, duration: 0.5, ease: "power1.inOut", onComplete: () => tl.play() });
};

// Reproduce la animación al cargar la página
// playAnimationOnLoad();

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
      .set(previousCurtains, { left: '0' })
      .to(previousCurtains, { left: '-25vw', duration: 0.5, stagger: 0.2, ease: "power1.inOut" })
      .set(previousCurtains, { left: '-25vw' })
      .set(activeCurtains, { left: '0' })
      .to(activeCurtains, { left: "25vw", duration: 0.5, stagger: 0.2, ease: "power1.inOut" })
      .to(activeCurtains, { left: "0", duration: 0.5, delay: 2.5, stagger: {
        each: 0.2,
        from: "end"
      }, ease: "power1.inOut" })
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
  // Obtiene las cortinas del primer slide y las abre
  const activeCurtains = sliderItems[activeIndex].querySelectorAll('.curtain');
  // gsap.set(activeCurtains, { left: '-25vw' });
  // gsap.to(activeCurtains, { left: "-25vw", stagger: 0.2, duration: 0.5, ease: "power1.inOut"});

  // setInterval(changeActive, intervalDuration) // 6 segundos
};

// Inicia la aplicación
init();

    