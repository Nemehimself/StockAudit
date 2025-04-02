// PaymentOptions.tsx
import React from 'react';
import { useRouter } from 'next/navigation';
import { MdOutlinePayments } from 'react-icons/md';
import { getCookieValue } from '@/services/getCookieValue';

interface PaymentOptionsType {
  setModalOpen: (val: boolean) => void;
}

const PaymentOptions: React.FC<PaymentOptionsType> = ({ setModalOpen }) => {
  const router = useRouter();

  const handlePayment = () => {
    const token = getCookieValue('token');
    if (!token) {
      setModalOpen(true);
      localStorage.setItem('redirect', '/auditpricing');
    } else router.push('/auditpricing');
  };

  return (
    <div className="bg-gray-50 p-4 md:p-6 text-center rounded-lg shadow-md">
      <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-4">Purchase an Audit</h2>
      <p className="text-sm md:text-base mb-4">
        Click on the button below to purchase any of Audit 1, Audit 2, Audit 3
        or Audit 4 to be able to access the stock audit calculator. Make sure
        you are signed in to be able to have access.
      </p>
      <div className="flex justify-center mt-2">
        <button
          className="flex flex-row justify-between items-center gap-2 md:gap-4 bg-blue-500 text-white px-3 py-2 md:px-4 md:py-4 rounded-lg shadow text-base md:text-xl font-semibold w-full md:w-auto"
          onClick={handlePayment}
        >
          <MdOutlinePayments className="w-6 h-6 md:w-8 md:h-8" />
          <span>Make Audit Payment</span>
        </button>
      </div>
    </div>
  );
};

export default PaymentOptions;