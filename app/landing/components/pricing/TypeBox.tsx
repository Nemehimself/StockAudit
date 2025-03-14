import React, { useCallback, useMemo, useState } from 'react';
import PriceBtn from '../buttons/PriceBtn';
import {
  analyticsFeatures,
  mcomAccessAndSettings,
  mcomBotsFeatures,
  mcomBotsPrograms,
  profileManagementFeatures,
} from '@/lib/features/fetures';
import { PaidVersion, PriceCategoryEnum } from '@/app/interfaces/versions.enum';
import { featutresAccess } from '@/app/interfaces/featutresAccess.type';
import { FaArrowRightLong } from 'react-icons/fa6';
import { IoCheckmarkDone } from 'react-icons/io5';
import { usePriceCategory } from '../providers/PriceCategoryProvider';

const PricingOptions = [
  ...mcomBotsFeatures,
  ...analyticsFeatures,
  ...profileManagementFeatures,
  ...mcomBotsPrograms,
  ...mcomAccessAndSettings,
];

const getFeatures = (name: string) => {
  const features = PricingOptions.filter(item => item.access[0] === name);
  return features;
};

const FeatureList: React.FC<{
  name: PaidVersion;
  features: featutresAccess[];
}> = ({ name, features }) => {
  const [showAll, setShowAll] = useState(false);

  const handleShowMore = () => {
    setShowAll(true);
  };
  const handleShowLess = () => {
    setShowAll(false);
  };

  const displayedFeatures = showAll ? features : features.slice(0, 9);

  return (
    <div className="self-start">
      {name === PaidVersion.PRO && (
        <span className="flex items-center gap-3">
          <p className="text-sm tracking-wide font-medium italic">
            All feature in free
          </p>
        </span>
      )}
      {name === PaidVersion.PROPLUS && (
        <span className="flex items-center gap-3">
          <p className="text-sm tracking-wide font-medium italic">
            All feature in free and Pro
          </p>
        </span>
      )}
      {displayedFeatures.map((item, i) => {
        const { feature } = item;

        return (
          <span key={i} className="flex items-center gap-3">
            <IoCheckmarkDone className="text-primaryBlue" />

            <p className="font-normal tracking-wide opacity-95">{feature}</p>
          </span>
        );
      })}
      {!showAll && features.length > 9 && (
        <button
          onClick={handleShowMore}
          className="text-primaryBlue mt-2 flex items-center gap-3 justify-center"
        >
          <p>See more features</p>
          <FaArrowRightLong />
        </button>
      )}
      {showAll && features.length > 9 && (
        <button
          onClick={handleShowLess}
          className="text-primaryBlue mt-2 flex items-center gap-3 justify-center"
        >
          <p>See less features</p>
          <FaArrowRightLong />
        </button>
      )}
    </div>
  );
};

const CatgoryLabel: React.FC<{ name: string }> = ({ name }) => {
  return (
    <h4 className="border min-w-[5rem] max-w-[7rem]  text-center bg-opacity-95 cursor-pointer self-start bg-primaryBlue text-white p-2 rounded-lg font-medium tracking-wide">
      {name}
    </h4>
  );
};

const TypeBox: React.FC<{
  name: PaidVersion;
  price: number;
  bgColor: string;
}> = React.memo(({ name, price, bgColor }) => {
  TypeBox.displayName = 'TypeBox';
  const features = useMemo(() => getFeatures(name), [name]);

  const { priceCategory } = usePriceCategory();

  const [customValue, setCustomValue] = useState<number>(1);

  const handleCustomValueChange = useCallback((value: number) => {
    if (value >= 1 && value <= 365) {
      setCustomValue(value);
    }
  }, []);

  let calculatedPrice = price;

  if (name !== PaidVersion.FREE) {
    switch (priceCategory) {
      case PriceCategoryEnum.THREE_MONTHS:
        calculatedPrice = price * 3;
        break;
      case PriceCategoryEnum.SIX_MONTHS:
        calculatedPrice = price * 6;
        break;
      case PriceCategoryEnum.YEARLY:
        calculatedPrice = price * 12;
        break;
      case PriceCategoryEnum.CUSTOM:
        calculatedPrice =
          name === PaidVersion.PRO ? customValue : customValue * 2;
        break;
    }
  }

  return (
    <div
      className={`${bgColor} border border-black px-4 py-5 font-bold md:w-[21rem] min-h-[25rem] flex flex-col justify-between gap-3 items-center`}
    >
      <span className="w-full flex flex-col gap-3">
        <CatgoryLabel name={name} />
        {priceCategory === PriceCategoryEnum.CUSTOM &&
          name !== PaidVersion.FREE && (
            <NumberInput
              onChange={handleCustomValueChange}
              value={customValue}
            />
          )}
        <span className="text-4xl font-medium flex self-start border-b w-full pb-2">
          £{calculatedPrice}
        </span>
        <FeatureList name={name} features={features} />
      </span>

      <PriceBtn />
    </div>
  );
});

const NumberInput: React.FC<{
  value: number;
  onChange: (value: number) => void;
}> = React.memo(({ value, onChange }) => {
  NumberInput.displayName = 'NumberInput';
  const handleIncrement = () => onChange(value + 1);
  const handleDecrement = () => onChange(value - 1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = parseInt(e.target.value.replace(/\D/g, ''), 10);
    if (!isNaN(numericValue)) {
      onChange(numericValue);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <p className="font-normal text-xl">Enter number of days</p>
      <section className="flex items-center gap-2">
        <button
          onClick={handleDecrement}
          className="w-[2rem] h-[2rem] bg-gray-200 rounded"
        >
          -
        </button>
        <input
          value={value}
          onChange={handleInputChange}
          className="w-16 h-[2rem] text-center border border-gray-300 rounded"
        />
        <button
          onClick={handleIncrement}
          className="w-[2rem] h-[2rem] bg-gray-200 rounded"
        >
          +
        </button>
        <p className="font-medium">{value > 1 ? 'days' : 'day'}</p>
      </section>
    </div>
  );
});

export default TypeBox;
