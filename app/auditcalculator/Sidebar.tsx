"use client";

import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import { Restaurant } from "./Questions/ShortForm/SpareCapacity/Restaurant";

interface SidebarProps {
  menuItems: {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    bg: string;
    image: string;
    component: React.ReactNode;
    subItems: string[];
  }[];
  setActiveLabel: (label: string) => void;
  setActiveGroup: (group: "GroupA" | "GroupB" | "GroupC" | "GroupD") => void;
  activeLabel: string;
  activeGroup: "GroupA" | "GroupB" | "GroupC" | "GroupD";
}

const Sidebar: React.FC<SidebarProps> = ({
  menuItems,
  setActiveLabel,
  setActiveGroup,
  activeLabel,
  activeGroup,
}) => {
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const [tooltipVisible, setTooltipVisible] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Toggle menu dropdown
  const toggleSubMenu = (label: string) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <div className="h-screen w-64 bg-gray-900 text-white p-4 shadow-lg overflow-y-auto z-50 flex flex-col">
      <h2 className="text-lg font-bold mb-4 text-center">
        Select a Sector Below
      </h2>

      {/* Menu Items */}
      {menuItems.map((item, index) => (
        <div key={index} className="mb-2">
          {/* Main Sector */}
          <div
            className={`flex items-center justify-between gap-2 p-2 md:gap-3 md:p-3 cursor-pointer rounded-md transition ${item.bg} text-white hover:opacity-80`}
            onClick={() => toggleSubMenu(item.label)}
          >
            <div className="flex items-center gap-2 md:gap-3">
              <item.icon className="w-5 h-5 md:w-6 md:h-6" />
              <span className="text-sm md:text-base">{item.label}</span>
            </div>
            {openMenus[item.label] ? 
              <FaChevronDown className="text-sm md:text-base" /> : 
              <FaChevronRight className="text-sm md:text-base" />
            }
          </div>

          {/* Submenu Items */}
          {openMenus[item.label] && (
            <div className="ml-4 md:ml-6 mt-1 md:mt-2 space-y-1 md:space-y-2">
              {item.subItems.map((subItem, subIndex) => {
                const isActive =
                  item.label === activeLabel && subItem === activeGroup;

                // Get the categories dynamically for each group
                const groupData = Restaurant[subItem as "GroupA" | "GroupB" | "GroupC" | "GroupD"]?.[0];
                const categories =
                  groupData?.DropDown.map((item) => item.Category) || [];

                return (
                  <div
                    key={subIndex}
                    className={`p-1 md:p-2 text-xs md:text-sm rounded-md cursor-pointer transition ${
                      isActive ? "bg-gray-500" : "bg-gray-800 hover:bg-gray-700"
                    } flex justify-between items-center`}
                    onClick={() => {
                      setActiveLabel(item.label); // Set the active sector
                      setActiveGroup(
                        subItem as "GroupA" | "GroupB" | "GroupC" | "GroupD"
                      ); // Set the selected group
                    }}
                  >
                    {subItem}

                    {/* Tooltip Icon */}
                    <span
                      className="relative"
                      onMouseEnter={() => setTooltipVisible(subItem)}
                      onMouseLeave={() => setTooltipVisible(null)}
                      onClick={(e) => {
                        // Prevent parent click from firing
                        e.stopPropagation();
                        // Toggle tooltip on mobile
                        if (isMobile) {
                          setTooltipVisible(tooltipVisible === subItem ? null : subItem);
                        }
                      }}
                    >
                      <FaCircleInfo className="cursor-pointer text-white hover:text-gray-300 w-4 h-4" />

                      {/* Tooltip Content - Mobile friendly positioning */}
                      {tooltipVisible === subItem && categories.length > 0 && (
                        <div className={`
                          ${isMobile ? 'absolute left-1/2 -translate-x-1/2 top-full mt-2' : 'absolute right-full mr-2 top-1/2 -translate-y-1/2'} 
                          w-48 p-2 bg-gray-800 text-white text-xs rounded-md shadow-lg z-[9999]
                        `}>
                          <ul className="mt-1">
                            {categories.map((category, i) => (
                              <li
                                key={i}
                                className="border-b border-gray-600 last:border-none py-1"
                              >
                                {category}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;