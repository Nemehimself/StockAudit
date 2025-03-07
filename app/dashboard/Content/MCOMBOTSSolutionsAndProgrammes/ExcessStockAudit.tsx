"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Audit from "@/public/StockAudit/audit.png";

const ExcessStockAudit = () => {
  return (
    <div className="flex flex-col items-center space-y-8">
      <h1 className="text-4xl font-bold">Welcome to Excess Stock Audit</h1>
      <Image src={Audit} alt="Audit Image" className="w-1/2 h-auto" />
      <button className="bg-blue-500 text-white py-2 px-8 border-2 w-1/6 border-[#000] rounded-full  cursor-pointer">
        <Link href="/stockaudit">
          <span className="text-[#fff] font-semibold text-xl">Explore</span>
        </Link>
      </button>
    </div>
  );
};

export default ExcessStockAudit;