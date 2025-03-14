'use client';

import React from 'react';
import HomeSection from './components/HomeSection';
import CampaignSection from './components/CampaignSection';

const Page = () => {
  return (
    <div className="w-full ">
      <HomeSection
        headerText="Rewards"
        description="Earn points and choose from these rewards."
      />
      <div className="w-full px-[10rem] mt-7">
        <CampaignSection />
      </div>
    </div>
  );
};

export default Page;
