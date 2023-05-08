import { gsap } from "gsap";
import { setSplitText } from "./setSplitText";

let isMobile = window.matchMedia("(max-width: 768px)").matches;
const arrow = document.querySelector(".slider__content svg");
const initialPosition = -260;
const sliderItems = document.querySelectorAll(".slider .slider__item");
const slideInterval = 6000; // 6 segundos
const itemsTexts = document.querySelectorAll(".slider__item .main-title");
const lines = document.querySelectorAll(".line");
const animationDuration = 1;
const animationDelay = 0.6;

let timeout = null;
let activeIndex = 0;
let tl = gsap.timeline({ paused: true });

const drawLines = () => {
  gsap.set(lines, { backgroundColor: "#D6FFAC", yPercent: 100 });
  gsap.fromTo(
    lines,
    { yPercent: 100 },
    { yPercent: 0, duration: 2, stagger: 0.2, ease: "power4.out" }
  );
};

const animateArrow = (arrow) => {
  gsap.fromTo(
    arrow,
    {
      x: -20,
      autoAlpha: 0,
    },
    {
      duration: animationDuration,
      delay: animationDelay,
      x: 0,
      ease: "power4.out",
      autoAlpha: 1,
    }
  );
};

const animateTextChars = (item) => {
  let textChars = item.querySelectorAll("span");

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
      duration: animationDuration,
      x: 0,
      stagger: 0.05,
      ease: "power4.out",
      rotationX: 0,
      rotationY: 0,
      autoAlpha: 1,
    }
  );
};

const timelineAnimation = (activeCurtains, previousCurtains) => {
  const duration = 0.4;
  const stagger = 0.1;
  const ease = "Power1.easeOut";
  const mobileOffset = isMobile ? "25vh" : null;
  const desktopOffset = !isMobile ? "25vw" : null;

  tl.restart();
  tl.clear()
    .set(previousCurtains, { left: "0", top: "0" })
    .to(previousCurtains, {
      left: desktopOffset,
      top: mobileOffset,
      duration,
      stagger,
      ease,
    })
    .set(previousCurtains, { left: desktopOffset, top: mobileOffset })
    .set(activeCurtains, { left: "0", top: "0" })
    .to(activeCurtains, {
      left: desktopOffset,
      top: mobileOffset,
      duration,
      stagger,
      ease,
    })
    .to(activeCurtains, {
      left: "0",
      top: "0",
      duration,
      delay: 3.9,
      stagger: {
        each: stagger,
        from: "end",
      },
      ease,
    })
    .set(previousCurtains, { left: "-25vw" });

  tl.play();
};

const getNextIndex = (currentIndex, arrayLength) => {
  return (currentIndex + 1) % arrayLength;
};

const toggleActiveClass = (element) => {
  element.classList.toggle("active");
};

const updateActiveSlide = () => {
  let previousIndex = activeIndex;

  resetTimeout();
  
  toggleActiveClass(sliderItems[previousIndex]);

  activeIndex++;

  activeIndex = getNextIndex(activeIndex, sliderItems.length);

  toggleActiveClass(sliderItems[activeIndex]);

  let activeCurtains = sliderItems[activeIndex].querySelectorAll(".curtain");
  let previousCurtains =
    sliderItems[previousIndex].querySelectorAll(".curtain");

  timelineAnimation(activeCurtains, previousCurtains);
};

const resetTimeout = () => {
  if (timeout) {
    clearTimeout(timeout);
  }
};

const changeSlide = () => {
  timeout = setTimeout(() => {
    updateActiveSlide();
    setInterval(updateActiveSlide, slideInterval); // 6 segundos
  }, 400);
};

const addActiveClass = () => {
  sliderItems[activeIndex].classList.add("active");
};

const charsAnimation = () => {
  [...itemsTexts].forEach((item) => {
    setSplitText(item);
    animateArrow(arrow);
    animateTextChars(item);
  });
};

const sliderAnimation = () => {
  charsAnimation();
  changeSlide();
  addActiveClass();
};

setTimeout(() => {
  drawLines();
}, 200);

sliderAnimation();

window.onresize = () => {
  isMobile = window.matchMedia("(max-width: 768px)").matches;
  tl.restart();
  tl.clear()
  tl.play();
}