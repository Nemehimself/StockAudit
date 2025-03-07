import React from 'react';
import earlyAccess from '../../../public/homepage/early-access/undraw_testimonials_4c7y.png';
import Image from 'next/image';
import CallToAction from '../components/homepage/CallToAction';
import styles from './page.module.css';
import Footer from '../components/common/Footer';
import PriceBtn from '../components/buttons/PriceBtn';
import PageInfo from '../components/common/PageInfo';

import anticipation from '../../../public/homepage/early-access/anticipation.svg';
import participation from '../../../public/homepage/early-access/participation.svg';
import reward from '../../../public/homepage/early-access/reward.svg';

const Page = () => {
  const effects = [
    {
      text: 'Appeals to value-conscious shoppers.',
      svg: anticipation,
    },
    {
      text: 'Boosts sales while managing inventory.',
      svg: participation,
    },
    {
      text: 'Encourages repeat business with real savings.',
      svg: reward,
    },
  ];

  return (
    <section className="w-full">
      <div
        className={`w-full h-[calc(80vh-4rem)] ${styles['container']} bg-center bg-opacity-70 text-black bg-cover flex items-center justify-center gap-20 px-[5rem] opacity-90 `}
      >
        <header>
          <h1 className="text-[4rem] font-medium ">
            Mcom Cashback Campaigns:
            <p className="text-3xl"> Spend, Save, and repeat the process</p>
          </h1>
          <div
            className={`w-[30rem] rounded min-h-fit text-sm my-3 leading-relaxed `}
          >
            <h4 className="font-medium text-lg">Cashback That Drives Sales</h4>
            Create a buzz around your next release with Mcom Early Access.
            Reward users with exclusive previews, deals, or perks in exchange
            for actions that directly grow your business, like referrals,
            shares, or signups.
          </div>
          <PriceBtn />
        </header>
        <Image src={earlyAccess} alt="early access image" width={500} />
      </div>
      <CallToAction />
      <PageInfo
        headerText={'What Makes it Effective?'}
        infoData={effects}
        foot="Offer unbeatable value and drive repeat purchases with Mcom Cashback Campaigns."
      />
      <CallToAction />
      <Footer />
    </section>
  );
};

export default Page;
