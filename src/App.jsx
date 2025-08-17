import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, BrowserRouter as Router } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { HashLoader } from "react-spinners";
import { FaLinkedin, FaInstagram, FaTwitter } from "react-icons/fa";
import Hero from "./components/Hero";
import Nav from "./components/Nav";
import CustomCursor from "./components/CustomCursor";
import ContactForm from "./components/ContactForm";
import ContactPage from "./pages/Contact";
import ServicesSection from "./components/ServicesSection";
import FeaturesSection from "./components/FeaturesSection";
import GradientBackground from "./components/GradientBackground";
import logo from "./assets/logo-s.png";
import PartnersPage from './pages/Partners';
import AboutPage from "./pages/About";
import PortfolioPage from "./pages/Portfolio";

function AppContent() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Handle page-specific body classes and scroll behavior
  useEffect(() => {
    // Reset scroll position when navigating to home
    if (location.pathname === "/") {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.body.classList.add('home-page');
      // Scroll to top immediately
      window.scrollTo(0, 0);
      // Small delay to ensure DOM is ready, then scroll to hero
      setTimeout(() => {
        const heroSection = document.getElementById('hero-section');
        if (heroSection) {
          heroSection.scrollIntoView({ behavior: 'instant', block: 'start' });
        }
      }, 100);
    } else {
      // For other pages, allow normal scrolling
      document.documentElement.style.overflow = 'auto';
      document.body.style.overflow = 'auto';
      document.body.classList.remove('home-page');
      window.scrollTo(0, 0);
    }

    return () => {
      document.body.classList.remove('home-page');
    };
  }, [location.pathname]);

  useEffect(() => {
    if (location.state?.scrollTo) {
      const id = location.state.scrollTo;
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    }
  }, [location]);

  if (loading) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <HashLoader color="#ffffffa2" size={60} />
      </div>
    );
  }

  return (
    <div className="relative bg-black min-h-screen">
      <CustomCursor />
      <Nav />
      <GradientBackground />
      
      <Routes>
        <Route
          path="/"
          element={
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div className="snap-container">
                  {/* Hero Section */}
                  <motion.section
                    id="hero-section"
                    className="min-h-screen relative flex flex-col justify-center"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{ transform: 'translateZ(0)' }} // Force hardware acceleration
                  >
                    <Hero />
                  </motion.section>

                  {/* Services Section */}
                  <motion.section
                    id="services"
                    className="min-h-screen relative bg-black"
                    initial={{ scale: 0.95, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <ServicesSection />
                  </motion.section>

                  {/* Features Section - above About */}
                  <motion.section
                    className="relative bg-black" // ensure no min-h-screen here
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 24 }}
                    transition={{ duration: 0.6 }}
                  >
                    <FeaturesSection />
                  </motion.section>

                  {/* Combined Contact and Footer Page */}
                  <motion.div className="min-h-screen relative bg-black flex flex-col">
                    {/* Contact Form Section */}
                    <motion.section
                      id="contact"
                      className="flex items-center justify-center py-4"
                      initial={{ scale: 0.95, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.95, opacity: 0 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                      <div className="relative z-10">
                        <ContactForm />
                      </div>
                    </motion.section>

                    {/* Footer Section */}
                    <motion.footer
                      className="w-full py-12 pb-16 md:pb-12 text-[#ccc] bg-[#222] border-t border-[#333]"
                      initial={{ scale: 0.95, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.95, opacity: 0 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
                        {/* Logo and Description */}
                        <div className="col-span-1 flex flex-col items-center md:items-start">
                          <div className="mb-4 md:-mb-8 flex justify-center md:justify-start w-full md:pl-0">
                            <img
                              src={logo}
                              alt="CreatoXD Logo"
                              className="h-12 sm:h-24 md:h-36 w-auto object-contain -ml-0 md:-ml-4"
                              style={{ 
                                maxWidth: '100%',
                              }}
                            />
                          </div>
                          <p className="text-sm md:text-base text-gray-400 text-center md:text-left">
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
                                href="/partners"
                                className="text-gray-400 hover:text-white transition-colors"
                              >
                                Partners
                              </a>
                            </li>
                            <li>
                              <a
                                href="/contact"
                                className="text-gray-400 hover:text-white transition-colors"
                              >
                                Contact
                              </a>
                            </li>
                            <li>
                              <a
                                href="/about"
                                className="text-gray-400 hover:text-white transition-colors"
                              >
                                About
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
                                Web Development
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
                                Branding
                              </a>
                            </li>
                            <li>
                              <a
                                href="#services"
                                className="text-gray-400 hover:text-white transition-colors"
                              >
                                Photo Editing
                              </a>
                            </li>
                            <li>
                              <a
                                href="#services"
                                className="text-gray-400 hover:text-white transition-colors"
                              >
                                Video Editing
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
                              <a
                                href="mailto:team.creatoxd@gmail.com"
                                className="hover:text-white transition-colors"
                              >
                                Email: team.creatoxd@gmail.com
                              </a>
                            </li>
                            <li className="text-gray-400">
                              Location: Kerala, India
                            </li>
                          </ul>

                          {/* Follow Us */}
                          <div className="mt-8">
                            <h3 className="text-white font-semibold mb-4 text-lg">
                              Follow Us
                            </h3>
                            <div className="flex space-x-4">
                              <a
                                href="https://www.linkedin.com/company/creatoxd/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition-colors"
                              >
                                <FaLinkedin className="w-6 h-6" />
                              </a>
                              <a
                                href="https://www.instagram.com/creato.xd"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition-colors"
                              >
                                <FaInstagram className="w-6 h-6" />
                              </a>
                              <a
                                href="https://twitter.com/your-company"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition-colors"
                              >
                                <FaTwitter className="w-6 h-6" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.footer>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          }
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/partners" element={<PartnersPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;