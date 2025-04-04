// SpareCapacitySection.tsx
'use client';

import React, { useState } from 'react';
import { FaCircleInfo } from 'react-icons/fa6';
import VideoModal from '../../VideoModal';
import Link from 'next/link';
// import  {currencyOptions}  from '../../Questions/ShortForm/SpareCapacity/currencyOption';
import SpareCapacityForm from './SpareCapacityForm';
import SpareCapacityResults from './SpareCapacityResults';

interface SpareCapacitySectionProps {
    groupData: {
      Tittle: string;
      Tooltip: string;
      DropDown: Array<{
        Category?: string;
        Questions: Array<{
          Question: string;
          Tooltip: string;
        }>;
      }>;
    };
    isMobile: boolean;
    currency: string;
    onCurrencyChange: (value: string) => void;
  }

const SpareCapacitySection: React.FC<SpareCapacitySectionProps> = ({ 
  groupData, 
//   isMobile,
  currency,
  onCurrencyChange
}) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [inputValues, setInputValues] = useState<Record<string, number>>({});
  const [yearlyMaxCapacity, setYearlyMaxCapacity] = useState(0);
  const [currentYearlyTurnOver, setCurrentYearlyTurnOver] = useState(0);
  const [yearlySpareCapacity, setYearlySpareCapacity] = useState(0);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (question: string, value: number) => {
    setInputValues(prev => ({ ...prev, [question]: value }));
    setErrors(prev => ({ ...prev, [question]: false }));
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onCurrencyChange(e.target.value);
  };

  const handleCalculate = () => {
    if (groupData.Tittle !== 'Group D') {
      const newErrors = Object.keys(inputValues).reduce((acc, key) => {
        const index = parseInt(key, 10);
        acc[key] = [0, 3, 4, 5, 6].includes(index) && inputValues[key] === 0;
        return acc;
      }, {} as Record<string, boolean>);

      setErrors(newErrors);

      if (Object.values(newErrors).some(err => err)) {
        return;
      }
    }

    let maxCapacity = 0;
    let yearlyTurnOver = 0;

    if (groupData.Tittle === 'Group D') {
      maxCapacity =
        (inputValues[0] || 1) *
        (inputValues[2] || 1) *
        (inputValues[3] || 1) *
        (inputValues[4] || 1) *
        (inputValues[5] || 1);

      yearlyTurnOver =
        (inputValues[0] || 1) *
        (inputValues[1] || 1) *
        (inputValues[3] || 1) *
        (inputValues[4] || 1) *
        (inputValues[5] || 1);
    } else {
      // Calculate Yearly Max Capacity
      const inputValuesArray = Object.values(inputValues).slice(0, 5);
      maxCapacity = inputValuesArray.some(val => val > 0)
        ? inputValuesArray.reduce((acc, val) => acc * (val || 1), 1)
        : 0;

      // Calculate Current Yearly Turnover
      yearlyTurnOver =
        (inputValues[0] || 1) *
        (inputValues[3] || 1) *
        (inputValues[4] || 1) *
        (inputValues[5] || 1) *
        (inputValues[6] || 1);
    }

    // Calculate Yearly Spare Capacity
    const spareCapacity = maxCapacity - yearlyTurnOver;

    setYearlyMaxCapacity(maxCapacity);
    setCurrentYearlyTurnOver(yearlyTurnOver);
    setYearlySpareCapacity(spareCapacity);
  };

  const handleReset = () => {
    setInputValues({});
    setYearlyMaxCapacity(0);
    setCurrentYearlyTurnOver(0);
    setYearlySpareCapacity(0);
    setErrors({});
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

  return (
    <div className="flex flex-col justify-between w-full md:w-3/4 lg:w-3/4 bg-gray-900 bg-opacity-80 p-3 md:p-4 rounded-2xl md:rounded-3xl">
      <h2 className="relative flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4 text-lg md:text-xl font-bold text-white mb-2 md:mb-4">
        <span>Spare Capacity Information:</span>
        <span className="text-base md:text-xl">
          {groupData.Tittle}
        </span>
        <span className="relative group">
          <FaCircleInfo className="cursor-pointer text-white hover:text-gray-300" />
          <span className="absolute left-0 md:left-full -ml-0 md:-ml-60 top-full w-48 md:w-64 p-2 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity z-50 shadow-lg">
            {groupData.Tooltip}
          </span>
        </span>
      </h2>
      
      <div className="flex flex-col justify-between items-center gap-4">
        <div className="flex flex-col md:flex-row w-full">
          {/* Left Section - Form */}
          <SpareCapacityForm
            groupData={groupData}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            inputValues={inputValues}
            handleInputChange={handleInputChange}
            errors={errors}
            currency={currency}
            handleCurrencyChange={handleCurrencyChange}
          />

          {/* Right Section - Results */}
          <SpareCapacityResults
            yearlyMaxCapacity={yearlyMaxCapacity}
            currentYearlyTurnOver={currentYearlyTurnOver}
            yearlySpareCapacity={yearlySpareCapacity}
            currency={currency}
            handleCalculate={handleCalculate}
            handleReset={handleReset}
            setIsOpen={setIsOpen}
          />
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
            onClick={handleSaveSpareCapacity}
            className="rounded-xl md:rounded-2xl py-1 md:py-2 px-2 md:px-4 w-full md:w-1/4 bg-lime-600 text-black font-bold hover:bg-blue-800 text-sm md:text-base mt-2 md:mt-0"
          >
            Save
          </button>
        </div>
      </div>
      
      {/* Modal Overlay */}
      <VideoModal
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
      />
    </div>
  );
};

export default SpareCapacitySection;