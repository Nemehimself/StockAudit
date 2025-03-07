import React from "react";

const AuditInfo = () => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-blue-700 mb-4 text-center">
        Understanding Short-form and Long-form Audits
      </h2>

      <div className="flex relative w-full">
        <div className="flex flex-col justify-center items-center bg-blue-500 text-white p-6 flex-1 clip-shortform">
          <h3 className="text-lg font-semibold">Short-form Audit</h3>
          <p className="text-sm">
            A quick overview of key financial and operational aspects.
          </p>
        </div>

        <div className="flex flex-col justify-center items-center bg-slate-600 text-white px-8 py-4 flex-1 clip-longform">
          <h3 className="text-lg font-semibold">Long-form Audit</h3>
          <p className="text-sm">
            A deep dive into all financial records, inventory, and compliance details.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuditInfo;
