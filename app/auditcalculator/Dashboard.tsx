'use client';

import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import StockAuditHeader from './StockAuditHeader';
import shortMenuItems from './ShortForm/shortMenuData';
import { LuCalendarClock } from 'react-icons/lu';
import { getCookieValue } from '@/services/getCookieValue';
import { useRouter } from 'next/navigation';
import { useSSO } from '@/services/hooks/auth/hook';
import { FaBars } from 'react-icons/fa';

export default function Dashboard({ ssoId }: { ssoId?: string }) {
  const [activeLabel, setActiveLabel] = useState(shortMenuItems[0].label);
  const [activeGroup, setActiveGroup] = useState<
    'GroupA' | 'GroupB' | 'GroupC' | 'GroupD'
  >('GroupA');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const router = useRouter();

  const { isPending, isSuccess, isError, error, data, mutate } = useSSO();

  useEffect(() => {
    if (ssoId) {
      if (!isPending) mutate(ssoId);
    }
  }, [ssoId, mutate, isPending]);

  useEffect(() => {
    if (isSuccess) {
      document.cookie = `token=${data.accessToken}; max-age=86400; path=/; secure;`;
    }
    if (isError) {
      console.error(error);
      router.push('/stockaudit');
    }
  }, [isSuccess, isError, data, error, router]);

  useEffect(() => {
    const token = getCookieValue('token');
    if (!token && !ssoId && !isSuccess) {
      router.push('/stockaudit');
    }
  }, [ssoId, router, isSuccess]); 

  // Get the active menu item (to retrieve its background image)
  const activeMenuItem = shortMenuItems.find(
    item => item.label === activeLabel
  );
  const backgroundImage = activeMenuItem
    ? `url(${activeMenuItem.image})`
    : 'none';

  // Get the active component based on selected label
  const activeComponent = activeMenuItem?.component || null;

  // Update current time every second
  const [currentDateTime, setCurrentDateTime] = useState(
    new Date().toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(
        new Date().toLocaleString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Toggle sidebar for mobile view
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Close sidebar after selection on mobile
  const handleSidebarSelection = (label: string, group: 'GroupA' | 'GroupB' | 'GroupC' | 'GroupD') => {
    setActiveLabel(label);
    setActiveGroup(group);
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full">
      {/* Mobile Menu Button */}
      <button 
        className="md:hidden fixed top-6 left-2 z-50 bg-gray-800 text-white p-2 rounded-md shadow-lg"
        onClick={toggleSidebar}
      >
        <FaBars size={24} />
      </button>

      {/* Sidebar - shows as overlay on mobile, fixed on desktop */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out fixed md:relative z-40 h-full`}>
        <Sidebar
          menuItems={shortMenuItems}
          setActiveLabel={(label) => handleSidebarSelection(label, activeGroup)}
          setActiveGroup={(group) => handleSidebarSelection(activeLabel, group)}
          activeLabel={activeLabel}
          activeGroup={activeGroup}
        />
      </div>

      {/* Sidebar overlay backdrop for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full md:ml-0">
        {/* Stock Audit Header */}
        <StockAuditHeader
          activeAudit="short"
          setActiveAudit={() => {}}
          setActiveIndex={() => {}}
        />

        {/* Content Section with Dynamic Background */}
        <div
          className="flex-1 w-full bg-cover bg-center transition-all duration-300 ease-in-out overflow-y-auto"
          style={{ backgroundImage }}
        >
          <div className="bg-slate-700 bg-opacity-70 w-full p-2 md:p-4">
            <div className="flex flex-col md:flex-row items-center gap-3 md:gap-10 justify-center w-full mt-2 text-center px-2 md:px-8">
              <p className="text-[#fff] text-sm md:text-base font-bold py-2 px-3 md:px-6 bg-opacity-70 bg-[#000]">
                Please complete this audit as accurately as possible, as it will
                impact the final results
              </p>
              <div className="flex py-2 px-3 md:px-6 bg-opacity-70 bg-[#000] text-[#fff] text-sm md:text-base font-bold gap-2">
                <LuCalendarClock className="w-4 h-4 md:w-6 md:h-6" />
                <span className="hidden sm:inline">{currentDateTime}</span>
                <span className="sm:hidden">{new Date().toLocaleTimeString()}</span>
              </div>
            </div>
            {activeComponent &&
              React.cloneElement(
                activeComponent as React.ReactElement<{
                  selectedGroup: 'GroupA' | 'GroupB' | 'GroupC' | 'GroupD';
                }>,
                {
                  selectedGroup: activeGroup,
                }
              )}
          </div>
        </div>
      </div>
    </div>
  );
}