import Link from 'next/link';
import { useState, useEffect, JSX } from 'react';
import { HiPlusCircle } from "react-icons/hi";
import IncreaseBudgetModal from "./IncreaseBudgetModal"; // Import the modal
import { initialSliders } from './initialSliders';
import { getSeasonDates } from './seasons'; // Adjust the path as needed

interface SliderValues {
  marketing: number;
  advertising: number;
  sales: number;
  smartMoney: number;
}

const MIN_BASE_PRICE = 500;
// const MAX_AUDITS = 4;

export default function RecommendedSolution() {
  const [activeSeason, setActiveSeason] = useState('Winter');
  const [activeSubTab, setActiveSubTab] = useState('Standard');
  const [sliderValues, setSliderValues] = useState<SliderValues>(
    initialSliders['Winter']['Standard']
  );

  const currentSeason = getSeasonDates(new Date().getFullYear()).find(s => s.name === activeSeason);

  const [basePrice, setBasePrice] = useState(500); // Placeholder for backend integration
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [seasons, setSeasons] = useState(() => getSeasonDates(new Date().getFullYear()));

  const totalAudits = Math.floor(basePrice / MIN_BASE_PRICE); // ✅ Number of audits covered
  const auditsLeft = totalAudits; // ✅ For now, assume all audits are left

  // Calculate the audit count based on base price
  // const auditCount = Math.min(Math.floor(basePrice / MIN_BASE_PRICE), MAX_AUDITS);
  const isDisabled = basePrice < 2000;
  
  useEffect(() => {
    const today = new Date();
    let remainingBudget = basePrice;
  
    // Generate dynamic seasons based on the current year
    const defaultSeasons = getSeasonDates(today.getFullYear());
  
    // Convert and sort seasons by startDate
    interface Season {
      name: string;
      startDate: string;
      endDate: string;
      icon: JSX.Element;
      color: string;
      price: number;
    }

    const updatedSeasons: Season[] = defaultSeasons
      .map((season: Season): Season => ({
        ...season,
        startDate: new Date(`${season.startDate}T00:00:00`).toISOString(),
        endDate: new Date(`${season.endDate}T23:59:59`).toISOString()
      }))
      .sort((a: Season, b: Season) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  
    // Find the first season that includes today's date
    const currentSeasonIndex = updatedSeasons.findIndex(season => 
      today >= new Date(season.startDate) && today <= new Date(season.endDate)
    );
  
    // Allocate budget only from the correct season onwards
    const newSeasons = updatedSeasons.map((season, index) => {
      if (index >= currentSeasonIndex && remainingBudget > 0) {
        const allocatedAmount = Math.min(remainingBudget, MIN_BASE_PRICE);
        remainingBudget -= allocatedAmount;
        return { ...season, price: allocatedAmount };
      }
      return { ...season, price: 0 };
    });

    // 🔹 Extend Winter instead of adding a duplicate one
  if (remainingBudget > 0) {
    newSeasons.forEach(season => {
      if (season.name === "Winter") {
        season.startDate = new Date(`${today.getFullYear()}-12-01T00:00:00`).toISOString();
        season.endDate = new Date(`${today.getFullYear() + 1}-02-28T23:59:59`).toISOString();
        season.price += remainingBudget;
        remainingBudget = 0;
      }
    });
  }
  
    // Convert dates back to string format before setting state
    setSeasons(newSeasons.map(season => ({
      ...season,
      startDate: new Date(season.startDate).toISOString().split('T')[0],
      endDate: new Date(season.endDate).toISOString().split('T')[0]
    })));
  }, [basePrice]);

  const handleSliderChange = (dial: keyof SliderValues, newValue: number) => {
  
    // Ensure the new total does not exceed 100%
    const sumOtherDials = Object.keys(sliderValues)
      .filter(key => key !== dial)
      .reduce((sum, key) => sum + sliderValues[key as keyof SliderValues], 0);
  
    const maxValueForDial = Math.min(100 - sumOtherDials, newValue);
  
    // Update state while ensuring constraints
    setSliderValues({
      ...sliderValues,
      [dial]: maxValueForDial
    });
  };
  

  interface FormatDate {
    (dateString: string): string;
  }

  const formatDate: FormatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: '2-digit',
    }).replace(',', ''); // Removes extra comma if any
  };

  return (
    <div
      className={`flex flex-col w-full h-1/3 gap-4 p-4 mt-6 rounded-3xl ${currentSeason?.color || ''}`}>
      <div className="flex flex-row justify-around items-center gap-4 w-full">
        <p className="p-2 rounded-lg shadow-lg bg-slate-800 text-[#fff] font-semibold">
         Budget: £{basePrice}
        </p>
        <button className=" flex flex-row gap-4 items-center p-2 rounded-lg shadow-lg bg-slate-800 text-[#fff] font-semibold cursor-pointer" onClick={() => setIsModalOpen(true)}>
          Increase Budget <HiPlusCircle className='w-6 h-6'/> 
        </button>
        <h1 className="text-black text-2xl text-center font-bold">
          RECOMMENDED SOLUTION
        </h1>
        <p className="p-2 rounded-lg shadow-lg bg-slate-800 text-[#fff] font-semibold">
        {auditsLeft} of {totalAudits} Audit{totalAudits > 1 ? 's' : ''} Left
        </p>
      </div>
      <div className="flex flex-row bg-white gap-4 p-4 rounded-lg shadow-lg w-full">
        {seasons.map(season => (
          <button
            key={season.name}
            onClick={() => {
              setActiveSeason(season.name);
              setActiveSubTab('Standard');
              setSliderValues(
                initialSliders[season.name as keyof typeof initialSliders][
                  'Standard'
                ]
              );
            }}
            className={`flex flex-col items-center gap-2 text-lg font-bold px-4 py-2 rounded-lg w-full border-b-4 ${
              activeSeason === season.name ? 'border-black' : 'border-gray-400'
            }`}
          >
            <span className='flex flex-row gap-4'>{season.icon} {season.name} <span>£{season.price}</span></span>
            <p className='text-xs'>{formatDate(season.startDate)} - {formatDate(season.endDate)}</p>
          </button>
        ))}
      </div>

      <div className="flex flex-col items-center w-full mt-4">
        <div className="flex flex-row justify-center gap-4 w-full">
          {['Standard', 'Intense', 'Custom'].map(tab => (
            <div key={tab} className="relative group">
              {/* Button */}
              <button
                onClick={() => {
                  setActiveSubTab(tab);
                  setSliderValues(
                    initialSliders[activeSeason as keyof typeof initialSliders][tab]
                  );
                }}
                disabled={isDisabled && (tab === "Intense" || tab === "Custom")}
                className={`px-4 py-2 w-32 text-center font-bold border-2 rounded-lg shadow-md transition ${
                  activeSubTab === tab
                    ? 'border-black text-black'
                    : 'border-gray-400 text-gray-400'
                } ${isDisabled && (tab === "Intense" || tab === "Custom") ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {tab}
              </button>

              {/* Tooltip (only appears when disabled and hovered) */}
              {isDisabled && (tab === "Intense" || tab === "Custom") && (
                <div className="absolute bottom-full w-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-red-500 text-white text-xs px-3 py-1 rounded-lg shadow-md">
                  Increase budget to 2000+ to unlock.
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full border-slate-400 p-4 mb-2">
  {Object.keys(sliderValues).map(dial => {
    const activeSeasonPrice = seasons.find(season => season.name === activeSeason)?.price || 0;

    return (
      <div key={dial} className="flex flex-row w-full justify-between p-2 border-b border-[#000]">
        <p className="text-lg font-bold text-black w-1/3">{dial.toUpperCase()} DIAL</p>
        <p className="text-base font-bold text-black w-1/3">
          {sliderValues[dial as keyof SliderValues]}% - £
          {Math.round((activeSeasonPrice * sliderValues[dial as keyof SliderValues]) / 100)}
        </p>
        <div className="w-1/3">
          {activeSubTab === 'Custom' && (
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={sliderValues[dial as keyof SliderValues]}
              onChange={e =>
                handleSliderChange(dial as keyof SliderValues, Number(e.target.value))
              }
              className="w-full cursor-pointer accent-black"
            />
          )}
        </div>
      </div>
    );
  })}
</div>


    <footer className="w-full flex flex-col justify-start  gap-4 font-medium ml-2 cursor-pointer">
      <div className='flex flex-row items-center gap-4'>
        <input type="checkbox" />
        <Link
          href="auditcalculator/terms-and-conditions"
          className="hover:underline"
        >
          Agree with terms and conditions
        </Link>
      <button className="rounded-full py-2 px-4 w-1/4 bg-black text-[#fff] font-bold hover:bg-blue-800">
        Submit
      </button>
      </div>
      <div className="flex flex-row justify-between items-center gap-4">
          {["Agent", "Account Manager", "Consultant"].map((role) => (
            <button key={role} className="rounded-lg py-2 px-4 w-1/3 bg-black text-white font-bold hover:bg-slate-700">
              {role}
            </button>
          ))}
        </div>
    </footer>
    {/* Increase Budget Modal */}
    {isModalOpen && <IncreaseBudgetModal onClose={() => setIsModalOpen(false)} setBasePrice={setBasePrice} currentBasePrice={basePrice} />}
  </div>
);
}