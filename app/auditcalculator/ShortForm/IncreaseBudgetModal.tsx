import { useState } from "react";

interface IncreaseBudgetModalProps {
  onClose: () => void;
  setBasePrice: (price: number) => void;
  currentBasePrice: number;  // ✅ Pass the current base price from parent
}

export default function IncreaseBudgetModal({ onClose, setBasePrice, currentBasePrice }: IncreaseBudgetModalProps) {
  const [additionalAmount, setAdditionalAmount] = useState("");

  const handleSave = () => {
    const parsedAmount = parseFloat(additionalAmount);
    
    if (isNaN(parsedAmount) || parsedAmount < 500) {
      alert("Amount must be at least £500");
      return;
    }

    setBasePrice(currentBasePrice + parsedAmount);  // ✅ Add to existing base price
    onClose();  // ✅ Close modal after saving
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-lg font-bold mb-4">Increase Budget</h2>
        <p className="mb-2 text-gray-600">Current Budget: £{currentBasePrice}</p>
        <input
          type="number"
          value={additionalAmount}
          onChange={(e) => setAdditionalAmount(e.target.value)}
          className="border p-2 w-full rounded-md"
          placeholder="Enter additional amount"
          min="500"
          step="500"
        />
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
