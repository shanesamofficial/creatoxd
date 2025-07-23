import React from "react";
import { motion } from "framer-motion";

const tagline = "Empowering Creativity, Delivering Excellence.";

export default function IntroSection() {
  return (
    <section
      style={{
        width: "100%",
        minHeight: "60vh",
        background: "#0a0a0a",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "4rem 1rem",
      }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          fontSize: "3rem",
          fontWeight: "700",
          marginBottom: "1.5rem",
          textAlign: "center",
          fontFamily: "'Montserrat', 'Poppins', 'Segoe UI', Arial, sans-serif",
        }}
      >
        Welcome to CreatoXD
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        style={{
          fontSize: "1.5rem",
          fontWeight: "400",
          maxWidth: "700px",
          textAlign: "center",
          marginBottom: "2rem",
          color: "#e0e0e0",
        }}
      >
        {tagline}
      </motion.p>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
        style={{
          width: "100px",
          height: "6px",
          borderRadius: "3px",
          background: "linear-gradient(90deg, #5227FF 0%, #06b6d4 100%)",
          margin: "0 auto",
        }}
      />
    </section>
  );
}