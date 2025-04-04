// ExcessStockSection.tsx
'use client';

import React, { useState } from 'react';
import { FaCircleInfo, FaPlay } from 'react-icons/fa6';
import VideoModal from '../../VideoModal';
import Link from 'next/link';
import { restaurantsExcessStock } from '../../Questions/ShortForm/ExcessAudit/Restaurants';

interface ExcessStockSectionProps {
  isMobile: boolean;
}

const ExcessStockSection: React.FC<ExcessStockSectionProps> = ({  }) => {
  const [tooltipVisible, setTooltipVisible] = useState<string | null>(null);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (key: string, value: string) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveExcessStock = () => {
    const leftSectionData: Record<string, string> = {};

    // Iterate over restaurantExcessStock to extract answers
    Object.keys(restaurantsExcessStock).forEach(key => {
      leftSectionData[key] = answers[key] || ''; // Store user inputs, fallback to empty string
    });

    // Save to local storage
    localStorage.setItem('leftSectionData', JSON.stringify(leftSectionData));
  };

  return (
    <div className="flex flex-col justify-between w-full md:w-3/4 lg:w-3/4 bg-gray-900 bg-opacity-80 p-3 md:p-4 rounded-2xl md:rounded-3xl mt-4">
      <h2 className="text-lg md:text-xl text-center font-bold text-white mb-2 md:mb-4">
        Enter Excess Stock Information
      </h2>

      <div className="flex flex-col justify-between items-center gap-4">
        <div className="flex flex-col md:flex-row w-full">
          {/* Questions Section */}
          <ExcessStockQuestions 
            tooltipVisible={tooltipVisible}
            setTooltipVisible={setTooltipVisible}
            answers={answers}
            handleInputChange={handleInputChange}
          />
          
          {/* Video Section */}
          <div className="w-full md:w-1/3 flex flex-col items-center rounded-2xl gap-2 bg-white p-3 md:p-4 mt-4 md:mt-0">
            <p className="text-center text-xs md:text-sm mt-2 md:mt-6">
              Kindly click button below to Watch the Explanation Video
            </p>
            <div className="flex flex-row w-full justify-center gap-2 md:gap-4">
              <button
                onClick={() => setIsOpen(true)}
                className="flex flex-row gap-2 md:gap-4 items-center justify-center px-3 md:px-4 py-1 md:py-2 bg-red-600 text-white text-sm md:text-base mt-2 font-bold rounded-md hover:bg-blue-700"
              >
                Watch Video <FaPlay />
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 w-full mt-2">
          <div className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4" />
            <Link
              href="auditcalculator/terms-and-conditions"
              className="hover:underline text-white text-xs md:text-sm"
            >
              By clicking this box, you agree that all the content above is
              correct and accurate
            </Link>
          </div>
          <button
            className="rounded-xl md:rounded-2xl py-1 md:py-2 px-2 md:px-4 w-full md:w-1/4 bg-lime-600 text-black font-bold hover:bg-blue-800 text-sm md:text-base mt-2 md:mt-0"
            onClick={handleSaveExcessStock}
          >
            Save
          </button>
        </div>
      </div>

      {/* Modal */}
      <VideoModal
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
      />
    </div>
  );
};

// ExcessStockQuestions sub-component
const ExcessStockQuestions: React.FC<{
  tooltipVisible: string | null;
  setTooltipVisible: (key: string | null) => void;
  answers: { [key: string]: string };
  handleInputChange: (key: string, value: string) => void;
}> = ({ tooltipVisible, setTooltipVisible, answers, handleInputChange }) => {
  return (
    <div className="w-full md:w-2/3 h-full md:h-full p-2 md:p-4 md:mr-2 overflow-y-auto scrollbar-hidden">
      {Object.entries(restaurantsExcessStock).map(([key, data]) => (
        <div key={key} className="mb-3 md:mb-4">
          <div className="flex flex-col md:flex-row justify-between gap-2 md:gap-4">
            {/* Question Label with Tooltip */}
            <div className="flex w-full md:w-2/3 items-start md:items-center gap-2">
              <label className="text-white text-sm md:text-base font-normal">
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
                  <div className="absolute left-0 md:left-full -ml-0 md:-ml-60 w-48 md:w-72 p-2 bg-gray-800 text-white text-xs rounded-md shadow-lg z-50">
                    {data.Tooltip}
                  </div>
                )}
              </span>
            </div>

            {/* Input Field - different types based on question */}
            {data.Question.toLowerCase().includes('(yes/no)') ? (
              <select
                className="w-full md:w-1/3 p-2 border border-gray-600 focus:border-blue-500 outline-none rounded bg-white text-black mt-1 md:mt-0"
                value={answers[key] || ''}
                onChange={e => handleInputChange(key, e.target.value)}
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            ) : data.Question.includes('How often do you conduct stock takes?') ? (
              <select
                className="w-full md:w-1/3 p-2 border border-gray-600 focus:border-blue-500 outline-none rounded bg-white text-black mt-1 md:mt-0"
                value={answers[key] || ''}
                onChange={e => handleInputChange(key, e.target.value)}
              >
                <option value="">Select</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
              </select>
            ) : data.Question.toLowerCase().includes('(%)') ? (
              <input
                type="number"
                min="0"
                max="100"
                className="w-full md:w-1/3 p-2 border border-gray-600 focus:border-blue-500 outline-none rounded bg-white text-black mt-1 md:mt-0"
                value={answers[key] || ''}
                onChange={e =>
                  handleInputChange(
                    key,
                    Math.min(100, Number(e.target.value)).toString()
                  )
                }
              />
            ) : (
              <input
                type="text"
                className="w-full md:w-1/3 p-2 border border-gray-600 focus:border-blue-500 outline-none rounded bg-white text-black mt-1 md:mt-0"
                value={answers[key] || ''}
                onChange={e => handleInputChange(key, e.target.value)}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExcessStockSection;