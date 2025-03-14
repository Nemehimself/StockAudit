'use client';
import React from 'react';
import CampaignContent from './CampaignContent';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const CampaignSection = () => {
  const { reward } = useSelector((state: RootState) => state.campaing);
  return (
    <section>
      <div>
        <h3 className="text-3xl font-medium">Rewards</h3>

        <div className="bg-white w-[17rem] p-2 mt-4 shadow-md hover:bg-slate-300 cursor-pointer">
          <h2 className="text-xl font-medium">{reward?.title}</h2>
          <p
            className="text-ellipsis text-sm overflow-hidden whitespace-nowrap"
            dangerouslySetInnerHTML={{ __html: reward?.description || '' }}
          ></p>
        </div>

        <CampaignContent />
      </div>
    </section>
  );
};

export default CampaignSection;
