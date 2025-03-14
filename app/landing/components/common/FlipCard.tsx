import React from 'react';
import styles from '../common/flip-card.module.css';
import imageHolder from '../../../../public/homepage/flipCardPlaceholder.jpg';
import Image from 'next/image';

const FlipCard: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div>
      <div className={styles.card}>
        <div className={styles['card-inner']}>
          <div className={`${styles['card-front']} flex flex-col`}>
            <Image src={imageHolder} alt="placeholder" />
            <p>{title}</p>
          </div>
          <div className={styles['card-back']}>
            <p className="text-black text-sm ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
