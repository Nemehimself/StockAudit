'use client';

import React from 'react';
import Dashboard from './Dashboard';
import { useSearchParams } from 'next/navigation';

export default function Page() {
  const searchParams = useSearchParams();
  const ssoId = searchParams.get('ssoId');

  return <Dashboard ssoId={ssoId ?? ''} />;
}
