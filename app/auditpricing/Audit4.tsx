import React, { useState } from 'react';
import { motion } from "framer-motion";
import { AiOutlineAudit } from "react-icons/ai";
import { HiBadgeCheck } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { FaPaypal, FaStripeS } from "react-icons/fa";
import { FaCircleChevronDown } from "react-icons/fa6";

export const Audit4 = () => {
  const router = useRouter();
   const [selectedSeasons, setSelectedSeasons] = useState<string[]>([]);
    const seasons = [
        { name: "Winter", period: "01 Dec - 28 Feb" },
        { name: "Spring", period: "01 Mar - 31 May" },
        { name: "Summer", period: "01 Jun - 31 Aug" },
        { name: "Autumn", period: "01 Sep - 30 Nov" }
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
          <AiOutlineAudit className='w-8 h-8' />
        </span>
        Audit4 
      </p>
      <p className="text-center">You are eligible for the four Audits in one or multiple seasons</p>
      <p className="text-2xl">
        {" "}
        £2000 <span className="text-xs">/budget</span>
      </p>
      <p> 20% on First payment</p>
      <p className="flex items-center gap-2">
        <HiBadgeCheck /> Select Your desired four Audits
      </p>
            {/* Season Dropdown */}
                  <div className="relative w-full">
                    <select
                      className="w-full p-3 border cursor-pointer border-gray-400 rounded-lg appearance-none bg-white text-gray-900"
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
                  <div className="mt-2 text-[#000]">
                    {selectedSeasons.length > 0 ? (
                      <p className='text-sm font-medium'>Selected: {selectedSeasons.join(", ")}</p>
                    ) : (
                      <p className="text-[#000]">No seasons selected</p>
                    )}
                  </div>
      <button
        className="border-t border-white  px-4 py-2 w-full bg-transparent text-white"
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
