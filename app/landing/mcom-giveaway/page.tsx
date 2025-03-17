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
      text: 'Rapidly grow your email list or user base.',
      svg: grow,
    },
    {
      text: 'Create buzz and excitement around your brand.',
      svg: excitement,
    },
    {
      text: 'Engage new and existing customers with minimal cost.',
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
            Mcom Giveaways: Attract Signups, Effortlessly
            <p className="text-3xl"></p>
          </h1>
          <div
            className={`w-[35rem] rounded min-h-fit text-sm my-3 leading-relaxed `}
          >
            <h4 className="font-medium text-lg">
              Incentivize and grow your business Accelerate your signup rate
            </h4>
            without breaking the bank! Mcom Giveaways allow you to attract new
            leads by offering cost-effective prizes that excite your audience
            while keeping expenses minimal.
          </div>
          <PriceBtn />
        </header>
        <div className="bg-white h-[25rem] flex items-center p-3">
          <Image src={giveAway} alt="early access image" width={500} />
        </div>
      </div>
      <CallToAction />
      <PageInfo
        headerText="Benefits"
        infoData={benefitData}
        foot="Turn simple incentives into massive results with Mcom Giveaways."
      />
      <CallToAction />
      <Footer />
    </section>
  );
};

export default Page;
