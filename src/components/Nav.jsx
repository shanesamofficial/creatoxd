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
  const [isInHero, setIsInHero] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const goHomeAndScroll = (targetId, delay = 100) => {
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
    { name: "Home", onClick: handleHomeClick, icon: FiHome, path: "/" },
    { name: "Services", onClick: handleServicesClick, icon: FiGrid, path: "/" },
    { name: "Portfolio", onClick: handlePortfolioClick, icon: FiBriefcase, path: "/portfolio" },
    { name: "About", onClick: handleAboutClick, icon: FiInfo, path: "/about" },
    { name: "Partners", onClick: handlePartnersClick, icon: FiUsers, path: "/partners" },
  ];

  // Track hero section visibility
  useEffect(() => {
    if (location.pathname !== "/") {
      setShowLogo(true);
      setIsInHero(false);
      return;
    }

    const hero = document.getElementById("hero-section");
    if (!hero) {
      setShowLogo(true);
      setIsInHero(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const heroMostlyVisible = entry.isIntersecting && entry.intersectionRatio >= 0.7;
        setShowLogo(!heroMostlyVisible);
        setIsInHero(heroMostlyVisible);
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
      <nav className="fixed top-0 left-0 right-0 z-[950] transition-all duration-200">
        {/* Desktop Glass Navbar */}
        <div className="hidden md:block">
          <div className="flex items-center justify-between px-8 py-4">
            {/* Logo */}
            <AnimatePresence>
              {showLogo && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: -20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: -20 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <button onClick={handleHomeClick}>
                    <img src={logoS} alt="CreatoXD Logo" className="h-12 w-auto" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Centered Glass Navigation */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative"
              >
                {/* Glass container */}
                <div className="relative bg-black/20 backdrop-blur-xl border border-white/10 rounded-full px-2 py-1.5 shadow-2xl">
                  <div className="flex items-center space-x-1">
                    {navItems.map((item, i) => {
                      const isActive = 
                        (item.name === "Home" && location.pathname === "/") ||
                        (item.path !== "/" && location.pathname === item.path);
                      
                      return (
                        <div key={item.name} className="relative">
                          <button
                            onClick={item.onClick}
                            onMouseEnter={() => setActiveItem(i)}
                            onMouseLeave={() => setActiveItem(null)}
                            className={`relative z-10 px-6 py-2.5 text-sm font-medium transition-all duration-200 rounded-full ${
                              isActive 
                                ? "text-white" 
                                : "text-white/70 hover:text-white"
                            }`}
                          >
                            <ShinyText text={item.name} speed={4} />
                            
                            {/* Active indicator */}
                            {isActive && (
                              <motion.div
                                layoutId="activeIndicator"
                                className="absolute inset-0 bg-white/15 rounded-full -z-10 border border-white/20"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                              />
                            )}
                          </button>
                          
                          {/* Hover effect */}
                          {activeItem === i && !isActive && (
                            <motion.div
                              layoutId="hoverBubble"
                              className="absolute inset-0 bg-white/8 rounded-full -z-10"
                              transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Contact Button */}
            <div className="flex items-center">
              <motion.button
                onClick={() => navigate("/contact")}
                className="relative bg-black/20 backdrop-blur-xl border border-white/10 rounded-full px-6 py-2.5 text-sm font-medium text-white/70 hover:text-white transition-all duration-200 shadow-2xl overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Glow effect on hover */}
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-white/30 via-white/20 to-white/30 rounded-full blur-md opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Button content */}
                <span className="relative z-10">
                  <ShinyText text="Contact Us!" speed={4} />
                </span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation - Always show hamburger */}
        <div className="md:hidden">
          {/* Mobile Bar - with/without background based on hero section */}
          <motion.div
            className={`flex items-center justify-between h-16 px-6 relative z-[960] transition-all duration-300 ${
              isInHero ? "bg-transparent" : "bg-black/70 backdrop-blur-md"
            }`}
          >
            {/* Logo - only show when not in hero */}
            <AnimatePresence>
              {showLogo && !isInHero ? (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={handleHomeClick}
                >
                  <img src={logoS} alt="CreatoXD Logo" className="h-10 w-auto" />
                </motion.button>
              ) : (
                <span className="w-10 h-10" />
              )}
            </AnimatePresence>

            {/* Hamburger - always visible */}
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
          </motion.div>
        </div>
      </nav>

      {/* Mobile Menu Portal with Glass Design */}
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
              {/* Background overlay */}
              <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={() => setIsOpen(false)}
              />
              
              {/* Glass menu container */}
              <div className="relative h-full flex flex-col items-center justify-center px-6">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl max-w-sm w-full"
                >
                  {/* Menu items */}
                  <div className="flex flex-col gap-4 mb-6">
                    {navItems.map((item, index) => {
                      const Icon = item.icon;
                      const isActive = 
                        (item.name === "Home" && location.pathname === "/") ||
                        (item.path !== "/" && location.pathname === item.path);
                      
                      return (
                        <motion.button
                          key={item.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          onClick={item.onClick}
                          className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                            isActive 
                              ? "bg-white/15 text-white border border-white/20" 
                              : "text-white/80 hover:text-white hover:bg-white/5"
                          }`}
                        >
                          <Icon className="text-base opacity-90" />
                          <span className="text-lg font-medium">{item.name}</span>
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Contact button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Link
                      to="/contact"
                      onClick={() => setIsOpen(false)}
                      className="w-full block"
                    >
                      <div className="relative bg-black/20 backdrop-blur-xl border border-white/15 rounded-full px-6 py-3 text-center font-medium text-white/80 hover:text-white transition-all duration-200 overflow-hidden group">
                        {/* Glow effect on hover */}
                        <motion.div
                          className="absolute -inset-1 bg-gradient-to-r from-white/20 via-white/10 to-white/20 rounded-full blur-md opacity-0 group-hover:opacity-100"
                          transition={{ duration: 0.3 }}
                        />
                        
                        <div className="relative flex items-center justify-center gap-2">
                          <FiMail className="text-base" />
                          <span>Contact Us!</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
