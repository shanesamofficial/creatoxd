import React, { useEffect, useState } from "react";
import DotGrid from "./DotGrid";
import TextType from "./TextType"; // <-- Import your new animation component

const Hero = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
        backgroundColor: "#000",
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
          pauseDuration={500}
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
          fontSize: "13rem",
          fontWeight: "bold",
          color: "#fff",
        }}
      >
        CreatoXD
      </div>

      {/* Bottom Right Scroll Down */}
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          right: "40px",
          fontSize: "1rem",
          fontWeight: "400",
          color: "#fff",
          cursor: "pointer",
          opacity: 0.6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        scroll down
        {/* V-shaped arrow SVG */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ marginTop: "2px" }}
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.8"
          />
        </svg>
      </div>
    </div>
  );
};

export default Hero;
