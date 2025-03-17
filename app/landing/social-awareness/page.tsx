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
      text: 'Increased brand visibility on social platforms.',
      svg: pointsImg,
    },
    {
      text: 'Higher engagement with your content.',
      svg: excitement,
    },
    {
      text: 'A loyal audience that feels invested in your success.',
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
            Mcom Social Awareness: Grow Your Reach, Strengthen Your Presence
            <p className="text-3xl"></p>
          </h1>
          <div
            className={`w-[35rem] rounded min-h-fit text-sm my-3 leading-relaxed `}
          >
            <h4 className="font-medium text-lg">Turn Shares into Success</h4>
            Boost your social presence by incentivizing your audience to
            actively share your content and grow your online community. With
            Mcom Social Awareness, every share, like, and comment helps your
            business thrive.
          </div>
          <PriceBtn />
        </header>
        <div className="bg-white h-[25rem] flex items-center p-3">
          <Image src={pointsImg} alt="early access image" width={500} />
        </div>
      </div>
      <CallToAction />
      <PageInfo
        headerText="What You'll Gain"
        infoData={benefitData}
        foot="Make sharing rewarding for your customers and transformative for your business.
"
      />
      <CallToAction />
      <Footer />
    </section>
  );
};

export default Page;
