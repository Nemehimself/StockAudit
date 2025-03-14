import React from 'react';
import giveAway from '../../../public/homepage/giveaway/giveaway.svg';
import Image from 'next/image';
import CallToAction from '../components/homepage/CallToAction';
import styles from './page.module.css';
import Footer from '../components/common/Footer';
import PriceBtn from '../components/buttons/PriceBtn';
import PageInfo, { info } from '../components/common/PageInfo';

import grow from '../../../public/homepage/giveaway/grow.svg';
import excitement from '../../../public/homepage/giveaway/excitement.svg';
import engage from '../../../public/homepage/giveaway/engage.svg';

const Page = () => {
  const benefitData: info[] = [
    {
      text: 'Simple setup and immediate rewards.',
      svg: grow,
    },
    {
      text: 'Tiered structure encourages repeat referrals.',
      svg: excitement,
    },
    {
      text: 'Builds a network of loyal, engaged customers.',
      svg: engage,
    },
  ];

  return (
    <section className="w-full">
      <div
        className={`w-full h-[calc(80vh-4rem)] ${styles['container']} bg-center bg-opacity-70 text-black bg-cover flex items-center justify-center px-[5rem] opacity-90 `}
      >
        <header>
          <h1 className="text-[3rem] font-medium ">
            Refer-a-Friend: Multiply Leads with Tiered Rewards
            <p className="text-3xl"></p>
          </h1>
          <div
            className={`w-[35rem] rounded min-h-fit text-sm my-3 leading-relaxed `}
          >
            <h4 className="font-medium text-lg">Referral Rewards Made Easy</h4>
            With Mcom Refer-a-Friend, you can set up a tiered referral program
            that instantly rewards users for bringing you new leads. The more
            they refer, the more they earn - creating a win-win for everyone!
          </div>
          <PriceBtn />
        </header>
        <div className="bg-white h-[25rem] flex items-center p-3">
          <Image src={giveAway} alt="early access image" width={500} />
        </div>
      </div>
      <CallToAction />
      <PageInfo
        headerText="Key Features?"
        infoData={benefitData}
        foot="Let your customers spread the word while you reap the rewards!"
      />
      <CallToAction />
      <Footer />
    </section>
  );
};

export default Page;
