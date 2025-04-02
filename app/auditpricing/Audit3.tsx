import React, { useState } from "react";
import { AiOutlineAudit } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { HiBadgeCheck } from "react-icons/hi";
import { motion } from "framer-motion";
import { FaPaypal, FaStripeS } from "react-icons/fa";
import { FaCircleChevronDown } from "react-icons/fa6";
import { RiResetLeftFill } from "react-icons/ri";

export const Audit3 = () => {
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
      const count = prevSeasons.filter(
        (season) => season === selectedValue
      ).length;

      if (count === 3) {
        // If the season is already selected X3, remove one instance
        return prevSeasons.filter((season) => season !== selectedValue);
      }

      if (count === 1) {
        // If selected once, allow selecting it again (twice)
        return prevSeasons.length === 3
          ? prevSeasons.filter((season) => season !== selectedValue) // Remove if already two
          : [...prevSeasons, selectedValue]; // Allow duplicate selection
      }

      if (prevSeasons.length === 3) {
        // If two different seasons are selected, replace the first one
        return [prevSeasons[1], selectedValue];
      }

      // Normal case: Add the season if there's space
      return [...prevSeasons, selectedValue];
    });
  };

  const handleReset = () => {
    setSelectedSeasons([]); // Clears the selection
  };

  const handlePaymentRedirect = (method: "paypal" | "stripe") => {
    if (selectedSeasons.length !== 3) {
      alert("Please select 3 seasons before proceeding to payment.");
      return;
    }
    const query = `?amount=1500&season=${encodeURIComponent(
      selectedSeasons.join(", ")
    )}`;
    router.push(`/${method}-payment${query}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.1, ease: "easeOut" }}
      whileHover={{ scale: 1.02, boxShadow: "0px 5px 15px rgba(0,0,0,0.2)" }}
      whileTap={{ scale: 0.98 }}
      className="flex flex-col items-center w-full md:w-5/12 lg:w-1/5 justify-center p-4 gap-4 shadow-lg rounded-lg text-white transition-all duration-300 mb-6 md:mb-0"
      style={{
        background: "linear-gradient(to bottom right, #FFB347, #FFCC33)", // Sunny Yellow-Orange
      }}
    >
      <p className="flex flex-row items-center text-2xl md:text-3xl font-light gap-2 md:gap-4">
        <AiOutlineAudit className="w-6 h-6 md:w-8 md:h-8" /> Audit3
      </p>
      <p className="text-center text-sm md:text-base">
        You are only eligible for three Audits in one - three seasons
      </p>
      <p className="text-xl md:text-2xl">
        £1500 <span className="text-xs">/budget</span>
      </p>
      <p className="text-sm md:text-base">20% on First payment</p>
      <p className="flex items-center gap-2 text-sm md:text-base">
        <HiBadgeCheck /> Select Your desired three Audits
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
              disabled={
                selectedSeasons.length === 3 &&
                !selectedSeasons.every((season) => season === s.name)
              }
            >
              {s.name} - {s.period}
            </option>
          ))}
        </select>
        <FaCircleChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none cursor-pointer" />
      </div>

      {/* Display Selected Seasons */}
      <div className="mt-2 text-black">
        {selectedSeasons.length > 0 ? (
          <p className="text-xs md:text-sm font-medium">
            Selected: {selectedSeasons.join(", ")}
          </p>
        ) : (
          <p className="text-xs md:text-sm">No seasons selected</p>
        )}
      </div>
      <div className="flex flex-row justify-center items-center gap-2 w-full" onClick={handleReset}>
        <RiResetLeftFill className="w-4 h-4 md:w-6 md:h-6 cursor-pointer"/>
        <p className="font-bold cursor-pointer text-sm md:text-base">RESET</p>
      </div>
      <button className="border-t border-white px-4 py-2 w-full bg-transparent text-white text-sm md:text-base">
        Make Payment
      </button>
      <motion.button
        whileHover={{ scale: 1.05, backgroundColor: "#ffffff", color: "#000" }}
        whileTap={{ scale: 0.95 }}
        className="flex flex-col justify-between items-center bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-white hover:text-blue-500 transition-all duration-300 text-sm md:text-base w-full"
        onClick={() => handlePaymentRedirect("paypal")}
      >
        <FaPaypal /> <span>Pay with PayPal </span>
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05, backgroundColor: "#ffffff", color: "#000" }}
        whileTap={{ scale: 0.95 }}
        className="flex flex-col justify-between items-center bg-gray-800 text-white px-4 py-2 rounded-lg shadow hover:bg-white hover:text-black transition-all duration-300 text-sm md:text-base w-full"
        onClick={() => handlePaymentRedirect("stripe")}
      >
        <FaStripeS /> <span> Pay with Stripe </span>
      </motion.button>

      <hr className="w-full bg-white mt-2" />
      <p className="text-sm md:text-base">What we offer:</p>
      <ul className="text-xs md:text-sm w-full">
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