import React, { useState } from 'react'
import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa6";
import { Audit4 } from './Audit4';
import { Audit2 } from './Audit2';
import { Audit3 } from './Audit3';
import { Audit1 } from './Audit1';
import { BudgetFeatures } from './BudgetFeatures';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export const Dashboard = () => {
    const [showFeatures, setShowFeatures] = useState(false);

    return (
        <div className='flex flex-col items-center justify-center gap-4 mb-10'>
          <h1 className='text-6xl w-full text-center text-[#fff] bg-blue-500 p-4 font-normal'>
            AUDIT PRICING</h1>
            <header className='flex flex-col items-center w-1/2 mt-4 justify-center gap-4'>
                <h1 className='font-normal text-3xl'>
                    MAKE A SELECTION FROM OUR 
                    <span className='text-7xl text-blue-600 ml-2'>BUDGETS</span>
                </h1>
                <p className='text-center mt-10'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                    Excepturi, ratione impedit maxime dolorem, quod voluptate quo dicta 
                    nostrum reiciendis dolorum assumenda aspernatur quia adipisci error, 
                    vitae asperiores dolore corporis voluptatem!
                </p>
            </header>
            <DotLottieReact
              src="https://lottie.host/e20ab106-7674-412f-b590-4b3258d8ee7c/HnQv0JcMqA.lottie"
              loop
              autoplay
              className='w-48 h-24'
            />
            {/* Budget Cards */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className='flex flex-row items-center w-5/6 justify-center px-20 gap-4 mt-6'
            >
                <Audit1 />
                <Audit2 />
                <Audit3 />
                <Audit4 />
            </motion.div>

            {/* Expandable Features Section */}
            <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#000", color: "#fff" }}
                whileTap={{ scale: 0.95 }}
                className="w-1/4 border border-[#000] text-black py-2 rounded-full flex items-center justify-center gap-6 px-4 transition-all duration-300 mt-10"
                onClick={() => setShowFeatures(!showFeatures)}
            >
                View all features for the budgets <FaChevronDown />
            </motion.button>

            {showFeatures && <BudgetFeatures />}
        </div>
    )
}
