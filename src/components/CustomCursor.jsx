import React, { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Only initialize cursor on desktop devices
    if (window.innerWidth > 768) {
      const cursor = cursorRef.current;
      const ring = ringRef.current;

      const moveCursor = (e) => {
        const mouseY = e.clientY;
        const mouseX = e.clientX;

        cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        ring.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      };

      window.addEventListener("mousemove", moveCursor);

      return () => {
        window.removeEventListener("mousemove", moveCursor);
      };
    }
  }, []);

  // Don't render cursor on mobile devices
  if (typeof window !== 'undefined' && window.innerWidth <= 768) {
    return null;
  }

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none mix-blend-difference z-50 transition-transform duration-100 ease-out"
        style={{ transform: "translate3d(0, 0, 0)" }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white pointer-events-none mix-blend-difference z-50 transition-transform duration-300 ease-out"
        style={{ transform: "translate3d(0, 0, 0)" }}
      />
    </>
  );
}