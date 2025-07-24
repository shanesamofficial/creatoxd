import React from "react";
import { motion } from "framer-motion";

export default function IntroSection() {
  return (
    <section className="w-full min-h-screen bg-[#0a0a0a] text-white py-20">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <h2
              className="text-5xl lg:text-7xl font-bold leading-tight"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                background: "linear-gradient(to right, #fff, #888)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Transforming Ideas into Digital Reality
            </h2>

            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              src="https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?q=80&w=2070"
              alt="Creative Workspace"
              className="w-full rounded-2xl shadow-2xl"
            />
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="space-y-6"
          >
            <p
              className="text-xl leading-relaxed text-gray-300"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              At CreatoXD, we blend creativity with technical expertise to deliver
              exceptional digital solutions. Our passionate team of designers and
              developers work together to bring your vision to life.
            </p>

            <p
              className="text-xl leading-relaxed text-gray-300"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Whether you need stunning graphics, intuitive user interfaces, or
              powerful web applications, we're here to transform your ideas into
              reality with precision and creativity.
            </p>

            <div className="grid grid-cols-2 gap-8 mt-12">
              <div className="space-y-2">
                <h3 className="text-4xl font-bold text-[#5227FF]">150+</h3>
                <p className="text-gray-400">Projects Completed</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-4xl font-bold text-[#00ccb1]">98%</h3>
                <p className="text-gray-400">Client Satisfaction</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-4xl font-bold text-[#ffc414]">5+</h3>
                <p className="text-gray-400">Years Experience</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-4xl font-bold text-[#1ca0fb]">24/7</h3>
                <p className="text-gray-400">Support Available</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}