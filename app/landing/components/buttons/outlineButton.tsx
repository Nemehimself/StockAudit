'use client';

import { IOutlineButton } from '@/app/interfaces/buttons';
import React from 'react';

const OutlineButton: React.FC<IOutlineButton> = ({ children }) => {
  return (
    <div
      className={`border rounded-lg min-w-[5rem] w-fit text-center py-2 px-3 font-semibold shadow cursor-pointer hover:text-white border-primary text-primary hover:bg-primary flex items-center gap-3`}
    >
      {children}
    </div>
  );
};

export default OutlineButton;
