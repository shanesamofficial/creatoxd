import React from "react";
import DotGrid from "./DotGrid";

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
    </div>
  );
};

export default Hero;
