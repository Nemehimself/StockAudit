// AuditInfo.tsx
import React from "react";

const AuditInfo = () => {
  return (
    <div className="bg-gray-100 p-4 md:p-6 rounded-lg shadow-md">
      <h2 className="text-lg md:text-xl font-bold text-blue-700 mb-3 md:mb-4 text-center">
        Understanding Short-form and Long-form Audits
      </h2>

      <div className="flex flex-col md:flex-row relative w-full">
        <div className="flex flex-col justify-center items-center bg-blue-500 text-white p-4 md:p-6 flex-1 clip-shortform rounded-t-lg md:rounded-l-lg md:rounded-tr-none mb-2 md:mb-0">
          <h3 className="text-base md:text-lg font-semibold">Short-form Audit</h3>
          <p className="text-xs md:text-sm text-center">
            A quick overview of key financial and operational aspects.
          </p>
        </div>

        <div className="flex flex-col justify-center items-center bg-slate-600 text-white p-4 md:px-8 md:py-4 flex-1 clip-longform rounded-b-lg md:rounded-r-lg md:rounded-bl-none">
          <h3 className="text-base md:text-lg font-semibold">Long-form Audit</h3>
          <p className="text-xs md:text-sm text-center">
            A deep dive into all financial records, inventory, and compliance details.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuditInfo;