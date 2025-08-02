import React from "react";
import { motion } from "framer-motion";
import meImage from "../assets/me.png";
import ShinyText from "./ShinyText";

const IntroSection = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
      style={{
        background: "linear-gradient(135deg, #000000 0%, #1a1a1a 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(50, 50, 50, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%)",
          mixBlendMode: "overlay",
        }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <motion.div
          className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 md:p-12 border border-white/10"
          whileHover={{
            boxShadow: "0 0 30px rgba(255,255,255,0.1)",
            borderColor: "rgba(255,255,255,0.2)",
            transition: { duration: 0.3 },
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start md:items-center">
            {/* Left side - Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative flex justify-center md:justify-start"
            >
              <img
                src={meImage}
                alt="Shane Sam"
                className="rounded-2xl shadow-xl w-[200px] sm:w-[300px] md:w-full max-w-md object-cover"
              />
            </motion.div>

            {/* Right side - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4 md:space-y-6"
            >
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-neutral-800 dark:text-neutral-200 text-center md:text-left">
                <ShinyText text="About Me" speed={3} />
              </div>

              <div className="space-y-4 text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-300">
                <p className="text-center md:text-left">
                  Shane Sam, the creative force behind CreatoXD, is a passionate
                  designer, developer, and storyteller. With a background in
                  Computer Science and years of hands-on experience in graphic
                  design, photo and video editing, and web development.
                </p>
              </div>

              <div className="flex justify-center md:justify-start mt-4 md:mt-20"> {/* Added more margin-top for desktop */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-all duration-300"
                >
                  View My Work
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default IntroSection;