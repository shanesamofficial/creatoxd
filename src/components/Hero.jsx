import React, { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useNavigate } from "react-router-dom";
import TextType from "./TextType";
import ShinyText from "./ShinyText";
import logo from "../assets/logo.png";
import bgImage from "../assets/bg.jpg";
import bgImageMobile from "../assets/bg1.jpg";
import shaneSignature from "../assets/shane.png";

const Hero = () => {
  const [visible, setVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
  const { scrollY } = useScroll();
  const [isInHero, setIsInHero] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 600);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => setVisible(latest < 100));

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
        backgroundImage: `url(${isMobile ? bgImageMobile : bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "black",
        color: "#fff",
        overflow: "hidden",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.05), rgba(0,0,0,0.15))",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      <div className="relative" style={{ zIndex: 2, width: "100%", height: "100%" }}>
        {/* Removed bottom-left desktop logo block */}
        
        {/* Desktop centered logo + fixed-distance animated text (updated) */}
        {!isMobile && (
          <div
            style={{
              position: "absolute",
              top: "29%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              zIndex: 3,
              pointerEvents: "none",
              maxWidth: "92vw",
              // gap removed to lock spacing; using explicit margin on text instead
            }}
          >
            <motion.img
              src={logo}
              alt="CreatoXD Logo"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              style={{
                height: "100vh",
                maxHeight: "900px",
                width: "auto",
                objectFit: "contain",
                maxWidth: "1400px",
              }}
            />
            <div
              style={{
                marginTop: "-350px",              // fixed distance below logo
                fontSize: "1.25rem",
                fontWeight: 500,
                lineHeight: 1.1,
                letterSpacing: "1.5px",
                fontFamily: "'Montserrat','Poppins','Segoe UI',sans-serif",
                minHeight: "2.6rem",            // reserves space so typing doesn't shift upward
                color: "#FFFFFF",
                textShadow: "0 0 12px rgba(255,255,255,0.25)",
                width: "100%",
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
          </div>
        )}

        {/* Mobile logo (unchanged) */}
        {isMobile && isInHero && (
          <div
            style={{
              position: "absolute",
              top: "45%",
              left: "50%",
              transform: "translate(-50%, -50%)",
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
                height: "300px",
                width: "auto",
                objectFit: "contain",
                maxWidth: "90vw",
              }}
            />
          </div>
        )}

        {isMobile && (
          <div
            style={{
              position: "absolute",
              bottom: "125px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "100%",
              textAlign: "center",
              fontSize: "1.2rem",
              fontWeight: 500,
              letterSpacing: "1px",
              fontFamily: "'Montserrat','Poppins','Segoe UI',sans-serif",
              minHeight: "2.5rem",
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
        )}

        {/* Bottom credit (desktop only, signature enlarged) */}
        {!isMobile && (
          <div
            style={{
              position: "absolute",
              bottom: "-55px",
              left: "50%",
              transform: "translateX(-50%)",
              textAlign: "center",
              zIndex: 3,
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                fontFamily: "'Unbounded ExtraLight','Unbounded','Montserrat',sans-serif",
                fontWeight: 200,
                fontSize: "16.7px",
                letterSpacing: "0.5px",
                opacity: 1,
              }}
            >
              Design by
            </div>
            {/* Hover animation wrapper */}
            <div style={{ pointerEvents: "auto", display: "inline-block", marginTop: "-87px" }}>
              <motion.img
                src={shaneSignature}
                alt="Shane Sam Signature"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{
                  filter:
                    "brightness(1.15) drop-shadow(0 0 6px rgba(255,255,255,0.55)) drop-shadow(0 0 18px rgba(255,255,255,0.35))",
                }}
                transition={{ type: "tween", duration: 0.35 }}
                style={{
                  height: "250px",
                  width: "auto",
                  cursor: "pointer",
                  userSelect: "none",
                  filter: "brightness(1) drop-shadow(0 0 2px rgba(255,255,255,0.15))",
                }}
              />
            </div>
          </div>
        )}

        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: visible ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "absolute",
              ...(isMobile
                ? { bottom: "55px", left: "50%", transform: "translateX(-50%)" }
                : { right: "40px", bottom: "30px" }),
              fontSize: "1rem",
              fontWeight: 400,
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
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
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
