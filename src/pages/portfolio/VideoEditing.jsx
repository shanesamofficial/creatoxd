import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Nav from "../../components/Nav";
import CustomCursor from "../../components/CustomCursor";
import GradientBackground from "../../components/GradientBackground";
import BlurText from "../../components/BlurText";
import { FiEye, FiExternalLink, FiX, FiArrowLeft, FiPlay } from "react-icons/fi";

// Import only thumbnails since videos are external
import athenaThumbnail from "../../assets/athena1.png";
import auraVisualizerThumbnail from "../../assets/aura_visualizer.png";

const videoEditingProjects = [
  {
    id: 1,
    title: "PROJECT ATHENA",
    video: null, // No local video since it's external
    thumbnail: athenaThumbnail,
    category: "Promo Video",
    description: "A creative minimal design video project showcasing cinematic storytelling and advanced editing techniques.",
    tags: ["Video Editing", "Cinematography", "Post Production"],
    link: "https://drive.google.com/file/d/12YYpBNN-M5AxbWTCrkupDqeh1_P_6F8B/view?usp=sharing",
    isExternal: true,
  },
  {
    id: 2,
    title: "Aura Visualizer",
    video: null, // No local video since it's external
    thumbnail: auraVisualizerThumbnail,
    category: "Music Video",
    description: "Creative video visualizer for a song by Aura Records featuring dynamic visual effects and audio synchronization.",
    tags: ["Video Editing", "Music Video", "Visual Effects", "Audio Sync"],
    link: "https://drive.google.com/file/d/1WBFlesqg90gCqlIl8077vUAODNiycBkB/view?usp=sharing",
    isExternal: true,
  },
];

export default function VideoEditingPage() {
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

  const handlePlayClick = (item) => {
    if (item.isExternal && item.link !== "#") {
      // Open Google Drive link in new tab
      window.open(item.link, '_blank');
    } else {
      // Use local video in modal (not applicable for these external videos)
      setPreview(item);
    }
  };

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
                text="Video Editing"
                animateBy="words"
                delay={120}
                direction="top"
                className="font-nasalization w-full justify-center text-center text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-wider uppercase"
              />
              <p className="mt-6 text-neutral-300 max-w-3xl mx-auto text-lg">
                Creative video production, editing, and motion graphics showcasing cinematic storytelling.
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
            {videoEditingProjects.map((item, index) => (
              <motion.div
                key={`${item.id}-${isLoaded}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group backdrop-blur-sm bg-white/5 rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-500"
              >
                {/* Video Container */}
                <div className="relative overflow-hidden aspect-video bg-gray-900">
                  {/* Show thumbnail for external videos */}
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      console.error("Thumbnail failed to load:", item.thumbnail);
                    }}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex gap-3">
                      <button
                        aria-label="Watch on Google Drive"
                        onClick={() => handlePlayClick(item)}
                        className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                      >
                        <FiPlay className="w-5 h-5 text-white ml-1" />
                      </button>
                    </div>
                  </div>

                  {/* Video Play Icon */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-16 h-16 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <FiPlay className="w-6 h-6 text-white ml-1" />
                    </div>
                  </div>

                  {/* External video indicator */}
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full">
                    <FiExternalLink className="w-3 h-3 text-white/80" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-rose-500/20 text-rose-300 rounded-full border border-rose-400/30">
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
        </div>
      </div>
    </div>
  );
}