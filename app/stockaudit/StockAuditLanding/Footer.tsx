import React from "react";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-blue-700 text-white py-4 text-center mt-4">
      <p>Contact us: support@mcomaudit.com</p>
      <div className="flex justify-center items-center">
        <p>Follow us: </p>
        <a href="#" className="underline ml-2"><FaSquareXTwitter /></a> 
        <a href="#" className="underline ml-2"><FaLinkedin /></a>
      </div>
    </footer>
  );
};

export default Footer;
