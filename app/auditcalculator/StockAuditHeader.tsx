'use client';

import React, { useState, useRef, useEffect } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useRouter } from 'next/navigation';
import {
  FaUserCircle,
  FaChevronDown,
  FaChevronRight,
  FaHistory,
  FaOrcid,
} from 'react-icons/fa';
import { CiLogout } from 'react-icons/ci';
import { deleteCookie } from '@/services/getCookieValue';

interface StockAuditHeaderProps {
  activeAudit: 'short' | 'long';
  setActiveAudit: React.Dispatch<React.SetStateAction<'short' | 'long'>>;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

const StockAuditHeader: React.FC<StockAuditHeaderProps> = ({
  activeAudit,
  setActiveAudit,
  setActiveIndex,
}) => {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [paymentDetails, setPaymentDetails] = useState<{
    amount: string;
    season: string;
  } | null>(null);
  const [name, setName] = useState<string | null>('');
  const [seasonCount, setSeasonCount] = useState(0);

  useEffect(() => {
    const name = localStorage.getItem('username');
    setName(name);
  }, [name]);

  useEffect(() => {
    // ✅ Retrieve payment details from localStorage
    const storedPayment = localStorage.getItem('paymentDetails');
    if (storedPayment) {
      const parsedPayment = JSON.parse(storedPayment);
      setPaymentDetails(parsedPayment);

      // ✅ Count the number of seasons (assuming they are comma-separated)
      const seasonsArray: string[] = (parsedPayment.season as string)
        .split(',')
        .map((s: string) => s.trim());
      setSeasonCount(seasonsArray.length);
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    deleteCookie('token');
    localStorage.removeItem('username');
    router.push('/stockaudit');
  };

  const handleToHistory = () => {
    router.push('/auditcalculator/history');
  };

  return (
    <div className="w-full bg-gray-800 text-white p-4 shadow-md flex justify-between items-center">
      {/* Left Side - Back Button & Title */}
      <div className="flex items-center gap-4">
        <IoMdArrowRoundBack
          size={24}
          className="cursor-pointer"
          onClick={() => router.push('/stockaudit')}
        />
        <h1 className="text-xl font-bold">Welcome to your M.Commerce Audit.</h1>
      </div>

      {/* Audit Selection Tabs */}
      <div className="flex space-x-4">
        <button
          className={`px-4 py-2 font-bold shadow-md ${
            activeAudit === 'short' ? 'bg-blue-500' : 'bg-gray-700'
          }`}
          onClick={() => {
            setActiveAudit('short');
            setActiveIndex(0);
          }}
        >
          SHORT FORM AUDIT
        </button>
        <button
          className={`px-4 py-2 font-bold shadow-md ${
            activeAudit === 'long' ? 'bg-blue-500' : 'bg-gray-700'
          }`}
          onClick={() => {
            setActiveAudit('long');
            setActiveIndex(0);
          }}
        >
          LONG FORM AUDIT
        </button>
      </div>

      {paymentDetails && (
        <div className="p-2 bg-white text-[#000] font-bold">
          Payment Amount: £{paymentDetails.amount}
        </div>
      )}
      <div className="p-2 bg-white text-[#000] font-bold">
        {seasonCount} of {seasonCount} Audit{seasonCount > 1 ? 's' : ''} Left
      </div>
      {/* Right Side - User Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setDropdownOpen(prev => !prev)}
        >
          <p className="text-xl font-bold">{name}</p>
          <FaUserCircle size={24} />
          {dropdownOpen ? <FaChevronDown /> : <FaChevronRight />}
        </div>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-44 bg-gray-900 text-white rounded-md shadow-lg overflow-hidden">
            <div className="flex items-center gap-3 p-3 hover:bg-gray-700">
              <FaOrcid />
              <span>001</span>
            </div>
            <hr className="border-gray-700" />
            <div
              className="flex items-center gap-3 p-3 hover:bg-gray-700 cursor-pointer"
              onClick={handleToHistory}
            >
              <FaHistory />
              <span>History</span>
            </div>
            <hr className="border-gray-700" />
            <div
              className="flex items-center gap-3 p-3 hover:bg-red-600 cursor-pointer"
              onClick={() => {
                // dispatch(decrementAudit());
                handleLogout();
              }}
            >
              <CiLogout />
              <span>Logout</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StockAuditHeader;
