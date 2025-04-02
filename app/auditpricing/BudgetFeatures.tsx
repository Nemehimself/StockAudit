import React, { useState } from "react";
import { motion } from "framer-motion";
import { GiCheckMark } from "react-icons/gi";
import { RiCloseLargeLine } from "react-icons/ri";

export const BudgetFeatures = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Define the type for feature availability
  type Seasons = "Audit1" | "Audit2" | "Audit3" | "Audit4";

  // Features list (vertical headers)
  const features: string[] = [
    "Advanced Analytics",
    "Custom Reports",
    "24/7 Support",
    "Flexible Payment Options",
    "Multi-user Access",
    "Real-time Insights",
    "Data Export",
  ];

  // Feature availability under each season
  const featureAvailability: Record<Seasons, boolean[]> = {
    Audit1: [true, true, false, true, false, true, false],
    Audit2: [true, false, true, false, true, true, true],
    Audit3: [false, true, true, true, true, false, true],
    Audit4: [true, true, true, false, false, true, false],
  };

  // Toggle mobile view expansion
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="mt-6 bg-white p-3 md:p-6 rounded-xl w-full sm:w-11/12 md:w-5/6 lg:w-4/5 xl:w-3/4 mx-auto shadow-lg"
    >
      <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-4 text-center">Budget Features</h3>
      
      {/* Desktop Table View (hidden on small screens) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          {/* Table Head */}
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-2 md:p-3 border border-gray-300 text-left">Features</th>
              {Object.keys(featureAvailability).map((season) => (
                <th key={season} className="p-2 md:p-3 border border-gray-300 text-center">{season}</th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {features.map((feature, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="p-2 md:p-3 border border-gray-300 text-left text-sm md:text-base">{feature}</td>
                {(Object.keys(featureAvailability) as Seasons[]).map((season) => (
                  <td key={season} className="p-2 md:p-3 border border-gray-300 text-center">
                    {featureAvailability[season][index] ? (
                      <GiCheckMark className="text-emerald-500 text-lg md:text-xl mx-auto font-bold" />
                    ) : (
                      <RiCloseLargeLine className="text-red-500 text-lg md:text-xl mx-auto font-bold" />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Mobile View (shown only on small screens) */}
      <div className="md:hidden">
        <div className="mb-4">
          <button 
            onClick={toggleExpand} 
            className="w-full py-2 bg-gray-200 text-gray-800 rounded-lg flex justify-between items-center px-4"
          >
            <span className="font-medium">View Feature Comparison</span>
            <span className="transform transition-transform duration-300" style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)' }}>▼</span>
          </button>
        </div>
        
        {isExpanded && (
          <div className="space-y-4">
            {(Object.keys(featureAvailability) as Seasons[]).map((season) => (
              <div key={season} className="border border-gray-300 rounded-lg overflow-hidden">
                <div className="bg-gray-200 p-3 font-medium text-gray-800">{season}</div>
                <div className="divide-y divide-gray-300">
                  {features.map((feature, index) => (
                    <div key={index} className="p-3 flex justify-between items-center text-sm">
                      <span>{feature}</span>
                      {featureAvailability[season][index] ? (
                        <GiCheckMark className="text-emerald-500 text-lg font-bold" />
                      ) : (
                        <RiCloseLargeLine className="text-red-500 text-lg font-bold" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};