import { useState } from "react";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

interface IncreaseBudgetModalProps {
  onClose: () => void;
  setBasePrice: (price: number) => void;
  setSeasonBudgets: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  currentBasePrice: number;  
  seasonBudgets: Record<string, number>; // ✅ Holds the current budget of each season
}

const seasons = ["Winter", "Spring", "Summer", "Autumn"];

export default function IncreaseBudgetModal({ 
  onClose, 
  setBasePrice, // ✅ Fix: Now passed correctly
  setSeasonBudgets, 
  currentBasePrice 
}: IncreaseBudgetModalProps) {
  
  // ✅ Track additional budget for each season
  const [additionalBudgets, setAdditionalBudgets] = useState<Record<string, number>>(
    Object.fromEntries(seasons.map(season => [season, 0])) // Start with 0
  );

  // ✅ Calculate total additional budget
  const totalAdditionalBudget = Object.values(additionalBudgets).reduce((sum, amount) => sum + amount, 0);

  // ✅ New budget (Current Budget + Additional Budget)
  const newBudget = currentBasePrice + totalAdditionalBudget;

  // ✅ Handle increasing/decreasing per season
  const handleIncrease = (season: string) => {
    setAdditionalBudgets(prev => ({
      ...prev,
      [season]: prev[season] + 500
    }));
  };

  const handleDecrease = (season: string) => {
    setAdditionalBudgets(prev => ({
      ...prev,
      [season]: prev[season] > 0 ? prev[season] - 500 : 0
    }));
  };

  const handleSave = () => {
    setSeasonBudgets(prevBudgets => {
      const updatedBudgets = { ...prevBudgets };
  
      Object.keys(additionalBudgets).forEach(season => {
        updatedBudgets[season] = (prevBudgets[season] ?? 0) + additionalBudgets[season];
      });
  
      return updatedBudgets;
    });
  
    // ✅ Ensure base price type is correct
    setBasePrice(currentBasePrice + totalAdditionalBudget);
  
    onClose();
  };
  
  
  
  
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl text-center font-bold mb-4">Add To Budget</h2>

        {/* ✅ Display Budgets */}
        <div className="flex flex-row gap-4 justify-between items-center mb-2">
          <p className="text-gray-600">Current Budget: £{currentBasePrice}</p>
          <p className="text-gray-600">Additional Budget: £{totalAdditionalBudget}</p>
          <p className="text-gray-800 font-semibold">New Budget: £{newBudget}</p>
        </div>

        {/* ✅ Season Budget Controls */}
        <div className="grid grid-cols-1 gap-3">
          {seasons.map((season) => (
            <div key={season} className="flex items-center border p-2 rounded-md justify-between">
              <span className="w-24 font-semibold">{season}</span>
              
              <button onClick={() => handleDecrease(season)} className="px-2 text-lg">
                <FaMinusCircle />
              </button>

              <span className="text-lg">{additionalBudgets[season]}</span>

              <button onClick={() => handleIncrease(season)} className="px-2 text-lg">
                <FaPlusCircle />
              </button>
            </div>
          ))}
        </div>

        {/* ✅ Buttons */}
        <div className="flex justify-end gap-4 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-600 text-white rounded-md">
            Cancel
          </button>
          <button onClick={handleSave} className="px-4 py-2 bg-emerald-600 text-white rounded-md">
            Pay
          </button>
        </div>
      </div>
    </div>
  );
}
