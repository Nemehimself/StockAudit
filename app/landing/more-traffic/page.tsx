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
      text: 'Motivates users to take meaningful actions.',
      svg: pointsImg,
    },
    {
      text: 'Drives more visibility for your key pages or posts.',
      svg: excitement,
    },
    {
      text: 'Converts visitors into long-term customers.',
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
            Drive More Traffic: Actions That Deliver Results
            <p className="text-3xl"></p>
          </h1>
          <div
            className={`w-[35rem] rounded min-h-fit text-sm my-3 leading-relaxed `}
          >
            <h4 className="font-medium text-lg">Traffic That Works for You</h4>
            Use Mcom’s point-based system to drive traffic to your landing
            pages, blogs, or promotions. Reward users with points for actions
            like clicking, signing up, or engaging with your content – turning
            visits into conversions.
          </div>
          <PriceBtn />
        </header>
        <div className="bg-white h-[25rem] flex items-center p-3">
          <Image src={pointsImg} alt="early access image" width={500} />
        </div>
      </div>
      <CallToAction />
      <PageInfo
        headerText="Why it works:
"
        infoData={benefitData}
        foot="Turn clicks into conversions with Mcom’s traffic-driving rewards system."
      />
      <CallToAction />
      <Footer />
    </section>
  );
};

export default Page;
