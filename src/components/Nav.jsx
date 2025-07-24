"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ShinyText from "./ShinyText"; // <-- Import ShinyText
import { HoverBorderGradient } from "./ui/hover-border-gradient";

export default function Nav() {
  const [activeItem, setActiveItem] = useState(null);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Partners", href: "#partners" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-20 bg-transparent px-8">
      {/* Left: nav links */}
      <div className="flex space-x-8">
        {navItems.map((item, index) => (
          <div key={item.name} className="relative">
            {item.href.startsWith("/") ? (
              <Link
                to={item.href}
                className="relative z-10 px-4 py-2 text-white transition-colors duration-200 text-sm"
                onMouseEnter={() => setActiveItem(index)}
                onMouseLeave={() => setActiveItem(null)}
              >
                <ShinyText text={item.name} speed={3} />
              </Link>
            ) : (
              <a
                href={item.href}
                className="relative z-10 px-4 py-2 text-white transition-colors duration-200 text-sm"
                onMouseEnter={() => setActiveItem(index)}
                onMouseLeave={() => setActiveItem(null)}
              >
                <ShinyText text={item.name} speed={3} />
              </a>
            )}
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
      {/* Right: Contact button */}
      <Link to="/contact" className="ml-auto">
        <HoverBorderGradient
          containerClassName="rounded-full"
          className="font-semibold text-white px-6 py-2 text-base"
          as="button"
          style={{
            fontFamily: "'Montserrat', 'Poppins', 'Segoe UI', Arial, sans-serif",
            letterSpacing: "0.04em",
            fontWeight: 700,
            fontSize: "1.25rem",
            textTransform: "uppercase",
          }}
        >
          Contact Us!
        </HoverBorderGradient>
      </Link>
    </nav>
  );
}
