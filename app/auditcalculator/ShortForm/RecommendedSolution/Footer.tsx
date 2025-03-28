import { useState, useEffect } from "react";
import Link from "next/link";
import AppointmentModal from "./AppointmentModal";

const Footer = () => {
  const [agentModalOpen, setAgentModalOpen] = useState(false);
  const [accountManagerModalOpen, setAccountManagerModalOpen] = useState(false);
  const [consultantModalOpen, setConsultantModalOpen] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState<string | null>(null);
  
  // New state for tracking payment and season conditions
  const [isButtonsDisabled, setIsButtonsDisabled] = useState(true);

  useEffect(() => {
    // Function to check button disabled state
    const checkButtonDisabledState = () => {
      const storedPayment = localStorage.getItem("paymentDetails");
      const increasedBudget = localStorage.getItem("increasedBudget");

      if (storedPayment) {
        const parsedPayment = JSON.parse(storedPayment);
        const seasonsArray = (parsedPayment.season as string)
          .split(",")
          .map((s: string) => s.trim());
        
        let amount = parseFloat(parsedPayment.amount);

        // Check if there's an increased budget
        if (increasedBudget) {
          const parsedIncreasedBudget = JSON.parse(increasedBudget);
          amount += parsedIncreasedBudget.amount;
        }

        // Disable buttons if amount is less than 2000 or seasons are less than 4
        setIsButtonsDisabled(amount < 2000 || seasonsArray.length < 4);
      }
    };

    // Check initial state
    checkButtonDisabledState();

    // Add event listener for storage changes
    window.addEventListener('storage', checkButtonDisabledState);

    // Clean up event listener
    return () => {
      window.removeEventListener('storage', checkButtonDisabledState);
    };
  }, []);

  // Combine local appointment booking disable with payment conditions
  const disableButtons = appointmentDetails !== null || isButtonsDisabled;

  return (
    <footer className="w-full flex flex-col justify-start gap-4 font-medium ml-2 cursor-pointer">
      <div className="flex flex-row items-center gap-4">
        <input type="checkbox" />
        <Link
          href="auditcalculator/terms-and-conditions"
          className="hover:underline"
        >
          Agree with terms and conditions
        </Link>
        <button className="rounded-2xl py-2 px-4 w-1/4 bg-lime-600 text-[#000] font-bold hover:bg-blue-800">
          Save
        </button>
      </div>

      <div className="flex flex-row justify-between items-center gap-4">
        <button
          className="rounded-lg py-2 px-4 w-1/3 bg-black text-white font-bold hover:bg-slate-700 disabled:opacity-50"
          onClick={() => setAgentModalOpen(true)}
          disabled={disableButtons}
        >
          Agent
        </button>
        <button
          className="rounded-lg py-2 px-4 w-1/3 bg-black text-white font-bold hover:bg-slate-700 disabled:opacity-50"
          onClick={() => setAccountManagerModalOpen(true)}
          disabled={disableButtons}
        >
          Account Manager
        </button>
        <button
          className="rounded-lg py-2 px-4 w-1/3 bg-black text-white font-bold hover:bg-slate-700 disabled:opacity-50"
          onClick={() => setConsultantModalOpen(true)}
          disabled={disableButtons}
        >
          Consultant
        </button>
      </div>

      {/* Conditional tooltip for why buttons are disabled */}
      {isButtonsDisabled && (
        <p className="text-center text-red-500 text-sm">
          {localStorage.getItem("paymentDetails") 
            ? "Increase budget to 2000+ to unlock booking." 
            : "Please complete payment details first."}
        </p>
      )}

      {/* Display Appointment Details Only If Saved */}
      {appointmentDetails && (
        <p className="text-center">
          Appointment Booking Details: {appointmentDetails}
        </p>
      )}

      {/* Appointment Modals */}
      <AppointmentModal
        title="Agent Appointment"
        isOpen={agentModalOpen}
        onClose={() => setAgentModalOpen(false)}
        onSave={(date, time) =>
          setAppointmentDetails(`Agent - ${date} at ${time}`)
        }
      />

      <AppointmentModal
        title="Account Manager Appointment"
        isOpen={accountManagerModalOpen}
        onClose={() => setAccountManagerModalOpen(false)}
        onSave={(date, time) =>
          setAppointmentDetails(`Account Manager - ${date} at ${time}`)
        }
      />

      <AppointmentModal
        title="Consultant Appointment"
        isOpen={consultantModalOpen}
        onClose={() => setConsultantModalOpen(false)}
        onSave={(date, time) =>
          setAppointmentDetails(`Consultant - ${date} at ${time}`)
        }
      />
    </footer>
  );
};

export default Footer;