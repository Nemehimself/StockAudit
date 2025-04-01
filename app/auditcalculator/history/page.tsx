'use client';

import { useGetAudits } from '@/services/hooks/audit/hook';
import React from 'react';
import AuditContainer from './components/AuditContainer';
import { IoArrowBack } from 'react-icons/io5';

const Page = () => {
  const { data, isSuccess, isLoading } = useGetAudits();

  if (isLoading) return <div className="font-medium text-xl">Loading...</div>;
  if (isSuccess && data)
    return (
      <div className="flex flex-col gap-3 items-center justify-center py-5">
        <h2 className="font-medium text-3xl">
          <IoArrowBack />
          Your Audit History
        </h2>
        {data.map((item, i) => {
          return <AuditContainer audit={item} key={i} />;
        })}
      </div>
    );
};

export default Page;
