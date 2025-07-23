import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "../lib/utils";

export const FloatingNav = ({ navItems, className }) => {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useMotionValueEvent(scrollY, "change", (current) => {
    if (current < 50) {
      setVisible(true);
      setLastScrollY(current);
      return;
    }

    if (current > lastScrollY) {
      setVisible(false);
    } else {
      setVisible(true);
    }

    setLastScrollY(current);
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: -100 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "flex max-w-fit fixed top-6 inset-x-0 mx-auto border border-white/[0.2] rounded-full bg-black/80 backdrop-blur-md shadow-lg z-[5000] px-8 py-4 items-center justify-center space-x-6",
          className
        )}
      >
        {navItems.map((navItem, idx) => (
          <a
            key={`link-${idx}`}
            href={navItem.link}
            className="relative text-white hover:text-neutral-300 flex items-center space-x-3 text-sm font-medium"
          >
            <span className="block">{navItem.icon}</span>
            <span className="block">{navItem.name}</span>
          </a>
        ))}

        <button className="border text-sm font-medium border-white/[0.2] text-white hover:bg-white/10 px-5 py-2 rounded-full transition-colors">
          Login
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
