import { gsap } from "gsap";

const hoverAnimation = (item) => {
  const itemMarquees = item.querySelectorAll(".marquee");
  const image = item.querySelector(".image");
  const itemTitle = item.querySelector(".title");
  const marquee = gsap.utils.toArray(itemMarquees);
  const initialPosition = 260;
  let textChars = null;

  const animateTitle = () => {
    gsap.to(itemTitle, {
      duration: 1,
      y: 200,
      ease: "power4.out",
    });
  };

  const animateImage = () => {
    gsap.to(image, {
      duration: 0.6,
      scale: 1.1,
      ease: "power4.out",
    });
  };

  const animateMarquee = () => {
    gsap.fromTo(
      marquee,
      {
        xPercent: 0,
      },
      {
        duration: 8,
        xPercent: -100,
        ease: "linear",
        repeat: -1,
      }
    );
  };

  const animateTextChars = () => {
    textChars = item.querySelectorAll("span");

    gsap.fromTo(
      textChars,
      {
        y: initialPosition,
        transformOrigin: "top center",
        rotationX: 75,
        rotationY: -20,
        z: -150,
        delay: 0.5,
      },
      {
        duration: 1,
        y: 0,
        stagger: 0.05,
        ease: "power4.out",
        z: 0,
        rotationX: 0,
        rotationY: 0,
      }
    );
  };

  const resetTitle = () => {
    gsap.to(itemTitle, {
      duration: 1,
      y: 0,
      ease: "power4.out",
      delay: 0.5,
    });
  };

  const resetImage = () => {
    gsap.to(image, {
      duration: 0.6,
      scale: 1,
      ease: "power4.out",
    });
  };

  const resetTextChars = () => {
    gsap.fromTo(
      textChars,
      {
        y: 0,
      },
      {
        duration: 1.5,
        y: initialPosition,
        stagger: 0.02,
        ease: "power4.out",
      }
    );
  };


  item.addEventListener("mouseenter", () => {
    animateTitle();
    animateImage();
    animateMarquee();
    animateTextChars();
  });

  item.addEventListener("mouseleave", () => {
    resetTitle();
    resetImage();
    resetTextChars();
  });
};

export { hoverAnimation };
