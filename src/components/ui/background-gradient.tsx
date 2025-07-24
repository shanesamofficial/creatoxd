import { cn } from "@/lib/utils";
import React from "react";
import { motion } from "framer-motion";

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
}) => {
  return (
    <div className={cn("group relative", containerClassName)}>
      <motion.div
        className={cn(
          "absolute -inset-0.5 rounded-xl bg-gradient-to-r from-[#00ccb1] via-[#7b61ff] to-[#ffc414] opacity-50 blur-xl group-hover:opacity-75 transition duration-500",
          animate && "animate-gradient"
        )}
      />
      <div className={cn("relative", className)}>{children}</div>
    </div>
  );
};