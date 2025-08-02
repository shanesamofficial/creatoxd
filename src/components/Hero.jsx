import React, { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import TextType from "./TextType";
import ShinyText from "./ShinyText";
import logo from "../assets/logo.png";

const Hero = () => {
  const [visible, setVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
  const { scrollY } = useScroll();
  const [isInHero, setIsInHero] = useState(true);

  // Add resize listener
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest < 100);
  });

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById("hero-section");
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        setIsInHero(rect.top <= 0 && rect.bottom >= 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      id="hero-section"
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
        backgroundColor: "transparent",
        color: "#fff",
        overflow: "hidden",
      }}
    >
      {/* Animated Subtitle - Updated positioning */}
      <div
        style={{
          position: "absolute",
          ...(isMobile
            ? {
                bottom: "80px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "100%",
                textAlign: "center",
              }
            : {
                bottom: "30px",
                left: "55px",
                transform: "none",
              }),
          fontSize: isMobile ? "1.2rem" : "2rem", // Smaller font on mobile
          fontWeight: "500",
          color: "#e0e0e0",
          letterSpacing: "1px",
          minHeight: "2.5rem",
          fontFamily: "'Montserrat', 'Poppins', 'Segoe UI', Arial, sans-serif",
          transition: "opacity 0.3s",
          opacity: 0.65,
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        <TextType
          text={[
            "Graphic Designing",
            "Web Development",
            "UI/UX Designing",
            "Photo and Video Editing",
          ]}
          typingSpeed={40}
          pauseDuration={1000}
          deletingSpeed={25}
          showCursor={true}
          cursorCharacter="•"
          cursorBlinkDuration={0.9}
        />
      </div>

      {/* Logo - Only show in hero section on mobile */}
      {(!isMobile || (isMobile && isInHero)) && (
        <div
          style={{
            position: "absolute",
            ...(isMobile
              ? {
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }
              : {
                  bottom: "-450px",
                  left: "-150px",
                }),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <motion.img
            src={logo}
            alt="CreatoXD Logo"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            style={{
              height: isMobile ? "500px" : "1300px", // Increased mobile size to 500px
              width: "auto",
              objectFit: "contain",
              maxWidth: isMobile ? "90vw" : "none", // Prevent overflow on mobile
            }}
          />
        </div>
      )}

      {/* Scroll Down Indicator - Updated positioning */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute",
          bottom: "20px",
          ...(isMobile
            ? {
                left: "50%",
                transform: "translateX(-50%)",
              }
            : {
                right: "40px",
                transform: "none",
              }),
          fontSize: "1rem",
          fontWeight: "400",
          color: "#fff",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <ShinyText text="scroll down" speed={3} />
        <motion.svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ marginTop: "2px" }}
          animate={{ y: visible ? [0, 5, 0] : 0 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.8"
          />
        </motion.svg>
      </motion.div>
    </div>
  );
};

export default Hero;
