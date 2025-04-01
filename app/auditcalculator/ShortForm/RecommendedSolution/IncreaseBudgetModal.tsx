import { useState, useEffect} from "react";
import { FaPlusCircle, FaMinusCircle, FaPaypal, FaStripeS } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface IncreaseBudgetModalProps {
  onClose: () => void;
  seasonBudgets: Record<string, number>;
  setSeasonBudgets: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  currentBasePrice: number;
  setBasePrice: React.Dispatch<React.SetStateAction<number>>;
}

const seasons = ["Winter", "Spring", "Summer", "Autumn"];

export default function IncreaseBudgetModal({ onClose, seasonBudgets, setSeasonBudgets }: IncreaseBudgetModalProps) {
  const [selectedSeason, setSelectedSeason] = useState("");
  const [additionalBudgets, setAdditionalBudgets] = useState<Record<string, number>>({});

  useEffect(() => {
    setAdditionalBudgets({ ...seasonBudgets }); // ✅ Sync with seasonBudgets

    const storedBudgets = localStorage.getItem('seasonBudgets');
    if (storedBudgets) {
      const parsedBudgets = JSON.parse(storedBudgets);
      setSeasonBudgets(prevBudgets => ({
        ...prevBudgets,
        ...parsedBudgets
      }));
    }
  }, [seasonBudgets, setSeasonBudgets]);

  

  const router = useRouter();

  const totalSeasonBudget = Object.values(seasonBudgets).reduce((sum, amount) => sum + amount, 0);
  const totalAdditionalBudget = Object.values(additionalBudgets).reduce((sum, amount) => sum + amount, 0);
  const newBudget = totalSeasonBudget + totalAdditionalBudget;

  const handleIncrease = (season: string) => {
    setAdditionalBudgets((prev) => ({
      ...prev,
      [season]: (prev[season] || 0) + 500,
    }));
  };

  const handleDecrease = (season: string) => {
    setAdditionalBudgets((prev) => ({
      ...prev,
      [season]: Math.max((prev[season] || 0) - 500, 0),
    }));
  };

  const handlePaymentRedirect = (method: "paypal" | "stripe") => {
    if (!selectedSeason) {
      alert("Please select a season before proceeding to payment.");
      return;
    }

    const increasedAmount = additionalBudgets[selectedSeason];

    if (increasedAmount === 0) {
      alert("Please increase the budget before proceeding to payment.");
      return;
    }

    // Update season budgets
    const updatedSeasonBudgets = {
      ...seasonBudgets,
      [selectedSeason]: (seasonBudgets[selectedSeason] || 0) + increasedAmount
    };

    // Update state
    setSeasonBudgets(updatedSeasonBudgets);

    // Store in localStorage
    localStorage.setItem('seasonBudgets', JSON.stringify(updatedSeasonBudgets));
    localStorage.setItem('increasedBudget', JSON.stringify({ 
      season: selectedSeason,
      amount: increasedAmount 
    }));

    // Reset additional budgets after payment
    setAdditionalBudgets(prev => ({
      ...prev,
      [selectedSeason]: 0
    }));

    const query = `?amount=${increasedAmount}&season=${encodeURIComponent(selectedSeason)}`;
    router.push(`/${method}-payment${query}`);
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl text-center font-bold mb-4">Add To Budget</h2>

        {/* ✅ Display Budgets */}
        <div className="flex flex-row gap-4 justify-between items-center mb-2">
          <p className="text-gray-600">Current Budget: £{totalSeasonBudget}</p>
          <p className="text-gray-600">Additional Budget: £{totalAdditionalBudget}</p>
          <p className="text-gray-800 font-semibold">New Budget: £{newBudget}</p>
        </div>

        {/* ✅ Season Budget Controls */}
        <div className="grid grid-cols-1 gap-3">
          {seasons.map((season) => (
            <div
              key={season}
              className={`flex items-center border p-2 rounded-md justify-between cursor-pointer ${
                selectedSeason === season ? "bg-gray-200" : ""
              }`}
              onClick={() => setSelectedSeason(season)}
            >
              <span className="w-24 font-semibold">{season}</span>
              <button onClick={() => handleDecrease(season)} className="px-2 text-lg">
                <FaMinusCircle />
              </button>
              <span className="text-lg">{additionalBudgets[season] ?? 0}</span>
              <button onClick={() => handleIncrease(season)} className="px-2 text-lg">
                <FaPlusCircle />
              </button>
            </div>
          ))}
        </div>

        {/* ✅ Payment Buttons */}
        <div className="flex justify-end gap-4 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-600 text-white rounded-md">
            Cancel
          </button>
          <button
            onClick={() => handlePaymentRedirect("paypal")}
            className="px-4 py-2 bg-emerald-600 text-white rounded-md flex items-center gap-2"
          >
            <FaPaypal /> <span>Pay with PayPal</span>
          </button>
          <button
            onClick={() => handlePaymentRedirect("stripe")}
            className="px-4 py-2 bg-emerald-600 text-white rounded-md flex items-center gap-2"
          >
            <FaStripeS /> <span>Pay with Stripe</span>
          </button>
        </div>
      </div>
    </div>
  );
}
