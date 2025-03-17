import React from 'react';

const ShadowContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="w-fit flex flex-col px-3 py-5 gap-5 shadow-shadow-container rounded-xl">
      {children}
    </div>
  );
};

export default ShadowContainer;
