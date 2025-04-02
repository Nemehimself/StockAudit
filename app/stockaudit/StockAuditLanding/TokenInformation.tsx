// TokenInformation.tsx
import React from "react";

const TokenInformation = () => {
  return (
    <div className="bg-gray-100 p-4 md:p-6 rounded-lg shadow-md">
      <h2 className="text-lg md:text-xl font-bold text-blue-700 mb-2 md:mb-3">Audit Tokens & Membership</h2>
      <p className="text-sm md:text-base text-gray-700">
        Audit tokens hold value based on your Google Business Solutions membership level and directory dashboard badge status.
      </p>
    </div>
  );
};

export default TokenInformation;