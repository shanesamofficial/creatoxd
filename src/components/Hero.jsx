import React, { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion"; // Add useScroll and useMotionValueEvent
import DotGrid from "./DotGrid";
import TextType from "./TextType";
import ShinyText from "./ShinyText";
import { TextHoverEffect } from "./ui/text-hover-effect";

const Hero = () => {
  const [visible, setVisible] = useState(true);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest < 100);
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
        backgroundColor: "transparent", // Changed from #000 to transparent
        color: "#fff",
        overflow: "hidden",
      }}
    >
      {/* Dot Grid */}
      <DotGrid
        dotSize={3}
        gap={15}
        baseColor="#271E37"
        activeColor="#5227FF"
        proximity={120}
        shockRadius={400}
        shockStrength={5}
        resistance={750}
        returnDuration={1.5}
      />

      {/* Animated Subtitle Above 'CreatoXD' */}
      <div
        style={{
          position: "absolute",
          bottom: "30px", // adjust as needed for spacing above CreatoXD
          left: "55px",
          fontSize: "2rem",
          fontWeight: "500",
          color: "#e0e0e0",
          letterSpacing: "1px",
          minHeight: "2.5rem",
          fontFamily: "'Montserrat', 'Poppins', 'Segoe UI', Arial, sans-serif", // improved font
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

      {/* Bottom Left Text */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "20px",
          fontSize: window.innerWidth < 600 ? "4rem" : "13rem",
          fontWeight: "bold",
          color: "#fff",
          display: "flex",
          alignItems: "flex-end", // align XD to the bottom of Creato
        }}
      >
        <span>Creato</span>
        <span
          style={{
            display: "inline-block",
            width: "340px", // increased width
            height: "200px", // increased height
            verticalAlign: "bottom",
            overflow: "visible",
            marginLeft: "-25px",
            marginBottom: "37px", // move XD down to align better
          }}
        >
          <TextHoverEffect text="XD" />
        </span>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute",
          bottom: "40px",
          right: "40px",
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
