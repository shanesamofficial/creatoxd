"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ShinyText from "./ShinyText";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import logoS from "../assets/logo-s.png";

export default function Nav() {
  const [activeItem, setActiveItem] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const goHomeAndScroll = (targetId, delay = 250) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: targetId } });
    } else {
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, delay);
    }
    setIsOpen(false);
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    goHomeAndScroll("hero-section", 50);
  };

  const handleServicesClick = (e) => {
    e.preventDefault();
    goHomeAndScroll("services");
  };

  const navItems = [
    { name: "Home", onClick: handleHomeClick },
    { name: "Services", onClick: handleServicesClick },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Partners", href: "#partners" },
  ];

  useEffect(() => {
    if (location.pathname !== "/") {
      setShowLogo(true);
      return;
    }
    const hero = document.getElementById("hero-section");
    if (!hero) {
      setShowLogo(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        const heroMostlyVisible = entry.isIntersecting && entry.intersectionRatio >= 0.7;
        setShowLogo(!heroMostlyVisible);
      },
      { threshold: Array.from({ length: 11 }, (_, i) => i / 10) }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, [location.pathname]);

  // Effect to lock scroll
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("nav-open");
    } else {
      document.body.classList.remove("nav-open");
    }
    return () => document.body.classList.remove("nav-open");
  }, [isOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[120] transition-all duration-300 ${
        showLogo ? "bg-black/70 backdrop-blur-md" : ""
      }`}
    >
      {/* Desktop Logo */}
      <AnimatePresence>
        {showLogo && (
          <motion.div
            className="hidden md:block absolute top-4 left-8 z-[130]"
            initial={{ opacity: 0, scale: 0.8, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: -20 }}
          >
            <button onClick={handleHomeClick}>
              <img src={logoS} alt="CreatoXD Logo" className="h-12 w-auto" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between h-16 px-6 relative z-[130]">
        {showLogo ? (
          <button onClick={handleHomeClick}>
            <img src={logoS} alt="CreatoXD Logo" className="h-10 w-auto" />
          </button>
        ) : (
          <span className="w-10 h-10" />
        )}
        <button
          onClick={() => setIsOpen((o) => !o)}
          aria-label="Menu"
          className="w-10 h-10 flex flex-col justify-center items-center"
        >
          <motion.span
            animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="w-6 h-0.5 bg-white mb-2"
            transition={{ duration: 0.2 }}
          />
          <motion.span
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-6 h-0.5 bg-white mb-2"
            transition={{ duration: 0.2 }}
          />
          <motion.span
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
            key="mobileMenu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[125] md:hidden bg-black/70 backdrop-blur-sm after:content-[''] after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.10)_0%,transparent_65%)]"
            onClick={() => setIsOpen(false)}
          >
            <div
              className="relative pt-24 pb-32 px-8 flex flex-col items-center space-y-8"
              onClick={(e) => e.stopPropagation()}
            >
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.onClick ? (
                    <button
                      onClick={item.onClick}
                      className="text-2xl font-semibold text-white hover:text-gray-300 transition-colors"
                    >
                      {item.name}
                    </button>
                  ) : (
                    <a
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="text-2xl font-semibold text-white hover:text-gray-300 transition-colors"
                    >
                      {item.name}
                    </a>
                  )}
                </div>
              ))}

              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="w-full flex justify-center"
              >
                <HoverBorderGradient
                  containerClassName="rounded-full w-full max-w-xs"
                  className="font-semibold text-white px-8 py-3 text-xl"
                  as="button"
                >
                  Contact Us!
                </HoverBorderGradient>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center justify-end h-20 px-8 w-full">
        <div className="flex items-center space-x-8">
          {navItems.map((item, i) => (
            <div key={item.name} className="relative">
              {item.onClick ? (
                <button
                  onClick={item.onClick}
                  onMouseEnter={() => setActiveItem(i)}
                  onMouseLeave={() => setActiveItem(null)}
                  className="relative z-10 px-4 py-2 text-white text-sm"
                >
                  <ShinyText text={item.name} speed={4} />
                </button>
              ) : (
                <a
                  href={item.href}
                  onMouseEnter={() => setActiveItem(i)}
                  onMouseLeave={() => setActiveItem(null)}
                  className="relative z-10 px-4 py-2 text-white text-sm"
                >
                  <ShinyText text={item.name} speed={4} />
                </a>
              )}
              {activeItem === i && (
                <motion.div
                  layoutId="bubble"
                  className="absolute inset-0 bg-white/10 rounded-full -z-10"
                  style={{ backdropFilter: "blur(8px)" }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </div>
          ))}
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
