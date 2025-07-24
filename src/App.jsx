import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { HashLoader } from "react-spinners";
import Hero from "./components/Hero";
import Nav from "./components/Nav";
import IntroSection from "./components/IntroSection";
import CustomCursor from "./components/CustomCursor";
import DotGrid from "./components/DotGrid";
import ContactForm from "./components/ContactForm";
import ContactPage from "./pages/Contact";
import ServicesSection from "./components/ServicesSection";
import GradientBackground from "./components/GradientBackground";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <HashLoader color="#ffffffa2" size={60} />
      </div>
    );
  }

  return (
    <>
      <CustomCursor />
      <Nav />
      <Routes>
        <Route
          path="/"
          element={
            <AnimatePresence mode="wait">
              <motion.div
                className="snap-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                key="home"
              >
                {/* Hero Section - Keep DotGrid here */}
                <motion.section
                  className="min-h-screen relative"
                  initial={{ scale: 0.95, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <DotGrid
                    className="absolute inset-0 z-0"
                    dotSize={3}
                    gap={15}
                    baseColor="#271E37"
                    activeColor="#5227FF"
                  />
                  <Hero />
                </motion.section>

                {/* Intro Section - Remove DotGrid */}
                <motion.section
                  className="min-h-screen relative bg-black"
                  initial={{ scale: 0.95, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <IntroSection />
                </motion.section>

                {/* Services Section - Remove DotGrid */}
                <motion.section
                  className="min-h-screen relative bg-black"
                  initial={{ scale: 0.95, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <ServicesSection />
                </motion.section>

                {/* Combined Contact and Footer Page */}
                <motion.div className="min-h-screen relative bg-black flex flex-col">
                  {/* Contact Form Section */}
                  <motion.section
                    className="flex items-center justify-center py-4" // Reduced padding and removed flex-1
                    initial={{ scale: 0.95, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <div className="relative z-10"> {/* Removed py-4 padding */}
                      <ContactForm />
                    </div>
                  </motion.section>

                  {/* Footer Section */}
                  <motion.footer
                    className="w-full py-12 text-[#ccc] bg-[#222] border-t border-[#333]"
                    initial={{ scale: 0.95, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
                      {/* Logo and Description */}
                      <div className="col-span-1">
                        <div className="flex items-baseline mb-6">
                          <span
                            className="text-4xl font-bold text-white"
                            style={{
                              fontFamily:
                                "'Montserrat', 'Poppins', 'Segoe UI', Arial, sans-serif",
                            }}
                          >
                            Creato
                          </span>
                          <span
                            className="text-4xl font-bold text-[#5227FF]"
                            style={{
                              fontFamily:
                                "'Montserrat', 'Poppins', 'Segoe UI', Arial, sans-serif",
                            }}
                          >
                            XD
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 mb-4">
                          Empowering Creativity, Delivering Excellence.
                        </p>
                      </div>

                      {/* Pages Links */}
                      <div className="col-span-1">
                        <h3 className="text-white font-semibold mb-4 text-lg">
                          Pages
                        </h3>
                        <ul className="space-y-3">
                          <li>
                            <a
                              href="/"
                              className="text-gray-400 hover:text-white transition-colors"
                            >
                              Home
                            </a>
                          </li>
                          <li>
                            <a
                              href="#portfolio"
                              className="text-gray-400 hover:text-white transition-colors"
                            >
                              Portfolio
                            </a>
                          </li>
                          <li>
                            <a
                              href="#partners"
                              className="text-gray-400 hover:text-white transition-colors"
                            >
                              Partners
                            </a>
                          </li>
                          <li>
                            <a
                              href="#contact"
                              className="text-gray-400 hover:text-white transition-colors"
                            >
                              Contact
                            </a>
                          </li>
                        </ul>
                      </div>

                      {/* Services Links */}
                      <div className="col-span-1">
                        <h3 className="text-white font-semibold mb-4 text-lg">
                          Services
                        </h3>
                        <ul className="space-y-3">
                          <li>
                            <a
                              href="#services"
                              className="text-gray-400 hover:text-white transition-colors"
                            >
                              Graphic Designing
                            </a>
                          </li>
                          <li>
                            <a
                              href="#services"
                              className="text-gray-400 hover:text-white transition-colors"
                            >
                              UI/UX Designing
                            </a>
                          </li>
                          <li>
                            <a
                              href="#services"
                              className="text-gray-400 hover:text-white transition-colors"
                            >
                              Photo & Video Editing
                            </a>
                          </li>
                          <li>
                            <a
                              href="#services"
                              className="text-gray-400 hover:text-white transition-colors"
                            >
                              Web Development
                            </a>
                          </li>
                        </ul>
                      </div>

                      {/* Contact Info */}
                      <div className="col-span-1">
                        <h3 className="text-white font-semibold mb-4 text-lg">
                          Contact
                        </h3>
                        <ul className="space-y-3">
                          <li className="text-gray-400">
                            Email: contact@creatoxd.com
                          </li>
                          <li className="text-gray-400">
                            Location: Your Location Here
                          </li>
                        </ul>
                      </div>
                    </div>
                  </motion.footer>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          }
        />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </>
  );
}

export default App;