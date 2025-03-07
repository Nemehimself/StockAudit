import React from "react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const AnimatedGraphic = () => {
  return (
    <div className="p-6 flex flex-row justify-between ">
        <div className="w-1/2 flex flex-col justify-center">
            <h2 className="text-xl font-semibold mb-4">HOW AUDIT WORKS</h2>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quos eius numquam totam, tempore architecto odit officiis at. Nihil asperiores at ipsa ipsam veritatis unde sint neque voluptates quia quidem.</p>
        </div>
      <DotLottieReact
      src="https://lottie.host/b65e2df2-b68b-4d4d-bfb7-e626c1790259/g09uFJqFze.lottie"
      loop
      autoplay
      className="w-1/2 h-1/2"
    />
    </div>
  );
};

export default AnimatedGraphic;
