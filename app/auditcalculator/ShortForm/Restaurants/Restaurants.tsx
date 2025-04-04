// Main Restaurants.tsx component
'use client';

import React, { useState, useEffect } from 'react';
import { Restaurant } from '../../Questions/ShortForm/SpareCapacity/Restaurant';
import { useCreateAudit } from '@/services/hooks/audit/hook';
import SpareCapacitySection from './SpareCapacitySection';
import ExcessStockSection from './ExcessStockSection';
import RecommendedSolution from '../RecommendedSolution/RecommendedSolution';

interface RestaurantsProps {
  selectedGroup: 'GroupA' | 'GroupB' | 'GroupC' | 'GroupD';
  activeCategory: string | null;
  setActiveCategory: React.Dispatch<React.SetStateAction<string | null>>;
}

type RestaurantGroups = keyof typeof Restaurant;

const Restaurants: React.FC<
  RestaurantsProps & { selectedGroup: RestaurantGroups }
> = ({ selectedGroup }) => {
  const groupData = Restaurant[selectedGroup]?.[0] || null;
  const [currency, setCurrency] = useState<string>('£');
  const { mutate, isPending } = useCreateAudit();
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const handleSubmit = () => {
    const excessStock = JSON.parse(
      localStorage.getItem('leftSectionData') || '{}'
    );
    const spareCapacity = JSON.parse(
      localStorage.getItem('spareCapacityData') || '{}'
    );

    const audit = { type: 'Restuarant', excessStock, spareCapacity, currency };
    mutate({ audit });
  };

  const handleCurrencyChange = (value: string) => {
    setCurrency(value);
  };

  if (!groupData) {
    return <div className="text-white">Please select a restaurant group.</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center gap-4 w-full p-2 md:p-6">
      <div className="flex flex-col justify-center w-full px-2 md:px-4 bg-cover bg-center bg-no-repeat h-full">
        <div className="flex flex-col justify-center items-center gap-4 h-full">
          {/* Spare Capacity Section */}
          <SpareCapacitySection 
            groupData={groupData} 
            isMobile={isMobile} 
            currency={currency}
            onCurrencyChange={handleCurrencyChange}
          />

          {/* Excess Stock Section */}
          <ExcessStockSection isMobile={isMobile} />

          {/* Recommended Solution Section */}
          <div className="flex flex-col justify-between w-full md:w-3/4 gap-4 bg-black bg-opacity-70 p-3 md:p-4 mt-4 md:mt-6 rounded-2xl md:rounded-3xl">
            <RecommendedSolution />
          </div>

          {/* Submit Button */}
          <button
            className="rounded-full py-2 px-4 w-full md:w-1/4 bg-emerald-800 border-2 border-white text-white font-bold hover:bg-blue-800 mt-4 mb-6"
            onClick={handleSubmit}
          >
            {isPending ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Restaurants;