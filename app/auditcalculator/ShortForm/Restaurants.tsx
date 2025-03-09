"use client";

import React, { useState } from "react";
import { FaCircleInfo } from "react-icons/fa6";
import { restaurantsExcessStock } from "../Questions/ShortForm/ExcessAudit/Restaurants";
import { Restaurant } from "../Questions/ShortForm/SpareCapacity/Restaurant";
import VideoModal from "../VideoModal";
import { FaPlay } from "react-icons/fa";
import RecommendedSolution from "./RecommendedSolution";

interface RestaurantsProps {
  selectedGroup: "GroupA" | "GroupB" | "GroupC" | "GroupD";
  activeCategory: string | null;
  setActiveCategory: React.Dispatch<React.SetStateAction<string | null>>;
}

type RestaurantGroups = keyof typeof Restaurant;

const Restaurants: React.FC<
  RestaurantsProps & { selectedGroup: RestaurantGroups }
> = ({ selectedGroup }) => {
  const groupData = Restaurant[selectedGroup]?.[0] || null; // Fetch selected group data
  const [selectedCategory, setSelectedCategory] = useState("");

  const [tooltipVisible, setTooltipVisible] = useState<string | null>(null);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  // Handle input change
  const handleInputChange = (key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const [inputValues, setInputValues] = useState(Array(7).fill(0)); // Ensure default state is 0 for all inputs

  const handleInputChange2 = (index: number, value: number) => {
    setInputValues((prev) => {
      const newValues = [...prev];
      newValues[index] = value || 0;
      return newValues;
    });
  };

  const yearlyMaxCapacity =
  inputValues.slice(0, 5).some((val) => val > 0) // Check if there's any positive input
    ? inputValues.slice(0, 5).reduce((acc, val) => acc * (val || 1), 1) // Perform multiplication
    : 0; // Default to 0 if all inputs are empty or zero

  // Calculate Current Yearly TurnOver
  const currentYearlyTurnOver =
  inputValues.slice(0, 7).some((val, index) => [0, 3, 4, 5, 6].includes(index) && val > 0)
    ? (inputValues[0] || 1) * (inputValues[3] || 1) * (inputValues[4] || 1) * (inputValues[5] || 1) * (inputValues[6] || 1)
    : 0;

  // Calculate yearly spare capacity
  const yearlySpareCapacity = yearlyMaxCapacity - currentYearlyTurnOver;

  // Handle Reset
const handleReset = () => {
  setInputValues(Array(7).fill(0)); // Reset all input values to 0
};

  const [isOpen, setIsOpen] = useState(false);

  if (!groupData) {
    return <div className="text-white">Please select a restaurant group.</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center  gap-4 w-full p-6">
      <div className="flex flex-col justify-center w-full px-4 bg-cover bg-center bg-no-repeat  h-full">
        <div className="flex flex-col gap-4 h-full">
          <div className="flex flex-col justify-between w-full h-1/3 bg-gray-900 bg-opacity-80 p-4 rounded-3xl">
            <h2 className="relative flex justify-center items-center gap-4 text-xl font-bold text-[#fff] mb-4">
              Spare Capacity Information:
              <span className="text-xl">
                {groupData.Tittle} {/* Dynamically fetched title */}
              </span>
              <span className="relative group">
                <FaCircleInfo className="cursor-pointer text-white hover:text-gray-300" />
                <span className="absolute left-full -ml-60 top-full transform -translate-y-1/2 w-64 p-2 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity z-50 shadow-lg">
                  {groupData.Tooltip} {/* Tooltip content */}
                </span>
              </span>
            </h2>
            <div className="flex flex-row">
    {/* Left Section */}
    <div className="w-2/3 h-[29rem] p-4 mr-2 overflow-y-scroll scrollbar-hidden">
      <select
        className="flex justify-start items-center w-full p-2 border border-[#838383] focus:border-[#2D3DFF] outline-none mb-2 rounded"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value=""> No of Restaurant / Eatery</option>
        {groupData.DropDown.map((item) => (
          <option key={typeof item === "string" ? item : item.Category} value={typeof item === "string" ? item : item.Category}>
            {typeof item === "string" ? item : item.Category}
          </option>
        ))}
      </select>

      {selectedCategory &&
        groupData.DropDown.find(
          (item) => typeof item !== "string" && item.Category === selectedCategory
        ) &&
        (
          groupData.DropDown.find(
            (item) => typeof item !== "string" && item.Category === selectedCategory
          ) as { Category: string; Questions: string[] }
        ).Questions.map((question, index) => {
          const maxValue = question.includes("(max 52)") ? 52 : undefined;

          return (
            <div key={index} className="flex flex-row justify-between gap-4">
              <label className="block w-2/3 mb-4 text-[#fff] text-base font-normal">
                {question}
              </label>
              <input
                type="number"
                min="0"
                max={maxValue}
                value={inputValues[index] || ""}
                onChange={(e) => handleInputChange2(index, parseInt(e.target.value, 10) || 0)}
                className="w-1/3 p-2 border border-[#838383] focus:border-[#2D3DFF] outline-none rounded mb-4"
              />
            </div>
          );
        })}
    </div>

    {/* Right Section */}
    <div className="w-1/3 flex flex-col items-center rounded-2xl gap-2 bg-[#fff] p-4">
      {/* Yearly Maximum Capacity */}
      <div className="flex flex-col px-2 w-full justify-between items-center gap-2">
        <p className="text-center font-bold text-lg">Your Yearly Maximum Capacity:</p>
        <div className="flex justify-center items-center w-full bg-red-300 text-[#fff] p-2 rounded-lg">
          <p className="text-center font-bold text-xl ">£{yearlyMaxCapacity}</p>
        </div>
      </div>

      {/* Current Yearly TurnOver */}
      <div className="flex flex-col px-2 w-full justify-between items-center gap-2">
        <p className="text-center font-bold text-lg">Your Current Yearly TurnOver:</p>
        <div className="flex justify-center items-center w-full bg-red-300 text-[#fff] p-2 rounded-lg">
          <p className="text-center font-bold text-xl ">£{currentYearlyTurnOver}</p>
        </div>
      </div>

      {/* Yearly Spare Capacity */}
      <div className="flex flex-col px-2 w-full justify-between items-center gap-2">
        <p className="text-center font-bold text-lg">Your Yearly Spare Capacity:</p>
        <div className="flex justify-center items-center w-full bg-red-300 text-[#fff] p-2 rounded-lg">
          <p className="text-center font-bold text-xl ">£{yearlySpareCapacity}</p>
        </div>
      </div>

      <button
        onClick={handleReset}
        className="rounded-full mt-4 py-2 px-4 w-1/2 bg-slate-800 text-[#fff] font-bold hover:bg-slate-600"
      >
        Reset
      </button>

      <p className=" text-center text-sm mt-6">
        Kindly click button below to Watch the Explanation Video
      </p>

      <div className="flex flex-row w-full justify-center gap-4">
        <button
          onClick={() => setIsOpen(true)}
          className="flex flex-row gap-4 items-center justify-center px-4 py-2 bg-red-600 text-white mt-2 font-bold rounded-md hover:bg-blue-700"
        >
          Watch Video <FaPlay />
        </button>

        {/* Modal Overlay */}
        <VideoModal isOpen={isOpen} closeModal={() => setIsOpen(false)} />
      </div>
    </div>
  </div>
          </div>

          <div className="flex flex-col justify-between w-full h-1/3 bg-gray-900 bg-opacity-80 p-4 rounded-3xl">
            <h2 className="text-xl text-center font-bold text-white mb-4">
              Enter Excess Stock Information
            </h2>

            <div className="flex flex-row">
              {/* Left Section */}
              <div className="w-2/3 h-[29rem] p-4 mr-2 overflow-y-scroll scrollbar-hidden">
                {Object.entries(restaurantsExcessStock).map(([key, data]) => (
                  <div key={key} className="mb-4 ">
                    <div className="flex flex-row justify-between gap-4">
                      {/* Question Label with Tooltip */}
                      <div className="flex w-2/3 items-center gap-2">
                        <label className="text-white text-base font-normal">
                          {data.Question}
                        </label>

                        {/* Tooltip Icon */}
                        <span
                          className="relative group"
                          onMouseEnter={() => setTooltipVisible(key)}
                          onMouseLeave={() => setTooltipVisible(null)}
                        >
                          <FaCircleInfo className="cursor-pointer text-white hover:text-gray-300" />

                          {/* Tooltip Content */}
                          {tooltipVisible === key && (
                            <div className="absolute left-full -ml-60 w-72 p-2 bg-gray-800 text-white text-xs rounded-md shadow-lg z-50">
                              {data.Tooltip}
                            </div>
                          )}
                        </span>
                      </div>

                      {/* Input Field */}
                      {data.Question.toLowerCase().includes("(yes/no)") ? (
                        <select
                          className="w-1/3 p-2 border border-gray-600 focus:border-blue-500 outline-none rounded  bg-[#fff] text-[#000]"
                          value={answers[key] || ""}
                          onChange={(e) =>
                            handleInputChange(key, e.target.value)
                          }
                        >
                          <option value="">Select</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      ) : data.Question.includes(
                          "How often do you conduct stock takes?"
                        ) ? (
                        <select
                          className="w-1/3 p-2 border border-gray-600 focus:border-blue-500 outline-none rounded bg-[#fff] text-[#000]"
                          value={answers[key] || ""}
                          onChange={(e) =>
                            handleInputChange(key, e.target.value)
                          }
                        >
                          <option value="">Select</option>
                          <option value="Daily">Daily</option>
                          <option value="Weekly">Weekly</option>
                          <option value="Monthly">Monthly</option>
                          <option value="Monthly">Quarterly</option>
                        </select>
                      ) : data.Question.toLowerCase().includes("(%)") ? (
                        <input
                          type="number"
                          min="0"
                          max="100"
                          className="w-1/3 p-2 border border-gray-600 focus:border-blue-500 outline-none rounded  bg-[#fff] text-[#000]"
                          value={answers[key] || ""}
                          onChange={(e) =>
                            handleInputChange(
                              key,
                              Math.min(100, Number(e.target.value)).toString()
                            )
                          }
                        />
                      ) : (
                        <input
                          type="text"
                          className="w-1/3 p-2 border border-gray-600 focus:border-blue-500 outline-none rounded  bg-[#fff] text-[#000]"
                          value={answers[key] || ""}
                          onChange={(e) =>
                            handleInputChange(key, e.target.value)
                          }
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {/* Right Section */}
              <div className="w-1/3 flex flex-col items-center rounded-2xl gap-2 bg-[#fff] p-4">
                <div className="flex flex-col px-2 w-full justify-between items-center gap-2">
                  <p className=" text-center font-bold text-lg">
                    Your Yearly Maximum Capacity:
                  </p>
                  <div className="flex justify-center items-center w-full bg-red-300 text-[#fff] p-2 rounded-lg">
                    <p className="text-center font-bold text-xl "> £0 </p>
                  </div>
                </div>
                <div className="flex flex-col px-2 w-full justify-between items-center gap-2">
                  <p className=" text-center font-bold text-lg">
                    Your Current Yearly TurnOver:
                  </p>
                  <div className="flex justify-center items-center w-full bg-red-300 text-[#fff] p-2 rounded-lg">
                    <p className="text-center font-bold text-xl "> £0 </p>
                  </div>
                </div>

                <div className="flex flex-col px-2 w-full justify-between items-center gap-2">
                  <div className="">
                    <p className=" text-center font-bold text-lg">
                      Your Yearly Spare Capacity:
                    </p>
                  </div>
                  <div className="flex justify-center items-center w-full bg-red-300 text-[#fff] p-2 rounded-lg">
                    <p className="text-center font-bold text-xl "> £0 </p>
                  </div>
                </div>

                <button className="rounded-full mt-4 py-2 px-4 w-1/2 bg-slate-800 text-[#fff] font-bold hover:bg-slate-600">
                  Reset
                </button>
                <p className=" text-center text-sm mt-6">
                  Kindly click button below to Watch the Explanation Video
                </p>
                <div className="flex flex-row w-full  justify-center gap-4">
                  {/* Watch Video Button */}
                  <button
                    onClick={() => setIsOpen(true)}
                    className="flex flex-row gap-4 items-center justify-center px-4 py-2 bg-red-600 text-white mt-2 font-bold rounded-md hover:bg-blue-700"
                  >
                    Watch Video <FaPlay />
                  </button>

                  {/* Modal Overlay */}
                  <VideoModal
                    isOpen={isOpen}
                    closeModal={() => setIsOpen(false)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between w-full h-1/3 gap-4 bg-[#000] bg-opacity-70 p-4 mt-6 rounded-3xl">
          <RecommendedSolution />
        </div>
      </div>
    </div>
  );
};

export default Restaurants;
