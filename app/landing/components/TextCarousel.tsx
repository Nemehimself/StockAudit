'use client';

import React, { useState, useEffect } from 'react';

interface TextCarouselProps {
  texts: string[];
  interval?: number;
}

const TextCarousel: React.FC<TextCarouselProps> = ({
  texts,
  interval = 3000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % texts.length);
    }, interval);

    return () => clearInterval(timer);
  }, [texts, interval]);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full h-[20rem] sm:h-[calc(100dvh-4rem)] flex flex-col items-center justify-center bg-business bg-opacity-40 bg-cover animate-fade-text">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <p className="relative font-medium text-2xl px-2 sm:text-5xl text-[#fff] text-center animate-fade-text cursor-pointer drop-shadow-lg">
        {texts[currentIndex]}
      </p>
      <div className="relative dots flex justify-center mt-[3rem] sm:mt-[7rem]">
        {texts.map((_, index) => (
          <span
            key={index}
            className={`dot w-3 h-3 mx-1 rounded-full cursor-pointer ${
              index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
            }`}
            onClick={() => handleDotClick(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default TextCarousel;
