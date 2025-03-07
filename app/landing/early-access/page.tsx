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
      text: 'Builds anticipation and excitement.',
      svg: anticipation,
    },
    {
      text: 'Encourages active participation and brand loyalty.',
      svg: participation,
    },
    {
      text: 'Rewards actions that directly contribute to growth.',
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
            Mcom Early Access:
            <p className="text-3xl">Build Excitement, Boost Engagement.</p>
          </h1>
          <div
            className={`w-[30rem] rounded min-h-fit text-sm my-3 leading-relaxed `}
          >
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
        headerText={"Why it's effective?"}
        infoData={effects}
        foot="Get your audience involved and excited with Early Access campaigns.
"
      />
      <CallToAction />
      <Footer />
    </section>
  );
};

export default Page;
