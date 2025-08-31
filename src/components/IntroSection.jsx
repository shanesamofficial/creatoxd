import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import meImage from "../assets/me.png";
import ShinyText from "./ShinyText";
import { FaLinkedin, FaBehance, FaInstagram } from "react-icons/fa";
import { FiArrowUpRight, FiX, FiDownload } from "react-icons/fi";

export default function IntroSection({ compact = false }) {
  const [showResume, setShowResume] = useState(false);
  const [pdfLoaded, setPdfLoaded] = useState(false);

  const resumeSrc = "/resume.pdf";

  const socialLinks = [
    {
      icon: FaLinkedin,
      href: "https://www.linkedin.com/in/shanesamofficial",
      label: "LinkedIn",
    },
    {
      icon: FaBehance,
      href: "https://www.behance.net/shanesam2",
      label: "Behance",
    },
    {
      icon: FaInstagram,
      href: "https://www.instagram.com/shanesamofficial",
      label: "Instagram",
    },
  ];

  if (compact) {
    return (
      <div className="w-full bg-black">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-0">
          <div className="max-w-7xl mx-auto w-full">
            <motion.div
              className="backdrop-blur-sm bg-white/5 rounded-2xl border border-white/10 p-6 md:p-8"
              whileHover={{
                boxShadow: "0 0 30px rgba(255,255,255,0.1)",
                borderColor: "rgba(255,255,255,0.2)",
                transition: { duration: 0.3 },
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 items-start md:items-center gap-4 md:gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="relative flex justify-center md:justify-start"
                >
                  <img
                    src={meImage}
                    alt="Shane Sam"
                    className="w-[150px] sm:w-[200px] md:w-[250px] max-w-sm rounded-2xl shadow-xl object-cover"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="space-y-3 md:space-y-4"
                >
                  <h2
                    className="w-full text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 text-center md:text-left uppercase tracking-wider"
                    style={{ fontFamily: "Nasalization" }}
                  >
                    <ShinyText text="FOUNDER" speed={4} />
                  </h2>
                  <div className="space-y-3 text-neutral-600 dark:text-neutral-300 text-sm sm:text-base">
                    <p className="text-justify md:text-justify leading-relaxed max-w-prose mx-auto md:mx-0">
                      Shane Sam, the creative force behind CreatoXD, is a passionate
                      designer, developer, and storyteller. With a background in
                      Computer Science and years of hands-on experience in graphic
                      design, photo and video editing, and web development.
                    </p>
                  </div>
                  <div className="flex items-center justify-center md:justify-start space-x-4">
                    {socialLinks.map((social) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/70 hover:text-white transition-colors text-xl"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <social.icon />
                      </motion.a>
                    ))}
                  </div>
                  <div className="flex justify-center md:justify-start mt-3 md:mt-6">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowResume(true)}
                      className="group bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-all duration-300 flex items-center gap-2 px-6 py-2 text-sm"
                    >
                      <span>View Resume</span>
                      <FiArrowUpRight className="text-lg transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Resume Modal */}
        <AnimatePresence>
          {showResume && (
            <motion.div
              className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowResume(false)}
            >
              <motion.div
                className="relative w-full max-w-5xl h-[80vh] bg-neutral-900/90 border border-white/10 rounded-2xl overflow-hidden flex flex-col"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 120, damping: 18 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                  <h3 className="text-lg font-semibold tracking-wide">Resume Preview</h3>
                  <div className="flex items-center gap-3">
                    <a
                      href={resumeSrc}
                      download="Shane_Sam_Resume.pdf"
                      className="inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-md bg-white/10 hover:bg-white/20 transition"
                    >
                      <FiDownload />
                      Download
                    </a>
                    <button
                      onClick={() => setShowResume(false)}
                      className="p-2 rounded-md hover:bg-white/10 transition"
                      aria-label="Close"
                    >
                      <FiX className="text-xl" />
                    </button>
                  </div>
                </div>
                <div className="flex-1 bg-black/40 relative">
                  {!pdfLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center text-sm text-white/60">
                      Loading PDF...
                    </div>
                  )}
                  <iframe
                    title="Resume PDF"
                    src={`${resumeSrc}#toolbar=0&navpanes=0&scrollbar=0`}
                    className="w-full h-full"
                    onLoad={() => setPdfLoaded(true)}
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Original non-compact version
  return (
    <section className="min-h-screen w-full bg-black">
      <div className="w-full min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(50,50,50,0.2) 0%, rgba(0,0,0,0.5) 100%)",
            mixBlendMode: "overlay",
          }}
        />
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <motion.div
            className="backdrop-blur-sm bg-white/5 rounded-2xl border border-white/10 p-8 md:p-12"
            whileHover={{
              boxShadow: "0 0 30px rgba(255,255,255,0.1)",
              borderColor: "rgba(255,255,255,0.2)",
              transition: { duration: 0.3 },
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 items-start md:items-center gap-6 md:gap-8">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative flex justify-center md:justify-start"
              >
                <img
                  src={meImage}
                  alt="Shane Sam"
                  className="w-[200px] sm:w-[300px] md:w-full max-w-md rounded-2xl shadow-xl object-cover"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-4 md:space-y-6"
              >
                <h2
                  className="w-full text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 text-center md:text-left uppercase tracking-wider"
                  style={{ fontFamily: "Nasalization" }}
                >
                  <ShinyText text="FOUNDER" speed={4} />
                </h2>
                <div className="space-y-3 text-neutral-600 dark:text-neutral-300 text-base sm:text-lg md:text-xl">
                  <p className="text-justify md:text-justify leading-relaxed max-w-prose mx-auto md:mx-0">
                    Shane Sam, the creative force behind CreatoXD, is a passionate
                    designer, developer, and storyteller. With a background in
                    Computer Science and years of hands-on experience in graphic
                    design, photo and video editing, and web development.
                  </p>
                </div>
                <div className="flex items-center justify-center md:justify-start space-x-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 hover:text-white transition-colors text-2xl"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.icon />
                    </motion.a>
                  ))}
                </div>
                <div className="flex justify-center md:justify-start mt-4 md:mt-20">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowResume(true)}
                    className="group bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-all duration-300 flex items-center gap-2 px-8 py-3"
                  >
                    <span>View Resume</span>
                    <FiArrowUpRight className="text-lg transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Resume Modal */}
      <AnimatePresence>
        {showResume && (
          <motion.div
            className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowResume(false)}
          >
            <motion.div
              className="relative w-full max-w-5xl h-[80vh] bg-neutral-900/90 border border-white/10 rounded-2xl overflow-hidden flex flex-col"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                <h3 className="text-lg font-semibold tracking-wide">Resume Preview</h3>
                <div className="flex items-center gap-3">
                  <a
                    href={resumeSrc}
                    download="Shane_Sam_Resume.pdf"
                    className="inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-md bg-white/10 hover:bg-white/20 transition"
                  >
                    <FiDownload />
                    Download
                  </a>
                  <button
                    onClick={() => setShowResume(false)}
                    className="p-2 rounded-md hover:bg-white/10 transition"
                    aria-label="Close"
                  >
                    <FiX className="text-xl" />
                  </button>
                </div>
              </div>
              <div className="flex-1 bg-black/40 relative">
                {!pdfLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center text-sm text-white/60">
                    Loading PDF...
                  </div>
                )}
                <iframe
                  title="Resume PDF"
                  src={`${resumeSrc}#toolbar=0&navpanes=0&scrollbar=0`}
                  className="w-full h-full"
                  onLoad={() => setPdfLoaded(true)}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}