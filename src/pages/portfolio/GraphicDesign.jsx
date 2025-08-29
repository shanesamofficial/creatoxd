import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Nav from "../../components/Nav";
import CustomCursor from "../../components/CustomCursor";
import GradientBackground from "../../components/GradientBackground";
import BlurText from "../../components/BlurText";
import { FiEye, FiExternalLink, FiX, FiArrowLeft } from "react-icons/fi";

// Import images correctly
import tedxImage from "../../assets/tedx.jpg";
import auramagImage from "../../assets/auramag.jpg";
import bjiposterImage from "../../assets/bjiposter.jpg";
import carPosters from "../../assets/carp.jpg";

const graphicDesignProjects = [
  {
    id: 1,
    title: "TEDxSaintgits",
    image: tedxImage,
    category: "Event Design",
    description: "Visual identity and promotional materials for TEDxSaintgits event.",
    tags: ["Graphic Design", "Event Design", "Visual Identity"],
    link: "https://www.behance.net/gallery/232697449/TedxSaintgits",
  },
  {
    id: 2,
    title: "AURA Magazine",
    image: auramagImage,
    category: "Magazine Design",
    description: "Magazine cover design featuring creative color palette and typography selection for Auramag publication.",
    tags: ["Magazine Cover", "Color Palette", "Typography", "Print Design"],
    link: "https://www.behance.net/gallery/233461987/Magazine-Design",
  },
  {
    id: 3,
    title: "BJI College Event Poster",
    image: bjiposterImage,
    category: "Poster Design",
    description: "Creative poster design for college event featuring modern typography and visual elements.",
    tags: ["Poster Design", "Event Poster", "Typography", "College Event"],
    link: "https://www.behance.net/gallery/233463305/College-Event-Poster-Design",
  },
  {
    id: "car-posters",
    title: "Car Posters",
    image: carPosters,
    category: "Graphic Design",
    description:
      "Modern, stylish car poster series exploring lighting, contrast and bold automotive aesthetics.",
    tags: ["Poster", "Automotive", "Graphic Design"],
    link: "https://www.behance.net/gallery/233540917/Car-Poster-Design",
  },
];

export default function GraphicDesignPage() {
  const [preview, setPreview] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  // Force component to re-render and clean up state
  useEffect(() => {
    setIsLoaded(false);
    setPreview(null);
    
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => {
      clearTimeout(timer);
      setPreview(null);
    };
  }, []);

  useEffect(() => {
    if (!preview) return;
    const onKey = (e) => e.key === "Escape" && setPreview(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [preview]);

  // Don't render until loaded
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
          {/* Header */}
          <motion.div
            key="header"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
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

            <div className="text-center">
              <BlurText
                text="Graphic Design"
                animateBy="words"
                delay={120}
                direction="top"
                className="font-nasalization w-full justify-center text-center text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-wider uppercase"
              />
              <p className="mt-6 text-neutral-300 max-w-3xl mx-auto text-lg">
                Creative visual solutions including event design, magazine covers, poster design, and promotional materials.
              </p>
            </div>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            key="projects-grid"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {graphicDesignProjects.map((item, index) => (
              <motion.div
                key={`${item.id}-${isLoaded}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group backdrop-blur-sm bg-white/5 rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-500"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onLoad={() => console.log(`Loaded: ${item.title}`)}
                    onError={(e) => {
                      console.error("Image failed to load:", item.image);
                      e.target.style.backgroundColor = '#1a1a1a';
                      e.target.alt = 'Image failed to load';
                    }}
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
                      {item.link !== "#" && (
                        <a
                          aria-label="Open project"
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                        >
                          <FiExternalLink className="w-5 h-5 text-white" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-3">
                    <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full border ${
                      item.category === "Magazine Design" 
                        ? "bg-cyan-500/20 text-cyan-300 border-cyan-400/30"
                        : item.category === "Poster Design"
                        ? "bg-green-500/20 text-green-300 border-green-400/30"
                        : "bg-purple-500/20 text-purple-300 border-purple-400/30"
                    }`}>
                      {item.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neutral-200 transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-neutral-400 text-sm mb-4 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Tags */}
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
                  
                  {/* Image Info */}
                  <div className="mt-4 text-center">
                    <h3 className="text-2xl font-bold text-white mb-2">{preview.title}</h3>
                    <p className="text-neutral-300 mb-3">{preview.description}</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {preview.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className={`px-3 py-1 text-xs rounded-full border ${
                            preview.category === "Magazine Design"
                              ? "bg-cyan-500/20 text-cyan-300 border-cyan-400/30"
                              : preview.category === "Poster Design"
                              ? "bg-green-500/20 text-green-300 border-green-400/30"
                              : "bg-purple-500/20 text-purple-300 border-purple-400/30"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

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
        </div>
      </div>
    </div>
  );
}