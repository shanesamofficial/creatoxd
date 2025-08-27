import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Nav from "../../components/Nav";
import CustomCursor from "../../components/CustomCursor";
import GradientBackground from "../../components/GradientBackground";
import BlurText from "../../components/BlurText";
import { FiArrowLeft, FiCode, FiGlobe, FiZap } from "react-icons/fi";

export default function WebDevelopmentPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(false);
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-black relative flex items-center justify-center">
        <CustomCursor />
        <GradientBackground />
        <Nav />
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative">
      <CustomCursor />
      <GradientBackground />
      <Nav />

      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Back button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => navigate("/portfolio")}
            className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-8 group"
          >
            <FiArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Portfolio</span>
          </motion.button>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <BlurText
              text="Web Development"
              animateBy="words"
              delay={120}
              direction="top"
              className="font-nasalization w-full justify-center text-center text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-wider uppercase mb-6"
            />
            <p className="text-neutral-300 max-w-3xl mx-auto text-lg">
              Modern, responsive websites and web applications built with cutting-edge technologies.
            </p>
          </motion.div>

          {/* Coming Soon Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="backdrop-blur-sm bg-white/5 rounded-3xl border border-white/10 p-12 md:p-16">
              <div className="flex justify-center mb-8">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center border border-white/10">
                  <FiCode className="w-12 h-12 text-blue-400" />
                </div>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-nasalization">
                Coming Soon
              </h2>
              
              <p className="text-neutral-300 text-lg mb-8 leading-relaxed">
                We're currently working on showcasing our latest web development projects. 
                Check back soon to see our amazing websites and web applications!
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <FiGlobe className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                  <h3 className="text-white font-semibold mb-2">Responsive Design</h3>
                  <p className="text-neutral-400 text-sm">Mobile-first, adaptive layouts</p>
                </div>
                <div className="text-center">
                  <FiCode className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                  <h3 className="text-white font-semibold mb-2">Modern Tech</h3>
                  <p className="text-neutral-400 text-sm">React, Next.js, Node.js</p>
                </div>
                <div className="text-center">
                  <FiZap className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                  <h3 className="text-white font-semibold mb-2">Performance</h3>
                  <p className="text-neutral-400 text-sm">Fast, optimized experiences</p>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                {["React", "Next.js", "Node.js", "TypeScript", "Tailwind CSS", "MongoDB"].map((tech, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 text-sm bg-blue-500/20 text-blue-300 rounded-full border border-blue-400/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}