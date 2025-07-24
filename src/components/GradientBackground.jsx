import React, { useEffect } from 'react';
import './GradientBackground.css';

const GradientBackground = () => {
  useEffect(() => {
    const handlePointerMove = (e) => {
      const { currentTarget: el, clientX: x, clientY: y } = e;
      const { top: t, left: l, width: w, height: h } = el.getBoundingClientRect();
      el.style.setProperty('--posX', x-l-w/2);
      el.style.setProperty('--posY', y-t-h/2);
    };

    document.body.addEventListener("pointermove", handlePointerMove);

    return () => {
      document.body.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return <div className="gradient-background" />;
};

export default GradientBackground;