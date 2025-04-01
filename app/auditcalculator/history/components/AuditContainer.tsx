'use client';

import { formatMoney } from '@/app/helpers/formatAmount';
import { formatDate } from '@/app/helpers/formatDate';
import { AuditType, SpareCapacity } from '@/services/hooks/audit/hook';
import React, { useRef } from 'react';
import toPdf from 'react-to-pdf';

const ContainerHeader: React.FC<{ date: string }> = ({ date }) => {
  return (
    <div className="bg-[#EFF6FF] mb-3 shadow py-[1.5rem] px-2 rounded">
      <p className="font-medium text-[#1e40af]">
        {`Last Updated: ${formatDate(date)}`}
      </p>
    </div>
  );
};

const YearlyMaxContainer: React.FC<{ figure: number }> = ({ figure }) => {
  return (
    <div className=" rounded-xl shadow h-[100px] flex flex-col justify-center px-[2rem] bg-white">
      <h3 className="text-lg ">Yearly Maximum Capacity</h3>
      <p className="text-[#2563eb] text-2xl font-bold">{formatMoney(figure)}</p>
    </div>
  );
};

const YearlySpareCapacityContainer: React.FC<{ figure: number }> = ({
  figure,
}) => {
  return (
    <div className="rounded-xl shadow h-[100px] flex flex-col justify-center px-[2rem] bg-white ">
      <h3 className="text-lg ">Yearly Spare Capacity</h3>
      <p className="text-[#16a34a] text-2xl font-bold">{formatMoney(figure)}</p>
    </div>
  );
};

const CurrentYearlyTurnoverContainer: React.FC<{ figure: number }> = ({
  figure,
}) => {
  return (
    <div className=" rounded-xl shadow h-[100px] flex flex-col justify-center px-[2rem] my-3 bg-white">
      <h3 className="text-lg ">Yearly Spare Capacity</h3>
      <p className="text-[#9333ea] text-2xl font-bold">{formatMoney(figure)}</p>
    </div>
  );
};

const SpareCapacityContainer: React.FC<{
  spareCapacity: SpareCapacity;
}> = ({ spareCapacity }) => {
  const spareCapacityKeys = Object.keys(
    spareCapacity
  ) as (keyof SpareCapacity)[];

  return (
    <div className="rounded-xl shadow-md py-4 flex flex-col justify-center px-[2rem] my-3 bg-white ">
      <h3 className="text-lg font-semibold mb-3">Spare Capacity</h3>

      <section className="flex flex-col gap-3">
        {spareCapacityKeys.map((item, i) => {
          return (
            <div
              className="flex items-center justify-between text-[#6b7280]"
              key={i}
            >
              <p>{item}</p>
              <p className="font-semibold text-black">
                {spareCapacity[item] ?? 'N/A'}
              </p>
            </div>
          );
        })}
      </section>
    </div>
  );
};

const AuditContainer: React.FC<{ audit: AuditType }> = ({ audit }) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const { yearlyMaxCapacity, currentYearlyTurnOver, yearlySpareCapacity } =
    audit.audit.spareCapacity;

  const handleDownload = () => {
    const title = new Date().toISOString();
    if (componentRef.current) {
      toPdf(componentRef, {
        filename: `${title.toLowerCase().replace(/\s+/g, '-')}.pdf`,
      });
    }
  };

  return (
    <div>
      <div
        className="w-[35rem] border rounded-md p-3 bg-gray-50"
        ref={componentRef}
      >
        <h3 className="font-medium text-lg my-2">{audit.audit.type}</h3>
        <ContainerHeader date={audit.created_at} />
        <section className="flex flex-col gap-4">
          <YearlyMaxContainer figure={yearlyMaxCapacity} />
          <YearlySpareCapacityContainer figure={yearlySpareCapacity} />
          <CurrentYearlyTurnoverContainer figure={currentYearlyTurnOver} />
        </section>
        <SpareCapacityContainer spareCapacity={audit.audit.spareCapacity} />
      </div>
      <button
        className="bg-blue-600 text-lg font-medium text-white p-2 mt-2"
        onClick={handleDownload}
      >
        Download as PDF
      </button>
    </div>
  );
};

export default AuditContainer;
