import { useState } from "react";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

interface IncreaseBudgetModalProps {
  onClose: () => void;
  setBasePrice: (price: number) => void;
  currentBasePrice: number;  // ✅ Pass the current base price from parent
}

export default function IncreaseBudgetModal({ onClose, setBasePrice, currentBasePrice }: IncreaseBudgetModalProps) {
  const [additionalAmount, setAdditionalAmount] = useState(500);

  const handleIncrease = () => {
    setAdditionalAmount((prev) => prev + 500);
  };

  const handleDecrease = () => {
    setAdditionalAmount((prev) => (prev > 500 ? prev - 500 : 500));
  };


  const handleSave = () => {
    const parsedAmount = additionalAmount;
    
    if (parsedAmount < 500) {
      alert("Amount must be at least £500");
      return;
    }

    setBasePrice(currentBasePrice + parsedAmount);  // ✅ Add to existing base price
    onClose();  // ✅ Close modal after saving
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-lg font-bold mb-4">Edit Budget</h2>
        <p className="mb-2 text-gray-600">Current Budget: £{currentBasePrice}</p>
        <div className="flex items-center border p-2 rounded-md w-full max-w-[250px]">
      <button
        onClick={handleDecrease}
        className="px-3 py-1 rounded-l-md text-lg"
      >
        <FaMinusCircle />
      </button>
      <span className="flex-1 text-center">{additionalAmount}</span>
      <button
        onClick={handleIncrease}
        className="px-3 py-1 rounded-r-md text-lg"
      >
        <FaPlusCircle />
      </button>
    </div>
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
