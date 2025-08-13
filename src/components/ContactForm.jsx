"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    company: "", // honeypot
  });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleChange = (e) =>
    setFormData((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    
    console.log("Submitting form with data:", { ...formData, company: "***" });
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData),
      });

      console.log("Response status:", response.status);
      console.log("Response headers:", Object.fromEntries(response.headers.entries()));

      let data;
      const contentType = response.headers.get("content-type");
      
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        console.error("Non-JSON response:", text);
        throw new Error("Server returned non-JSON response");
      }

      console.log("Response data:", data);

      if (response.ok) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "", company: "" });
        setShowConfirmation(true);
      } else {
        const errorMessage = data.error || `Server error: ${response.status}`;
        console.error("Server error:", errorMessage, data.details);
        setStatus(errorMessage);
      }
    } catch (error) {
      console.error("Network/Parse error:", error);
      setStatus(`Network error: ${error.message}`);
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
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message →"}
              </HoverBorderGradient>
              
              {status && (
                <p className={`text-sm text-center mt-3 ${
                  status.includes('successfully') ? 'text-green-400' : 'text-red-400'
                }`}>
                  {status}
                </p>
              )}
            </form>
          </div>
        </div>
      </motion.div>

      {/* Confirmation Overlay */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowConfirmation(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-neutral-900/90 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowConfirmation(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Close"
              >
                <span className="block w-4 h-4 relative">
                  <span className="absolute top-1/2 left-0 w-4 h-0.5 bg-white rotate-45 -translate-y-1/2"></span>
                  <span className="absolute top-1/2 left-0 w-4 h-0.5 bg-white -rotate-45 -translate-y-1/2"></span>
                </span>
              </button>

              {/* Success Icon */}
              <div className="mx-auto mb-4 w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>

              {/* Message */}
              <h3 className="text-2xl font-bold text-white mb-3">Message Sent!</h3>
              <p className="text-neutral-300 mb-6">
                Thank you for reaching out. We've received your message and will get back to you soon.
              </p>

              {/* Close Button */}
              <button
                onClick={() => setShowConfirmation(false)}
                className="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors"
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