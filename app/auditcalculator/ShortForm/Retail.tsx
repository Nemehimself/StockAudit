"use client";

import React, { useState } from "react";
import { FaCircleInfo } from "react-icons/fa6";
import { retailExcessStock } from "../Questions/ShortForm/ExcessAudit/Retail";
import { RetailSpareQuestions } from "../Questions/ShortForm/SpareCapacity/Retail";
import VideoModal from "../VideoModal";
import { FaPlay } from "react-icons/fa";
import RecommendedSolution from "./RecommendedSolution";
import { currencyOptions } from "../Questions/ShortForm/SpareCapacity/currencyOption";

interface RetailProps {
  selectedGroup: "GroupA" | "GroupB" | "GroupC" | "GroupD";
  activeCategory: string | null;
  setActiveCategory: React.Dispatch<React.SetStateAction<string | null>>;
}

type RetailGroups = keyof typeof RetailSpareQuestions;

const Retail: React.FC<RetailProps & { selectedGroup: RetailGroups }> = ({
  selectedGroup,
}) => {
  const groupData = RetailSpareQuestions[selectedGroup]?.[0] || null; // Fetch selected group data
  const [selectedCategory, setSelectedCategory] = useState("");

  const [tooltipVisible, setTooltipVisible] = useState<string | null>(null);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  // Handle input change
  const handleInputChange = (key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const [inputValues, setInputValues] = useState(Array(7).fill(0)); // Ensure default state is 0 for all inputs
  const [yearlyMaxCapacity, setYearlyMaxCapacity] = useState(0);
  const [currentYearlyTurnOver, setCurrentYearlyTurnOver] = useState(0);
  const [yearlySpareCapacity, setYearlySpareCapacity] = useState(0);

  const [currency, setCurrency] = useState<string>("£");
  const [errors, setErrors] = useState(Array(7).fill(false)); // Track missing inputs

  const handleInputChange2 = (index: number, value: number) => {
    setInputValues((prev) => {
      const newValues = [...prev];
      newValues[index] = value || 0;
      return newValues;
    });

    setErrors((prev) => {
      const newErrors = [...prev];
      newErrors[index] = false; // Reset error when user enters a value
      return newErrors;
    });
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setCurrency(value);
  };

  const handleCalculate = () => {
    if (selectedGroup !== "GroupD") {
      const newErrors = inputValues.map(
        (val, index) => [0, 3, 4, 5, 6].includes(index) && val === 0 // Require fields for calculations
      );

      setErrors(newErrors);

      if (newErrors.some((err) => err)) {
        return; // Stop calculation if any required input is missing
      }
    }

    let maxCapacity = 0;
    let yearlyTurnOver = 0;

    maxCapacity =
      (inputValues[0] || 1) *
      (inputValues[1] || 1) *
      (inputValues[3] || 1) *
      (inputValues[4] || 1) *
      (inputValues[5] || 1);

    yearlyTurnOver =
      (inputValues[0] || 1) *
      (inputValues[2] || 1) *
      (inputValues[3] || 1) *
      (inputValues[4] || 1) *
      (inputValues[5] || 1);

    // Calculate Yearly Spare Capacity
    const spareCapacity = maxCapacity - yearlyTurnOver;

    setYearlyMaxCapacity(maxCapacity);
    setCurrentYearlyTurnOver(yearlyTurnOver);
    setYearlySpareCapacity(spareCapacity);
  };

  const handleReset = () => {
    setInputValues(Array(7).fill(0)); // Reset all input values to 0
    setYearlyMaxCapacity(0); // Reset yearly max capacity
    setCurrentYearlyTurnOver(0); // Reset yearly turnover
    setYearlySpareCapacity(0); // Reset spare capacity
    setErrors(Array(7).fill(false)); // Clear error messages
  };

  const [isOpen, setIsOpen] = useState(false);

  if (!groupData) {
    return <div className="text-white">Please select a Retail group.</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center  gap-4 w-full p-6">
      <div className="flex flex-col justify-center w-full px-4 bg-cover bg-center bg-no-repeat  h-full">
        <div className="flex flex-col justify-center items-center gap-4 h-full">
          <div className="flex flex-col justify-between w-2/3 h-1/3 bg-gray-900 bg-opacity-80 p-4 rounded-3xl">
            <h2 className="relative flex justify-center items-center gap-4 text-xl font-bold text-[#fff] mb-4">
              Spare Capacity Information:
              <span className="text-base">
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
              <div className="w-2/3 p-4 mr-2 overflow-y-scroll scrollbar-hidden">
                {/* Select Dropdown */}
                <select
                  className="flex justify-start items-center w-full p-2 border border-[#838383] focus:border-[#2D3DFF] outline-none mb-2 rounded"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Select Retail Type</option>
                  {groupData.DropDown.map((item) => (
                    <option
                      key={typeof item === "string" ? item : item.Category}
                      value={typeof item === "string" ? item : item.Category}
                    >
                      {typeof item === "string" ? item : item.Category}
                    </option>
                  ))}
                </select>

                {/* currency options */}
                {selectedCategory && (
                  <div className="flex justify-between items-center my-3 ">
                    <p className="text-white">Select a currency</p>
                    <select
                      className="w-1/3 p-2 rounded outline-blue-500"
                      value={currency}
                      onChange={handleCurrencyChange}
                    >
                      {currencyOptions.map(
                        (
                          option: {
                            value:
                              | string
                              | number
                              | readonly string[]
                              | undefined;
                            label:
                              | string
                              | number
                              | bigint
                              | boolean
                              | React.ReactElement<
                                  unknown,
                                  string | React.JSXElementConstructor<unknown>
                                >
                              | Iterable<React.ReactNode>
                              | React.ReactPortal
                              | Promise<
                                  | string
                                  | number
                                  | bigint
                                  | boolean
                                  | React.ReactPortal
                                  | React.ReactElement<
                                      unknown,
                                      | string
                                      | React.JSXElementConstructor<unknown>
                                    >
                                  | Iterable<React.ReactNode>
                                  | null
                                  | undefined
                                >
                              | null
                              | undefined;
                          },
                          i: React.Key | null | undefined
                        ) => (
                          <option value={option.value} key={i}>
                            {option.label}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                )}

                {/* Questions Display */}
                {selectedCategory &&
                  groupData.DropDown.find(
                    (item) =>
                      typeof item !== "string" &&
                      item.Category === selectedCategory
                  ) &&
                  (
                    groupData.DropDown.find(
                      (item) =>
                        typeof item !== "string" &&
                        item.Category === selectedCategory
                    ) as {
                      Category: string;
                      Questions: { Question: string; Tooltip: string }[];
                    }
                  ).Questions.map((questionObj, index) => {
                    const { Question, Tooltip } = questionObj; // Destructure the object

                    const maxValue = Question.includes("(max 52)")
                      ? 52
                      : undefined;

                    return (
                      <div
                        key={index}
                        className="flex flex-row justify-between gap-4"
                      >
                        <div className="flex w-2/3 items-center gap-2">
                          <label className="text-white text-base font-normal">
                            {Question}
                          </label>
                          <span className="relative group">
                            <FaCircleInfo className="cursor-pointer text-white hover:text-gray-300" />
                            <span className="absolute -left-20 top-4 transform -translate-y-1/2 w-64 p-2 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity z-50 shadow-lg">
                              {Tooltip} {/* Tooltip content */}
                            </span>
                          </span>
                        </div>
                        <input
                          type="number"
                          min="0"
                          max={maxValue}
                          value={inputValues[index]} // Bind value to inputValues state
                          onChange={(e) => {
                            let value = parseInt(e.target.value, 10) || 0;
                            if (maxValue !== undefined && value > maxValue) {
                              value = maxValue;
                            }
                            e.target.value = value.toString(); // Enforce the max value
                            handleInputChange2(index, value);
                          }}
                          className={`w-1/3 p-2 border ${
                            errors[index]
                              ? "border-red-500"
                              : "border-[#838383]"
                          } focus:border-[#2D3DFF] outline-none rounded mb-4`}
                        />
                        {errors[index] && (
                          <p className="text-red-500 text-xs">Missing input</p>
                        )}
                      </div>
                    );
                  })}
              </div>

              {/* Right Section */}
              <div className="w-1/3 flex flex-col items-center rounded-2xl gap-2 bg-[#fff] p-4">
                {/* Yearly Maximum Capacity */}
                <div className="flex flex-col px-2 w-full justify-between items-center gap-2">
                  <div className="flex items-center gap-2">
                    <p className="text-center font-bold text-base">
                      Yearly Maximum Capacity:
                    </p>
                    <span className="relative group">
                      <FaCircleInfo className="cursor-pointer text-[#000] hover:text-gray-500" />
                      <span className="absolute left-full  top-full transform -translate-y-1/2 w-64 p-2 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity z-50 shadow-lg">
                      This calculates the highest potential revenue assuming maximum customers served every hour.
                      </span>
                    </span>
                  </div>
                  <div className="flex justify-center items-center w-full bg-red-300 text-[#fff] p-2 rounded-lg">
                    <p className="text-center font-bold text-xl ">
                      {currency}
                      {yearlyMaxCapacity}
                    </p>
                  </div>
                </div>

                {/* Current Yearly TurnOver */}
                <div className="flex flex-col px-2 w-full justify-between items-center gap-2">
                  <div className="flex items-center gap-2">
                    <p className="text-center font-bold text-base">
                      Current Yearly TurnOver:
                    </p>
                    <span className="relative group">
                      <FaCircleInfo className="cursor-pointer text-[#000] hover:text-gray-500" />
                      <span className="absolute left-full  top-full transform -translate-y-1/2 w-64 p-2 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity z-50 shadow-lg">
                      This represents actual revenue based on current customer traffic.
                      </span>
                    </span>
                  </div>
                  <div className="flex justify-center items-center w-full bg-red-300 text-[#fff] p-2 rounded-lg">
                    <p className="text-center font-bold text-xl ">
                      {currency}
                      {currentYearlyTurnOver}
                    </p>
                  </div>
                </div>

                {/* Yearly Spare Capacity */}
                <div className="flex flex-col px-2 w-full justify-between items-center gap-2">
                  <div className="flex items-center gap-2">
                    <p className="text-center font-bold text-base">
                      Yearly Spare Capacity:
                    </p>
                    <span className="relative group">
                      <FaCircleInfo className="cursor-pointer text-[#000] hover:text-gray-500" />
                      <span className="absolute left-full  top-full transform -translate-y-1/2 w-64 p-2 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity z-50 shadow-lg">
                      This measures unrealized revenue due to lower customer flow.
                      </span>
                    </span>
                  </div>
                  <div className="flex justify-center items-center w-full bg-red-300 text-[#fff] p-2 rounded-lg">
                    <p className="text-center font-bold text-xl ">
                      {currency}
                      {yearlySpareCapacity}
                    </p>
                  </div>
                </div>

                <div className=" w-full flex flex-row gap-4">
                  <button
                    onClick={handleCalculate}
                    className="rounded-full mt-4 py-2 px-4 w-1/2 bg-blue-500 text-[#fff] font-bold hover:bg-blue-800"
                  >
                    Calculate
                  </button>
                  <button
                    onClick={handleReset}
                    className="rounded-full mt-4 py-2 px-4 w-1/2 bg-slate-800 text-[#fff] font-bold hover:bg-slate-600"
                  >
                    Reset
                  </button>
                </div>

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
                  <VideoModal
                    isOpen={isOpen}
                    closeModal={() => setIsOpen(false)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between w-2/3 h-1/3 bg-gray-900 bg-opacity-80 p-4 rounded-3xl">
            <h2 className="text-xl text-center font-bold text-white mb-4">
              Enter Excess Stock Information
            </h2>

            <div className="flex flex-row">
              {/* Left Section */}
              <div className="w-2/3 h-[29rem] p-4 mr-2 overflow-y-scroll scrollbar-hidden">
                {Object.entries(retailExcessStock).map(([key, data]) => (
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

          <div className="flex flex-col justify-between w-fit h-1/3 gap-4 bg-[#000] bg-opacity-70 p-4 mt-6 rounded-3xl">
            <RecommendedSolution />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Retail;
