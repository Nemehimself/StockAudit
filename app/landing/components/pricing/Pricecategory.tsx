'use client';

import React from 'react';
import styles from './price-category.module.css';

import { usePriceCategory } from '../providers/PriceCategoryProvider';
import { PriceCategoryEnum } from '@/app/interfaces/versions.enum';

const Pricecategory = () => {
  const { priceCategory, setPriceCategory } = usePriceCategory();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as PriceCategoryEnum;
    setPriceCategory(value);
    console.log(value);
  };

  return (
    <div className={styles['radio-input']}>
      <label>
        <input
          type="radio"
          id="value-1"
          name="value-radio"
          value="monthly"
          checked={priceCategory === 'monthly'}
          onChange={handleChange}
        />
        <span>Monthly</span>
      </label>
      <label>
        <input
          type="radio"
          id="value-2"
          name="value-radio"
          value="3 months"
          checked={priceCategory === '3 months'}
          onChange={handleChange}
        />
        <span>3 Months</span>
      </label>
      <label>
        <input
          type="radio"
          id="value-3"
          name="value-radio"
          value="6 months"
          checked={priceCategory === '6 months'}
          onChange={handleChange}
        />
        <span>6 Months</span>
      </label>
      <label>
        <input
          type="radio"
          id="value-4"
          name="value-radio"
          value="yearly"
          checked={priceCategory === 'yearly'}
          onChange={handleChange}
        />
        <span>Yearly</span>
      </label>
      <label>
        <input
          type="radio"
          id="value-5"
          name="value-radio"
          value="custom"
          checked={priceCategory === 'custom'}
          onChange={handleChange}
        />
        <span>Custom</span>
      </label>
      <span className={styles['selection']}></span>
    </div>
  );
};

export default Pricecategory;
