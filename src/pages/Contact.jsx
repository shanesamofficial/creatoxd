import React from "react";
import ContactForm from "../components/ContactForm";

const ContactPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <div className="flex-1 flex items-center justify-center py-12">
        <ContactForm />
      </div>
      <footer
        className="w-full py-6 text-center text-neutral-400 bg-neutral-900"
        style={{ borderTop: "1px solid #222" }}
      >
        &copy; {new Date().getFullYear()} CreatoXD. All rights reserved.
      </footer>
    </div>
  );
};

export default ContactPage;