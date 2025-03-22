'use client';

import React, { Suspense } from 'react';
import Dashboard from './Dashboard';
import { useSearchParams } from 'next/navigation';

function SsoIdWrapper() {
  const searchParams = useSearchParams();
  const ssoId = searchParams?.get('ssoId') ?? '';

  return <Dashboard ssoId={ssoId ?? ''} />;
}

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <SsoIdWrapper />
    </Suspense>
  );
}
