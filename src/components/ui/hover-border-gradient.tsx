"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function HoverBorderGradient({
  children,
  className,
  containerClassName,
  as: Tag = "button",
  ...props
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Tag
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative flex rounded-full content-center items-center flex-col h-min justify-center overflow-visible p-px w-fit group border border-blue-500/20",
        containerClassName
      )}
      {...props}
    >
      <div
        className={cn(
          "relative z-20 w-auto text-white bg-black px-6 py-3 rounded-[inherit] transition-colors duration-300",
          "group-hover:bg-black/80",
          className
        )}
      >
        {children}
      </div>

      {/* Passive shine effect */}
      <motion.div
        className="absolute inset-0 rounded-[inherit] overflow-hidden"
        style={{ maskImage: 'radial-gradient(circle, white, transparent)' }}
      >
        <motion.div
          className="w-[200%] h-full absolute"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(50, 117, 248, 0.2) 50%, transparent 100%)',
          }}
        />
      </motion.div>

      {/* Hover glow effect */}
      <motion.div
        className="absolute -inset-[2px] rounded-[inherit] opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500"
        animate={{
          background: hovered
            ? "radial-gradient(200% 200% at 50% 50%, rgba(50, 117, 248, 0.5) 0%, rgba(50, 117, 248, 0.3) 30%, rgba(50, 117, 248, 0.1) 60%, transparent 100%)"
            : "none",
        }}
      />

      {/* Background layer */}
      <div className="bg-black absolute z-10 inset-[1px] rounded-[inherit] border border-blue-500/20" />
    </Tag>
  );
}