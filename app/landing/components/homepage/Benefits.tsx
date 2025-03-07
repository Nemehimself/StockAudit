import Image, { StaticImageData } from 'next/image';
import React from 'react';
import sales from '../../../../public/homepage/sales.svg';
import network from '../../../../public/homepage/network.svg';
import management from '../../../../public/homepage/management.svg';
import customer from '../../../../public/homepage/customer.svg';
import styles from './benefits.module.css';
import SectionHeading from '../common/SectionHeading';

interface benefitsProps {
  title: string;
  description: string;
  icon: StaticImageData;
}

const BenefitsItem: React.FC<benefitsProps> = ({
  title,
  description,
  icon,
}) => {
  return (
    <div className={styles.card}>
      <div className="header ">
        <div className={sales.content}>
          <Image
            src={icon}
            alt="stiales"
            className="w-[10rem] h-[13rem] self-center "
          />
          <span className="text-darkPrimary text-lg font-semibold tracking-wide leading-relaxed">
            {title}
          </span>
          <p className="text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

const Benefits = () => {
  const benefitItems = [
    {
      title: 'Increase Sales',
      description:
        ' Attract more customers through cross-promotions and shared offers',
      icon: sales,
    },
    {
      title: 'Build Strong Networks',
      description:
        'Strengthen relationships with other businesses on your high street',
      icon: network,
    },
    {
      title: 'Maximize Resources',
      description:
        ' Leverage partnerships to reduce costs and increase visibility',
      icon: management,
    },
    {
      title: 'Engage Customers',
      description:
        ' Offer unique experiences that encourage loyalty and repeat visits',
      icon: customer,
    },
  ];
  return (
    <section className="py-6">
      <SectionHeading text="Benefits" />
      <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-7">
        {benefitItems.map((item, i) => {
          const { title, description, icon } = item;
          return (
            <BenefitsItem
              key={i}
              title={title}
              description={description}
              icon={icon}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Benefits;
