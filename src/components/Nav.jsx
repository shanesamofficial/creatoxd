"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { createPortal } from "react-dom";
import { FiHome, FiGrid, FiBriefcase, FiUsers, FiMail, FiInfo } from "react-icons/fi";
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

  const handlePortfolioClick = (e) => {
    e.preventDefault();
    navigate("/portfolio");
    setIsOpen(false);
  };

  const handlePartnersClick = (e) => {
    e.preventDefault();
    navigate("/partners");
    setIsOpen(false);
  };

  const handleAboutClick = (e) => {
    e.preventDefault();
    navigate("/about");
    setIsOpen(false);
  };

  const navItems = [
    { name: "Home", onClick: handleHomeClick, icon: FiHome },
    { name: "Services", onClick: handleServicesClick, icon: FiGrid },
    { name: "Portfolio", onClick: handlePortfolioClick, icon: FiBriefcase },
    { name: "About", onClick: handleAboutClick, icon: FiInfo },
    { name: "Partners", onClick: handlePartnersClick, icon: FiUsers },
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

  useEffect(() => {
    if (isOpen) document.body.classList.add("nav-open");
    else document.body.classList.remove("nav-open");
    return () => document.body.classList.remove("nav-open");
  }, [isOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[950] transition-all duration-300 ${
          showLogo ? "bg-black/70 backdrop-blur-md" : ""
        }`}
      >
        {/* Desktop Logo */}
        <AnimatePresence>
          {showLogo && (
            <motion.div
              className="hidden md:block absolute top-4 left-8 z-[960]"
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
        <div className="md:hidden flex items-center justify-between h-16 px-6 relative z-[960]">
          {showLogo ? (
            <button onClick={handleHomeClick}>
              <img src={logoS} alt="CreatoXD Logo" className="h-10 w-auto" />
            </button>
          ) : (
            <span className="w-10 h-10" />
          )}
          <button
            onClick={() => setIsOpen(o => !o)}
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

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center justify-end h-20 px-8 w-full">
          <div className="flex items-center space-x-8">
            {navItems.map((item, i) => (
              <div key={item.name} className="relative">
                <button
                  onClick={item.onClick}
                  onMouseEnter={() => setActiveItem(i)}
                  onMouseLeave={() => setActiveItem(null)}
                  className="relative z-10 px-4 py-2 text-white text-sm"
                >
                  <ShinyText text={item.name} speed={4} />
                </button>
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

      {/* Mobile Menu Portal */}
      {isOpen &&
        createPortal(
          <AnimatePresence>
            <motion.div
              key="mobileMenuPortal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[900] md:hidden"
            >
              <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => setIsOpen(false)}
              />
              <div className="relative h-full flex flex-col items-center justify-center gap-8 px-8 font-poppins">
                {navItems.map(item => {
                  const Icon = item.icon;
                  const common =
                    "flex items-center gap-4 text-2xl font-semibold tracking-wide text-white hover:text-gray-300 transition-colors";
                  return (
                    <div key={item.name}>
                      <button onClick={item.onClick} className={common}>
                        <Icon className="text-[1.6rem] opacity-90" />
                        <span>{item.name}</span>
                      </button>
                    </div>
                  );
                })}

                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex justify-center pt-4"
                >
                  <HoverBorderGradient
                    containerClassName="rounded-full w-full max-w-xs"
                    className="font-semibold text-white px-7 py-3 text-lg flex items-center gap-3"
                    as="button"
                  >
                    <FiMail className="text-xl" />
                    Contact Us!
                  </HoverBorderGradient>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
