import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import CustomCursor from "../components/CustomCursor";
import GradientBackground from "../components/GradientBackground";
import BlurText from "../components/BlurText";
import { FiEdit3, FiMonitor, FiCamera, FiVideo, FiBriefcase, FiPenTool } from "react-icons/fi";

const portfolioCategories = [
  {
    id: 1,
    title: "Graphic Design",
    description: "Logos, branding, print materials, and visual identity designs",
    icon: FiPenTool,
    route: "/portfolio/graphic-design",
    gradient: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-400",
  },
  {
    id: 2,
    title: "Web Development",
    description: "Modern websites, web applications, and digital experiences",
    icon: FiMonitor,
    route: "/portfolio/web-development",
    gradient: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-400",
  },
  {
    id: 3,
    title: "UI/UX Design",
    description: "User interface and user experience design projects",
    icon: FiEdit3,
    route: "/portfolio/ui-ux-design",
    gradient: "from-green-500/20 to-emerald-500/20",
    iconColor: "text-green-400",
  },
  {
    id: 4,
    title: "Branding",
    description: "Complete brand identity packages and visual systems",
    icon: FiBriefcase,
    route: "/portfolio/branding",
    gradient: "from-orange-500/20 to-red-500/20",
    iconColor: "text-orange-400",
  },
  {
    id: 5,
    title: "Photo Editing",
    description: "Photo manipulation, retouching, and enhancement projects",
    icon: FiCamera,
    route: "/portfolio/photo-editing",
    gradient: "from-indigo-500/20 to-purple-500/20",
    iconColor: "text-indigo-400",
  },
  {
    id: 6,
    title: "Video Editing",
    description: "Video production, editing, and motion graphics work",
    icon: FiVideo,
    route: "/portfolio/video-editing",
    gradient: "from-rose-500/20 to-pink-500/20",
    iconColor: "text-rose-400",
  },
];

export default function PortfolioPage() {
  const navigate = useNavigate();

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
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <BlurText
              text="Portfolio"
              animateBy="words"
              delay={120}
              direction="top"
              className="font-nasalization w-full justify-center text-center text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-wider uppercase"
            />
            <p className="mt-6 text-neutral-300 max-w-3xl mx-auto text-lg">
              Explore our creative work organized by categories. Click on any category to view our projects.
            </p>
          </motion.div>

          {/* Portfolio Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  onClick={() => navigate(category.route)}
                  className="group cursor-pointer"
                >
                  <div className={`backdrop-blur-sm bg-gradient-to-br ${category.gradient} rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-500 h-full`}>
                    <div className="p-8">
                      {/* Icon */}
                      <div className="mb-6">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all duration-300`}>
                          <IconComponent className={`w-8 h-8 ${category.iconColor} group-hover:scale-110 transition-transform duration-300`} />
                        </div>
                      </div>

                      {/* Content */}
                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-neutral-200 transition-colors">
                        {category.title}
                      </h3>
                      
                      <p className="text-neutral-400 leading-relaxed group-hover:text-neutral-300 transition-colors">
                        {category.description}
                      </p>

                      {/* Hover indicator */}
                      <div className="mt-6 flex items-center text-neutral-400 group-hover:text-white transition-colors">
                        <span className="text-sm font-medium">View Projects</span>
                        <motion.svg
                          className="w-4 h-4 ml-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          whileHover={{ x: 4 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </motion.svg>
                      </div>
                    </div>

                    {/* Animated border */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}