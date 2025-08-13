import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Nav from '../components/Nav';
import CustomCursor from '../components/CustomCursor';
import GradientBackground from '../components/GradientBackground';

const partners = [
  {
    id: 1,
    name: "OFFPAD Productions",
    logo: "/partners/offpad.jpg",
    description: "OFFPAD brings together fresh talent to deliver professional photography, videography, design, branding, event hosting, and more..",
    website: "https://offpad.in/",
    category: "Creative"
  },
  {
    id: 2,
    name: "CapturePic Media Productions",
    logo: "/partners/capturepic.jpg",
    description: "Deliver professional photography and videography services.",
    website: "https://www.instagram.com/capturepic_media/",
    category: "Production"
  },
];

const PartnerCard = ({ partner, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <motion.div
        className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10 h-full flex flex-col"
        whileHover={{
          boxShadow: "0 0 30px rgba(255,255,255,0.1)",
          borderColor: "rgba(255,255,255,0.2)",
          transition: { duration: 0.3 },
        }}
      >
        {/* Logo Container */}
        <div className="mb-6 flex items-center justify-center h-24">
          <img
            src={partner.logo}
            alt={`${partner.name} logo`}
            className="max-h-full max-w-full object-contain rounded-lg"
          />
        </div>

        {/* Category Badge */}
        <div className="mb-3">
          <span className="inline-block px-3 py-1 text-xs font-medium bg-white/10 text-white/80 rounded-full">
            {partner.category}
          </span>
        </div>

        {/* Company Name */}
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gray-200 transition-colors">
          {partner.name}
        </h3>

        {/* Description */}
        <p className="text-neutral-300 text-sm leading-relaxed mb-6 flex-grow">
          {partner.description}
        </p>

        {/* Visit Website Button */}
        <a
          href={partner.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg transition-all duration-300 group-hover:scale-105"
        >
          Visit Website
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </motion.div>
    </motion.div>
  );
};

export default function PartnersPage() {
  useEffect(() => {
    // Reset any scroll constraints when component mounts
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';
    document.body.classList.remove('nav-open');
    
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black relative overflow-auto">
      <CustomCursor />
      <GradientBackground />
      <Nav />
      
      {/* Main content with proper mobile scrolling */}
      <div className="w-full pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-white uppercase tracking-wider"
              style={{ fontFamily: "Nasalization" }}
            >
              Our Partners
            </h1>
            <p className="text-lg sm:text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
              We collaborate with industry-leading companies to deliver exceptional results. 
              Meet our trusted partners who help us bring your vision to life.
            </p>
          </motion.div>

          {/* Partners Grid - Better mobile spacing */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
            {partners.map((partner, index) => (
              <PartnerCard key={partner.id} partner={partner} index={index} />
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Interested in Partnering with Us?
            </h2>
            <p className="text-neutral-300 mb-8 max-w-2xl mx-auto">
              We're always looking for new partnerships that can create mutual value. 
              Let's explore how we can work together.
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full transition-all duration-300"
            >
              Get in Touch
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}