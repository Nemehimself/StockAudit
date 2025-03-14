'use client';

import React from 'react';
import Pricecategory from '../components/pricing/Pricecategory';

import PricingContainer from '../components/pricing/PricingContainer';
import { Comparisons } from '../components/pricing/Comparison';
import { Slider } from '@/components/ui/slider';
import { PriceCategoryEnum } from '@/app/interfaces/versions.enum';
import { usePriceCategory } from '../components/providers/PriceCategoryProvider';
import styles from './pricing.module.css';
import { RxCaretDown, RxCaretUp } from 'react-icons/rx';
import Footer from '../components/common/Footer';

const Page = () => {
  const {
    priceCategory,
    customCategory,
    setCustomCategory,
    showTable,
    setShowTable,
  } = usePriceCategory();

  const handleSliderChange = (value: number[]) => {
    setCustomCategory(value[0]);
    return value;
  };

  return (
    <div
      className={`w-full h-fit ${styles['pricing-background']} text-[#121519] flex flex-col items-center justify-center`}
    >
      <div className="w-[95%] md:w-[80%] flex flex-col items-center">
        <header className="text-center mt-[3rem] w-[40rem]">
          <h2 className="font-semibold text-4xl leading-relaxed">
            Choose the right plan for yourself!
          </h2>
          <p className=" opacity-70">
            {
              "Find the plan that works for you. Whether you need more or fewer, we'll customize your subscription to match your budget."
            }
          </p>
        </header>

        <section className="mt-10 flex flex-col items-center px-2">
          <Pricecategory />

          {/* check if category is custom */}
          {priceCategory === PriceCategoryEnum.CUSTOM && (
            <div className="w-[50%] my-3">
              <Slider
                defaultValue={[30]}
                max={365}
                step={1}
                value={[customCategory]}
                onValueChange={handleSliderChange}
              />
            </div>
          )}

          <PricingContainer />
        </section>
        <section className="w-full py-[6rem]  flex flex-col">
          <div
            className=" self-center text-3xl cursor-pointer border-2 border-white  w-fit py-3 px-4 rounded-full bg-primaryBlue text-white flex items-center justify-center gap-3"
            onClick={() => setShowTable(!showTable)}
          >
            <h3>Compare Features</h3>
            {!showTable ? (
              <RxCaretUp className="text-3xl" />
            ) : (
              <RxCaretDown className="text-3xl" />
            )}
          </div>

          <div
            className={`${
              showTable
                ? `${styles['fade-enter']} ${styles['fade-enter-active']}`
                : `${styles['fade-exit']} ${styles['fade-exit-active']}`
            }`}
          >
            {showTable && <Comparisons />}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
