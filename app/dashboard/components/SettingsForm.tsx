'use client';

import { updateCampaignField } from '@/store/features/campaign';
import { RootState } from '@/store/store';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ToolTip from './ToolTip';

type SubTab = 'EARNPOINTS' | 'REDEEMREWARDS';

const SettingsForm: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('EARNPOINTS');

  const {
    earnEnterCode,
    earnGiveStaffNumber,
    earnStaffPersonalCode,
    earnStaffScanQR,
    redeemGiveStaffNumber,
    redeemStaffPersonalCode,
    redeemStaffScanQR,
  } = useSelector((state: RootState) => state.campaing);

  const dispatch = useDispatch();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    dispatch(updateCampaignField({ [name]: checked }));
  };

  const earnOptions = [
    {
      label: 'Staff members scan QR code',
      name: 'earnStaffScanQR',
      value: earnStaffScanQR,
    },
    {
      label: 'Customers enter code generated by staff',
      name: 'earnEnterCode',
      value: earnEnterCode,
    },
    {
      label: "Staff member enters personal code on customer's device",
      name: 'earnStaffPersonalCode',
      value: earnStaffPersonalCode,
    },
    {
      label: 'Customer gives customer number to staff member',
      name: 'earnGiveStaffNumber',
      value: earnGiveStaffNumber,
    },
  ];

  const redeemOptions = [
    {
      label: 'Staff members scan QR code',
      name: 'redeemStaffScanQR',
      value: redeemStaffScanQR,
    },
    {
      label: "Staff member enters personal code on customer's device",
      name: 'redeemStaffPersonalCode',
      value: redeemStaffPersonalCode,
    },

    {
      label: 'Customer gives customer number to staff member',
      name: 'redeemGiveStaffNumber',
      value: redeemGiveStaffNumber,
    },
  ];

  return (
    <div>
      {/* Sub-tabs */}
      <p className="mb-2">
        Settings how customers will interact with this campaign. How they earn
        and redeem points.
      </p>
      <div className="flex text-sm border-b border-gray-300 mb-4 p-2 gap-4 bg-gray-100 shadow-lg rounded-lg">
        {(['EARNPOINTS', 'REDEEMREWARDS'] as SubTab[]).map(tab => (
          <div
            key={tab}
            className={`px-4 py-2 cursor-pointer font-semibold ${
              activeSubTab === tab
                ? 'text-[#2D3DFF] font-bold'
                : 'text-gray-500 '
            }`}
            onClick={() => setActiveSubTab(tab)}
          >
            {tab === 'EARNPOINTS' ? 'EARN POINTS' : 'REDEEM REWARDS'}
          </div>
        ))}
      </div>

      {activeSubTab === 'EARNPOINTS' && (
        <div>
          <p className="mb-2 text-gray-700 flex items-center gap-1">
            How can customers earn points?
            <ToolTip content="This is the settings to specify the methods customers can use to earn points." />
          </p>
          {earnOptions.map((option, index) => {
            const { label, name, value } = option;
            return (
              <div key={index} className="flex items-center mt-2">
                <input
                  type="checkbox"
                  id={`earn-${index}`}
                  className="mr-2"
                  name={name}
                  checked={value}
                  onChange={handleInputChange}
                />
                <label htmlFor={name}>{label}</label>
              </div>
            );
          })}
        </div>
      )}

      {activeSubTab === 'REDEEMREWARDS' && (
        <div>
          <p className="mb-2 text-gray-700 flex items-center gap-1">
            How can customers redeem rewards?
            <ToolTip content="This is the settings to specify the methods customers can use to redeem earned points." />
          </p>
          {redeemOptions.map((option, index) => {
            const { label, name, value } = option;
            return (
              <div key={index} className="flex items-center mt-2">
                <input
                  type="checkbox"
                  id={`redeem-${index}`}
                  className="mr-2"
                  name={name}
                  checked={value}
                  onChange={handleInputChange}
                />
                <label htmlFor={name}>{label}</label>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SettingsForm;
