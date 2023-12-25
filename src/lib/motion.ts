export const staggerContainer = (staggerChildren, delayChildren) => {
return {
  hidden: {},
  show: {
    transition: {
      staggerChildren: staggerChildren,
      delayChildren: delayChildren || 0,
    },
  },
};
};

export const textVariant = (delay) => {
  return {
    hidden: {
      opacity: 0,
      x: "-100%",
    },
    show: {
      opacity: 1, // Animate opacity from 0 to 0.5 to 1
      x: 0,
      transition: {
        type: "tween",
        duration: 1.2,
        delay: delay,
        ease: "easeOut",
      },
    },
  };
};

export const slideIn = (direction, type, delay, duration) => {
  return {
    hidden: {
      x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
      y: direction === "up" ? "100%" : direction === "down" ? "100%" : 0,
    },
    show: {
      x: 0,
      y: 0,
      transition: {
        type: type,
        delay: delay,
        duration: duration,
        ease: "easeOut",
      },
    },
  };
};