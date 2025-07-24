import React from "react";
import { FocusCards } from "./ui/focus-cards";
import { IconPalette, IconDeviceLaptop, IconPhoto, IconVector } from "@tabler/icons-react";
import ShinyText from "./ShinyText"; // Add this import

const services = [
	{
		title: "Graphic Designing",
		src: "https://images.unsplash.com/photo-1518710843675-2540dd79065c?q=80&w=3387&auto=format&fit=crop",
		icon: <IconPalette size={32} className="text-[#7b61ff]" />,
	},
	{
		title: "UI/UX Designing",
		src: "https://images.unsplash.com/photo-1600271772470-bd22a42787b3?q=80&w=3072&auto=format&fit=crop",
		icon: <IconVector size={32} className="text-[#00ccb1]" />,
	},
	{
		title: "Photo & Video Editing",
		src: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?q=80&w=3070&auto=format&fit=crop",
		icon: <IconPhoto size={32} className="text-[#ffc414]" />,
	},
	{
		title: "Web Development",
		src: "https://images.unsplash.com/photo-1507041957456-9c397ce39c97?q=80&w=3456&auto=format&fit=crop",
		icon: <IconDeviceLaptop size={32} className="text-[#1ca0fb]" />,
	},
];

export default function ServicesSection() {
	return (
		<section
			id="services"
			className="w-full min-h-screen py-20 flex flex-col items-center justify-center bg-black"
		>
			<h2 className="text-4xl md:text-5xl font-extrabold mb-16 text-center">
				<ShinyText text="Our Services" speed={3} />
			</h2>
			<FocusCards cards={services} />
		</section>
	);
}