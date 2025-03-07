'use client';

import { IRegisterButton, ISolidButton } from '@/app/interfaces/buttons';
import React from 'react';

const SolidButton: React.FC<ISolidButton> = ({ children }) => {
  return (
    <div
      className={`bg-primary rounded-lg min-w-[5rem] w-fit py-2 px-3 text-white font-semibold tracking-wide hover:bg-darkPrimary cursor-pointer`}
    >
      {children}
    </div>
  );
};

interface SolidBtnProps extends ISolidButton {
  bgColor?: string;
  hoverBgColor?: string;
}

export const SolidBtn: React.FC<SolidBtnProps> = ({
  children,
  onClick,
  bgColor = 'bg-primaryBlue',
  hoverBgColor = 'hover:bg-darkPrimary',
}) => {
  return (
    <button
      onClick={onClick}
      className={`${bgColor} rounded-xl min-w-[5rem] w-fit py-2 px-3 text-white font-semibold tracking-wide ${hoverBgColor} cursor-pointer`}
    >
      {children}
    </button>
  );
};

export const RegisterBtn: React.FC<IRegisterButton> = ({
  children,
  onClick,
}) => {
  return (
    <button
      className={`bg-green rounded-lg min-w-[5rem] w-fit py-2 px-3 text-white font-medium tracking-wide hover:bg-darkGreen cursor-pointer`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default SolidButton;
