import React from "react";
import { motion } from "framer-motion";
import meImage from "../assets/me.png";
import ShinyText from "./ShinyText"; // Import ShinyText component

const IntroSection = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <img
              src={meImage}
              alt="Shane Sam"
              className="rounded-2xl shadow-xl w-full max-w-md mx-auto"
              style={{ objectFit: "cover" }}
            />
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200">
              <ShinyText text="About Me" speed={3} />
            </div>

            <div className="space-y-4 text-lg sm:text-xl text-neutral-600 dark:text-neutral-300">
              <p>
                Shane Sam, the creative force behind CreatoXD, is a passionate designer,
                developer, and storyteller. With a background in Computer Science and
                years of hands-on experience in graphic design, photo and video editing,
                and web development, Shane founded CreatoXD to bridge the gap between
                creativity and technology.
              </p>
              <p>
                From designing impactful brand visuals to building sleek, user-focused
                websites, Shane leads with a vision to turn ideas into stunning digital
                experiences. Every project at CreatoXD reflects a commitment to detail,
                originality, and meaningful design.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200">
                <ShinyText text="Services" speed={3} />
              </h3>

              <ul className="space-y-3 text-neutral-600 dark:text-neutral-300">
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Graphic Design & Branding</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Web Development & UI/UX Design</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Photo and Video Editing</span>
                </li>
              </ul>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-all duration-300"
            >
              View My Work
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default IntroSection;