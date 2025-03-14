"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import StockAuditHeader from "./StockAuditHeader";
import shortMenuItems from "./ShortForm/shortMenuData";
import { LuCalendarClock } from "react-icons/lu";

export default function Dashboard() {
  const [activeLabel, setActiveLabel] = useState(shortMenuItems[0].label);
  const [activeGroup, setActiveGroup] = useState<"GroupA" | "GroupB" | "GroupC" | "GroupD">("GroupA");

  // Get the active menu item (to retrieve its background image)
  const activeMenuItem = shortMenuItems.find((item) => item.label === activeLabel);
  const backgroundImage = activeMenuItem ? `url(${activeMenuItem.image})` : "none";

  // Get the active component based on selected label
  const activeComponent = activeMenuItem?.component || null;

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
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <Sidebar 
        menuItems={shortMenuItems}
        setActiveLabel={setActiveLabel}
        setActiveGroup={setActiveGroup}
        activeLabel={activeLabel}
        activeGroup={activeGroup}
      />


      {/* Main Content */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* Stock Audit Header */}
        <StockAuditHeader activeAudit="short" setActiveAudit={() => {}} setActiveIndex={() => {}} />

        {/* Content Section with Dynamic Background */}
        <div 
          className=" flex-1 bg-cover bg-center transition-all duration-300 ease-in-out" 
          style={{ backgroundImage }}
        >
          <div className="bg-slate-700 bg-opacity-70 w-full h-full p-4">
          <div className="flex flex-row items-center gap-10 justify-center w-full mt-2 text-center px-8">
                  <p className="text-[#fff] font-bold py-2 px-6 bg-opacity-70 bg-[#000]">
                    Please complete this audit as accurately as possible, as it will impact the final results
                  </p>
                  <div className="flex py-2 px-6 bg-opacity-70 bg-[#000] text-[#fff] font-bold gap-2"> 
                    <LuCalendarClock  className="w-6 h-6"/> 
                    {currentDateTime}
                  </div>
                </div>
          {activeComponent &&
            React.cloneElement(activeComponent as React.ReactElement<{ selectedGroup: "GroupA" | "GroupB" | "GroupC" | "GroupD" }>, {
              selectedGroup: activeGroup,
            })}
        </div>
        </div>
      </div>
    </div>
  );
}
