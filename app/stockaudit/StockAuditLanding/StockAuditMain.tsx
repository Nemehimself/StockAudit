'use client';

import React, { useState } from 'react';
import Header from './Header';
import VideoSection from './VideoSection';
import AuditInfo from './AuditInfo';
import AnimatedGraphic from './AnimatedGraphic';
import QuarterlyAuditBenefits from './QuarterlyAuditBenefits';
import PaymentOptions from './PaymentOptions';
import TokenInformation from './TokenInformation';
import Footer from './Footer';

const StockAuditMain = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header modalOpen={modalOpen} setModalOpen={setModalOpen} />
      <main className="flex flex-col container mx-auto px-4 py-8 gap-6">
        <VideoSection />
        <AuditInfo />
        <AnimatedGraphic />
        <QuarterlyAuditBenefits />
        <PaymentOptions setModalOpen={setModalOpen} />
        <TokenInformation />
      </main>
      <Footer />
    </div>
  );
};

export default StockAuditMain;
