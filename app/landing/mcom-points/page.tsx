import React from 'react';
import pointsImg from '../../../public/homepage/points/points.svg';
import Image from 'next/image';
import CallToAction from '../components/homepage/CallToAction';
import styles from './page.module.css';
import Footer from '../components/common/Footer';
import PriceBtn from '../components/buttons/PriceBtn';
import PageInfo, { info } from '../components/common/PageInfo';

import excitement from '../../../public/homepage/giveaway/excitement.svg';

import stamp from '../../../public/homepage/points/stamp.svg';

const Page = () => {
  const benefitData: info[] = [
    {
      text: 'Points: Customers earn points for purchases, referrals, and other interactions, which they can redeem for exclusive rewards or discounts.',
      svg: pointsImg,
    },
    {
      text: 'Badges: Celebrate milestones like first purchases, frequent visits, or special achievements with collectible badges that customers can proudly display.',
      svg: excitement,
    },
    {
      text: 'Stamps: Encourage consistency by offering stamps for repeat actions, allowing customers to unlock unique perks when they fill their virtual stamp card.',
      svg: stamp,
    },
  ];

  return (
    <section className="w-full">
      <div
        className={`w-full h-[calc(80vh-4rem)] ${styles['container']} bg-center bg-opacity-70 text-black bg-cover flex items-center justify-center px-[5rem] gap-10 opacity-90 `}
      >
        <header className="w-[40rem]">
          <h1 className="text-[2rem] font-medium ">
            Mcom Points, Badges, and Stamps: Reward Every Step of the Journey
            <p className="text-3xl"></p>
          </h1>
          <div
            className={`w-[35rem] rounded min-h-fit text-sm my-3 leading-relaxed `}
          >
            <h4 className="font-medium text-lg">
              Turn Everyday Actions into Meaningful Rewards
            </h4>
            Mcom Points, Badges, and Stamps are designed to make every
            interaction with your brand exciting and rewarding. By gamifying the
            shopping experience, you keep your customers engaged, motivated, and
            coming back for more.
          </div>
          <PriceBtn />
        </header>
        <div className="bg-white h-[25rem] flex items-center p-3">
          <Image src={pointsImg} alt="early access image" width={500} />
        </div>
      </div>
      <CallToAction />
      <PageInfo
        headerText="Benefits"
        infoData={benefitData}
        foot="With Mcom Points, Badges, and Stamps, every action counts – for your customers and your business"
      />
      <CallToAction />
      <Footer />
    </section>
  );
};

export default Page;
