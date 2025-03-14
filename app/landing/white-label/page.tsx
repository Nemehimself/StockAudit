import Image from 'next/image';
import React from 'react';
import whiteLabelHero from '../../../public/homepage/white-label/white-label-hero.svg';
import { MdCardTravel } from 'react-icons/md';
import { TbDeviceDesktopAnalytics } from 'react-icons/tb';
import { FaScaleBalanced } from 'react-icons/fa6';
import { IconType } from 'react-icons';
import styles from './white-label.module.css';
import CallToAction from '../components/homepage/CallToAction';
import PriceBtn from '../components/buttons/PriceBtn';
import Footer from '../components/common/Footer';
import ActionBanner from '../components/homepage/ActionBanner';
import Solution from '../components/homepage/Solution';
import Features from '../components/homepage/Features';
import { HowTo } from '../components/homepage/How';
import SetupAction from '../components/homepage/SetupAction';
import PageInfo from '../components/common/PageInfo';
import signUp from '../../../public/homepage/signup.svg';
import collaborate from '../../../public/homepage/collaboaration.svg';
import revenue from '../../../public/homepage/revenue.svg';

interface featureCardProp {
  title: string;
  description: string;
  icon: IconType;
}

const featureItems: featureCardProp[] = [
  {
    title: 'Custom Branding',
    description:
      "Personalize the chatbot with your company's logo, colors, and design elements to ensure a seamless brand experience.",
    icon: MdCardTravel,
  },
  {
    title: 'Comprehensive Analytics',
    description:
      'Gain insights into customer interactions with detailed analytics, helping you make informed business decisions.',
    icon: TbDeviceDesktopAnalytics,
  },
  {
    title: 'Scalability',
    description:
      'Our solution grows with your business, allowing you to manage increasing customer interactions effortlessly',
    icon: FaScaleBalanced,
  },
];

const FeatureCard: React.FC<featureCardProp> = ({
  title,
  description,
  icon: Icon,
}) => {
  return (
    <div className="w-[17rem] ">
      <Icon className="text-3xl " />
      <div className="text-[#576071]">
        <h3 className="font-medium">{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

const Page = () => {
  const HowToData: HowTo[] = [
    {
      text: 'Join the Platform: Sign up and become part of a community of like-minded businesses on your high street.',
      svg: signUp,
    },
    {
      text: 'Collaborate: Partner with other businesses to create joint promotions, loyalty programs, and cross-referral opportunities.',
      svg: collaborate,
    },
    {
      text: 'Increase foot traffic, enhance customer engagement and see your revenue soar.',
      svg: revenue,
    },
  ];

  return (
    <div className="max-w-full flex flex-col">
      <header
        className={`py-[3rem] px-3 flex justify-center items-center md:min-h-[calc(100vh-4rem)] ${styles['pricing-background']}`}
      >
        <div className="hidden md:inline h-fit w-fit ">
          <Image
            src={whiteLabelHero}
            alt="Introducing Mcom Bot White Label- News"
            className="max-h-[35rem]"
          />
        </div>

        <div className="md:w-[70rem]">
          <h2 className="text-[2rem] md:text-[5rem] font-light leading-tight">
            Introducing Mcom Bot White Label- News
          </h2>
          <p className="md:text-xl my-5">
            A comprehensive solution that empowers your business with a fully
            branded <span className="font-medium">AI chatbot platform</span>.
            Enhance customer{' '}
            <span className="font-medium">
              engagement, streamline operations, and elevate your brand identity
              with our customizable services.
            </span>
          </p>

          <section className="flex flex-col sm:flex-row justify-center md:justify-start items-center md:items-start gap-3 mt-7">
            {featureItems.map((item, i) => {
              return (
                <FeatureCard
                  title={item.title}
                  description={item.description}
                  icon={item.icon}
                  key={i}
                />
              );
            })}
          </section>
          <div className="my-3">
            <PriceBtn />
          </div>
        </div>
      </header>
      <SetupAction />
      <PageInfo headerText="How It Works" infoData={HowToData} />
      <CallToAction />
      <Features />
      <Solution />
      <CallToAction />
      <ActionBanner />
      <Footer />
    </div>
  );
};

export default Page;
