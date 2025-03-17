import React from 'react';
import pointsImg from '../../../public/homepage/points/points.svg';
import Image from 'next/image';
import CallToAction from '../components/homepage/CallToAction';
import styles from './page.module.css';
import Footer from '../components/common/Footer';
import PriceBtn from '../components/buttons/PriceBtn';
import PageInfo, { info } from '../components/common/PageInfo';
import win from '../../../public/homepage/discount-reward/win.svg';
import strenght from '../../../public/homepage/discount-reward/strenght.svg';
import inventory from '../../../public/homepage/discount-reward/inventory.svg';

const Page = () => {
  const benefitData: info[] = [
    {
      text: 'Clears inventory while attracting new customers.',
      svg: inventory,
    },
    {
      text: 'Strengthens relationships with local business owners.',
      svg: strenght,
    },
    {
      text: 'Creates a win-win for businesses and consumers.',
      svg: win,
    },
  ];

  return (
    <section className="w-full">
      <div
        className={`w-full h-[calc(80vh-4rem)] ${styles['container']} bg-center bg-opacity-70 text-black bg-cover flex items-center justify-center px-[5rem] gap-10 opacity-90 `}
      >
        <header className="w-[40rem]">
          <h1 className="text-[2rem] font-medium ">
            Mcom Discount Reward Campaigns: Move Stock, Build Relationships
            <p className="text-3xl"></p>
          </h1>
          <div
            className={`w-[35rem] rounded min-h-fit text-sm my-3 leading-relaxed `}
          >
            <h4 className="font-medium text-lg">
              Turn Excess Inventory into Opportunities
            </h4>
            Help local businesses clear excess stock or fill spare capacity by
            running targeted Discount Reward Campaigns. Drive sales while
            creating incredible deals that customers love.
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
        foot="Market smarter with campaigns that deliver value to everyone involved."
      />
      <CallToAction />
      <Footer />
    </section>
  );
};

export default Page;
