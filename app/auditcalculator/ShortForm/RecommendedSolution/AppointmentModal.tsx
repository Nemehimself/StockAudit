import { useState } from "react";

interface AppointmentModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onSave: (date: string, time: string) => void;
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({
  title,
  isOpen,
  onClose,
  onSave,
}) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  if (!isOpen) return null;

  // Function to check if the selected date is a weekend
  const isWeekend = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDay(); // 0 = Sunday, 6 = Saturday
    return day === 0 || day === 6;
  };

  // Handle Date Change
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    if (isWeekend(date)) {
      alert("Weekends are not available for selection.");
      setSelectedDate(""); // Reset the input
    } else {
      setSelectedDate(date);
    }
  };

  // Generate time options from 9:00 AM to 5:00 PM
  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 9; hour <= 17; hour++) {
      let displayHour = hour;
      let suffix = "AM";

      if (hour >= 12) {
        suffix = "PM";
        if (hour > 12) displayHour = hour - 12;
      }

      times.push(`${displayHour}:00 ${suffix}`);
    }
    return times;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/4">
        <h2 className="text-xl font-bold mb-4">{title}</h2>

        <label className="block mb-2">Select Date:</label>
        <input
          type="date"
          className="w-full p-2 border rounded mb-4"
          value={selectedDate}
          onChange={handleDateChange}
        />

        <label className="block mb-2">Select Time:</label>
        <select
          className="w-full p-2 border rounded mb-4"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
        >
          <option value="">Select a time</option>
          {generateTimeOptions().map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>

        <div className="flex justify-between mt-4">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => {
              if (!selectedDate || !selectedTime) {
                alert("Please select a valid date and time.");
                return;
              }
              onSave(selectedDate, selectedTime);
              onClose();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;
