import React from "react";
import { motion } from "framer-motion";
import { GiCheckMark } from "react-icons/gi";
import { RiCloseLargeLine } from "react-icons/ri";

export const BudgetFeatures = () => {
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

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="mt-6 bg-white p-6 rounded-xl w-3/4 shadow-lg overflow-x-auto"
    >
      <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Budget Features</h3>
      
      <table className="w-full border-collapse">
        {/* Table Head */}
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="p-3 border border-gray-300 text-left">Features</th>
            {Object.keys(featureAvailability).map((season) => (
              <th key={season} className="p-3 border border-gray-300 text-center">{season}</th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {features.map((feature, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="p-3 border border-gray-300 text-left">{feature}</td>
              {(Object.keys(featureAvailability) as Seasons[]).map((season) => (
                <td key={season} className="p-3 border border-gray-300 text-center">
                  {featureAvailability[season][index] ? (
                    <GiCheckMark className="text-emerald-500 text-xl mx-auto font-bold" />
                  ) : (
                    <RiCloseLargeLine className="text-red-500 text-xl mx-auto font-bold" />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};
