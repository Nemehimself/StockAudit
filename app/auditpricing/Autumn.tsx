import React from "react";
import { motion } from "framer-motion";
import { FaCanadianMapleLeaf } from "react-icons/fa";
import { HiBadgeCheck } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { FaPaypal, FaStripeS } from "react-icons/fa";

export const Autumn = () => {
  const router = useRouter();
  const handleLogin = () => {
    router.push("/auditcalculator"); // Navigate to AuditCalculator page
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.1, ease: "easeOut" }}
      whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(0,0,0,0.3)" }}
      whileTap={{ scale: 0.98 }}
      className="flex flex-col items-center w-1/4 justify-center p-4 gap-4 shadow-lg rounded-lg text-white transition-all duration-300"
      style={{
        background:
          "linear-gradient(to bottom right, #FF7E00, #FF3E00, #FFD700)", // Autumn gradient
      }}
    >
      <p className="flex flex-row items-center text-3xl font-light gap-4">
        <span>
          <FaCanadianMapleLeaf className="w-8 h-8" />
        </span>
        Autumn <span> £2000</span>
      </p>
      <p>Lorem ipsum dolor sit amet.</p>
      <p className="text-2xl">
        {" "}
        £500 <span className="text-xs">/mo.</span>
      </p>
      <p> 20% on First payment</p>
      <p className="flex items-center gap-2">
        <HiBadgeCheck /> Lorem ipsum dolor sit amet.
      </p>

      <button
        className="border-t border-b border-white  px-4 py-2 w-full bg-transparent text-white"
        onClick={handleLogin}
      >
        Make Payment
      </button>
      <motion.button
        whileHover={{ scale: 1.05, backgroundColor: "#ffffff", color: "#000" }}
        whileTap={{ scale: 0.95 }}
        className="flex flex-col justify-between items-center bg-blue-500 text-white px-4 py-2 rounded-lg shadow  hover:bg-white hover:text-blue-500 transition-all duration-300"
        onClick={handleLogin}
      >
        <FaPaypal /> <span>Pay with PayPal </span>
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05, backgroundColor: "#ffffff", color: "#000" }}
        whileTap={{ scale: 0.95 }}
        className="flex flex-col justify-between items-center bg-gray-800 text-white px-4 py-2 rounded-lg shadow  hover:bg-white hover:text-black transition-all duration-300"
        onClick={handleLogin}
      >
        <FaStripeS /> <span> Pay with Stripe </span>
      </motion.button>

      <hr className="w-full bg-white mt-6" />

      <p>What we offer:</p>
      <ul>
        <li className="flex items-center gap-2">
          <HiBadgeCheck /> Lorem ipsum dolor sit amet.
        </li>
        <li className="flex items-center gap-2">
          <HiBadgeCheck /> Lorem ipsum dolor sit amet.
        </li>
        <li className="flex items-center gap-2">
          <HiBadgeCheck /> Lorem ipsum dolor sit amet.
        </li>
        <li className="flex items-center gap-2">
          <HiBadgeCheck /> Lorem ipsum dolor sit amet.
        </li>
        <li className="flex items-center gap-2">
          <HiBadgeCheck /> Lorem ipsum dolor sit amet.
        </li>
      </ul>
    </motion.div>
  );
};
