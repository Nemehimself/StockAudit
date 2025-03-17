'use client';

import { PaidVersion } from '@/app/interfaces/versions.enum';
import { bgColors } from '@/lib/colors/pricing';
import { ComparisonTableItems } from '@/lib/features/fetures';
import React, { useState } from 'react';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import { IoCheckmark, IoCloseOutline } from 'react-icons/io5';

const categories: PaidVersion[] = [
  PaidVersion.FREE,
  PaidVersion.PRO,
  PaidVersion.PROPLUS,
];
const ComparisonTable: React.FC<{ name: string }> = ({ name }) => {
  const [showTable, setShowTable] = useState<boolean>(true);

  return (
    <section className="w-full bg-primaryBlue">
      <div className=" w-full font-medium md:text-xl text-white h-[4rem] flex sticky top-0">
        <span
          className="w-[20%] h-full flex items-center gap-1 cursor-pointer "
          onClick={() => setShowTable(!showTable)}
        >
          <p className="text-xl font-normal">{name}</p>
          {showTable ? <FaCaretUp /> : <FaCaretDown />}
        </span>
        <div className="w-[80%] flex justify-around font-medium items-center"></div>
      </div>
      {showTable && (
        <div className="w-full">
          {ComparisonTableItems[name].map((item, i) => {
            const { access, feature } = item;
            const isEven = (i + 1) % 2 === 0;
            return (
              <div
                key={i}
                className={`flex  ${
                  !isEven ? 'bg-white' : 'bg-whiteInverse'
                } border `}
              >
                <p
                  className={`w-[20%] text-lg md:text-xl px-2 flex items-center`}
                >
                  {feature}
                </p>
                <div className="flex justify-around py-4 w-[80%]">
                  {categories.map((item, i) => {
                    return access.includes(item) ? (
                      <IoCheckmark className="text-xl w-full" key={i} />
                    ) : (
                      <IoCloseOutline
                        className="text-xl text-dangerRed font-medium w-full"
                        key={i}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export const Comparisons = () => {
  return (
    <div className="w-full mt-5">
      <div className="w-full flex justify-end sticky top-0 z-50">
        <div className="w-[80%] flex gap-2 justify-around">
          {categories.map((item, i) => {
            return (
              <p
                key={i}
                className={
                  'text-center text-2xl w-full py-5 rounded-full border border-black my-3 ' +
                  bgColors[i]
                }
              >
                {item}
              </p>
            );
          })}
        </div>
      </div>
      <div className="h-[80vw] sticky top-[10rem] overflow-y-auto scrollbar-hide">
        {Object.keys(ComparisonTableItems).map((item, i) => {
          return <ComparisonTable name={item} key={i} />;
        })}
      </div>
    </div>
  );
};

export default ComparisonTable;
