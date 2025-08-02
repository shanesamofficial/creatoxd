"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import ShinyText from "./ShinyText";
import { HoverBorderGradient } from "./ui/hover-border-gradient";

export default function Nav() {
  const [activeItem, setActiveItem] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Partners", href: "#partners" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Mobile Nav */}
      <div className="md:hidden flex items-center justify-between h-20 bg-black/50 backdrop-blur-lg px-8">
        <Link to="/" className="text-2xl font-bold">
          <span className="text-white">Creato</span>
          <span className="text-[#5227FF]">XD</span>
        </Link>

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

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center h-20 px-8 w-full justify-between">
        {/* Left side navigation items */}
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

        {/* Right side contact button */}
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-lg md:hidden pt-20"
          >
            <div className="flex flex-col items-center space-y-8 p-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  className="w-full text-center"
                >
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
    </nav>
  );
}
