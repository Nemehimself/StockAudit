'use client';

import { getCookieValue } from '@/services/getCookieValue';
import { useGetCampaignPoints } from '@/services/hooks/reward/hook';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { MdOutlineControlPointDuplicate } from 'react-icons/md';
import { useSelector } from 'react-redux';

const LoginBtn = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push('/campaign/login');
  };

  return (
    <button
      className="bg-[#f5f5f5] font-medium h-[3rem] w-full rounded-md shadow-md hover:bg-[#e0e0e0]"
      onClick={handleClick}
    >
      LOGIN TO REDEEM
    </button>
  );
};

const RewardBtn: React.FC<{
  text: string;
  disableBtn: boolean;
  handleClick: () => void;
}> = ({ text, disableBtn, handleClick }) => {
  return (
    <button
      className="bg-[#f5f5f5] font-medium h-[3rem] w-full rounded-md shadow-md hover:bg-[#e0e0e0]"
      disabled={disableBtn}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

const RewardCard: React.FC<{ handleClick: () => void }> = ({ handleClick }) => {
  const [campaignId, setCampaignId] = useState<string>('');
  const [disableBtn, setDisableBtn] = useState<boolean>(true);
  const [rewardBtnText, setRewardBtnText] = useState<string>('');

  useEffect(() => {
    const campaignId = localStorage.getItem('campaignId');
    setCampaignId(campaignId ?? '');
  }, []);

  const { reward } = useSelector((state: RootState) => state.campaing);
  const token = getCookieValue('customerToken');
  const { isSuccess, data } = useGetCampaignPoints(campaignId);

  let totalPoints = 0;
  if (isSuccess) {
    data?.forEach(point => (totalPoints += +point.points));
  }

  const pointCost = reward?.pointCost;

  useEffect(() => {
    if (pointCost && +pointCost > totalPoints) {
      setRewardBtnText(
        `You need ${+pointCost - totalPoints} more points to redeem this reward`
      );
      setDisableBtn(true);
    } else {
      setRewardBtnText('REDEEM');
      setDisableBtn(false);
    }
  }, [pointCost, totalPoints]); // Only run when pointCost or totalPoints changes

  return (
    <section>
      <div className="bg-white p-5 rounded-lg shadow-md w-[430px] flex flex-col gap-4">
        <div>
          <h2>{reward?.title}</h2>
          <span className="flex items-center gap-2">
            <MdOutlineControlPointDuplicate />
            <p>{reward?.pointCost}</p>
          </span>
        </div>

        {!token ? (
          <LoginBtn />
        ) : (
          <RewardBtn
            text={rewardBtnText}
            handleClick={handleClick}
            disableBtn={disableBtn}
          />
        )}
        <p className="leading-relaxed text-opacity-80">{reward?.description}</p>
      </div>
    </section>
  );
};
export default RewardCard;
