import React from "react";
import { motion } from "framer-motion";
import { FiZap, FiShield, FiClock, FiTrendingUp, FiUsers, FiCode } from "react-icons/fi";
import BlurText from "./BlurText";

const features = [
	{
		icon: <FiTrendingUp className="w-6 h-6" />,
		title: "Creative That Converts",
		desc: "Ideas aren’t just pretty — they’re designed to grab attention, tell your story, and turn viewers into customers.",
	},
	{
		icon: <FiShield className="w-6 h-6" />,
		title: "Tailored to Your Brand",
		desc: "Every pixel, color, and curve reflects your identity — no copy-paste templates, only original work.",
	},
	{
		icon: <FiCode className="w-6 h-6" />,
		title: "Pixel-Perfect & Code-Perfect",
		desc: "From stunning visuals to smooth, clean code — design and development work seamlessly together.",
	},
	{
		icon: <FiClock className="w-6 h-6" />,
		title: "Deadline-Driven, No Surprises",
		desc: "We respect your time. Projects are delivered on schedule, with clear updates at every step.",
	},
	{
		icon: <FiUsers className="w-6 h-6" />,
		title: "User Experience First",
		desc: "We think like your audience — every design choice is backed by usability and real-world behavior.",
	},
	{
		icon: <FiZap className="w-6 h-6" />,
		title: "Always Evolving",
		desc: "Trends change fast. We keep your brand fresh and ahead with modern design and technology.",
	},
];

export default function FeaturesSection() {
	return (
		<section id="features" className="relative bg-black pt-28 lg:pt-32 pb-16 lg:pb-20">
			<div className="max-w-7xl mx-auto px-6 md:px-8">
				<motion.div
					initial={{ opacity: 0, y: 24 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-center mb-16 md:mb-20"
				>
					{/* Title: BlurText, Nasalization, centered */}
					<BlurText
						text="Standout Features"
						animateBy="words"
						direction="top"
						delay={120}
						className="font-nasalization w-full justify-center text-center text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-wider uppercase"
					/>
					{/* Subtext: plain text, centered */}
					<p className="mt-4 sm:mt-5 text-neutral-300 max-w-3xl mx-auto text-center">
						What makes us different — engineered for speed, clarity, and results.
					</p>
				</motion.div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-stretch gap-6 md:gap-8">
					{features.map((f, i) => (
						<motion.div
							key={f.title}
							initial={{ opacity: 0, y: 28 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-80px" }}
							transition={{ duration: 0.5, delay: i * 0.05 }}
							whileHover={{ y: -4, boxShadow: "0 0 30px rgba(255,255,255,0.08)" }}
							className="h-full backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10 text-white flex flex-col"
						>
							<div className="mb-4 inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white/10">
								{f.icon}
							</div>
							<h3 className="text-xl font-semibold mb-2">{f.title}</h3>
							<p className="text-neutral-300 leading-relaxed">{f.desc}</p>
							<div className="mt-auto pt-2" />
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}