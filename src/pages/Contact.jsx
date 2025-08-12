import React, { useEffect } from "react";
import { motion } from "framer-motion";
import ContactForm from "../components/ContactForm";
import Nav from "../components/Nav";
import CustomCursor from "../components/CustomCursor";
import GradientBackground from "../components/GradientBackground";

const ContactPage = () => {
  useEffect(() => {
    // Force a re-render after component mounts
    const timer = setTimeout(() => {
      // Trigger any necessary updates
      window.dispatchEvent(new Event("resize"));
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <CustomCursor />
      <Nav />
      <GradientBackground />
      <div className="min-h-screen flex items-center justify-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-4xl mx-auto px-4"
        >
          <ContactForm />
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;