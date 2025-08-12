import React, { useState, useEffect, useRef } from 'react';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const outerRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const move = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      if (outerRef.current) outerRef.current.style.transform = `translate3d(${x - 16}px, ${y - 16}px,0)`;
      if (innerRef.current) innerRef.current.style.transform = `translate3d(${x - 4}px, ${y - 4}px,0)`;
    };
    const over = (e) => {
      const interactive = e.target.closest('a,button,[role="button"],input,textarea,select');
      setIsHovering(!!interactive);
    };
    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mouseover', over, { passive: true });
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
      <div
        ref={outerRef}
        className={`fixed w-8 h-8 rounded-full border-2 border-white will-change-transform ${
          isHovering ? 'scale-150 opacity-90' : 'scale-100 opacity-70'
        } transition-[transform,opacity] duration-150 ease-out`}
        style={{ left: 0, top: 0 }}
      />
      <div
        ref={innerRef}
        className={`fixed w-2 h-2 rounded-full bg-white will-change-transform ${
          isHovering ? 'scale-125 opacity-90' : 'scale-100 opacity-80'
        } transition-[transform,opacity] duration-150 ease-out`}
        style={{ left: 0, top: 0 }}
      />
    </div>
  );
};

export default CustomCursor;