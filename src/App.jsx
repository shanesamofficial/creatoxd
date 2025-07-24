import React, { useState, useEffect } from "react";
import Hero from "./components/Hero";
import Nav from "./components/Nav";
import { HashLoader } from "react-spinners";
import IntroSection from "./components/IntroSection";
import CustomCursor from "./components/CustomCursor";
import DotGrid from "./components/DotGrid"; // Import DotGrid
import { AnimatePresence, motion } from "framer-motion";
import ContactForm from "./components/ContactForm";
import { Routes, Route } from "react-router-dom";
import ContactPage from "./pages/Contact";
import ServicesSection from "./components/ServicesSection";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <CustomCursor />
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
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -1, // <-- changed from 0 to -1
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
        }}
      />
      {loading ? (
        <div className="h-screen bg-black flex items-center justify-center">
          <HashLoader color="#ffffffa2" size={60} />
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -60 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            key="hero"
          >
            <Nav />
            <Hero />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -60 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
            key="intro"
          >
            <IntroSection />
          </motion.div>
        </AnimatePresence>
      }
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Nav />
              <Hero />
              <IntroSection />
              <ServicesSection /> {/* <-- Add here */}
              <section
                style={{
                  width: "100%",
                  background: "#111",
                  padding: "4rem 0",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ContactForm />
              </section>
              <footer
                style={{
                  width: "100%",
                  padding: "2rem 0 1rem 0",
                  textAlign: "center",
                  color: "#ccc",
                  background: "#222",
                  borderTop: "1px solid #333",
                }}
              >
                <nav style={{ marginBottom: "1rem" }}>
                  <ul
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "2rem",
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                    }}
                  >
                    <li>
                      <a
                        href="/"
                        style={{ color: "#ccc", textDecoration: "none" }}
                      >
                        Home
                      </a>
                    </li>
                    <li>
                      <a
                        href="#services"
                        style={{ color: "#ccc", textDecoration: "none" }}
                      >
                        Services
                      </a>
                    </li>
                    <li>
                      <a
                        href="#portfolio"
                        style={{ color: "#ccc", textDecoration: "none" }}
                      >
                        Portfolio
                      </a>
                    </li>
                    <li>
                      <a
                        href="#partners"
                        style={{ color: "#ccc", textDecoration: "none" }}
                      >
                        Partners
                      </a>
                    </li>
                    <li>
                      <a
                        href="#contact"
                        style={{ color: "#ccc", textDecoration: "none" }}
                      >
                        Contact
                      </a>
                    </li>
                  </ul>
                </nav>
                &copy; {new Date().getFullYear()} CreatoXD. All rights reserved.
              </footer>
            </>
          }
        />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </>
  );
}

export default App;
