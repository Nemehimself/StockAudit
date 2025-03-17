'use client';

import React, { useEffect, useState } from 'react';
import logo from '../../../public/campaign/logo.png';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const Navbar = () => {
  const { topTitle, topHeadline, primaryBg, primaryText } = useSelector(
    (state: RootState) => state.campaing
  );

  const [campaignCode, setCampaignCode] = useState('');

  useEffect(() => {
    const code = localStorage.getItem('currentCampaign') || '';
    setCampaignCode(code);
  }, []);

  const navItems = [
    { name: 'Dashboard', link: `/staff/${campaignCode}` },
    { name: 'Points', link: '/staff/points' },
    { name: 'Reward', link: '/staff/reward' },
  ];
  return (
    <nav
      className="flex justify-around font-medium  items-center h-[6rem] w-full"
      style={{ backgroundColor: primaryBg, color: primaryText }}
    >
      <div className="flex gap-4 items-center">
        <Image src={logo} alt="logo" className="w-[5rem]" />
        <span>
          <h1>{topTitle}</h1>
          <h3>{topHeadline}</h3>
        </span>
      </div>
      <div className="h-full">
        <ul className="flex justify-around gap-6 h-full">
          {navItems.map((item, i) => {
            return (
              <Link key={i} href={item.link}>
                <li className="h-full flex items-center justify-center px-2 hover:bg-[#1A1A1A]">
                  {item.name.toUpperCase()}
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
