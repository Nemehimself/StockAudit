'use client';

import React from 'react';
import SectionHeading from '../common/SectionHeading';
import signUp from '../../../../public/homepage/signup.svg';
import collaborate from '../../../../public/homepage/collaboaration.svg';
import revenue from '../../../../public/homepage/revenue.svg';
import Image, { StaticImageData } from 'next/image';
import YouTube from 'react-youtube';

export interface HowTo {
  text: string;
  svg: StaticImageData;
}

export interface HowToStepProps extends HowTo {
  reversed: boolean;
}

export const HowToStep: React.FC<HowToStepProps> = ({
  svg,
  text,
  reversed,
}) => {
  return (
    <div
      className={`flex ${
        reversed ? 'sm:flex-row-reverse' : 'sm:flex-row'
      } gap-[3rem] sm:gap-[10rem] flex-col items-center justify-center animate-slide-in-left`}
    >
      <div className="relative  rounded-3xl w-[15rem] h-[15rem] sm:w-[25rem] sm:h-[25rem] ">
        <Image src={svg} alt="sign up svg" layout="fill" objectFit="contain" />
      </div>
      <p className="bg-stepBlue  p-3 sm:p-10 rounded-3xl  text-xl sm:text-2xl text-stepBlueText font-medium leading-relaxed sm:w-[20rem]">
        {text}
      </p>
    </div>
  );
};

interface YouTubeEmbedProps {
  videoId: string;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ videoId }) => {
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 0,
    },
  };

  return <YouTube videoId={videoId} opts={opts} />;
};

const How = () => {
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
    <section className="bg-white py-[1rem] sm:py-[3rem] px-2 ">
      <SectionHeading text="How It Works" />
      <div className="mt-10 w-full flex items-center justify-center">
        <YouTubeEmbed videoId="G0dzLanYW1E" />
      </div>
      <div className="sm:px-[25rem] px-4 flex flex-col items-center justify-center gap-3 sm:gap-[3rem] mt-[5rem] ">
        {HowToData.map((item, i) => {
          return (
            <HowToStep
              key={i}
              text={item.text}
              svg={item.svg}
              reversed={(i + 1) % 2 === 0}
            />
          );
        })}
      </div>
    </section>
  );
};

export default How;
