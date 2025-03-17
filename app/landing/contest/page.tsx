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
      text: 'Drives user engagement and loyalty.',
      svg: anticipation,
    },
    {
      text: 'Turns customers into advocates for your business.',
      svg: participation,
    },
    {
      text: 'Increases visibility and brand awareness.',
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
            Mcom Contests: Spark Excitement, Drive Growth:
            {/* <p className="text-3xl">Build Excitement, Boost Engagement.</p> */}
          </h1>
          <div
            className={`w-[30rem] rounded min-h-fit text-sm my-3 leading-relaxed `}
          >
            <h4 className="font-medium text-lg">
              Fuel Competition, Boost Your Business
            </h4>
            Imagine your customers actively competing to grow your brand! With
            Mcom Contests, you can set up challenges where users engage in
            friendly competition – whether it’s referrals, purchases, or social
            shares – to win exciting rewards.
          </div>
          <PriceBtn />
        </header>
        <Image src={earlyAccess} alt="early access image" width={500} />
      </div>
      <CallToAction />
      <PageInfo
        headerText={'Why It Works'}
        infoData={effects}
        foot="Start a contest today and watch your customers turn into passionate promoters!"
      />
      <CallToAction />
      <Footer />
    </section>
  );
};

export default Page;
