"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { HoverBorderGradient } from "./ui/hover-border-gradient";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    company: "",
  });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false); // added

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("Message sent successfully.");
        setFormData({ name: "", email: "", subject: "", message: "", company: "" });
        setShowConfirm(true); // show overlay
      } else setStatus(data.error || "Failed to send.");
    } catch {
      setStatus("Network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.div
        className="max-w-md md:max-w-4xl mx-auto w-full p-4 md:p-8 shadow-input backdrop-blur-sm bg-white/5 rounded-2xl border border-white/10"
        whileHover={{
          boxShadow: "0 0 30px rgba(255,255,255,0.1)",
          borderColor: "rgba(255,255,255,0.2)",
          transition: { duration: 0.3 },
        }}
        initial={{ opacity: 1, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="w-full">
          <div
            className="mx-auto w-full sm:w-full bg-transparent rounded-xl md:rounded-2xl p-4 sm:p-8 flex flex-col md:flex-row items-center md:items-start"
            style={{
              minHeight: "380px",
              maxWidth: "800px",
              margin: "0 auto",
            }}
          >
            {/* Left Side: Title and Subtext */}
            <div className="flex-1 flex flex-col justify-center items-start pr-0 md:pr-12 mb-4 md:mb-8">
              <h2 className="text-2xl sm:text-4xl md:text-6xl font-extrabold text-neutral-200 mb-2 sm:mb-4">
                Contact Us!
              </h2>
              <p className="mt-1 sm:mt-2 max-w-md text-base sm:text-lg md:text-xl text-neutral-300">
                We'd love to hear from you! Fill out the form and we'll get back to
                you soon.
              </p>
            </div>

            {/* Right Side: Form */}
            <form
              className="flex-1 w-full"
              onSubmit={handleSubmit}
              style={{
                minWidth: "280px",
                maxWidth: "400px",
              }}
            >
              <LabelInputContainer className="mb-3 sm:mb-4">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  type="text"
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </LabelInputContainer>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  placeholder="you@example.com"
                  type="email"
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </LabelInputContainer>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="How can we help you?"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </LabelInputContainer>
              <LabelInputContainer className="mb-8 group">
                <Label htmlFor="message">Message</Label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Type your message here..."
                  rows={6}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="
                  flex w-full min-h-[140px]
                  border-none
                  bg-gray-50 dark:bg-zinc-800
                  hover:bg-gray-100 dark:hover:bg-zinc-700
                  text-black dark:text-white
                  shadow-input dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
                  rounded-md px-3 py-2 text-sm
                  placeholder:text-neutral-400 dark:placeholder:text-neutral-600
                  focus-visible:outline-none focus-visible:ring-[2px]
                  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600
                  disabled:cursor-not-allowed disabled:opacity-50
                  transition duration-300 ease-out
                  group-hover:shadow-none
                  resize-none
                "
                />
              </LabelInputContainer>
              {/* Honeypot (hidden) */}
              <div style={{ display: "none" }}>
                <input
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
              <HoverBorderGradient
                containerClassName="w-full mt-2"
                className="font-semibold text-lg"
                type="submit"
                as="button"
              >
                {loading ? "Sending..." : "Send Message →"}
              </HoverBorderGradient>
              {status && (
                <p className="text-sm text-center text-neutral-300 mt-3">
                  {status}
                </p>
              )}
            </form>
          </div>
        </div>
      </motion.div>

      {/* Confirmation Overlay */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            className="fixed inset-0 z-[5000] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 160, damping: 18 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-2xl border border-white/15 bg-neutral-900/80 backdrop-blur-md p-6 text-center relative"
            >
              <button
                onClick={() => setShowConfirm(false)}
                aria-label="Close"
                className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"
              >
                <span className="block w-4 h-4 relative">
                  <span className="absolute inset-0 h-0.5 w-4 bg-white rotate-45 top-1/2 -translate-y-1/2" />
                  <span className="absolute inset-0 h-0.5 w-4 bg-white -rotate-45 top-1/2 -translate-y-1/2" />
                </span>
              </button>
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-emerald-500/15 flex items-center justify-center">
                <svg
                  className="h-6 w-6 text-emerald-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Message Sent</h3>
              <p className="text-sm text-neutral-300 mb-5">
                Thanks for reaching out. We will get back to you shortly.
              </p>
              <button
                onClick={() => setShowConfirm(false)}
                className="w-full rounded-md bg-white/10 hover:bg-white/20 text-white font-medium py-2.5 transition"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const LabelInputContainer = ({ children, className }) => (
  <div className={cn("flex w-full flex-col space-y-2", className)}>{children}</div>
);

export default ContactForm;