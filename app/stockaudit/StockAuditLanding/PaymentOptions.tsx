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
    } else router.push('/auditpricing'); // Navigate to <AuditPri></AuditPri>cing page
  };

  return (
    <div className="bg-gray-50 p-6  text-center">
      <h2 className="text-xl font-semibold mb-4">Purchase an Audit</h2>
      <p>
        Click on the button below to purchase any of Audit 1, Audit 2, Audit 3
        or Audit 4 to be able to access the stock audit calculator. Make sure
        you are signed in to be able to have access.
      </p>
      <div className="flex justify-center space-x-4 mt-2">
        <button
          className="flex flex-row justify-between items-center gap-4 bg-blue-500 text-white px-4 py-4 rounded-lg shadow text-xl font-semibold"
          onClick={handlePayment}
        >
          <MdOutlinePayments className="w-8 h-8" />{' '}
          <span>Make Audit Payment </span>
        </button>
      </div>
    </div>
  );
};

export default PaymentOptions;
