import React from "react";
import { BackgroundGradient } from "./ui/background-gradient";
import { FocusCards } from "./ui/focus-cards";
import { IconPalette, IconDeviceLaptop, IconPhoto, IconVector } from "@tabler/icons-react";

const services = [
  {
    title: "Graphic Designing",
    src: "https://images.unsplash.com/photo-1518710843675-2540dd79065c?q=80&w=3387&auto=format&fit=crop",
    icon: <IconPalette size={32} className="text-[#7b61ff]" />,
    description: "Creative branding, logos, posters, and more.",
  },
  {
    title: "UI/UX Designing",
    src: "https://images.unsplash.com/photo-1600271772470-bd22a42787b3?q=80&w=3072&auto=format&fit=crop",
    icon: <IconVector size={32} className="text-[#00ccb1]" />,
    description: "Modern, user-friendly interfaces for web & apps.",
  },
  {
    title: "Photo & Video Editing",
    src: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?q=80&w=3070&auto=format&fit=crop",
    icon: <IconPhoto size={32} className="text-[#ffc414]" />,
    description: "Professional photo retouching and video editing.",
  },
  {
    title: "Web Development",
    src: "https://images.unsplash.com/photo-1507041957456-9c397ce39c97?q=80&w=3456&auto=format&fit=crop",
    icon: <IconDeviceLaptop size={32} className="text-[#1ca0fb]" />,
    description: "Fast, responsive websites and web apps.",
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="w-full py-20 flex flex-col items-center justify-center bg-transparent"
    >
      <h2 className="text-4xl md:text-5xl font-extrabold mb-8 text-center bg-gradient-to-r from-[#7b61ff] via-[#00ccb1] to-[#ffc414] bg-clip-text text-transparent">
        Our Services
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl w-full px-4">
        {services.map((service) => (
          <BackgroundGradient key={service.title} className="rounded-[22px] p-6 bg-white dark:bg-zinc-900 flex flex-col items-start">
            <div className="flex items-center gap-4 mb-4">
              {service.icon}
              <span className="text-2xl font-bold">{service.title}</span>
            </div>
            <img
              src={service.src}
              alt={service.title}
              height="200"
              width="400"
              className="object-cover rounded-xl mb-4 w-full"
            />
            <p className="text-base text-neutral-700 dark:text-neutral-200 mb-2">
              {service.description}
            </p>
          </BackgroundGradient>
        ))}
      </div>
      <div className="mt-16 w-full">
        <FocusCards
          cards={services.map((service) => ({
            title: service.title,
            src: service.src,
          }))}
        />
      </div>
    </section>
  );
}