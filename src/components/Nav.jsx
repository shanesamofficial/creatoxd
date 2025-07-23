"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Nav() {
  const [activeItem, setActiveItem] = useState(null);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Partners", href: "#partners" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center h-20 bg-transparent">
      <div className="flex space-x-8">
        {navItems.map((item, index) => (
          <div key={item.name} className="relative">
            <a
              href={item.href}
              className="relative z-10 px-4 py-2 text-white transition-colors duration-200 text-sm"
              onMouseEnter={() => setActiveItem(index)}
              onMouseLeave={() => setActiveItem(null)}
            >
              {item.name}
            </a>
            {activeItem === index && (
              <motion.div
                layoutId="bubble"
                className="absolute inset-0 bg-white/10 rounded-full -z-10"
                style={{ backdropFilter: "blur(8px)" }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}
