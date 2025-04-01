'use client';

import { useGetAudits } from '@/services/hooks/audit/hook';
import React from 'react';
import AuditContainer from './components/AuditContainer';
import { IoArrowBack } from 'react-icons/io5';
import { useRouter } from 'next/navigation';

const Page = () => {
  const { data, isSuccess, isLoading } = useGetAudits();

  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  if (isLoading) return <div className="font-medium text-xl">Loading...</div>;
  if (isSuccess && data)
    return (
      <div className="flex flex-col gap-3 items-center justify-center py-5">
        <div className="w-full text-center px-5">
          <h2 className="font-medium text-3xl flex gap-3 items-center cursor-pointer">
            <IoArrowBack className="font-normal" onClick={handleBack} />
            Your Audit History
          </h2>
        </div>

        {data.map((item, i) => {
          return <AuditContainer audit={item} key={i} />;
        })}
      </div>
    );
};

export default Page;
