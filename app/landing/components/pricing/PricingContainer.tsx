import { PaidVersion } from '@/app/interfaces/versions.enum';
import React from 'react';
import TypeBox from './TypeBox';
import { bgColors } from '@/lib/colors/pricing';

const PricingContainer = () => {
  const category = [
    { name: PaidVersion.FREE, price: 1 },
    {
      name: PaidVersion.PRO,
      price: 10,
    },
    {
      name: PaidVersion.PROPLUS,
      price: 20,
    },
  ];

  return (
    <div className=" flex flex-col md:flex-row gap-3 mt-5">
      {category.map((item, i) => {
        return (
          <TypeBox
            name={item.name}
            price={item.price}
            key={i}
            bgColor={bgColors[i]}
          />
        );
      })}
    </div>
  );
};

export default PricingContainer;
