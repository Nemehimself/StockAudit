'use client';

import React, { useState } from 'react';
import { FaCircleInfo } from 'react-icons/fa6';
import { serviceProviderExcessStock } from '../Questions/ShortForm/ExcessAudit/ServiceProvider';
import { serviceProviderSpareQuestions } from '../Questions/ShortForm/SpareCapacity/ServiceProviders';
import VideoModal from '../VideoModal';
import { FaPlay } from 'react-icons/fa';
import RecommendedSolution from './RecommendedSolution/RecommendedSolution';
import { currencyOptions } from '../Questions/ShortForm/SpareCapacity/currencyOption';
import { useCreateAudit } from '@/services/hooks/audit/hook';
import Link from 'next/link';

interface ServiceProviderProps {
  selectedGroup: 'GroupA' | 'GroupB' | 'GroupC' | 'GroupD';
  activeCategory: string | null;
  setActiveCategory: React.Dispatch<React.SetStateAction<string | null>>;
}

type ServiceProviderGroups = keyof typeof serviceProviderSpareQuestions;

const ServiceProvider: React.FC<
  ServiceProviderProps & { selectedGroup: ServiceProviderGroups }
> = ({ selectedGroup }) => {
  const groupData = serviceProviderSpareQuestions[selectedGroup]?.[0] || null; // Fetch selected group data
  const [selectedCategory, setSelectedCategory] = useState('');

  const [tooltipVisible, setTooltipVisible] = useState<string | null>(null);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  const { mutate, isPending } = useCreateAudit();

  // Handle input change
  const handleInputChange = (key: string, value: string) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const [inputValues, setInputValues] = useState<Record<string, number>>({});
  const [yearlyMaxCapacity, setYearlyMaxCapacity] = useState(0);
  const [currentYearlyTurnOver, setCurrentYearlyTurnOver] = useState(0);
  const [yearlySpareCapacity, setYearlySpareCapacity] = useState(0);

  const [currency, setCurrency] = useState<string>('£');
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const handleInputChange2 = (question: string, value: number) => {
    setInputValues(prev => ({ ...prev, [question]: value }));
    setErrors(prev => ({ ...prev, [question]: false })); // Reset error when a value is entered
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setCurrency(value);
  };

  const handleCalculate = () => {
    if (selectedGroup !== 'GroupD') {
      const newErrors = Object.keys(inputValues).reduce((acc, key) => {
        const index = parseInt(key, 10);
        acc[key] = [0, 3, 4, 5, 6].includes(index) && inputValues[key] === 0; // Require fields for calculations
        return acc;
      }, {} as Record<string, boolean>);

      setErrors(newErrors);

      if (Object.values(newErrors).some(err => err)) {
        return; // Stop calculation if any required input is missing
      }
    }

    let maxCapacity = 0;
    let yearlyTurnOver = 0;

    maxCapacity =
      (inputValues[0] || 1) *
      (inputValues[1] || 1) *
      (inputValues[2] || 1) *
      (inputValues[3] || 1) *
      (inputValues[4] || 1);

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

  const handleSaveSpareCapacity = () => {
    const audit: Record<string, number> = {
      yearlyMaxCapacity,
      currentYearlyTurnOver,
      yearlySpareCapacity,
      ...inputValues,
    };
    localStorage.setItem('spareCapacityData', JSON.stringify(audit));
  };

  const handleSaveExcessStock = () => {
    const leftSectionData: Record<string, string> = {};

    // Iterate over restaurantExcessStock to extract answers
    Object.keys(serviceProviderExcessStock).forEach(key => {
      leftSectionData[key] = answers[key] || ''; // Store user inputs, fallback to empty string
    });

    // Save to local storage
    localStorage.setItem('leftSectionData', JSON.stringify(leftSectionData));
  };

  const handleSubmit = () => {
    const excessStock = JSON.parse(
      localStorage.getItem('leftSectionData') || '{}'
    );
    const spareCapacity = JSON.parse(
      localStorage.getItem('spareCapacityData') || '{}'
    );

    const audit = {
      type: 'Service Provider',
      excessStock,
      spareCapacity,
      currency,
    };
    mutate({ audit });
  };

  const handleReset = () => {
    setInputValues({}); // Reset all input values to an empty object
    setYearlyMaxCapacity(0); // Reset yearly max capacity
    setCurrentYearlyTurnOver(0); // Reset yearly turnover
    setYearlySpareCapacity(0); // Reset spare capacity
    setErrors({}); // Clear error messages
  };

  const [isOpen, setIsOpen] = useState(false);

  if (!groupData) {
    return (
      <div className="text-white">Please select a ServiceProvider group.</div>
    );
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

            <div className="flex flex-col justify-between items-center gap-4">
              <div className="flex flex-row w-full">
                {/* Left Section */}
                <div className="w-2/3 p-4 mr-2 overflow-y-scroll scrollbar-hidden">
                  {/* Select Dropdown */}
                  <select
                    className="flex justify-start items-center w-full p-2 border border-[#838383] focus:border-[#2D3DFF] outline-none mb-2 rounded"
                    value={selectedCategory}
                    onChange={e => setSelectedCategory(e.target.value)}
                  >
                    <option value="">Select Service Provider Type</option>
                    {groupData.DropDown.map(item => (
                      <option
                        key={typeof item === 'string' ? item : item.Category}
                        value={typeof item === 'string' ? item : item.Category}
                      >
                        {typeof item === 'string' ? item : item.Category}
                      </option>
                    ))}
                  </select>

                  {/* currency options */}
                  {selectedCategory && (
                    <div className="flex justify-between items-center my-3">
                      <p className="text-white">Select a currency</p>
                      <select
                        className="w-1/3 p-2 rounded"
                        value={currency}
                        onChange={handleCurrencyChange}
                      >
                        {currencyOptions.map((option, i) => (
                          <option key={i} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Questions Display */}
                  {selectedCategory &&
                    groupData.DropDown.find(
                      item =>
                        typeof item !== 'string' &&
                        item.Category === selectedCategory
                    )?.Questions.map((question, index) => {
                      const maxValue = question.includes('(max 52)')
                        ? 52
                        : question.includes('(max 24)')
                        ? 24
                        : question.includes('(max 7)')
                        ? 7
                        : undefined; // No limit if no max constraint

                      return (
                        <div
                          key={index}
                          className="flex flex-row justify-between gap-4"
                        >
                          <label className="block w-2/3 mb-4 text-[#fff] text-base font-normal">
                            {question}
                          </label>
                          <input
                            type="number"
                            min="0"
                            max={maxValue}
                            value={inputValues[question] || ''} // Ensure value is correctly bound
                            onChange={e => {
                              const rawValue =
                                parseInt(e.target.value, 10) || 0;
                              const clampedValue = Math.min(
                                rawValue,
                                maxValue ?? Infinity
                              );

                              handleInputChange2(question, clampedValue);
                            }}
                            className={`w-1/3 p-2 border ${
                              errors[question]
                                ? 'border-red-500'
                                : 'border-[#838383]'
                            } focus:border-[#2D3DFF] outline-none rounded mb-4`}
                          />
                          {errors[question] && (
                            <p className="text-red-500 text-xs">
                              Missing input
                            </p>
                          )}
                        </div>
                      );
                    })}
                </div>

                {/* Right Section */}
                <div className="w-1/3 flex flex-col items-center rounded-2xl gap-2 bg-white p-4">
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
                      className="flex flex-col w-full items-center gap-2"
                    >
                      <div className="flex items-center gap-2">
                        <p className="text-base font-bold">{label}:</p>
                        <span className="relative group">
                          <FaCircleInfo className="cursor-pointer hover:text-gray-500" />
                          <span className="absolute left-full top-full w-64 p-2 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100">
                            Tooltip for {label}
                          </span>
                        </span>
                      </div>
                      <div className="w-full bg-red-300 text-white p-2 rounded-lg">
                        <p className="text-center font-bold text-xl">
                          {currency}
                          {value}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Buttons */}
                  <div className="w-full flex gap-4 mt-10">
                    <button
                      onClick={handleCalculate}
                      className="w-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-800"
                    >
                      Calculate
                    </button>
                    <button
                      onClick={handleReset}
                      className="w-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600"
                    >
                      Reset
                    </button>
                  </div>

                  <button
                    onClick={() => setIsOpen(true)}
                    className="flex items-center gap-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-blue-700 mt-8"
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
              <div className="flex flex-row items-center gap-4 w-full">
                <input type="checkbox" />
                <Link
                  href="auditcalculator/terms-and-conditions"
                  className="hover:underline text-white"
                >
                  By clicking this box, you agree that all the content above is
                  correct and accurate
                </Link>
                <button
                  onClick={handleSaveSpareCapacity}
                  disabled={isPending}
                  className="rounded-2xl py-2 px-4 w-1/4 bg-lime-600 text-[#000] font-bold hover:bg-blue-800"
                >
                  Save
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between w-2/3 h-1/3 bg-gray-900 bg-opacity-80 p-4 rounded-3xl">
            <h2 className="text-xl text-center font-bold text-white mb-4">
              Enter Excess Stock Information
            </h2>

            <div className="flex flex-col justify-between items-center gap-4">
              <div className="flex flex-row">
                {/* Left Section */}
                <div className="w-2/3 h-[29rem] p-4 mr-2 overflow-y-scroll scrollbar-hidden">
                  {Object.entries(serviceProviderExcessStock).map(
                    ([key, data]) => (
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
                          {data.Question.toLowerCase().includes('(yes/no)') ? (
                            <select
                              className="w-1/3 p-2 border border-gray-600 focus:border-blue-500 outline-none rounded  bg-[#fff] text-[#000]"
                              value={answers[key] || ''}
                              onChange={e =>
                                handleInputChange(key, e.target.value)
                              }
                            >
                              <option value="">Select</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          ) : data.Question.includes(
                              'How often do you conduct stock takes?'
                            ) ? (
                            <select
                              className="w-1/3 p-2 border border-gray-600 focus:border-blue-500 outline-none rounded bg-[#fff] text-[#000]"
                              value={answers[key] || ''}
                              onChange={e =>
                                handleInputChange(key, e.target.value)
                              }
                            >
                              <option value="">Select</option>
                              <option value="Daily">Daily</option>
                              <option value="Weekly">Weekly</option>
                              <option value="Monthly">Monthly</option>
                              <option value="Monthly">Quarterly</option>
                            </select>
                          ) : data.Question.toLowerCase().includes('(%)') ? (
                            <input
                              type="number"
                              min="0"
                              max="100"
                              className="w-1/3 p-2 border border-gray-600 focus:border-blue-500 outline-none rounded  bg-[#fff] text-[#000]"
                              value={answers[key] || ''}
                              onChange={e =>
                                handleInputChange(
                                  key,
                                  Math.min(
                                    100,
                                    Number(e.target.value)
                                  ).toString()
                                )
                              }
                            />
                          ) : (
                            <input
                              type="text"
                              className="w-1/3 p-2 border border-gray-600 focus:border-blue-500 outline-none rounded  bg-[#fff] text-[#000]"
                              value={answers[key] || ''}
                              onChange={e =>
                                handleInputChange(key, e.target.value)
                              }
                            />
                          )}
                        </div>
                      </div>
                    )
                  )}
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
              <div className="flex flex-row items-center gap-4 w-full">
                <input type="checkbox" />
                <Link
                  href="auditcalculator/terms-and-conditions"
                  className="hover:underline text-white"
                >
                  By clicking this box, you agree that all the content above is
                  correct and accurate
                </Link>
                <button
                  className="rounded-2xl py-2 px-4 w-1/4 bg-lime-600 text-[#000] font-bold hover:bg-blue-800"
                  onClick={handleSaveExcessStock}
                >
                  Save
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between w-fit h-1/3 gap-4 bg-[#000] bg-opacity-70 p-4 mt-6 rounded-3xl">
            <RecommendedSolution />
          </div>
          <button
            className="rounded-full py-2 px-4 w-1/4 bg-emerald-800 border-2 border-white text-[#fff] font-bold hover:bg-blue-800"
            onClick={handleSubmit}
          >
            {isPending ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceProvider;
