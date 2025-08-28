import React, { useEffect } from "react";
import { motion } from "framer-motion";
import ContactForm from "../components/ContactForm";
import Nav from "../components/Nav";
import CustomCursor from "../components/CustomCursor";
import GradientBackground from "../components/GradientBackground";
import { FiPhone, FiMail } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const CONTACT_DETAILS = {
  phone: "+91 94476 90263",
  email: "team.creatoxd@gmail.com",
  whatsapp: "+91 94476 90263",
};

function formatWhatsAppLink(num) {
  const digits = num.replace(/[^\d]/g, "");
  return `https://wa.me/${digits}`;
}

const infoItems = [
  {
    label: "Phone",
    value: CONTACT_DETAILS.phone,
    href: `tel:${CONTACT_DETAILS.phone.replace(/\s+/g, "")}`,
    icon: FiPhone,
    color: "text-green-300",
    ring: "border-green-400/30 bg-green-500/10"
  },
  {
    label: "Email",
    value: CONTACT_DETAILS.email,
    href: `mailto:${CONTACT_DETAILS.email}`,
    icon: FiMail,
    color: "text-blue-300",
    ring: "border-blue-400/30 bg-blue-500/10"
  },
  {
    label: "WhatsApp",
    value: CONTACT_DETAILS.whatsapp,
    href: formatWhatsAppLink(CONTACT_DETAILS.whatsapp),
    icon: FaWhatsapp,
    color: "text-emerald-300",
    ring: "border-emerald-400/30 bg-emerald-500/10"
  },
];

export default function ContactPage() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black relative">
      <CustomCursor />
      <GradientBackground />
      <Nav />
      <div className="min-h-screen flex items-start justify-center pt-32 pb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-5xl mx-auto px-4 space-y-10"
        >
          <div className="w-full">
            <ContactForm />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {infoItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.label === "WhatsApp" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  whileHover={{ y: -5 }}
                  className={`group relative overflow-hidden rounded-2xl border ${item.ring} px-5 py-6 backdrop-blur-sm flex items-start gap-4 transition-colors hover:border-white/30`}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/10 bg-white/5 group-hover:bg-white/10 transition-colors">
                    <Icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wider text-neutral-400 mb-1">{item.label}</p>
                    <p className="text-white font-medium text-sm break-all">{item.value}</p>
                    <span className="mt-2 inline-block text-[10px] tracking-wider text-neutral-500 group-hover:text-neutral-300 transition-colors">
                      {item.label === "Email" ? "Compose" : item.label === "Phone" ? "Call now" : "Open chat"}
                    </span>
                  </div>
                  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-tr from-white/5 to-transparent" />
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}