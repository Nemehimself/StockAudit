import React from 'react';

const SectionHeading: React.FC<{ text: string }> = ({ text }) => {
  return (
    <h3 className="text-2xl sm:text-5xl font-semibold text-center my-7">
      {text}
    </h3>
  );
};

export default SectionHeading;
