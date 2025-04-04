import React, { useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineAudit } from "react-icons/ai";
import { HiBadgeCheck } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { FaPaypal, FaStripeS } from "react-icons/fa";
import { FaCircleChevronDown } from "react-icons/fa6";
import { RiResetLeftFill } from "react-icons/ri";

export const Audit4 = () => {
  const router = useRouter();
  const [selectedSeasons, setSelectedSeasons] = useState<string[]>([]);

  const seasons = [
    { name: "Winter", period: "01 Dec - 28 Feb" },
    { name: "Spring", period: "01 Mar - 31 May" },
    { name: "Summer", period: "01 Jun - 31 Aug" },
    { name: "Autumn", period: "01 Sep - 30 Nov" },
  ];

  const handleSeasonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;

    setSelectedSeasons((prevSeasons) => {
      if (prevSeasons.length < 4) {
        return [...prevSeasons, selectedValue]; // Allow selection up to 4
      }
      return prevSeasons;
    });
  };

  const handleReset = () => {
    setSelectedSeasons([]); // Clears the selection
  };

  const handlePaymentRedirect = (method: "paypal" | "stripe") => {
    if (selectedSeasons.length !== 4) {
      alert("Please select 4 seasons before proceeding to payment.");
      return;
    }
    const query = `?amount=2000&season=${encodeURIComponent(
      selectedSeasons.join(", ")
    )}`;
    router.push(`/${method}-payment${query}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.1, ease: "easeOut" }}
      whileHover={{ scale: 1.02, boxShadow: "0px 5px 15px rgba(0,0,0,0.3)" }}
      whileTap={{ scale: 0.98 }}
      className="flex flex-col items-center w-full md:w-5/12 lg:w-1/5 justify-center p-4 gap-4 shadow-lg rounded-lg text-white transition-all duration-300 mb-6 md:mb-0"
      style={{
        background:
          "linear-gradient(to bottom right, #FF7E00, #FF3E00, #FFD700)", // Autumn gradient
      }}
    >
      <p className="flex flex-row items-center text-2xl md:text-3xl font-light gap-2 md:gap-4">
        <span>
          <AiOutlineAudit className="w-6 h-6 md:w-8 md:h-8" />
        </span>
        Audit4
      </p>
      <p className="text-center text-sm md:text-base">
        You are eligible for the four Audits in one or multiple seasons
      </p>
      <p className="text-xl md:text-2xl">
        £2000 <span className="text-xs">/budget</span>
      </p>
      <p className="text-sm md:text-base"> 20% on First payment</p>
      <p className="flex items-center gap-2 text-sm md:text-base">
        <HiBadgeCheck /> Select Your desired four Audits
      </p>
      {/* Season Dropdown */}
      <div className="relative w-full">
        <select
          className="w-full p-2 md:p-3 border cursor-pointer border-gray-400 rounded-lg appearance-none bg-white text-gray-900 text-sm md:text-base"
          value=""
          onChange={handleSeasonChange}
        >
          <option value="" disabled selected>
            Select a season
          </option>
          {seasons.map((s) => (
            <option
              key={s.name}
              value={s.name}
              disabled={selectedSeasons.length >= 4} // Disable all options after 4 selections
            >
              {s.name} - {s.period}
            </option>
          ))}
        </select>
        <FaCircleChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none cursor-pointer" />
      </div>

      {/* Display Selected Seasons */}
      <div className="mt-1 md:mt-2 text-[#000]">
        {selectedSeasons.length > 0 ? (
          <p className="text-xs md:text-sm font-medium">
            Selected: {selectedSeasons.join(", ")}
          </p>
        ) : (
          <p className="text-xs md:text-sm text-[#000]">No seasons selected</p>
        )}
      </div>
      <div className="flex flex-row justify-center items-center gap-1 md:gap-2 w-full" onClick={handleReset}>
        <RiResetLeftFill className="w-5 h-5 md:w-6 md:h-6 cursor-pointer"/>
        <p className="font-bold cursor-pointer text-sm md:text-base">RESET</p>
      </div>
      <button className="border-t border-white px-3 py-1 md:px-4 md:py-2 w-full bg-transparent text-white text-sm md:text-base">
        Make Payment
      </button>
      <div className="flex flex-row md:flex-col w-full gap-2 md:gap-3">
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: "#ffffff", color: "#000" }}
          whileTap={{ scale: 0.95 }}
          className="flex flex-1 md:flex-col justify-center items-center bg-blue-500 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg shadow hover:bg-white hover:text-blue-500 transition-all duration-300 text-xs md:text-base"
          onClick={() => handlePaymentRedirect("paypal")}
        >
          <FaPaypal className="mr-1 md:mr-0 md:mb-1" /> <span>Pay with PayPal</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: "#ffffff", color: "#000" }}
          whileTap={{ scale: 0.95 }}
          className="flex flex-1 md:flex-col justify-center items-center bg-gray-800 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg shadow hover:bg-white hover:text-black transition-all duration-300 text-xs md:text-base"
          onClick={() => handlePaymentRedirect("stripe")}
        >
          <FaStripeS className="mr-1 md:mr-0 md:mb-1" /> <span>Pay with Stripe</span>
        </motion.button>
      </div>

      <hr className="w-full bg-white mt-1 md:mt-2" />

      <p className="text-sm md:text-base">What we offer:</p>
      <ul className="w-full text-xs md:text-sm">
        <li className="flex items-center gap-1 md:gap-2">
          <HiBadgeCheck /> Lorem ipsum dolor sit amet.
        </li>
        <li className="flex items-center gap-1 md:gap-2">
          <HiBadgeCheck /> Lorem ipsum dolor sit amet.
        </li>
        <li className="flex items-center gap-1 md:gap-2">
          <HiBadgeCheck /> Lorem ipsum dolor sit amet.
        </li>
        <li className="flex items-center gap-1 md:gap-2">
          <HiBadgeCheck /> Lorem ipsum dolor sit amet.
        </li>
        <li className="flex items-center gap-1 md:gap-2">
          <HiBadgeCheck /> Lorem ipsum dolor sit amet.
        </li>
      </ul>
    </motion.div>
  );
};