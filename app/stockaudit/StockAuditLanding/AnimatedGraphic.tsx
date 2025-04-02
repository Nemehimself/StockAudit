// AnimatedGraphic.tsx
import React from "react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const AnimatedGraphic = () => {
  return (
    <div className="p-4 md:p-6 flex flex-col md:flex-row justify-between bg-white rounded-lg shadow-md">
        <div className="w-full md:w-1/2 flex flex-col justify-center mb-4 md:mb-0 md:pr-4">
            <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-4">HOW AUDIT WORKS</h2>
            <p className="text-sm md:text-base">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quos eius numquam totam, tempore architecto odit officiis at. Nihil asperiores at ipsa ipsam veritatis unde sint neque voluptates quia quidem.</p>
        </div>
      <DotLottieReact
        src="https://lottie.host/b65e2df2-b68b-4d4d-bfb7-e626c1790259/g09uFJqFze.lottie"
        loop
        autoplay
        className="w-full md:w-1/2 h-48 md:h-auto"
      />
    </div>
  );
};

export default AnimatedGraphic;
