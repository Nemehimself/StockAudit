'use client';

import { RootState } from '@/store/store';
import React from 'react';
import { useSelector } from 'react-redux';

const HomeSection: React.FC<{
  headerText?: string;
  description?: string;
}> = ({ headerText, description }) => {
  const { homeText, homeTitle, secondaryBg, secondaryText } = useSelector(
    (state: RootState) => state.campaing
  );
  return (
    <section
      className=" bg-[#0D47A1] text-white min-h-[16rem] flex flex-col justify-center space-y-4 pl-[4rem]"
      style={{ backgroundColor: secondaryBg, color: secondaryText }}
    >
      <div className="flex flex-col justify-center space-y-3 w-[40%]">
        <h2 className="text-4xl">{headerText || homeText}</h2>
        <p className="text-xl">{description || homeTitle}</p>
      </div>
    </section>
  );
};

export default HomeSection;
