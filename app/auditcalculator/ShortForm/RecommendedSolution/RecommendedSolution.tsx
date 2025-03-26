import { useState, useEffect } from "react";
import { HiPlusCircle } from "react-icons/hi";
import IncreaseBudgetModal from "./IncreaseBudgetModal";
import { initialSliders } from "./initialSliders";
import { getSeasonDates } from "../seasons"; // Adjust the path as needed
import MoveBudgetModal from "./MoveBudgetModal";
import { FaInfoCircle } from "react-icons/fa";
import Footer from "./Footer";

interface SliderValues {
  marketing: number;
  advertising: number;
  sales: number;
  smartMoney: number;
}

interface PaidSeason {
  name: string;
  price: number;
}

// const MIN_BASE_PRICE = 500;

export default function RecommendedSolution() {
  const [paymentDetails, setPaymentDetails] = useState<{ amount: string; season: string } | null>(null);
  const [paidSeasons, setPaidSeasons] = useState<PaidSeason[]>([]);
  const [activeSeason, setActiveSeason] = useState("Winter");
  const [activeSubTab, setActiveSubTab] = useState("Standard");
  const [sliderValues, setSliderValues] = useState<SliderValues>(
    initialSliders["Winter"]["Standard"]
  );
  const [seasonCount, setSeasonCount] = useState(0);
  
  useEffect(() => {
    // Retrieve payment details from localStorage
    const storedPayment = localStorage.getItem("paymentDetails");
    if (storedPayment) {
      const parsedPayment = JSON.parse(storedPayment);
      setPaymentDetails(parsedPayment);

      // Count and price the seasons
      const seasonsArray: string[] = (parsedPayment.season as string)
        .split(",")
        .map((s: string) => s.trim());
      
      // Count occurrences of each season
      const seasonCounts: { [key: string]: number } = seasonsArray.reduce((acc: { [key: string]: number }, season: string) => {
        acc[season] = (acc[season] || 0) + 1;
        return acc;
      }, {});

      // Create paid seasons with calculated prices
      const calculatedPaidSeasons: PaidSeason[] = Object.entries(seasonCounts).map(([name, count]) => ({
        name,
        price: count * 500 // Each occurrence adds £500 to the season's price
      }));

      setPaidSeasons(calculatedPaidSeasons);
      setSeasonCount(seasonsArray.length);
    }
  }, []);

  // Update seasons when paidSeasons changes
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const updatedSeasons = getSeasonDates(currentYear).map(season => {
      const paidSeason = paidSeasons.find(ps => ps.name === season.name);
      
      return {
        ...season,
        price: paidSeason ? paidSeason.price : 0
      };
    });

    setSeasons(updatedSeasons);
  }, [paidSeasons]);

  // Calculate total base price from paid seasons
  const [basePrice, setBasePrice] = useState(
    paidSeasons.reduce((total, season) => total + season.price, 0)
  );

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isIncreaseModalOpen, setIsIncreaseModalOpen] = useState(false);
  const [isMoveModalOpen, setIsMoveModalOpen] = useState(false);
  
  // Initialize seasons based on paid seasons
  const [seasons, setSeasons] = useState(() => {
    const currentYear = new Date().getFullYear();
    return getSeasonDates(currentYear).map(season => {
      // Find the corresponding paid season
      const paidSeason = paidSeasons.find(ps => ps.name === season.name);
      
      return {
        ...season,
        price: paidSeason ? paidSeason.price : 0
      };
    });
  });

  const [seasonBudgets, setSeasonBudgets] = useState<Record<string, number>>({
    Winter: 0,
    Spring: 0,
    Summer: 0,
    Autumn: 0,
  });

  // const totalAudits = Math.floor(basePrice / MIN_BASE_PRICE);
  // const auditsLeft = totalAudits;

  // Find the current season based on the active season
  const currentSeason = seasons.find((season) => season.name === activeSeason);

  const isDisabled = basePrice < 2000;

  const handleSliderChange = (dial: keyof SliderValues, newValue: number) => {
    const sumOtherDials = Object.keys(sliderValues)
      .filter((key) => key !== dial)
      .reduce((sum, key) => sum + sliderValues[key as keyof SliderValues], 0);

    const maxValueForDial = Math.min(100 - sumOtherDials, newValue);

    setSliderValues({
      ...sliderValues,
      [dial]: maxValueForDial,
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(Date.parse(dateString + "T12:00:00Z"));
    return date
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
      })
      .replace(",", "");
  };

  return (
    <div
      className={`flex flex-col w-full h-1/3 gap-4 p-4 mt-6 rounded-3xl ${
        currentSeason?.color || ""
      }`}
    >
      <div className="flex flex-row justify-around items-center gap-4 w-full">
        <p className="p-2 rounded-lg shadow-lg bg-slate-800 text-[#fff] font-semibold">
          Budget: £{paymentDetails?.amount || 0}
        </p>
        <button
          className="flex flex-row gap-4 items-center p-2 rounded-lg shadow-lg bg-slate-800 text-white font-semibold cursor-pointer"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          Edit Budget <HiPlusCircle className="w-6 h-6" />
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-50">
            {/* Add to Budget */}
            <div
              className="flex items-center justify-between font-semibold px-4 py-2 hover:bg-gray-300 cursor-pointer"
              onClick={() => {
                setIsIncreaseModalOpen(true);
                setIsDropdownOpen(false);
              }}
            >
              Add To Budget
              <span className="group relative">
                <FaInfoCircle className="w-5 h-5 text-gray-500" />
                <span className="absolute left-0 w-32 bg-black text-white text-xs p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-20">
                  Add more budget to a particular marketing period and pay
                </span>
              </span>
            </div>

            {/* Move Budget */}
            <div
              className="flex items-center justify-between font-semibold px-4 py-2 hover:bg-gray-300 cursor-pointer"
              onClick={() => {
                setIsMoveModalOpen(true);
                setIsDropdownOpen(false);
              }}
            >
              Move Budget
              <span className="group relative">
                <FaInfoCircle className="w-5 h-5 text-gray-500" />
                <span className="absolute left-0 w-32 bg-black text-white text-xs p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-20">
                  Move current budget to a particular marketing period.
                </span>
              </span>
            </div>
          </div>
        )}
        <h1 className="text-black text-2xl text-center font-bold">
          RECOMMENDED SOLUTION
        </h1>
        <p className="p-2 rounded-lg shadow-lg bg-slate-800 text-[#fff] font-semibold">
        {seasonCount} of {seasonCount} Audit{seasonCount > 1 ? "s" : ""}  Left
        </p>
      </div>
      <div className="flex flex-row bg-white gap-4 p-4 rounded-lg shadow-lg w-full">
        {seasons.map((season) => (
          <button
            key={season.name}
            onClick={() => {
              setActiveSeason(season.name);
              setActiveSubTab("Standard");
              setSliderValues(
                initialSliders[season.name as keyof typeof initialSliders][
                  "Standard"
                ]
              );
            }}
            className={`flex flex-col items-center gap-2 text-lg font-bold px-4 py-2 rounded-lg w-full border-b-4 ${
              activeSeason === season.name ? "border-black" : "border-gray-400"
            }`}
          >
            <span className="flex flex-row gap-4">
              {season.icon} {season.name} <span>£{season.price}</span>
            </span>
            <p className="text-xs">
              {formatDate(season.startDate)} - {formatDate(season.endDate)}
            </p>
          </button>
        ))}
      </div>

      <div className="flex flex-col items-center w-full mt-4">
        <div className="flex flex-row justify-center gap-4 w-full">
          {["Standard", "Intense", "Custom"].map((tab) => (
            <div key={tab} className="relative group">
              {/* Button */}
              <button
                onClick={() => {
                  setActiveSubTab(tab);
                  setSliderValues(
                    initialSliders[activeSeason as keyof typeof initialSliders][
                      tab
                    ]
                  );
                }}
                disabled={isDisabled && (tab === "Intense" || tab === "Custom")}
                className={`px-4 py-2 w-32 text-center font-bold border-2 rounded-lg shadow-md transition ${
                  activeSubTab === tab
                    ? "border-black text-black"
                    : "border-gray-400 text-gray-400"
                } ${
                  isDisabled && (tab === "Intense" || tab === "Custom")
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
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
        {Object.keys(sliderValues).map((dial) => {
          const activeSeasonPrice =
            seasons.find((season) => season.name === activeSeason)?.price || 0;
          return (
            <div
              key={dial}
              className="flex flex-row w-full justify-between p-2 border-b border-[#000]"
            >
              <p className="text-lg font-bold text-black w-1/3">
                {dial.toUpperCase()} DIAL
              </p>
              <p className="text-base font-bold text-black w-1/3">
                {sliderValues[dial as keyof SliderValues]}% - £
                {Math.round(
                  (activeSeasonPrice * sliderValues[dial as keyof SliderValues]) / 100
                )}
              </p>
              <div className="w-1/3">
                {activeSubTab === "Custom" && (
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={sliderValues[dial as keyof SliderValues]}
                    onChange={(e) =>
                      handleSliderChange(
                        dial as keyof SliderValues,
                        Number(e.target.value)
                      )
                    }
                    className="w-full cursor-pointer accent-black"
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      <Footer />
      {/* Increase Budget Modal */}
      {isIncreaseModalOpen && (
        <IncreaseBudgetModal
          onClose={() => setIsIncreaseModalOpen(false)}
          setBasePrice={setBasePrice}
          setSeasonBudgets={setSeasonBudgets}
          currentBasePrice={basePrice}
          seasonBudgets={seasonBudgets}
        />
      )}

      {isMoveModalOpen && (
        <MoveBudgetModal
          onClose={() => setIsMoveModalOpen(false)}
          setBasePrice={setBasePrice}
          currentBasePrice={basePrice}
          seasonBudgets={seasons.reduce((acc, season) => {
            acc[season.name] = season.price;
            return acc;
          }, {} as Record<string, number>)}
          setSeasonBudgets={(budgets: Record<string, number>) => {
            setSeasons((prevSeasons) =>
              prevSeasons.map((season) => ({
                ...season,
                price: budgets[season.name] ?? season.price, // Ensure donor season updates too
              }))
            );
          }}
        />
      )}
    </div>
  );
}
