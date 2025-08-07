import React from "react";
import { FocusCards } from "./ui/focus-cards";
import { IconPalette, IconDeviceLaptop, IconPhoto, IconVideo, IconVector, IconBrandTailwind } from "@tabler/icons-react";
import ShinyText from "./ShinyText";

const services = [
	{
		title: "Graphic Designing",
		description: "Creative visual solutions for your brand identity, marketing materials, and digital assets.",
		src: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=3271&auto=format&fit=crop",
		icon: <IconPalette size={32} className="text-[#7b61ff]" />,
	},
	{
		title: "Web Development",
		description: "Custom website development using modern technologies to bring your vision to life.",
		src: "https://images.unsplash.com/photo-1603468620905-8de7d86b781e?q=80&w=3276&auto=format&fit=crop",
		icon: <IconDeviceLaptop size={32} className="text-[#1ca0fb]" />,
	},
	{
		title: "UI/UX Designing",
		description: "User-centered design solutions focusing on intuitive interfaces and seamless experiences.",
		src: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=3270&auto=format&fit=crop",
		icon: <IconVector size={32} className="text-[#00ccb1]" />,
	},
	{
		title: "Branding",
		description: "Comprehensive brand identity development including logos, guidelines, and brand strategy.",
		src: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=3000&auto=format&fit=crop",
		icon: <IconBrandTailwind size={32} className="text-[#ff61b6]" />,
	},
	{
		title: "Photo Editing",
		description: "Professional photo enhancement, retouching, and manipulation services.",
		src: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=3270&auto=format&fit=crop",
		icon: <IconPhoto size={32} className="text-[#ffc414]" />,
	},
	{
		title: "Video Editing",
		description: "Creative video editing, motion graphics, and visual effects for engaging content.",
		src: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=3270&auto=format&fit=crop",
		icon: <IconVideo size={32} className="text-[#ff4545]" />,
	},
];

export default function ServicesSection() {
	return (
		<section
			id="services"
			className="w-full min-h-screen py-20 flex flex-col items-center justify-center bg-black"
		>
			<h2 
				className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-16 text-center uppercase tracking-wider"
				style={{ fontFamily: 'Nasalization' }}
			>
				<ShinyText text="OUR SERVICES" speed={4} />
			</h2>
			<FocusCards cards={services} />
		</section>
	);
}