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
        <div className='flex flex-col items-center justify-center gap-4 mb-10 w-full'>
          <h1 className='text-3xl md:text-4xl lg:text-6xl w-full text-center text-white bg-blue-500 p-4 font-normal'>
            AUDIT PRICING</h1>
            <header className='flex flex-col items-center w-full px-4 md:w-3/4 lg:w-1/2 mt-4 justify-center gap-4'>
                <h1 className='font-normal text-xl md:text-2xl lg:text-3xl text-center'>
                    MAKE A SELECTION FROM OUR 
                    <span className='text-4xl md:text-5xl lg:text-7xl text-blue-600 ml-2 block md:inline'>BUDGETS</span>
                </h1>
                <p className='text-center mt-4 lg:mt-10 px-2'>
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
              className='w-32 h-20 md:w-40 md:h-24 lg:w-48 lg:h-24'
            />
            {/* Budget Cards */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className='flex flex-col md:flex-row flex-wrap items-center w-full px-2 md:px-4 lg:px-6 justify-center gap-4 mt-6'
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
                className="w-3/4 md:w-1/2 lg:w-1/4 border border-black text-black py-2 rounded-full flex items-center justify-center gap-4 px-4 transition-all duration-300 mt-10"
                onClick={() => setShowFeatures(!showFeatures)}
            >
                <span className="whitespace-nowrap">View all features</span> <FaChevronDown />
            </motion.button>

            {showFeatures && <BudgetFeatures />}
        </div>
    )
}