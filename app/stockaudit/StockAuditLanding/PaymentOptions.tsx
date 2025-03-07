import React from "react";
import { FaPaypal } from "react-icons/fa";
import { FaStripeS } from "react-icons/fa";

const PaymentOptions = () => {
  return (
    <div className="bg-gray-50 p-6  text-center">
      <h2 className="text-xl font-semibold mb-4">Purchase an Audit</h2>
      <div className="flex justify-center space-x-4">
        <button className="flex flex-col justify-between items-center bg-blue-500 text-white px-4 py-2 rounded-lg shadow"> 
            <FaPaypal /> <span>Pay with PayPal </span>
        </button>
        <button className="flex flex-col justify-between items-center bg-gray-800 text-white px-4 py-2 rounded-lg shadow">
            <FaStripeS /> <span> Pay with Stripe </span>
        </button>
      </div>
    </div>
  );
};

export default PaymentOptions;
