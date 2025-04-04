"use client";

import React, { useState } from "react";
import {
  manufacturingQuestionsSpareCapacity,
  manufacturingQuestionsExcessStock,
  manufacturingQuestionsRecommendedSolution,
} from "../Questions/LongForm/ManufacturingQuestions";
import YouTube from "react-youtube";

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

const Manufacturing = () => {
  const [selectedSpareType, setSelectedSpareType] = useState<
    keyof typeof manufacturingQuestionsSpareCapacity | ""
  >("");
  const [selectedExcessType, setSelectedExcessType] = useState<
    keyof typeof manufacturingQuestionsExcessStock | ""
  >("");
  const [selectedSolutionType, setSelectedSolutionType] = useState<
    keyof typeof manufacturingQuestionsRecommendedSolution | ""
  >("");
  return (
    <div className="flex flex-col justify-center items-center  gap-4 w-full p-6">
      <div className="flex flex-col justify-center w-full px-4 bg-cover bg-center bg-no-repeat  h-full">
        <div className="flex flex-col gap-4 h-full">
          <div className="flex flex-row justify-between w-full h-1/3 bg-[#000] bg-opacity-70 p-4 rounded-3xl">
            <div className="w-8/12 h-[24rem] p-4 mr-2 overflow-y-scroll scrollbar-hidden">
              <h2 className="text-2xl font-bold text-[#fff] mb-2">
                Enter Spare Capacity Information
              </h2>
              <select
                className="block w-full p-2 border border-[#838383] focus:border-[#2D3DFF] outline-none mb-2 rounded"
                value={selectedSpareType}
                onChange={(e) =>
                  setSelectedSpareType(
                    e.target
                      .value as keyof typeof manufacturingQuestionsSpareCapacity
                  )
                }
              >
                <option value="">Select Manufacturing Type</option>
                {Object.keys(manufacturingQuestionsSpareCapacity).map(
                  (type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  )
                )}
              </select>

              {selectedSpareType &&
                manufacturingQuestionsSpareCapacity[selectedSpareType].map(
                  (question, index) => (
                    <div
                      key={index}
                      className="flex flex-row justify-between gap-2"
                    >
                      <label className="block w-2/3 text-[#fff] font-bold">
                        {question}
                      </label>
                      <input
                        type="number"
                        min="0"
                        className="w-1/3 p-2 border border-[#838383] focus:border-[#2D3DFF] outline-none rounded mb-2"
                      />
                    </div>
                  )
                )}
            </div>
            <div className="w-4/12 flex flex-col  items-center rounded-2xl gap-2 bg-[#fff] p-4">
              <div className="flex flex-row px-2 w-full justify-between items-center gap-2">
                <p className=" text-left font-bold text-base">
                  Your Yearly Maximum Capacity:
                </p>
                <div className="flex justify-end items-center px-2">
                  <p className="text-center font-bold text-xl"> £0 </p>
                </div>
              </div>

              <div className="flex flex-row px-2 w-full justify-between items-center gap-2">
                <div className="">
                  <p className=" text-left font-bold text-base">
                    Your Yearly Spare Capacity:
                  </p>
                </div>
                <div className="flex justify-center items-center px-2">
                  <p className="text-center font-bold text-xl"> £0 </p>
                </div>
              </div>

              <button className="rounded-full py-2 px-6 w-1/2 bg-slate-800 text-[#fff] font-bold hover:bg-slate-600">
                Calculate
              </button>
              <p>Kindly Watch the Explanation Video</p>

              <div className="flex flex-row w-full h-2/3 justify-center gap-4 ">
                <YouTube
                  videoId={videoId}
                  opts={opts}
                  className="w-full h-full rounded-lg"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-row justify-between w-full h-1/3 bg-[#000] bg-opacity-70 p-4 rounded-3xl">
            <div className="w-8/12 h-[24rem] p-4 mr-2 overflow-y-scroll scrollbar-hidden">
              <h2 className="text-2xl font-bold text-[#fff] mb-2">
                Enter Excess Stock Information
              </h2>
              <select
                className="block w-full p-2 border border-[#838383] focus:border-[#2D3DFF] outline-none mb-2 rounded"
                value={selectedExcessType}
                onChange={(e) =>
                  setSelectedExcessType(
                    e.target
                      .value as keyof typeof manufacturingQuestionsExcessStock
                  )
                }
              >
                <option value="">Select Manufacturing Type</option>
                {Object.keys(manufacturingQuestionsExcessStock).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              {selectedExcessType &&
                manufacturingQuestionsExcessStock[selectedExcessType].map(
                  (question, index) => (
                    <div
                      key={index}
                      className="flex flex-row justify-between gap-2"
                    >
                      <label className="block w-2/3 text-[#fff] font-bold">
                        {question}
                      </label>
                      <input
                        type="number"
                        min="0"
                        className="w-1/3 p-2 border border-[#838383] focus:border-[#2D3DFF] outline-none rounded mb-2"
                      />
                    </div>
                  )
                )}
            </div>
            <div className="w-4/12 flex flex-col  items-center rounded-2xl gap-2 bg-[#fff] p-4">
              <div className="flex flex-row px-2 w-full justify-between items-center gap-2">
                <p className=" text-left font-bold text-base">
                  Your Yearly Maximum Capacity:
                </p>
                <div className="flex justify-end items-center px-2">
                  <p className="text-center font-bold text-xl"> £0 </p>
                </div>
              </div>

              <div className="flex flex-row px-2 w-full justify-between items-center gap-2">
                <div className="">
                  <p className=" text-left font-bold text-base">
                    Your Yearly Spare Capacity:
                  </p>
                </div>
                <div className="flex justify-center items-center px-2">
                  <p className="text-center font-bold text-xl"> £0 </p>
                </div>
              </div>

              <button className="rounded-full py-2 px-6 w-1/2 bg-slate-800 text-[#fff] font-bold hover:bg-slate-600">
                Calculate
              </button>
              <p>Kindly Watch the Explanation Video</p>

              <div className="flex flex-row w-full h-2/3 justify-center gap-4 ">
                <YouTube
                  videoId={videoId}
                  opts={opts}
                  className="w-full h-full rounded-lg"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between w-full h-1/3 bg-[#000] bg-opacity-70 p-4 rounded-3xl">
            <div className="w-8/12 h-[24rem] p-4 mr-2 overflow-y-scroll scrollbar-hidden">
              <h2 className="text-2xl font-bold text-[#fff] mb-2">
                Recommended Solution
              </h2>
              <select
                className="block w-full p-2 border border-[#838383] focus:border-[#2D3DFF] outline-none mb-2 rounded"
                value={selectedSolutionType}
                onChange={(e) =>
                  setSelectedSolutionType(
                    e.target
                      .value as keyof typeof manufacturingQuestionsRecommendedSolution
                  )
                }
              >
                <option value="">Select Manufacturing Type</option>
                {Object.keys(manufacturingQuestionsRecommendedSolution).map(
                  (type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  )
                )}
              </select>

              {selectedSolutionType &&
                manufacturingQuestionsRecommendedSolution[
                  selectedSolutionType
                ].map((question, index) => (
                  <div
                    key={index}
                    className="flex flex-row justify-between gap-2"
                  >
                    <label className="block w-2/3 text-[#fff] font-bold">
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
            <div className="w-4/12 flex flex-col  items-center rounded-2xl gap-2 bg-[#fff] p-4">
              <div className="flex flex-row px-2 w-full justify-between items-center gap-2">
                <p className=" text-left font-bold text-base">
                  Your Yearly Maximum Capacity:
                </p>
                <div className="flex justify-end items-center px-2">
                  <p className="text-center font-bold text-xl"> £0 </p>
                </div>
              </div>

              <div className="flex flex-row px-2 w-full justify-between items-center gap-2">
                <div className="">
                  <p className=" text-left font-bold text-base">
                    Your Yearly Spare Capacity:
                  </p>
                </div>
                <div className="flex justify-center items-center px-2">
                  <p className="text-center font-bold text-xl"> £0 </p>
                </div>
              </div>

              <button className="rounded-full py-2 px-6 w-1/2 bg-slate-800 text-[#fff] font-bold hover:bg-slate-600">
                Calculate
              </button>
              <p>Kindly Watch the Explanation Video</p>

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

export default Manufacturing;
