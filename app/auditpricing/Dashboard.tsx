import React from 'react'
import { useRouter } from "next/navigation";
import { FaRegSnowflake, FaLeaf, FaSun, FaCanadianMapleLeaf } from 'react-icons/fa';

export const Dashboard = () => {
    const router = useRouter();
    const handleLogin = () => {
        router.push("/auditcalculator"); // Navigate to AuditCalculator page
      };
  return (
    <div className=' flex flex-col items-center justify-center p-4 gap-4'>
      <h1 className='font-bold'>SELECT A PRICING BUDGET</h1>
      <div className='flex flex-row items-center w-4/5 justify-center px-20 gap-2'>
        <div className='flex flex-col items-center w-1/4 justify-center p-4 shadow-lg rounded-lg'>
          <p  className='flex flex-row items-center gap-4'><span> <FaRegSnowflake /> </span> Winter <span> £500</span></p>
        </div>
        <div className='flex flex-col items-center w-1/4 justify-center p-4 shadow-lg rounded-lg'>
          <p  className='flex flex-row items-center gap-4'><span> <FaLeaf /> </span> Spring <span> £1000</span></p>
        </div>
        <div className='flex flex-col items-center w-1/4 justify-center p-4 shadow-lg rounded-lg'>
        <p  className='flex flex-row items-center gap-4'><span> <FaSun /> </span> Summer <span> £1500</span></p>
        </div>
        <div className='flex flex-col items-center w-1/4 justify-center p-4 shadow-lg rounded-lg'>
        <p  className='flex flex-row items-center gap-4'><span> <FaCanadianMapleLeaf /> </span> Autumn <span> £2000</span></p>
        </div>
      </div>
        <button type="button" className="w-1/6 bg-blue-600 text-white py-2 rounded-md" onClick={handleLogin}>
          Pay
        </button>
    </div>
  )
}
