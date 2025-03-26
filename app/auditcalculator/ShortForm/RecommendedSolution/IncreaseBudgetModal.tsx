import { useState, Dispatch, SetStateAction } from "react";
import { FaPlusCircle, FaMinusCircle, FaPaypal, FaStripeS } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface IncreaseBudgetModalProps {
  onClose: () => void;
  currentBasePrice: number;
  setBasePrice: Dispatch<SetStateAction<number>>;
  seasonBudgets: Record<string, number>;
  setSeasonBudgets: Dispatch<SetStateAction<Record<string, number>>>;
}

const seasons = ["Winter", "Spring", "Summer", "Autumn"];

export default function IncreaseBudgetModal({ onClose, currentBasePrice }: IncreaseBudgetModalProps) {
  const [selectedSeason, setSelectedSeason] = useState(""); // ✅ Track selected season
  const [additionalBudgets, setAdditionalBudgets] = useState<Record<string, number>>(
    Object.fromEntries(seasons.map((season) => [season, 0])) // Start with 0
  );
  
  const router = useRouter();

  const totalAdditionalBudget = Object.values(additionalBudgets).reduce((sum, amount) => sum + amount, 0);
  const newBudget = currentBasePrice + totalAdditionalBudget;

  const handleIncrease = (season: string) => {
    setAdditionalBudgets((prev) => ({ ...prev, [season]: prev[season] + 500 }));
  };

  const handleDecrease = (season: string) => {
    setAdditionalBudgets((prev) => ({ ...prev, [season]: prev[season] > 0 ? prev[season] - 500 : 0 }));
  };

  const handlePaymentRedirect = (method: "paypal" | "stripe") => {
    if (!selectedSeason) {
      alert("Please select a season before proceeding to payment.");
      return;
    }

    const amount = additionalBudgets[selectedSeason];

    if (amount === 0) {
      alert("Please increase the budget before proceeding to payment.");
      return;
    }

    const query = `?amount=${amount}&season=${encodeURIComponent(selectedSeason)}`;
    router.push(`/${method}-payment${query}`);
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
            <div key={season} className={`flex items-center border p-2 rounded-md justify-between cursor-pointer ${
                selectedSeason === season ? "bg-gray-200" : ""
              }`}
              onClick={() => setSelectedSeason(season)} // ✅ Select season on click
            >
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

        {/* ✅ Payment Buttons */}
        <div className="flex justify-end gap-4 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-600 text-white rounded-md">Cancel</button>
          <button onClick={() => handlePaymentRedirect("paypal")} className="px-4 py-2 bg-emerald-600 text-white rounded-md flex items-center gap-2">
            <FaPaypal /> <span>Pay with PayPal</span>
          </button>
          <button onClick={() => handlePaymentRedirect("stripe")} className="px-4 py-2 bg-emerald-600 text-white rounded-md flex items-center gap-2">
            <FaStripeS /> <span>Pay with Stripe</span>
          </button>
        </div>
      </div>
    </div>
  );
}
