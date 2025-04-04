// SpareCapacityResults.tsx
import React from 'react';
import { FaCircleInfo, FaPlay } from 'react-icons/fa6';

interface SpareCapacityResultsProps {
  yearlyMaxCapacity: number;
  currentYearlyTurnOver: number;
  yearlySpareCapacity: number;
  currency: string;
  handleCalculate: () => void;
  handleReset: () => void;
  setIsOpen: (isOpen: boolean) => void;
}

const SpareCapacityResults: React.FC<SpareCapacityResultsProps> = ({
  yearlyMaxCapacity,
  currentYearlyTurnOver,
  yearlySpareCapacity,
  currency,
  handleCalculate,
  handleReset,
  setIsOpen
}) => {
  return (
    <div className="w-full md:w-1/3 flex flex-col items-center rounded-2xl gap-2 bg-white p-3 md:p-4 mt-4 md:mt-0">
      {[
        {
          label: 'Yearly Maximum Capacity',
          value: yearlyMaxCapacity,
        },
        {
          label: 'Current Yearly TurnOver',
          value: currentYearlyTurnOver,
        },
        {
          label: 'Yearly Spare Capacity',
          value: yearlySpareCapacity,
        },
      ].map(({ label, value }) => (
        <div
          key={label}
          className="flex flex-col w-full items-center gap-1 md:gap-2 mb-2"
        >
          <div className="flex items-center gap-2">
            <p className="text-sm md:text-base font-bold">{label}:</p>
            <span className="relative group">
              <FaCircleInfo className="cursor-pointer hover:text-gray-500" />
              <span className="absolute -left-20 md:-left-20 top-full w-48 md:w-64 p-2 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100">
                Tooltip for {label}
              </span>
            </span>
          </div>
          <div className="w-full bg-red-300 text-white p-2 rounded-lg">
            <p className="text-center font-bold text-base md:text-xl">
              {currency}
              {value}
            </p>
          </div>
        </div>
      ))}

      {/* Buttons */}
      <div className="w-full flex gap-2 md:gap-4 mt-4 md:mt-10">
        <button
          onClick={handleCalculate}
          className="w-1/2 bg-blue-500 text-white p-2 text-sm md:text-base rounded-full hover:bg-blue-800"
        >
          Calculate
        </button>
        <button
          onClick={handleReset}
          className="w-1/2 bg-gray-800 text-white p-2 text-sm md:text-base rounded-full hover:bg-gray-600"
        >
          Reset
        </button>
      </div>

      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center gap-2 md:gap-4 px-3 md:px-4 py-2 bg-red-600 text-white text-sm md:text-base rounded-md hover:bg-blue-700 mt-4 md:mt-8 w-full md:w-auto"
      >
        Watch Video <FaPlay />
      </button>
    </div>
  );
};

export default SpareCapacityResults;