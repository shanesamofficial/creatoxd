"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import ShinyText from "./ShinyText";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import logoS from "../assets/logo-s.png"; // Add this at the top

export default function Nav() {
  const [activeItem, setActiveItem] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isInHero, setIsInHero] = useState(true);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Partners", href: "#partners" },
  ];

  // Modify the scroll detection useEffect
  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById("hero-section");
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        // Show logo when hero section is not fully visible at the top
        setIsInHero(rect.top > -100 && rect.bottom > 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Run once on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 ${
        !isInHero ? "bg-black/50 backdrop-blur-sm" : ""
      }`}
    >
      {/* Show logo at top-left only when NOT in hero */}
      {!isInHero && (
        <motion.div
          className="hidden md:block absolute top-5 left-8 z-[999]" // Changed fixed to absolute, increased z-index, adjusted top
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={logoS}
            alt="CreatoXD Logo"
            className="h-10 w-auto drop-shadow-lg"
            style={{
              pointerEvents: "none",
              userSelect: "none",
              filter: "drop-shadow(0 0 10px rgba(0,0,0,0.3))", // Added shadow for better visibility
            }}
          />
        </motion.div>
      )}

      {/* Mobile Nav */}
      <div className="md:hidden flex items-center justify-end h-20 px-8">
        {/* Hamburger Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-10 h-10 flex flex-col justify-center items-center"
        >
          <motion.div
            animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="w-6 h-0.5 bg-white mb-2"
            transition={{ duration: 0.2 }}
          />
          <motion.div
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-6 h-0.5 bg-white mb-2"
            transition={{ duration: 0.2 }}
          />
          <motion.div
            animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="w-6 h-0.5 bg-white"
            transition={{ duration: 0.2 }}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-lg md:hidden pt-20 z-50"
          >
            {/* Close button - positioned absolutely */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-8 z-50"
              style={{ color: "white" }}
            >
              <motion.div className="w-10 h-10 flex flex-col justify-center items-center">
                <motion.div
                  animate={{ rotate: 45 }}
                  className="w-6 h-0.5 bg-white absolute"
                />
                <motion.div
                  animate={{ rotate: -45 }}
                  className="w-6 h-0.5 bg-white absolute"
                />
              </motion.div>
            </button>

            {/* Menu content */}
            <div className="flex flex-col items-center space-y-8 p-8">
              {navItems.map((item, index) => (
                <motion.div key={item.name} className="w-full text-center">
                  {item.href.startsWith("/") ? (
                    <Link
                      to={item.href}
                      className="text-2xl font-semibold text-white hover:text-gray-300 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      className="text-2xl font-semibold text-white hover:text-gray-300 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </a>
                  )}
                </motion.div>
              ))}
              <motion.div className="w-full text-center">
                <Link
                  to="/contact"
                  className="inline-block"
                  onClick={() => setIsOpen(false)}
                >
                  <HoverBorderGradient
                    containerClassName="rounded-full w-full"
                    className="font-semibold text-white px-8 py-3 text-xl"
                    as="button"
                  >
                    Contact Us!
                  </HoverBorderGradient>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Nav - Updated to right align */}
      <div className="hidden md:flex items-center justify-end h-20 px-8 w-full">
        <div className="flex items-center space-x-8">
          {navItems.map((item, index) => (
            <div key={item.name} className="relative">
              {item.href.startsWith("/") ? (
                <Link
                  to={item.href}
                  className="relative z-10 px-4 py-2 text-white transition-colors duration-200 text-sm"
                  onMouseEnter={() => setActiveItem(index)}
                  onMouseLeave={() => setActiveItem(null)}
                >
                  <ShinyText text={item.name} speed={4} />
                </Link>
              ) : (
                <a
                  href={item.href}
                  className="relative z-10 px-4 py-2 text-white transition-colors duration-200 text-sm"
                  onMouseEnter={() => setActiveItem(index)}
                  onMouseLeave={() => setActiveItem(null)}
                >
                  <ShinyText text={item.name} speed={4} />
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

          {/* Contact button */}
          <Link to="/contact">
            <HoverBorderGradient
              containerClassName="rounded-full"
              className="font-semibold text-white px-6 py-2 text-base"
              as="button"
            >
              Contact Us!
            </HoverBorderGradient>
          </Link>
        </div>
      </div>
    </nav>
  );
}
