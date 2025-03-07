import Image from 'next/image';
import React from 'react';
import businessOwner from '../../../../public/homepage/business-owner.jpg';

const Block1 = () => {
  return (
    <section className="flex flex-col lg:flex-row gap-6 py-7 px-[1rem] lg:px-[15rem] h-fit bg-white">
      <Image
        src={businessOwner}
        alt="business owner"
        className=" w-full h-[17rem] md:w-[15rem] md::h-[37rem]"
        loading="lazy"
      />
      <div className="flex flex-col gap-2 lg:w-3/6 mt-[1rem] lg:ml-[3.2rem] lg:mt-[3rem] text-center lg:text-left">
        <h2 className="font-semibold text-xl lg:text-3xl mt-5">
          Mcom Bot: Revolutionize Your Sales Through Local Collaboration
        </h2>
        <p className="lg:text-2xl ">
          Empowering business owners to increase revenue by building powerful
          partnerships with neighboring businesses on their high street.
        </p>
      </div>
    </section>
  );
};

export default Block1;
