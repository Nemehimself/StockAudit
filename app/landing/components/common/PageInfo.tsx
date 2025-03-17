import React from 'react';
import SectionHeading from '../common/SectionHeading';
import Image, { StaticImageData } from 'next/image';

export interface info {
  text: string;
  svg: StaticImageData;
}
interface pageInfoProps {
  infoData: info[];
  headerText: string;
  foot?: string;
}

export interface HowToStepProps extends info {
  reversed: boolean;
  index: number;
}

export const HowToStep: React.FC<HowToStepProps> = ({
  svg,
  text,
  reversed,
  index,
}) => {
  return (
    <section className="flex flex-col">
      <div
        className={`flex ${
          reversed ? 'sm:flex-row-reverse' : 'sm:flex-row'
        } gap-[3rem] sm:gap-[10rem] flex-col items-center justify-center animate-slide-in-left`}
      >
        <div className="relative rounded-3xl w-[15rem] h-[15rem] sm:w-[25rem] sm:h-[25rem] ">
          <Image
            src={svg}
            alt="sign up svg"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <p className="bg-stepBlue  p-3 sm:p-5 rounded-3xl  text-xl sm:text-2xl text-stepBlueText font-medium leading-relaxed sm:w-[20rem]">
          <p
            className={`bg-stepBlue w-fit px-2 my-2 rounded-full font-medium text-stepBlueText text-sm   ${
              reversed ? 'self-end' : 'self-start'
            }`}
          >
            {`Point ${index + 1}`}
          </p>
          {text}
        </p>
      </div>
    </section>
  );
};

const PageInfo: React.FC<pageInfoProps> = ({ infoData, headerText, foot }) => {
  return (
    <div className="bg-white w-full py-5">
      <SectionHeading text={headerText} />

      <div className="sm:px-[25rem] px-4 flex flex-col items-center justify-center gap-3 sm:gap-[3rem]  ">
        {infoData.map((item, i) => {
          return (
            <HowToStep
              key={i}
              text={item.text}
              svg={item.svg}
              reversed={(i + 1) % 2 === 0}
              index={i}
            />
          );
        })}
      </div>

      {foot && <h3 className="text-center text-5xl py-5">{foot}</h3>}
    </div>
  );
};

export default PageInfo;
