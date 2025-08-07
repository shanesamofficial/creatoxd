import React, { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import TextType from "./TextType";
import ShinyText from "./ShinyText";
import logo from "../assets/logo.png";
import bgImage from "../assets/bg.jpg";

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
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "black",
        color: "#fff",
        overflow: "hidden",
      }}
    >
      {/* Background Overlay - Make it lighter and set z-index: 1 */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.05), rgba(0,0,0,0.15))",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Content Container - z-index: 2 to be above overlay */}
      <div
        className="relative"
        style={{ zIndex: 2, width: "100%", height: "100%" }}
      >
        {/* Logo */}
        {(!isMobile || (isMobile && isInHero)) && (
          <div
            style={{
              position: "absolute",
              ...(isMobile
                ? {
                    top: "45%", // Changed from 50% to 45%
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
              zIndex: 3,
            }}
          >
            <motion.img
              src={logo}
              alt="CreatoXD Logo"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              style={{
                height: isMobile ? "300px" : "1300px",
                width: "auto",
                objectFit: "contain",
                maxWidth: isMobile ? "90vw" : "none",
              }}
            />
          </div>
        )}

        {/* Animated Subtitle */}
        <div
          style={{
            position: "absolute",
            ...(isMobile
              ? {
                  bottom: "125px", // Changed from 100px to 125px
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
            fontSize: isMobile ? "1.2rem" : "2rem",
            fontWeight: "500",
            color: "#ffffff",
            letterSpacing: "1px",
            minHeight: "2.5rem",
            fontFamily: "'Montserrat', 'Poppins', 'Segoe UI', Arial, sans-serif",
            opacity: 1,
            pointerEvents: "none",
            userSelect: "none",
            zIndex: 3,
          }}
        >
          <TextType
            text={[
              "Graphic Designing",
              "Web Development",
              "UI/UX Designing",
              "Branding",
              "Photo Editing",
              "Video Editing",
            ]}
            typingSpeed={40}
            pauseDuration={1000}
            deletingSpeed={25}
            showCursor={true}
            cursorCharacter="•"
            cursorBlinkDuration={0.9}
          />
        </div>

        {/* Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: visible ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "absolute",
            ...(isMobile
              ? {
                  bottom: "55px", // Changed from 30px to 55px
                  left: "50%",
                  transform: "translateX(-50%)",
                }
              : {
                  right: "40px",
                  bottom: "30px",
                  transform: "none",
                }),
            fontSize: "1rem",
            fontWeight: "400",
            color: "#ffffff",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 3,
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
              opacity="0.9"
            />
          </motion.svg>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
