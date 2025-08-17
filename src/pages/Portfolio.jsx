import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "../components/Nav";
import CustomCursor from "../components/CustomCursor";
import GradientBackground from "../components/GradientBackground";
import BlurText from "../components/BlurText";
import { FiExternalLink, FiEye, FiX } from "react-icons/fi";
import tedxImage from "../assets/tedx.jpg";
import ranitouchImage from "../assets/ranitouch.jpg"; // added

const portfolioItems = [
  {
    id: 1,
    title: "TEDxSaintgits",
    image: tedxImage,
    category: "Event Design",
    description: "Visual identity and promotional materials for TEDxSaintgits event.",
    tags: ["Graphic Design", "Branding", "Event"],
    link: "https://www.behance.net/gallery/232697449/TedxSaintgits",
  },
  {
    id: 2,
    title: "RaniTouch",
    image: ranitouchImage,
    category: "Branding",
    description: "Logo and business card design for RaniTouch.",
    tags: ["Logo", "Business Card", "Branding"],
    link: "https://www.behance.net/gallery/232702415/Logo-and-Business-Card",
  },
];

export default function PortfolioPage() {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!preview) return;
    const onKey = (e) => e.key === "Escape" && setPreview(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [preview]);

  return (
    <div className="min-h-screen bg-black relative">
      <CustomCursor />
      <GradientBackground />
      <Nav />

      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <BlurText
              text="Portfolio"
              animateBy="words"
              delay={120}
              direction="top"
              className="font-nasalization w-full justify-center text-center text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-wider uppercase"
            />
            <p className="mt-4 text-neutral-300 max-w-3xl mx-auto">
              Explore our creative work and successful projects across various industries.
            </p>
          </motion.div>

          {/* Portfolio Grid */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {portfolioItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group backdrop-blur-sm bg-white/5 rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-500"
              >
                {/* Image */}
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex gap-3">
                      <button
                        aria-label="Preview"
                        onClick={() => setPreview(item)}
                        className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                      >
                        <FiEye className="w-5 h-5 text-white" />
                      </button>
                      <a
                        aria-label="Open project"
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                      >
                        <FiExternalLink className="w-5 h-5 text-white" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-white/10 text-white rounded-full">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neutral-200 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-neutral-400 text-sm mb-4 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 text-xs bg-white/5 text-neutral-300 rounded border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Preview Modal */}
          <AnimatePresence>
            {preview && (
              <motion.div
                key="lightbox"
                className="fixed inset-0 z-[2000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setPreview(null)}
              >
                <motion.div
                  className="relative max-w-5xl w-full"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 120, damping: 18 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={preview.image}
                    alt={preview.title}
                    className="w-full h-auto rounded-2xl border border-white/10 shadow-2xl"
                  />
                  <button
                    aria-label="Close preview"
                    onClick={() => setPreview(null)}
                    className="absolute -top-3 -right-3 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full border border-white/20"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {portfolioItems.length === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center mt-16 text-neutral-400"
            >
              <p>More projects coming soon...</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}