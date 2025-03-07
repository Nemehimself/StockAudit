import React from 'react';
import { SolidBtn } from '../buttons/solidButton';

const SetupAction = () => {
  return (
    <div className="bg-primaryBlue text-white font-medium text-xl sm:text-2xl md:text-3xl flex flex-col md:flex-row justify-center items-center sm:justify-around py-5">
      <span className="px-2 md:py-0 mb-2 md:mb-0">
        <h3 className="">
          Looking to implement a customer loyalty program for your business?
        </h3>
        <h4 className="">Setup is quick and simple.</h4>
      </span>
      <SolidBtn hoverBgColor="bg-dangerRed" bgColor="bg-lighterRed">
        <p className="text-base">Get started</p>
      </SolidBtn>
    </div>
  );
};

export default SetupAction;
