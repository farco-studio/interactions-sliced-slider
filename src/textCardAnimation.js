import { gsap } from "gsap";
import { hoverAnimation } from "./hoverAnimation";
import { setSplitText } from "./setSplitText";

const textCardAnimation = () => {
  const itemsTexts = document.querySelectorAll(".marquee span");
  const items = document.querySelectorAll(".item");
  const initialPosition = 260;
  
  const introAnimation = () => {
    gsap.to(items, {
      duration: 1.5,
      opacity: 1,
      y: 0,
      stagger: 0.2,
      ease: "power4.out",
    });
  };

  [...items].forEach((item) => {
    hoverAnimation(item);
  });

  [...itemsTexts].forEach((item) => {
    setSplitText(item);
  });

  const initialAnimation = () => {
    gsap.set(".marquee span", {
      y: initialPosition,
    });
  };

  introAnimation();
  initialAnimation();
};

export { textCardAnimation };