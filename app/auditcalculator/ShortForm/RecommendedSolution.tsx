import { useState } from "react";
import {
  FaRegSnowflake,
  FaLeaf,
  FaSun,
  FaCanadianMapleLeaf,
} from "react-icons/fa";

const seasons = [
  {
    name: "Winter",
    icon: <FaRegSnowflake className="text-cyan-500 w-6 h-6" />,
    color: "bg-cyan-300",
    price: 500,
  },
  {
    name: "Spring",
    icon: <FaLeaf className="text-lime-500  w-6 h-6" />,
    color: "bg-lime-300",
    price: 600,
  },
  {
    name: "Summer",
    icon: <FaSun className="text-yellow-500 w-6 h-6" />,
    color: "bg-yellow-300",
    price: 700,
  },
  {
    name: "Autumn",
    icon: <FaCanadianMapleLeaf className="text-orange-500 w-6 h-6" />,
    color: "bg-orange-300",
    price: 800,
  },
];

interface SliderValues {
  marketing: number;
  advertising: number;
  sales: number;
  smartMoney: number;
}

export default function RecommendedSolution() {
  const [activeSeason, setActiveSeason] = useState("Winter");
  const [activeSubTab, setActiveSubTab] = useState("Basic");
  const [sliderValues, setSliderValues] = useState<SliderValues>({
    marketing: 20,
    advertising: 20,
    sales: 20,
    smartMoney: 20,
  });

  const currentSeason = seasons.find((s) => s.name === activeSeason);
  const basePrice = currentSeason?.price || 500;

  const handleSliderChange = (dial: keyof SliderValues, value: number) => {
    setSliderValues((prev) => ({ ...prev, [dial]: value }));
  };

  return (
    <div
      className={`flex flex-col w-full h-1/3 gap-4 p-4 mt-6 rounded-3xl ${
        currentSeason?.color || ""
      }`}
    >
      <h1 className="text-white text-2xl text-center font-bold">
        RECOMMENDED SOLUTION
      </h1>

      {/* Seasons Selection */}
      <div className="flex flex-row justify-between bg-white gap-4 p-4 rounded-lg shadow-lg w-full">
        {seasons.map((season) => (
          <button
            key={season.name}
            onClick={() => {
              setActiveSeason(season.name);
              setActiveSubTab("Basic");
            }}
            className={`flex flex-row items-center gap-2 text-lg font-bold px-4 py-2 rounded-lg shadow-lg w-full 
              ${
                activeSeason === season.name
                  ? "border-b-4 border-black"
                  : "border-b-4 border-gray-400"
              }`}
          >
            {season.icon} {season.name} <span>£{season.price}</span>
          </button>
        ))}
      </div>

      {/* SubTabs */}
      <div className="flex flex-row gap-4 w-full mt-4">
        {["Basic", "Intense"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveSubTab(tab)}
            className={`px-4 py-2 w-full font-bold border-b-4 
              ${
                activeSubTab === tab
                  ? "border-black text-black"
                  : "border-gray-400 text-gray-400"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Sliders */}
      <div className="flex flex-col gap-4 w-full border-slate-400 p-4 mb-2">
        {Object.keys(sliderValues).map((dial) => (
          <div
            key={dial}
            className="flex flex-row w-full justify-between p-2 border-b border-[#000]"
          >
            <p className="text-lg font-bold text-black w-1/3">
              {dial.toUpperCase().replace("MONEY", " MONEY") + " DIAL"}
            </p>
            <p className="text-base font-bold text-black w-1/3">
              {sliderValues[dial as keyof SliderValues]}% - £
              {(basePrice * sliderValues[dial as keyof SliderValues]) / 100}
            </p>
            <div className="w-1/3">
              <input
                type="range"
                min="20"
                max="100"
                step="20"
                value={sliderValues[dial as keyof SliderValues]}
                onChange={(e) =>
                  handleSliderChange(dial as keyof SliderValues, Number(e.target.value))
                }
                 className="w-/3 cursor-pointer accent-black"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-row gap-4 w-full mt-4">
        {["ACCOUNT MANAGER", "AGENTS", "CONSULTANT"].map((btn) => (
          <button
            key={btn}
            className="px-4 py-2 bg-gray-800 text-white font-bold rounded-lg w-full"
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}
