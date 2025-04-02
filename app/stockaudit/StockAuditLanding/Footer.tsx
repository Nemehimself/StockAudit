// Footer.tsx
import React from "react";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-blue-700 text-white py-4 text-center mt-4">
      <p className="text-sm md:text-base mb-2">Contact us: support@mcomaudit.com</p>
      <div className="flex justify-center items-center">
        <p className="text-sm md:text-base">Follow us:</p>
        <a href="#" className="ml-2 text-xl md:text-2xl"><FaSquareXTwitter /></a>
        <a href="#" className="ml-2 text-xl md:text-2xl"><FaLinkedin /></a>
      </div>
    </footer>
  );
};

export default Footer;