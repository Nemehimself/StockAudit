import { useState } from "react";
import Link from "next/link";
import AppointmentModal from "./AppointmentModal"; // Import modal component

const Footer = () => {
  const [agentModalOpen, setAgentModalOpen] = useState(false);
  const [accountManagerModalOpen, setAccountManagerModalOpen] = useState(false);
  const [consultantModalOpen, setConsultantModalOpen] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState<string | null>(null);

  // Disable buttons if an appointment is booked
  const disableButtons = appointmentDetails !== null;

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

      {/* Display Appointment Details Only If Saved */}
      {appointmentDetails && <p className="text-center">Appointment Booking Details: {appointmentDetails}</p>}

      {/* Agent Modal */}
      <AppointmentModal
        title="Agent Appointment"
        isOpen={agentModalOpen}
        onClose={() => setAgentModalOpen(false)}
        onSave={(date, time) => setAppointmentDetails(`Agent - ${date} at ${time}`)}
      />

      {/* Account Manager Modal */}
      <AppointmentModal
        title="Account Manager Appointment"
        isOpen={accountManagerModalOpen}
        onClose={() => setAccountManagerModalOpen(false)}
        onSave={(date, time) => setAppointmentDetails(`Account Manager - ${date} at ${time}`)}
      />

      {/* Consultant Modal */}
      <AppointmentModal
        title="Consultant Appointment"
        isOpen={consultantModalOpen}
        onClose={() => setConsultantModalOpen(false)}
        onSave={(date, time) => setAppointmentDetails(`Consultant - ${date} at ${time}`)}
      />
    </footer>
  );
};

export default Footer;
