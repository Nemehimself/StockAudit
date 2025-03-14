import React from 'react';
import { SolidBtn } from '../buttons/solidButton';

const CallToAction = () => {
  return (
    <section className="w-full text-wrap bg-blue-600 flex flex-col sm:flex-row justify-around items-center py-3 px-3">
      <div className="bg-blue-600 text-white py-3 flex flex-col  justify-around gap-1 sm:text-left">
        <h3 className="text-2xl sm:text-4xl ">Join Mcom Bot Today</h3>
        <h4 className="sm:text-2xl drop-shadow-md ">
          Be part of a growing community of local businesses working smarter,
          not harder.
        </h4>
        <h5 className="sm:text-xl">
          {"Let's make your high street thrive together!"}
        </h5>
      </div>
      <SolidBtn bgColor="bg-lighterRed" hoverBgColor="bg-darkRed">
        Sign up now
      </SolidBtn>
    </section>
  );
};

export default CallToAction;
