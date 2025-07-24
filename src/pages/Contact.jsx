import React from "react";
import ContactForm from "../components/ContactForm";
import GradientBackground from "../components/GradientBackground";

const ContactPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black relative">
      <GradientBackground />
      <div className="flex-1 flex items-center justify-center py-12 relative z-10">
        <ContactForm />
      </div>
      <footer
        className="w-full py-6 text-center text-neutral-400 bg-neutral-900/50 relative z-10"
        style={{ borderTop: "1px solid #222" }}
      >
        &copy; {new Date().getFullYear()} CreatoXD. All rights reserved.
      </footer>
    </div>
  );
};

export default ContactPage;