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

  const handleHomeClick = (e) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/");
    }
    setTimeout(() => {
      const heroSection = document.getElementById("hero-section");
      if (heroSection) {
        heroSection.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, location.pathname !== "/" ? 200 : 50);
    setIsOpen(false);
  };

  const handleServicesClick = (e) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      // Navigate to home first, then scroll to services
      navigate("/");
      setTimeout(() => {
        const servicesSection = document.getElementById("services");
        if (servicesSection) {
          servicesSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300);
    } else {
      // Already on home page, just scroll to services
      const servicesSection = document.getElementById("services");
      if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    setIsOpen(false);
  };

  const navItems = [
    { name: "Home", href: "/", onClick: handleHomeClick },
    { name: "Services", href: "#services", onClick: handleServicesClick },
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
      {
        threshold: Array.from({ length: 11 }, (_, i) => i / 10),
        root: null,
        rootMargin: "0px",
      }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        showLogo ? "bg-black/70 backdrop-blur-md" : ""
      }`}
    >
      {/* Desktop Logo */}
      <AnimatePresence>
        {showLogo && (
          <motion.div
            className="hidden md:block absolute top-4 left-8 z-[60]"
            initial={{ opacity: 0, scale: 0.8, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <button onClick={handleHomeClick} className="cursor-pointer">
              <img
                src={logoS}
                alt="CreatoXD Logo"
                className="h-12 w-auto drop-shadow-lg hover:scale-105 transition-transform duration-300"
              />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between h-16 px-6 relative z-[55]">
        {showLogo ? (
          <button onClick={handleHomeClick} className="cursor-pointer">
            <img
              src={logoS}
              alt="CreatoXD Logo"
              className="h-10 w-auto drop-shadow-lg transition-transform"
            />
          </button>
        ) : (
          <span className="w-10 h-10" />
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-10 h-10 flex flex-col justify-center items-center z-[60]"
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

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden z-40"
          >
            <div className="pt-20 h-full overflow-y-auto">
              <div className="flex flex-col items-center space-y-8 p-8 pb-28">
                {navItems.map((item) => (
                  <div key={item.name} className="w-full text-center">
                    {item.onClick ? (
                      <button
                        onClick={item.onClick}
                        className="text-2xl font-semibold text-white hover:text-gray-300 transition-colors"
                      >
                        {item.name}
                      </button>
                    ) : item.href.startsWith("/") ? (
                      <Link
                        to={item.href}
                        onClick={() => setIsOpen(false)}
                        className="text-2xl font-semibold text-white hover:text-gray-300 transition-colors"
                      >
                        {item.name}
                      </Link>
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center justify-end h-20 px-8 w-full">
        <div className="flex items-center space-x-8">
          {navItems.map((item, index) => (
            <div key={item.name} className="relative">
              {item.onClick ? (
                <button
                  onClick={item.onClick}
                  className="relative z-10 px-4 py-2 text-white transition-colors duration-200 text-sm"
                  onMouseEnter={() => setActiveItem(index)}
                  onMouseLeave={() => setActiveItem(null)}
                >
                  <ShinyText text={item.name} speed={4} />
                </button>
              ) : item.href.startsWith("/") ? (
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
