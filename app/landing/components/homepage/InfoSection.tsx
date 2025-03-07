import React from 'react';
import { HiLocationMarker } from 'react-icons/hi';
import { SolidBtn } from '../buttons/solidButton';

const InfoItem: React.FC<{
  title: string;
  description: string;
  right: boolean;
}> = ({ title, description, right }) => {
  return (
    <div
      className={`w-full sm:w-1/2  text-white flex ${
        right ? 'justify-end' : 'justify-start'
      }`}
    >
      <div className="w-[340px]">
        <div className="p-2 rounded-lg bg-[#4A89DC] w-fit bg-[rgba(18,12,25,0.1)] mb-3">
          <HiLocationMarker color="#8cc152" fontSize={35} />
        </div>
        <h3 className="text-2xl font-semibold tracking-wide mb-3">{title}</h3>
        <p className="text-lg font-medium leading-tight">{description}</p>
      </div>
    </div>
  );
};

const InfoSection = () => {
  const infoItems = [
    {
      title: 'Reward for visiting',
      description:
        'For each visit, the customer earns one point. After collecting the necessary amount, he gets a coupon for the selected product or service for free.',
    },
    {
      title: 'Loyalty discounts',
      description:
        'A member of the loyalty system receives a discount on the entire bill. You can limit the validity to only certain hours, or the loyalty offer can be valid for the whole day.',
    },
    {
      title: 'Reward for payments',
      description:
        'With each payment, the customer receives a credit (€1=1 point). After collecting a certain amount, he gets a coupon for a selected product or service for free.',
    },
    {
      title: 'Discounted price list for regular customers',
      description:
        'It is any benefit only for members of the loyalty program. The lucrativeness of the offer increases its inaccessibility for ordinary customers. For example Set Coffee + dessert for the faithful at a better price.',
    },
    {
      title: 'Collecting points',
      description:
        'With each payment, the customer receives a credit (€1=1 point). After collecting a certain amount, he gets a coupon for a selected product or service for free.',
    },
    {
      title: 'Cashback',
      description:
        'Money back from every payment in the form of credit. The customer can pay by credit if he can cover the entire amount of his account. No need to connect with POS.',
    },
  ];

  return (
    <div className="bg-[#4A89DC] w-full flex flex-col justify-center items-center mt-[10rem] pt-10">
      <div className=" w-full sm:w-[80%] flex flex-col sm:flex-row flex-wrap gap-y-[5rem] justify-between">
        {infoItems.map((info, i) => {
          return (
            <InfoItem
              title={info.title}
              description={info.description}
              right={(i + 1) % 2 === 0}
              key={i}
            />
          );
        })}
      </div>
      <div className="bg-[#3FCA90] w-full mt-10 px-[10rem] py-[5rem] justify-around flex">
        <h3 className="text-white font-semibold text-3xl">
          Do you want to have a loyalty program in your company?
          <br /> It only takes a few minutes to set up
        </h3>
        <div>
          <SolidBtn bgColor="bg-red" hoverBgColor="bg-dangerRed">
            Try it for free
          </SolidBtn>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
