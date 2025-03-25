'use client';

import React, { useEffect, useState } from 'react';
import { CiLogin } from 'react-icons/ci';
import AuthModal from '../components/AuthModal';

interface HeaderType {
  modalOpen: boolean;
  setModalOpen: (val: boolean) => void;
}

const Header: React.FC<HeaderType> = ({ modalOpen, setModalOpen }) => {
  const [name, setName] = useState<string | null>('');

  useEffect(() => {
    const name = localStorage.getItem('username');
    setName(name);
  }, [name]);

  return (
    <header className="bg-blue-700 text-white py-4 px-6 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">MCOM Stock Audit Solutions</h1>
      {!name ? (
        <button
          className="flex gap-4 justify-around items-center font-bold bg-slate-800 text-white px-4 py-2 rounded-lg shadow"
          onClick={() => setModalOpen(true)}
        >
          Sign In <CiLogin className="w-6 h-6" />
        </button>
      ) : (
        <p className="font-medium text-lg">Welcome, {name}</p>
      )}
      <AuthModal isOpen={modalOpen} closeModal={() => setModalOpen(false)} />
    </header>
  );
};

export default Header;
