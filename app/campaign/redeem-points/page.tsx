'use client';

import React, { useEffect } from 'react';
import HomeSection from '../components/HomeSection';
import RewardCard from '../components/RewardCard';
import RewardSection from '../components/RewardSection';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation';
import { getCookieValue } from '@/services/getCookieValue';

const Page = () => {
  const [showRewardMethods, setShowRewardMethods] = React.useState(false);

  const { redeemText, redeemTitle } = useSelector(
    (state: RootState) => state.campaing
  );

  const router = useRouter();

  useEffect(() => {
    const token = getCookieValue('customerToken');
    if (!token) router.push('/campaign/login');
  }, [router]);

  const handleShowRewardMethods = () => {
    setShowRewardMethods(true);
  };

  return (
    <div>
      <HomeSection
        headerText={redeemTitle || 'Earn Points'}
        description={redeemText || 'Get points for every dollar you spend.'}
      />
      <div className="w-full px-[10rem] mt-7">
        {!showRewardMethods ? (
          <RewardCard handleClick={handleShowRewardMethods} />
        ) : (
          <RewardSection />
        )}
      </div>
    </div>
  );
};

export default Page;
