import React, { useState } from "react";
import { AiOutlineAudit } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { HiBadgeCheck } from "react-icons/hi";
import { motion } from "framer-motion";
import { FaPaypal, FaStripeS } from "react-icons/fa";
import { FaCircleChevronDown } from "react-icons/fa6";
import { RiResetLeftFill } from "react-icons/ri";

export const Audit1 = () => {
  const router = useRouter();
  const [selectedSeason, setSelectedSeason] = useState("");

  const seasons = [
    { name: "Winter", period: "01 Dec - 28 Feb" },
    { name: "Spring", period: "01 Mar - 31 May" },
    { name: "Summer", period: "01 Jun - 31 Aug" },
    { name: "Autumn", period: "01 Sep - 30 Nov" },
  ];

  const handleSeasonChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setSelectedSeason(e.target.value); // Updates the selected season
  };

  const handlePaymentRedirect = (method: "paypal" | "stripe") => {
    if (!selectedSeason) {
      alert("Please select a season before proceeding to payment.");
      return;
    }
    const query = `?amount=500&season=${encodeURIComponent(selectedSeason)}`;
    router.push(`/${method}-payment${query}`);
  };

  const handleReset = () => {
    setSelectedSeason(""); // Clears the selection
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.1, ease: "easeOut" }}
      whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(0,0,0,0.2)" }}
      whileTap={{ scale: 0.98 }}
      className="flex flex-col items-center w-1/4 justify-center p-4 gap-4 shadow-lg rounded-lg text-white transition-all duration-300"
      style={{
        background: "linear-gradient(to bottom right, #4A90E2, #D6E6F2)",
      }}
    >
      <p className="flex flex-row items-center text-3xl font-light gap-4">
        <AiOutlineAudit className="w-8 h-8" /> Audit1
      </p>
      <p className="text-center">
        You are only eligible for one Audit in only one season
      </p>
      <p className="text-2xl">
        {" "}
        £500 <span className="text-xs">/budget</span>
      </p>
      <p>20% on First payment</p>
      <p className="flex items-center gap-2">
        <HiBadgeCheck /> Select just one Audit
      </p>

      {/* Season Dropdown */}
      <div className="relative w-full">
        <select
          className="w-full p-3 border cursor-pointer border-gray-400 rounded-lg appearance-none bg-white text-gray-900"
          value={selectedSeason}
          onChange={handleSeasonChange}
        >
          <option value="" disabled>
            Select a season
          </option>
          {seasons.map((season) => (
            <option key={season.name} value={season.name}>
              {season.name} - {season.period}
            </option>
          ))}
        </select>
        <FaCircleChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none cursor-pointer" />
      </div>

      {/* Display Selected Season */}
      {selectedSeason ? (
        <p className="text-sm font-medium text-[#000]">
          Selected: {selectedSeason}
        </p>
      ) : (
        <p className="text-[#000]">No seasons selected</p>
      )}
      <div className="flex flex-row justify-center items-center gap-2 w-full">
        <RiResetLeftFill
          className="w-6 h-6 cursor-pointer"
          onClick={handleReset}
        />
        <p className="font-bold">RESET</p>
      </div>
      <button
        className="border-t border-white px-4 py-2 w-full bg-transparent text-white"
        // onClick={handleLogin}
      >
        Make Payment
      </button>

      <motion.button
        whileHover={{ scale: 1.05, backgroundColor: "#ffffff", color: "#000" }}
        whileTap={{ scale: 0.95 }}
        className="flex flex-col justify-between items-center bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-white hover:text-blue-500 transition-all duration-300"
        onClick={() => handlePaymentRedirect("paypal")}
      >
        <FaPaypal /> <span>Pay with PayPal </span>
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05, backgroundColor: "#ffffff", color: "#000" }}
        whileTap={{ scale: 0.95 }}
        className="flex flex-col justify-between items-center bg-gray-800 text-white px-4 py-2 rounded-lg shadow hover:bg-white hover:text-black transition-all duration-300"
        onClick={() => handlePaymentRedirect("stripe")}
      >
        <FaStripeS /> <span> Pay with Stripe </span>
      </motion.button>

      <hr className="w-full bg-white mt-2" />
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
