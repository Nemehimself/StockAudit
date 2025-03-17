'use client';

import Image from 'next/image';
import React from 'react';
import whatIs from '../../../../public/homepage/rb_3027.png';
import { useInView } from 'react-intersection-observer';
import SectionHeading from '../common/SectionHeading';

const About = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger the animation only once
    threshold: 0.1, // Trigger when 10% of the component is in view
  });

  return (
    <section className="mt-5 lg:px-[15rem]">
      <SectionHeading text={'What is Mcom Bot?'} />
      <div className="flex flex-col sm:flex-row  justify-center gap-1 sm:gap-3">
        <Image
          ref={ref}
          src={whatIs}
          alt="What is Mcom Bot"
          loading="lazy"
          className={`w-[20rem] sm:w-[20rem] ${
            inView ? 'animate-slide-in-left' : ''
          }`}
        />
        <p className="sm:text-2xl text-left sm:font-medium leading-relaxed px-3 py-4 mt-3">
          Mcom Bot is an innovative platform designed to help local businesses
          connect, collaborate, and thrive together. By creating a network of
          high-street partnerships, Mcom Bot enables you to boost sales, share
          customer bases, and drive collective growth
        </p>
      </div>
    </section>
  );
};

export default About;
