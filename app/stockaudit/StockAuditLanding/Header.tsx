// Header.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { CiLogin } from 'react-icons/ci';
import { RiMenu3Line } from 'react-icons/ri';
import { IoMdClose } from 'react-icons/io';
import AuthModal from '../components/AuthModal';
import { getCookieValue } from '@/services/getCookieValue';

interface HeaderType {
  modalOpen: boolean;
  setModalOpen: (val: boolean) => void;
}

const Header: React.FC<HeaderType> = ({ modalOpen, setModalOpen }) => {
  const [name, setName] = useState<string | null>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = getCookieValue('token');
    if (!token) return;
    const name = localStorage.getItem('username');
    setName(name);
  }, [name]);

  return (
    <header className="bg-blue-700 text-white py-3 md:py-4 px-4 md:px-6 flex justify-between items-center shadow-md">
      <h1 className="text-lg md:text-xl font-bold">MCOM Stock Audit Solutions</h1>
      
      {/* Mobile menu button */}
      <div className="md:hidden">
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white focus:outline-none">
          {mobileMenuOpen ? 
            <IoMdClose className="w-6 h-6" /> : 
            <RiMenu3Line className="w-6 h-6" />
          }
        </button>
      </div>
      
      {/* Desktop view */}
      <div className="hidden md:block">
        {!name ? (
          <button
            className="flex gap-2 justify-around items-center font-bold bg-slate-800 text-white px-4 py-2 rounded-lg shadow"
            onClick={() => setModalOpen(true)}
          >
            Sign In <CiLogin className="w-5 h-5" />
          </button>
        ) : (
          <p className="font-medium text-lg">Welcome, {name}</p>
        )}
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="absolute top-14 right-0 left-0 bg-blue-600 shadow-md z-50 md:hidden">
          <div className="p-4 flex justify-center">
            {!name ? (
              <button
                className="flex gap-2 w-full justify-center items-center font-bold bg-slate-800 text-white px-4 py-2 rounded-lg shadow"
                onClick={() => {
                  setModalOpen(true);
                  setMobileMenuOpen(false);
                }}
              >
                Sign In <CiLogin className="w-5 h-5" />
              </button>
            ) : (
              <p className="font-medium text-lg">Welcome, {name}</p>
            )}
          </div>
        </div>
      )}
      
      <AuthModal isOpen={modalOpen} closeModal={() => setModalOpen(false)} />
    </header>
  );
};

export default Header;