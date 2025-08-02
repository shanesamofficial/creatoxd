"use client";
import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { HoverBorderGradient } from "./ui/hover-border-gradient";

export function ContactForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add your form submission logic here
    console.log("Contact form submitted");
  };
  return (
    <div
      className="mx-auto w-[90%] sm:w-full bg-white dark:bg-black rounded-xl md:rounded-2xl shadow-input p-4 sm:p-8 flex flex-col md:flex-row items-center md:items-start"
      style={{
        minHeight: "380px",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      {/* Left Side: Title and Subtext */}
      <div className="flex-1 flex flex-col justify-center items-start pr-0 md:pr-12 mb-4 md:mb-8">
        <h2
          className="text-2xl sm:text-4xl md:text-6xl font-extrabold text-neutral-800 dark:text-neutral-200 mb-2 sm:mb-4"
          style={{ textAlign: "left" }}
        >
          Contact Us!
        </h2>
        <p
          className="mt-1 sm:mt-2 max-w-md text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-300"
          style={{ textAlign: "left" }}
        >
          We'd love to hear from you! Fill out the form and we'll get back to you
          soon.
        </p>
      </div>

      {/* Right Side: Form */}
      <form
        className="flex-1 w-full"
        onSubmit={handleSubmit}
        style={{
          minWidth: "280px",
          maxWidth: "400px", // Added max-width for desktop form
        }}
      >
        <LabelInputContainer className="mb-3 sm:mb-4">
          <Label htmlFor="name">Your Name</Label>
          <Input id="name" placeholder="John Doe" type="text" required />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="you@example.com" type="email" required />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" placeholder="How can we help you?" type="text" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="message">Message</Label>
          <Input
            id="message"
            placeholder="Type your message here..."
            type="text"
            as="textarea"
            style={{ minHeight: "100px" }}
            required
          />
        </LabelInputContainer>
        <HoverBorderGradient
          containerClassName="w-full mt-2"
          className="font-semibold text-lg"
          type="submit"
        >
          Send Message &rarr;
        </HoverBorderGradient>
      </form>
    </div>
  );
}

const LabelInputContainer = ({ children, className }) => (
  <div className={cn("flex w-full flex-col space-y-2", className)}>{children}</div>
);

export default ContactForm;