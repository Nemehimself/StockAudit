import React from 'react';
import signup from '../../../../public/homepage/signupBanner.svg';
import Image from 'next/image';
import { SolidBtn } from '../buttons/solidButton';

const ActionBanner = () => {
  return (
    <section className="w-[full] flex items-center justify-center bg-white py-6">
      <div className="w-[90%] md:w-[75%] bg-primaryBlue flex flex-col py-5 md:py-0 px-3 lg:flex-row justify-around items-center rounded-3xl">
        <span className="flex flex-col items-center sm:items-start gap-4">
          <h3 className="text-xl sm:text-3xl font-semibold text-white">
            Access your Mcom Ecom V card Bot
          </h3>
          <SolidBtn hoverBgColor="bg-dangerRed" bgColor="bg-lighterRed">
            <p className="text-base">Get started</p>
          </SolidBtn>
        </span>

        <Image
          src={signup}
          alt="sign up"
          className="w-[15rem] h-[15rem] md:w-[30rem] md:h-[30rem]"
        />
      </div>
    </section>
  );
};

export default ActionBanner;
