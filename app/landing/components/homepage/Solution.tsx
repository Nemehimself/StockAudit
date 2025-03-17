import React from 'react';
import FlipCard from '../common/FlipCard';
import SectionHeading from '../common/SectionHeading';

const Solution = () => {
  const solutions: string[] = [
    'Cafes',
    'Restaurants',
    'Education',
    'Services',
    'Medicine and Health',
    'Messages',
    'Hair Saloon',
    'Fitness Center',
    'Small Business',
    'Bakeries',
    'Children',
    'Wellness Centers',
  ];
  return (
    <section className="bg-white py-6 max-w-full">
      <SectionHeading text="MCom Bot - Perfect for all retail businesses" />
      <div className="max-w-full mt-6 flex overflow-x-auto px-[3rem] scrollbar-hide">
        {solutions.map((item, i) => {
          return <FlipCard key={i} title={item} />;
        })}
      </div>
    </section>
  );
};

export default Solution;
