import React, { useState } from "react";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

interface MoveBudgetModalProps {
  onClose: () => void;
  setBasePrice: (price: number) => void;
  currentBasePrice: number;
  seasonBudgets: Record<string, number>;
  setSeasonBudgets: (budgets: Record<string, number>) => void;
}

export default function MoveBudgetModal({
  onClose,
  setBasePrice,
  currentBasePrice,
  seasonBudgets,
  setSeasonBudgets,
}: MoveBudgetModalProps) {
  const seasons = ["Winter", "Spring", "Summer", "Autumn"];
  const [tempBudgets, setTempBudgets] = useState({ ...seasonBudgets });
  const totalBudget = Object.values(seasonBudgets).reduce((acc, val) => acc + val, 0);

  const moveBudget = (season: string, amount: number) => {
    if (amount > 0) {
      // Adding budget
      const donorSeason = seasons.find((s) => tempBudgets[s] >= amount && s !== season);
      if (!donorSeason) return alert("No season has enough budget to move.");

      setTempBudgets((prev) => ({
        ...prev,
        [donorSeason]: prev[donorSeason] - amount,
        [season]: prev[season] + amount,
      }));
    } else {
      // Removing budget
      if (tempBudgets[season] <= 0) return;

      setTempBudgets((prev) => {
        const availableReceiver = seasons.find((s) => s !== season);
        if (!availableReceiver) return prev;

        return {
          ...prev,
          [season]: prev[season] + amount,
          [availableReceiver]: prev[availableReceiver] - amount,
        };
      });
    }
  };

  const handleSave = () => {
    const tempTotal = Object.values(tempBudgets).reduce((acc, val) => acc + val, 0);
    if (tempTotal !== totalBudget) {
      return alert("Error: Budget allocation does not match the total budget.");
    }
    setSeasonBudgets(tempBudgets);
    setBasePrice(currentBasePrice);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-lg font-bold mb-4">Move Budget</h2>
        <p className="text-lg font-semibold text-center mb-4">Current Budget: £{currentBasePrice}</p>

        {seasons.map((season) => (
          <div key={season} className="flex items-center justify-between p-2 border-b">
            <span className="font-semibold">{season}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => moveBudget(season, -500)}
                className="p-1 text-red-500"
                disabled={tempBudgets[season] <= 0}
              >
                <FaMinusCircle />
              </button>
              <span className="w-12 text-center">{tempBudgets[season]}</span>
              <button
                onClick={() => moveBudget(season, 500)}
                className="p-1 text-green-500"
              >
                <FaPlusCircle />
              </button>
            </div>
          </div>
        ))}

        <div className="flex justify-end gap-4 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-600 text-white rounded-md">
            Cancel
          </button>
          <button onClick={handleSave} className="px-4 py-2 bg-emerald-600 text-white rounded-md">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
