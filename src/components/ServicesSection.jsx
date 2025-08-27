import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiPenTool, FiMonitor, FiCamera, FiVideo, FiBriefcase, FiEdit3 } from "react-icons/fi";

const services = [
	{
		id: 1,
		title: "Graphic Design",
		description:
			"Creating stunning visual identities, logos, and branding materials that make your business stand out.",
		icon: FiPenTool,
		route: "/portfolio/graphic-design",
		gradient: "from-purple-500/20 to-pink-500/20",
		iconColor: "text-purple-400",
		features: [
			"Logo Design",
			"Brand Identity",
			"Print Materials",
			"Digital Graphics",
		],
	},
	{
		id: 2,
		title: "Web Development",
		description:
			"Building modern, responsive websites and web applications with cutting-edge technologies.",
		icon: FiMonitor,
		route: "/portfolio/web-development",
		gradient: "from-blue-500/20 to-cyan-500/20",
		iconColor: "text-blue-400",
		features: ["Responsive Design", "Modern Frameworks", "E-commerce", "Web Apps"],
	},
	{
		id: 3,
		title: "UI/UX Design",
		description:
			"Designing intuitive user experiences and beautiful interfaces that users love to interact with.",
		icon: FiEdit3,
		route: "/portfolio/ui-ux-design",
		gradient: "from-green-500/20 to-emerald-500/20",
		iconColor: "text-green-400",
		features: [
			"User Research",
			"Wireframing",
			"Prototyping",
			"Interface Design",
		],
	},
	{
		id: 4,
		title: "Branding",
		description:
			"Complete brand strategy and visual identity packages that communicate your brand's essence.",
		icon: FiBriefcase,
		route: "/portfolio/branding",
		gradient: "from-orange-500/20 to-red-500/20",
		iconColor: "text-orange-400",
		features: [
			"Brand Strategy",
			"Visual Identity",
			"Brand Guidelines",
			"Marketing Materials",
		],
	},
	{
		id: 5,
		title: "Photo Editing",
		description:
			"Professional photo retouching, manipulation, and enhancement to make your images perfect.",
		icon: FiCamera,
		route: "/portfolio/photo-editing",
		gradient: "from-indigo-500/20 to-purple-500/20",
		iconColor: "text-indigo-400",
		features: [
			"Photo Retouching",
			"Color Correction",
			"Image Manipulation",
			"Product Photography",
		],
	},
	{
		id: 6,
		title: "Video Editing",
		description:
			"Creating compelling video content with professional editing, motion graphics, and visual effects.",
		icon: FiVideo,
		route: "/portfolio/video-editing",
		gradient: "from-rose-500/20 to-pink-500/20",
		iconColor: "text-rose-400",
		features: [
			"Video Production",
			"Motion Graphics",
			"Color Grading",
			"Visual Effects",
		],
	},
];

export default function ServicesSection() {
	const navigate = useNavigate();

	const handleServiceClick = (route) => {
		navigate(route);
	};

	return (
		<section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: 24 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-50px" }}
					transition={{ duration: 0.6 }}
					className="text-center mb-12"
				>
					<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 font-nasalization tracking-wider uppercase">
						Our Services
					</h2>
					<p className="text-neutral-300 max-w-2xl mx-auto text-base">
						We offer comprehensive creative solutions to bring your vision to life
						with cutting-edge design and development.
					</p>
				</motion.div>

				{/* Services Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{services.map((service, index) => {
						const IconComponent = service.icon;
						return (
							<motion.div
								key={service.id}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: "-50px" }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
								whileHover={{ y: -6, scale: 1.01 }}
								onClick={() => handleServiceClick(service.route)}
								className="group cursor-pointer"
							>
								<div
									className={`backdrop-blur-sm bg-gradient-to-br ${service.gradient} rounded-xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-500 h-full`}
								>
									<div className="p-6">
										{/* Icon */}
										<div className="mb-4">
											<div
												className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all duration-300`}
											>
												<IconComponent
													className={`w-6 h-6 ${service.iconColor} group-hover:scale-110 transition-transform duration-300`}
												/>
											</div>
										</div>

										{/* Content */}
										<h3 className="text-xl font-bold text-white mb-3 group-hover:text-neutral-200 transition-colors">
											{service.title}
										</h3>

										<p className="text-neutral-400 leading-relaxed mb-4 text-sm group-hover:text-neutral-300 transition-colors">
											{service.description}
										</p>

										{/* Features */}
										<div className="space-y-1.5 mb-4">
											{service.features.slice(0, 3).map((feature, featureIndex) => (
												<div
													key={featureIndex}
													className="flex items-center text-xs text-neutral-400 group-hover:text-neutral-300 transition-colors"
												>
													<div className="w-1 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-2"></div>
													{feature}
												</div>
											))}
										</div>

										{/* Hover indicator */}
										<div className="flex items-center text-neutral-400 group-hover:text-white transition-colors">
											<span className="text-xs font-medium">View Portfolio</span>
											<motion.svg
												className="w-3 h-3 ml-2"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
												whileHover={{ x: 3 }}
												transition={{
													type: "spring",
													stiffness: 400,
													damping: 10,
												}}
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M9 5l7 7-7 7"
												/>
											</motion.svg>
										</div>
									</div>

									{/* Animated border */}
									<div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
										<div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" />
									</div>
								</div>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
}