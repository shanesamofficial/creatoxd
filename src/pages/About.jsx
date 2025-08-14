import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Nav from "../components/Nav";
import CustomCursor from "../components/CustomCursor";
import GradientBackground from "../components/GradientBackground";
import IntroSection from "../components/IntroSection";
import { FiMail, FiMapPin, FiClock } from "react-icons/fi";
import BlurText from "../components/BlurText";

export default function AboutPage() {
  useEffect(() => {
    const t = setTimeout(() => window.dispatchEvent(new Event("resize")), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-black relative">
      <CustomCursor />
      <GradientBackground />
      <Nav />

      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-4 md:mb-6"
          >
            <BlurText
              text="About Us"
              animateBy="words"
              delay={120}
              direction="top"
              className="font-nasalization w-full justify-center text-center text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-wider uppercase"
            />
            <p className="mt-2 text-neutral-300 max-w-3xl mx-auto">
              Learn more about who we are, what we do, and how we deliver.
            </p>
          </motion.div>

          {/* Founder Card */}
          <div className="mb-8 max-w-4xl mx-auto">
            <IntroSection compact />
          </div>

          {/* Contact Info */}
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-6">
              Contact Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-3 text-white">
                  <FiMail className="w-5 h-5 opacity-80" />
                  <h3 className="font-semibold">Email</h3>
                </div>
                <a
                  href="mailto:team.creatoxd@gmail.com"
                  className="text-neutral-300 hover:text-white transition-colors break-all"
                >
                  team.creatoxd@gmail.com
                </a>
              </div>

              <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-3 text-white">
                  <FiMapPin className="w-5 h-5 opacity-80" />
                  <h3 className="font-semibold">Location</h3>
                </div>
                <p className="text-neutral-300">Kerala, India</p>
              </div>

              <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-3 text-white">
                  <FiClock className="w-5 h-5 opacity-80" />
                  <h3 className="font-semibold">Hours</h3>
                </div>
                <p className="text-neutral-300">Mon–Fri, 9:00 AM – 6:00 PM IST</p>
              </div>
            </div>

            <div className="text-center mt-8">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full transition-all duration-300"
              >
                Get in Touch
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}