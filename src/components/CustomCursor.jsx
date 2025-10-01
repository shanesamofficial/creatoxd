import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const rafId = useRef(null);
  const coords = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const apply = () => {
      const { x, y } = coords.current;
      if (outerRef.current) outerRef.current.style.transform = `translate3d(${x - 16}px, ${y - 16}px,0)`;
      if (innerRef.current) innerRef.current.style.transform = `translate3d(${x - 4}px, ${y - 4}px,0)`;
      rafId.current = null;
    };

    const move = (e) => {
      coords.current.x = e.clientX;
      coords.current.y = e.clientY;
      if (rafId.current == null) {
        rafId.current = requestAnimationFrame(apply);
      }
    };

    window.addEventListener('mousemove', move, { passive: true });
    return () => {
      window.removeEventListener('mousemove', move);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
      <div
        ref={outerRef}
        className="fixed w-8 h-8 rounded-full border-2 border-white will-change-transform opacity-80"
        style={{ left: 0, top: 0 }}
      />
      <div
        ref={innerRef}
        className="fixed w-2 h-2 rounded-full bg-white will-change-transform opacity-90"
        style={{ left: 0, top: 0 }}
      />
    </div>
  );
};

export default CustomCursor;