import { useGetRewards } from '@/services/hooks/reward/hook';
import { updateCampaignField } from '@/store/features/campaign';
import { RootState } from '@/store/store';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ToolTip from './ToolTip';

const RewardForm: React.FC = () => {
  const { rewardId } = useSelector((state: RootState) => state.campaing);

  const dispatch = useDispatch();

  const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    dispatch(updateCampaignField({ [name]: value }));
  };

  const { data } = useGetRewards();
  return (
    <div className="space-y-6">
      {/* Rewards dropdown */}
      <div>
        <label className=" mb-1 flex items-center gap-2">
          Rewards (required)
          <ToolTip content="Select a reward for this campaign" />
        </label>
        <label className="block text-gray-700 mb-1"></label>
        <select
          className="block w-full p-2 border-b-2 border-[#838383] focus:border-[#2D3DFF] outline-none"
          name="rewardId"
          value={rewardId}
          onChange={handleInputChange}
        >
          <option value="">Select Reward</option>
          {/* Options here */}
          {data &&
            data.map((item, i) => (
              <option value={item.id} key={i}>
                {item.title}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};

export default RewardForm;
