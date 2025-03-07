import React, { useEffect, useState } from "react";
import { LuCalendarClock } from "react-icons/lu";

interface StockAuditShortProps {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeIndex: number | null;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
  menuItems: { label: string; icon: React.ComponentType; bg: string; image: string; component: React.ReactNode }[];
}

const StockAuditShort = ({ activeIndex, menuItems }: StockAuditShortProps) => {

  const backgroundImage = activeIndex !== null ? menuItems[activeIndex].image : "";

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
    <div className="flex flex-col justify-center items-center  w-full bg-cover bg-center "
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
      {activeIndex !== null && menuItems[activeIndex].component}
    </div>
  );
};

export default StockAuditShort;
