// SpareCapacityForm.tsx
import React from 'react';
import { FaCircleInfo } from 'react-icons/fa6';
import { currencyOptions } from '../../Questions/ShortForm/SpareCapacity/currencyOption';

interface SpareCapacityFormProps {
  groupData: {
    DropDown: Array<{
      Category?: string;
      Questions: Array<{
        Question: string;
        Tooltip: string;
      }>;
    }>;
  };
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  inputValues: Record<string, number>;
  handleInputChange: (question: string, value: number) => void;
  errors: Record<string, boolean>;
  currency: string;
  handleCurrencyChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SpareCapacityForm: React.FC<SpareCapacityFormProps> = ({
  groupData,
  selectedCategory,
  setSelectedCategory,
  inputValues,
  handleInputChange,
  errors,
  currency,
  handleCurrencyChange
}) => {
  return (
    <div className="w-full md:w-2/3 p-2 md:p-4 md:mr-2 overflow-y-auto max-h-full md:max-h-full scrollbar-hidden">
      <select
        className="w-full p-2 border rounded mb-3"
        value={selectedCategory}
        onChange={e => setSelectedCategory(e.target.value)}
      >
        <option value="">Type of Restaurant / Eatery</option>
        {groupData.DropDown.map(item => (
          <option
            key={item?.Category ?? JSON.stringify(item)}
            value={item?.Category ?? JSON.stringify(item)}
          >
            {item?.Category ?? JSON.stringify(item)}
          </option>
        ))}
      </select>

      {/* Currency Options */}
      {selectedCategory && (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center my-3">
          <p className="text-white mb-2 md:mb-0">Select a currency</p>
          <select
            className="w-full md:w-1/3 p-2 rounded"
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

      {/* Dynamic Questions */}
      {selectedCategory &&
        groupData.DropDown.find(
          item => item?.Category === selectedCategory
        )?.Questions.map(({ Question, Tooltip }) => (
          <div
            key={Question}
            className="flex flex-col md:flex-row justify-between gap-2 md:gap-4 mb-3"
          >
            <div className="flex w-full md:w-2/3 items-start md:items-center gap-2">
              <label className="text-white gap-4 text-sm md:text-base">{Question}</label>
              <span className="relative group">
                <FaCircleInfo className="cursor-pointer hover:text-gray-300 text-white" />
                <span className="absolute -left-20 md:-left-60 top-full w-48 md:w-64 p-2 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100">
                  {Tooltip}
                </span>
              </span>
            </div>
            <input
              type="number"
              min="0"
              max={
                Question.includes('(max 52)')
                  ? 52
                  : Question.includes('(max 24)')
                  ? 24
                  : Question.includes('(max 7)')
                  ? 7
                  : undefined
              }
              value={inputValues[Question] || ''}
              onChange={e => {
                const inputValue = parseInt(e.target.value) || 0;
                const maxLimit = Question.includes('(max 52)')
                  ? 52
                  : Question.includes('(max 24)')
                  ? 24
                  : Question.includes('(max 7)')
                  ? 7
                  : Infinity;

                handleInputChange(
                  Question,
                  Math.min(inputValue, maxLimit)
                );
              }}
              className={`w-full md:w-1/3 p-2 border rounded ${
                errors[Question]
                  ? 'border-red-500'
                  : 'border-gray-300'
              }`}
            />

            {errors[Question] && (
              <p className="text-red-500 text-xs">Missing input</p>
            )}
          </div>
        ))}
    </div>
  );
};

export default SpareCapacityForm;