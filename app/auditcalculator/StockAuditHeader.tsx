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
    // Retrieve payment details from localStorage
    const storedPayment = localStorage.getItem('paymentDetails');
    if (storedPayment) {
      const parsedPayment = JSON.parse(storedPayment);
      setPaymentDetails(parsedPayment);

      // Count the number of seasons (assuming they are comma-separated)
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
    <div className="w-full bg-gray-800 text-white p-2 md:p-4 shadow-md flex flex-col md:flex-row justify-between items-center">
      {/* Left Side - Back Button & Title - Mobile & Desktop */}
      <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto justify-between md:justify-start">
        <div className="flex items-center gap-2">
          <IoMdArrowRoundBack
            size={20}
            className="cursor-pointer"
            onClick={() => router.push('/stockaudit')}
          />
          <h1 className="text-sm md:text-xl font-bold truncate">Welcome to M.Commerce</h1>
        </div>
        
        {/* User Info - Mobile Only */}
        <div className="md:hidden relative" ref={dropdownRef}>
          <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={() => setDropdownOpen(prev => !prev)}
          >
            <FaUserCircle size={20} />
            {dropdownOpen ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />}
          </div>

          {/* Mobile Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-gray-900 text-white rounded-md shadow-lg overflow-hidden z-50">
              <div className="p-2 text-center border-b border-gray-700">
                <p className="font-bold truncate">{name}</p>
              </div>
              <div className="flex items-center gap-3 p-2 hover:bg-gray-700">
                <FaOrcid size={14} />
                <span className="text-sm">001</span>
              </div>
              <div
                className="flex items-center gap-3 p-2 hover:bg-gray-700 cursor-pointer"
                onClick={handleToHistory}
              >
                <FaHistory size={14} />
                <span className="text-sm">History</span>
              </div>
              <div
                className="flex items-center gap-3 p-2 hover:bg-red-600 cursor-pointer"
                onClick={handleLogout}
              >
                <CiLogout size={14} />
                <span className="text-sm">Logout</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Audit Selection Tabs - Stack on mobile, row on desktop */}
      <div className="flex gap-2 my-2 md:my-0 w-full md:w-auto justify-center">
        <button
          className={`px-2 py-1 md:px-4 md:py-2 text-xs md:text-base font-bold shadow-md ${
            activeAudit === 'short' ? 'bg-blue-500' : 'bg-gray-700'
          }`}
          onClick={() => {
            setActiveAudit('short');
            setActiveIndex(0);
          }}
        >
          SHORT FORM
        </button>
        <button
          className={`px-2 py-1 md:px-4 md:py-2 text-xs md:text-base font-bold shadow-md ${
            activeAudit === 'long' ? 'bg-blue-500' : 'bg-gray-700'
          }`}
          onClick={() => {
            setActiveAudit('long');
            setActiveIndex(0);
          }}
        >
          LONG FORM
        </button>
      </div>

      {/* Payment & Audit Count Info - Row on mobile, part of right section on desktop */}
      <div className="flex gap-2 w-full md:w-auto justify-center md:justify-end">
        {paymentDetails && (
          <div className="p-1 md:p-2 bg-white text-[#000] text-xs md:text-base font-bold">
            £{paymentDetails.amount}
          </div>
        )}
        <div className="p-1 md:p-2 bg-white text-[#000] text-xs md:text-base font-bold">
          {seasonCount} of {seasonCount} Audit{seasonCount > 1 ? 's' : ''} Left
        </div>
        
        {/* User Dropdown - Desktop Only */}
        <div className="hidden md:relative md:flex" ref={dropdownRef}>
          <div
            className="flex items-center gap-2 cursor-pointer ml-2"
            onClick={() => setDropdownOpen(prev => !prev)}
          >
            <p className="text-sm md:text-base font-bold hidden md:block">{name}</p>
            <FaUserCircle size={24} />
            {dropdownOpen ? <FaChevronDown /> : <FaChevronRight />}
          </div>

          {/* Desktop Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-8 w-44 bg-gray-900 text-white rounded-md shadow-lg overflow-hidden z-40">
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
                onClick={handleLogout}
              >
                <CiLogout />
                <span>Logout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockAuditHeader;