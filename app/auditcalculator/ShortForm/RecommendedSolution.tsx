import { useState } from "react";
import { FaRegSnowflake, FaLeaf, FaSun, FaCanadianMapleLeaf } from "react-icons/fa";

const seasons = [
  { name: "Winter", icon: <FaRegSnowflake className="text-cyan-500 w-6 h-6"/>, color: "bg-cyan-300" },
  { name: "Spring", icon: <FaLeaf className="text-lime-500  w-6 h-6"/>, color: "bg-lime-300" },
  { name: "Summer", icon: <FaSun className="text-amber-500 w-6 h-6"/>, color: "bg-amber-300" },
  { name: "Autumn", icon: <FaCanadianMapleLeaf className="text-orange-500 w-6 h-6"/>, color: "bg-orange-300" },
];

export default function RecommendedSolution() {
  const [activeSeason, setActiveSeason] = useState("Winter");
  const [activeSubTab, setActiveSubTab] = useState("Basic");

  const currentSeason = seasons.find((s) => s.name === activeSeason);

  return (
    <div className={`flex flex-col w-full h-1/3 gap-4 p-4 mt-6 rounded-3xl ${currentSeason ? currentSeason.color : ''}`}>
      <h1 className="text-white text-2xl text-center font-bold">
        RECOMMENDED SOLUTION
      </h1>
      
      <div className="flex flex-row justify-between bg-white gap-4 p-4 rounded-lg shadow-lg w-full">
        {seasons.map((season) => (
          <button
            key={season.name}
            onClick={() => {
              setActiveSeason(season.name);
              setActiveSubTab("Basic");
            }}
            className={`flex flex-row items-center gap-2 text-lg font-bold px-4 py-2 rounded-lg shadow-lg w-full 
              ${activeSeason === season.name ? "border-b-4 border-black" : "border-b-4 border-gray-400"}`}
          >
            {season.icon} {season.name} <span>£500</span>
          </button>
        ))}
      </div>

      <div className="flex flex-row gap-4 w-full mt-4">
        <button
          onClick={() => setActiveSubTab("Basic")}
          className={`px-4 py-2 w-full font-bold border-b-4 
            ${activeSubTab === "Basic" ? "border-black text-black" : "border-gray-400 text-gray-400"}`}
        >
          Basic
        </button>
        <button
          onClick={() => setActiveSubTab("Intense")}
          className={`px-4 py-2 w-full font-bold border-b-4 
            ${activeSubTab === "Intense" ? "border-black text-black" : "border-gray-400 text-gray-400"}`}
        >
          Intense
        </button>
      </div>
      
      <div className="flex flex-col gap-4 w-full border-b border-slate-400 p-4 mb-2">
        <p className="text-base font-normal text-black">MARKETING DIAL</p>
        <p className="text-base font-normal text-black">ADVERTISING DIAL</p>
        <p className="text-base font-normal text-black">SALES DIAL</p>
        <p className="text-base font-normal text-black">SMART MONEY SOLUTION DIAL</p>
      </div>

      <div className="flex flex-row gap-4 w-full mt-4">
        <button className="px-4 py-2 bg-gray-800 text-white font-bold rounded-lg w-full">ACCOUNT MANAGER</button>
        <button className="px-4 py-2 bg-gray-800 text-white font-bold rounded-lg w-full">AGENTS</button>
        <button className="px-4 py-2 bg-gray-800 text-white font-bold rounded-lg w-full">CONSULTANT</button>
      </div>
    </div>
  );
}
