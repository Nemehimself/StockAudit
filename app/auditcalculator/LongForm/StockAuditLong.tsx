// "use client";

// import React, { useState, useEffect,useRef } from "react";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import { IoIosMenu, IoMdArrowRoundBack } from "react-icons/io";
// import { IoRestaurant } from "react-icons/io5";
// import { MdMiscellaneousServices } from "react-icons/md";
// import { FaHotel } from "react-icons/fa6";
// import { FaTools } from "react-icons/fa";
// import { BsShop } from "react-icons/bs";
// import { TiMediaPlay } from "react-icons/ti";
// import Restaurants from "./Restaurants";
// import Retail from "./Retail";
// import Hotel from "./Hotel";
// import ServiceProvider from "./ServiceProvider";
// import Media from "./Media";
// import Manufacturing from "./Manufacturing";

// const menuItems = [
//   { label: "Restaurants", icon: IoRestaurant, bg: "bg-red-500", image: "/StockAudit/restaurants.jpeg", component: <Restaurants /> },
//   { label: "Retail", icon: BsShop, bg: "bg-blue-500", image: "/StockAudit/retail.jpeg", component: <Retail /> },
//   { label: "Hotel", icon: FaHotel, bg: "bg-lime-500", image: "/StockAudit/hotel.jpeg", component: <Hotel /> },
//   { label: "Service Provider", icon: MdMiscellaneousServices, bg: "bg-purple-500", image: "/StockAudit/serviceprovider.jpeg", component: <ServiceProvider /> },
//   { label: "Media", icon: TiMediaPlay, bg: "bg-yellow-500", image: "/StockAudit/media.jpeg", component: <Media /> },
//   { label: "Manufacturing", icon: FaTools, bg: "bg-gray-500", image: "/StockAudit/manufacturing.jpeg", component: <Manufacturing /> },
// ];

// interface StockAuditLongProps {
//   onBack: () => void;
// }

// const StockAuditLong= ({ onBack }: StockAuditLongProps) => {
//   const [activeIndex, setActiveIndex] = useState<number | null>(null);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const menuRef = useRef<HTMLDivElement | null>(null);

//   // Disable right-click, copy, cut, and paste
//   useEffect(() => {
//     const disableContextMenu = (event: Event) => event.preventDefault();
//     const disableKeys = (event: KeyboardEvent) => {
//       if (event.ctrlKey && (event.key === "c" || event.key === "x" || event.key === "u")) {
//         event.preventDefault();
//       }
//     };

//     document.addEventListener("contextmenu", disableContextMenu);
//     document.addEventListener("keydown", disableKeys);

//     return () => {
//       document.removeEventListener("contextmenu", disableContextMenu);
//       document.removeEventListener("keydown", disableKeys);
//     };
//   }, []);

//   // Handle clicking outside the dropdown
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
//         setIsMenuOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Update current time every second
//   const [currentDateTime, setCurrentDateTime] = useState(
//     new Date().toLocaleString("en-US", {
//       weekday: "long",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     })
//   );

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentDateTime(
//         new Date().toLocaleString("en-US", {
//           weekday: "long",
//           year: "numeric",
//           month: "long",
//           day: "numeric",
//           hour: "2-digit",
//           minute: "2-digit",
//           hour12: true,
//         })
//       );
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="relative flex flex-col items-center w-screen select-none">
      
//       {/* Background Image */}
//       {activeIndex !== null && (
//         <Image
//           src={menuItems[activeIndex].image}
//           alt="Background"
//           layout="fill"
//           objectFit="cover"
//           className="absolute top-0 left-0 w-full h-full -z-10"
//         />
//       )}

//       {/* Header Section */}
//       <div className="flex items-center justify-start gap-20 w-full p-4 bg-white fixed top-0 z-20 shadow-md">
//         <IoMdArrowRoundBack
//           className="w-8 h-8 text-gray-700 cursor-pointer hover:text-gray-900"
//           onClick={onBack}
//         />
//         <div className="flex items-center space-x-4 relative">
//           <IoIosMenu
//             className="w-8 h-8 text-gray-700 cursor-pointer hover:text-gray-900"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//           />
//           <span className="text-2xl font-semibold text-gray-800">
//             LONG FORM AUDIT
//           </span>
//         </div>
//       </div>

//       {/* Dropdown Menu */}
//       {isMenuOpen && (
//         <motion.div
//           ref={menuRef}
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -10 }}
//           className="absolute top-16 left-4 bg-white shadow-lg gap-4 rounded-md w-56 p-2 z-30"
//         >
//           {menuItems.map((item, index) => (
//             <div
//               key={index}
//               className={`flex items-center gap-3 p-3 mt-2 cursor-pointer rounded-md transition ${item.bg} text-white hover:opacity-80`}
//               onClick={() => {
//                 setActiveIndex(index);
//                 setIsMenuOpen(false);
//               }}
//             >
//               <item.icon className="w-6 h-6" />
//               <span>{item.label}</span>
//             </div>
//           ))}
//         </motion.div>
//       )}

//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="w-full h-full flex flex-col justify-center items-center p-20 mt-4"
//       >
//         {/* Display welcome message if no menu is selected */}
//         {activeIndex === null && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="text-black text-2xl font-semibold text-center"
//           >
//             Welcome to Long Form Audit.<br />Select a menu above to get started.
//           </motion.div>
//         )}

//         <div className="text-white font-semibold text-lg mt-6">
//           {currentDateTime}
//         </div>

//         {activeIndex !== null && menuItems[activeIndex].component}
//       </motion.div>
//     </div>
//   );
// };

// export default StockAuditLong;

import React, { useEffect, useState } from "react";
import { LuCalendarClock } from "react-icons/lu";

interface StockAuditLongProps {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeIndex: number | null;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
  menuItems: { label: string; icon: React.ComponentType; bg: string; image: string; component: React.ReactNode }[];
}

const StockAuditLong = ({ activeIndex, menuItems }: StockAuditLongProps) => {

  // Default to the first menu item if none is selected
  const selectedIndex = activeIndex !== null ? activeIndex : 0;

  // Get background image from the selected menu item
  const backgroundImage = menuItems[selectedIndex]?.image || 'default-bg.jpg';

   // Disable right-click, copy, cut, and paste
  useEffect(() => {
    const disableContextMenu = (event: Event) => event.preventDefault();
    const disableKeys = (event: KeyboardEvent) => {
      if (event.ctrlKey && (event.key === "c" || event.key === "x" || event.key === "u")) {
        event.preventDefault();
      }
    };
    document.addEventListener("contextmenu", disableContextMenu);
    document.addEventListener("keydown", disableKeys);
    return () => {
      document.removeEventListener("contextmenu", disableContextMenu);
      document.removeEventListener("keydown", disableKeys);
    };
  }, []);

    // Update current time every second
    const [currentDateTime, setCurrentDateTime] = useState(
      new Date().toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    );
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentDateTime(
          new Date().toLocaleString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })
        );
      }, 1000);
  
      return () => clearInterval(interval);
    }, []);

  return (
    <div 
      className="flex flex-col justify-center items-center w-full bg-cover bg-center " 
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Render Selected Component */}
      <div className="flex flex-row items-center gap-10 justify-center w-full mt-2 text-center px-8">
      <p className="text-[#fff] font-bold py-2 px-6 bg-opacity-70 bg-[#000]">
          Please complete this audit as accurately as possible, as it will impact the final results
      </p>
      <div className="flex py-2 px-6 bg-opacity-70 bg-[#000] text-[#fff] font-bold gap-2"> 
        <LuCalendarClock  className="w-6 h-6"/> 
        {currentDateTime}
      </div>
      </div>
      {menuItems[selectedIndex]?.component}
    </div>
  );
};

export default StockAuditLong;