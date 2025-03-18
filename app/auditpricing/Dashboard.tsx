import React, { useState } from 'react'
import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa6";
import { Autumn } from './Autumn';
import { Spring } from './Spring';
import { Summer } from './Summer';
import { Winter } from './Winter';

export const Dashboard = () => {
    const [showFeatures, setShowFeatures] = useState(false);

    return (
        <div className='flex flex-col items-center justify-center p-4 gap-4'>
            <header className='flex flex-col items-center w-1/2 justify-center gap-4'>
                <h1 className='font-normal text-2xl'>
                    MAKE A SELECTION FROM OUR 
                    <span className='text-5xl text-blue-600 ml-2'>BUDGETS</span>
                </h1>
                <p className='text-center mt-10'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                    Excepturi, ratione impedit maxime dolorem, quod voluptate quo dicta 
                    nostrum reiciendis dolorum assumenda aspernatur quia adipisci error, 
                    vitae asperiores dolore corporis voluptatem!
                </p>
            </header>

            {/* Budget Cards */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className='flex flex-row items-center w-5/6 justify-center px-20 gap-4'
            >
                <Winter />
                <Spring />
                <Summer />
                <Autumn />
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

            {showFeatures && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="mt-6 bg-gray-100 p-4 rounded-xl w-1/2"
                >
                    <h3 className="text-xl font-bold">Budget Features</h3>
                    <ul className="mt-2 text-gray-600">
                        <li>✔ Advanced Analytics</li>
                        <li>✔ Custom Reports</li>
                        <li>✔ 24/7 Support</li>
                        <li>✔ Flexible Payment Options</li>
                    </ul>
                </motion.div>
            )}
        </div>
    )
}
