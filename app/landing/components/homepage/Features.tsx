import React from 'react';
import SectionHeading from '../common/SectionHeading';
import { FaArrowCircleUp } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { GiPuzzle } from 'react-icons/gi';
import { BsFillGiftFill } from 'react-icons/bs';
import { GrAnalytics } from 'react-icons/gr';
import { MdSupportAgent } from 'react-icons/md';

interface featureCardProps {
  title: string;
  description: string;
  icon: IconType;
}
const FeatureCard: React.FC<featureCardProps> = ({
  title,
  description,
  icon: Icon,
}) => {
  return (
    <div className="card cursor-pointer hover:bg-blue-600 hover:opacity-90  hover:text-white">
      <div className="card-img">
        <Icon className="img text-5xl text-stepBlueText" />
      </div>
      <div className="card-title">{title}</div>
      <div className="card-subtitle">{description}</div>
      {/* <hr className="card-divider" /> */}
    </div>
  );
};

const Features = () => {
  const features = [
    {
      title: 'Easy Onboarding',
      description:
        'Quick and hassle-free setup tailored to your business needs',
      icon: FaArrowCircleUp,
    },
    {
      title: 'Collaboration Tools',
      description:
        'Tools to create and manage partnerships with other businesses',
      icon: GiPuzzle,
    },
    {
      title: 'Loyalty Program Integration',
      description: 'Share customer rewards to keep them coming back',
      icon: BsFillGiftFill,
    },
    {
      title: 'Analytics Dashboard',
      description:
        'Track the performance of your collaborations and optimize for success',
      icon: GrAnalytics,
    },
    {
      title: 'Multi-Channel Support',
      description:
        'Connect with customers via social media, QR codes, mobile, and in-store experiences',
      icon: MdSupportAgent,
    },
  ];
  return (
    <section className="mt-5 py-4">
      <SectionHeading text="Our Amazing Features" />
      <div className="flex flex-col sm:flex-row gap-[2rem] items-center justify-center">
        {features.map((feature, i) => {
          return (
            <FeatureCard
              key={i}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Features;
