import React from 'react';
import ToolTip from './ToolTip';

interface DateRangeFormProps {
  activeFrom: string;
  expires: string;
  setActiveFrom: (val: string) => void;
  setExpires: (val: string) => void;
}

const DateRangeForm: React.FC<DateRangeFormProps> = ({
  activeFrom,
  expires,
  setActiveFrom,
  setExpires,
}) => {
  return (
    <div className="space-y-6">
      <p className="text-lg text-grey-600">
        The date range spcifies how long this reward is valid for
      </p>
      <div>
        <label className=" mb-1 flex items-center gap-2">
          Active From (required)
          <ToolTip content="When is the starting date for this reward?" />
        </label>
        <input
          type="datetime-local"
          value={activeFrom}
          onChange={e => setActiveFrom(e.target.value)}
          className="block w-full p-2 border-b-2 border-[#838383] focus:border-[#2D3DFF] outline-none"
        />
      </div>
      <div>
        <label className=" mb-1 flex items-center gap-2">
          Expires (required)
          <ToolTip content="At what date and time will this reward stop being valid?" />
        </label>
        <label className="block mb-1"></label>
        <input
          type="datetime-local"
          value={expires}
          onChange={e => setExpires(e.target.value)}
          className="block w-full p-2 border-b-2 border-[#838383] focus:border-[#2D3DFF] outline-none"
        />
      </div>
    </div>
  );
};

export default DateRangeForm;
