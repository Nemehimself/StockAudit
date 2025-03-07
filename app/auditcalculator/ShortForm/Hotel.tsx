"use client";

import React, { useState } from "react";
import { FaCircleInfo } from "react-icons/fa6";
import {hotelQuestionsRecommendedSolution} from "../Questions/LongForm/HotelQuestions";
import {hotelExcessStock} from "../Questions/ShortForm/ExcessAudit/Hotel";
import YouTube from "react-youtube";
import {HotelsSpareQuestions} from "../Questions/ShortForm/SpareCapacity/Hotels"

const videoId = "G0dzLanYW1E";

const opts = {
  height: "100%",
  width: "100%",
  playerVars: {
    autoplay: 0,
    controls: 1,
    modestbranding: 1,
  },
};

interface HotelProps {
  selectedGroup: "GroupA" | "GroupB" | "GroupC" | "GroupD";
  activeCategory: string | null;
  setActiveCategory: React.Dispatch<React.SetStateAction<string | null>>;
  
}


type HotelGroups = keyof typeof HotelsSpareQuestions;

const Hotel : React.FC<HotelProps & { selectedGroup: HotelGroups }> = ({ selectedGroup }) => {
  const groupData = HotelsSpareQuestions[selectedGroup]?.[0] || null; // Fetch selected group data
  const [selectedCategory, setSelectedCategory] = useState("");

   const [tooltipVisible, setTooltipVisible] = useState<string | null>(null);
    const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  // const [selectedExcessType, setSelectedExcessType] = useState<
  //   keyof typeof hotelQuestionsExcessStock | ""
  // >("");
  const [selectedSolutionType, setSelectedSolutionType] = useState<
    keyof typeof hotelQuestionsRecommendedSolution | ""
  >("");

   // Handle input change
   const handleInputChange = (key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  if (!groupData) {
    return <div className="text-white">Please select a Hotel group.</div>;
  }


  return (
    <div className="flex flex-col justify-center items-center  gap-4 w-full p-6">

      <div className="flex flex-col justify-center w-full px-4 bg-cover bg-center bg-no-repeat  h-full">

        <div className="flex flex-col gap-4 h-full">

          <div className="flex flex-row justify-between w-2/3 h-1/3 bg-[#000] bg-opacity-70 p-4 rounded-3xl">
            {/* Left Section */}
            <div className="w-3/4 h-[24rem] p-4 mr-2 overflow-y-scroll scrollbar-hidden">
              <h2 className="relative flex justify-start items-center gap-4 text-base font-bold text-[#fff] mb-4">
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

              {/* Select Dropdown */}
              <select
                className="flex justify-start items-center w-full p-2 border border-[#838383] focus:border-[#2D3DFF] outline-none mb-2 rounded"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Select Hotel Type</option>
                {groupData.DropDown.map((item) => (
                  <option key={typeof item === "string" ? item : item.Category} value={typeof item === "string" ? item : item.Category}>
                    {typeof item === "string" ? item : item.Category}
                  </option>
                ))}
              </select>

              {/* Questions Display */}
              {selectedCategory &&
                groupData.DropDown.find(
                  (item) => typeof item !== "string" && item.Category === selectedCategory
                ) && typeof groupData.DropDown.find(
                  (item) => typeof item !== "string" && item.Category === selectedCategory
                ) !== "string" && groupData.DropDown.find(
                  (item) => typeof item !== "string" && item.Category === selectedCategory
                ) && typeof groupData.DropDown.find(
                  (item) => typeof item !== "string" && item.Category === selectedCategory
                ) !== "string" && (groupData.DropDown.find(
                  (item) => typeof item !== "string" && item.Category === selectedCategory
                ) as { Category: string; Questions: string[] }).Questions.map((question, index) => (
                  <div
                    key={index}
                    className="flex flex-row justify-between gap-4"
                  >
                    <label className="block w-2/3 text-[#fff] text-base font-normal">
                      {question}
                    </label>
                    <input
                      type="number"
                      min="0"
                      className="w-1/3 p-2 border border-[#838383] focus:border-[#2D3DFF] outline-none rounded mb-2"
                    />
                  </div>
                ))}
            </div>

            {/* Right Section */}
            <div className="w-1/3 flex flex-col items-center rounded-2xl gap-2 bg-[#fff] p-4">
            <div className="flex flex-col px-2 w-full justify-between items-center gap-2">
                <p className=" text-left font-bold text-xs">
                  Your Yearly Maximum Capacity:
                </p>
                <div className="flex justify-end items-center px-2">
                  <p className="text-center font-bold text-base"> £0 </p>
                </div>
              </div>

              <div className="flex flex-col px-2 w-full justify-between items-center gap-2">
                <div className="">
                  <p className=" text-left font-bold text-xs">
                    Your Yearly Spare Capacity:
                  </p>
                </div>
                <div className="flex justify-center items-center px-2">
                  <p className="text-center font-bold text-base"> £0 </p>
                </div>
              </div>

              <button className="rounded-full py-2 px-4 w-1/2 bg-slate-800 text-[#fff] font-bold hover:bg-slate-600">
                Calculate
              </button>
              <p className="text-xs">Kindly Watch the Explanation Video</p>
              <div className="flex flex-row w-full h-2/3 justify-center gap-4">
                <YouTube
                  videoId={videoId}
                  opts={opts}
                  className="w-full h-full rounded-lg"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-row justify-between w-2/3 h-1/3 bg-[#000] bg-opacity-70 p-4 rounded-3xl">
            {/* Left Section */}
        <div className="w-3/4 h-[24rem] p-4 mr-2 overflow-y-scroll scrollbar-hidden">

        <h2 className="text-base font-bold text-white mb-4">
          Enter Excess Stock Information
        </h2>

        {Object.entries(hotelExcessStock).map(([key, data]) => (
          <div key={key} className="mb-4">
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
                className="w-1/3 p-2 border border-gray-600 focus:border-blue-500 outline-none rounded mt-2 bg-[#fff] text-[#000]"
                value={answers[key] || ""}
                onChange={(e) => handleInputChange(key, e.target.value)}
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            ) :data.Question.includes("How often do you conduct stock takes?") ?(
              <select
                className="w-1/3 p-2 border border-gray-600 focus:border-blue-500 outline-none rounded mt-2 bg-[#fff] text-[#000]"
                value={answers[key] || ""}
                onChange={(e) => handleInputChange(key, e.target.value)}
              >
                <option value="">Select</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Monthly">Quarterly</option>
              </select>
            ): data.Question.toLowerCase().includes("(%)")?(
              <input
                type="number"
                min="0"
                max="100"
                className="w-1/3 p-2 border border-gray-600 focus:border-blue-500 outline-none rounded mt-2 bg-[#fff] text-[#000]"
                value={answers[key] || ""}
                onChange={(e) => handleInputChange(key, Math.min(100, Number(e.target.value)).toString())}
              />
            ):(
              <input
                type="text"
                className="w-1/3 p-2 border border-gray-600 focus:border-blue-500 outline-none rounded mt-2 bg-[#fff] text-[#000]"
                value={answers[key] || ""}
                onChange={(e) => handleInputChange(key, e.target.value)}
              />
            )
            }
          </div>
          </div>
        ))}
        </div>
            {/* Right Section */}
            <div className="w-1/3 flex flex-col  items-center rounded-2xl gap-2 bg-[#fff] p-4">
              <div className="flex flex-col px-2 w-full justify-between items-center gap-2">
                <p className=" text-left font-bold text-xs">
                  Your Yearly Maximum Capacity:
                </p>
                <div className="flex justify-end items-center px-2">
                  <p className="text-center font-bold text-xs"> £0 </p>
                </div>
              </div>

              <div className="flex flex-col px-2 w-full justify-between items-center gap-2">
                <div className="">
                  <p className=" text-left font-bold text-xs">
                    Your Yearly Spare Capacity:
                  </p>
                </div>
                <div className="flex justify-center items-center px-2">
                  <p className="text-center font-bold text-xs"> £0 </p>
                </div>
              </div>

              <button className="rounded-full py-2 px-6 w-1/2 bg-slate-800 text-[#fff] font-bold hover:bg-slate-600">
                Calculate
              </button>
              <p className="text-xs">Kindly Watch the Explanation Video</p>

              <div className="flex flex-row w-full h-2/3 justify-center gap-4 ">
                <YouTube
                  videoId={videoId}
                  opts={opts}
                  className="w-full h-full rounded-lg"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-row justify-between w-2/3 h-1/3 bg-[#000] bg-opacity-70 p-4 rounded-3xl">

            <div className="w-3/4 h-[24rem] p-4 mr-2 overflow-y-scroll scrollbar-hidden">
              <h2 className="text-base font-bold text-[#fff] mb-2">
                Recommended Solution
              </h2>
              <select
                className="flex justify-start items-center w-full p-2 border border-[#838383] focus:border-[#2D3DFF] outline-none mb-2 rounded"
                value={selectedSolutionType}
                onChange={(e) =>
                  setSelectedSolutionType(
                    e.target
                      .value as keyof typeof hotelQuestionsRecommendedSolution
                  )
                }
              >
                <option value="">Select Hotel Type</option>
                {Object.keys(hotelQuestionsRecommendedSolution).map(
                  (type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  )
                )}
              </select>

              {selectedSolutionType &&
                hotelQuestionsRecommendedSolution[
                  selectedSolutionType
                ].map((question, index) => (
                  <div
                    key={index}
                    className="flex flex-row justify-between gap-4"
                  >
                    <label className="block w-2/3 text-[#fff] text-base font-normal">
                      {question}
                    </label>
                    <input
                      type="number"
                      min="0"
                      className="w-1/3 p-2 border border-[#838383] focus:border-[#2D3DFF] outline-none rounded mb-2"
                    />
                  </div>
                ))}
            </div>

            <div className="w-1/3 flex flex-col  items-center rounded-2xl gap-2 bg-[#fff] p-4">
              <div className="flex flex-col px-2 w-full justify-between items-center gap-2">
                <p className=" text-left font-bold text-xs">
                  Your Yearly Maximum Capacity:
                </p>
                <div className="flex justify-end items-center px-2">
                  <p className="text-center font-bold text-base"> £0 </p>
                </div>
              </div>

              <div className="flex flex-col px-2 w-full justify-between items-center gap-2">
                <div className="">
                  <p className=" text-left font-bold text-xs">
                    Your Yearly Spare Capacity:
                  </p>
                </div>
                <div className="flex justify-center items-center px-2">
                  <p className="text-center font-bold text-base"> £0 </p>
                </div>
              </div>

              <button className="rounded-full py-2 px-6 w-1/2 bg-slate-800 text-[#fff] font-bold hover:bg-slate-600">
                Calculate
              </button>
              <p className="text-xs">Kindly Watch the Explanation Video</p>

              <div className="flex flex-row w-full h-2/3 justify-center gap-4 ">
                <YouTube
                  videoId={videoId}
                  opts={opts}
                  className="w-full h-full rounded-lg"
                />
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Hotel;
