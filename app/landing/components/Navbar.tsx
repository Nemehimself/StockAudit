'use client';

import React, { useEffect, useRef, useState } from 'react';

import { MdClose, MdMenu, MdOutlineArrowRightAlt } from 'react-icons/md';
import Link from 'next/link';
import OutlineButton from './buttons/outlineButton';
import SolidButton from './buttons/solidButton';
import { RxCaretDown } from 'react-icons/rx';
import DropdownMenuDemo from './buttons/DropDownBtn';

const Logo = () => {
  return (
    <Link href="/landing">
      <h1 className="text-3xl font-semibold">MCOM BOT</h1>
    </Link>
  );
};

interface NavItem {
  label: string;
  link: string;
}

const businessPerks: NavItem[] = [
  { label: 'Mcom Early Access', link: '/landing/early-access' },
  { label: 'Mcom Giveaways', link: '/landing/mcom-giveaway' },
  { label: 'Mcom Points, Badges, Stamp', link: '/landing/mcom-points' },
  { label: 'Mcom Discount Reward', link: '/landing/mcom-discount-reward' },
  { label: 'Mcom Social Awareness', link: '/landing/social-awareness' },
  { label: 'Mcom Cashback', link: '/landing/cashback' },
  { label: 'Refer a friend', link: '/landing/refer' },
  { label: 'Mcom Contest', link: '/landing/contest' },
  { label: 'Drive more Traffic', link: '/landing/more-traffic' },
];

export const solutions: NavItem[] = [
  { label: 'Cafes', link: '/landing' },
  { label: 'Restaurants', link: '/landing' },
  { label: 'Education', link: '/landing' },
  { label: 'Services', link: '/landing' },
  { label: 'Medicine and Health', link: '/landing' },
  { label: 'Messages', link: '/landing' },
  { label: 'Hair Saloon', link: '/landing' },
  { label: 'Fitness Center', link: '/landing' },
  { label: 'Small Business', link: '/landing' },
  { label: 'Bakeries', link: '/landing' },
  { label: 'Children', link: '/landing' },
  { label: 'Wellness Centers', link: '/landing' },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const mobileMenuRef = useRef<HTMLUListElement>(null);
  const dropdownRefs = useRef<{ [key: string]: HTMLLIElement | null }>({});

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleDropdownClick = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  // Close dropdown or mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close mobile menu if clicked outside
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }

      // Close dropdown if clicked outside
      if (openDropdown && dropdownRefs.current[openDropdown]) {
        const dropdownElement = dropdownRefs.current[openDropdown];
        if (
          dropdownElement &&
          !dropdownElement.contains(event.target as Node)
        ) {
          setOpenDropdown(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown]);

  const navItems = [
    { label: 'Mcom Perks for Business', dropdown: businessPerks },
    {
      label: 'Bot Solutions',
      dropdown: solutions,
    },
    {
      label: 'White Label',
      dropdown: [],
      link: '/landing/white-label',
    },
    {
      label: 'Bot Pricing',
      dropdown: [],
      link: '/landing/pricing',
    },
    {
      label: 'Contact',
      dropdown: [],
    },
    {
      label: 'Support',
      dropdown: [],
    },
  ];

  return (
    <nav className="w-screen text-[#434857] flex items-center justify-between gap-14 bg-[#fff] h-[4rem] px-4 sm:px-8 relative">
      <Logo />
      {/* Hamburger Menu for Mobile */}
      <div className="lg:hidden cursor-pointer" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
      </div>
      {/* Navigation Links */}
      <ul
        ref={mobileMenuRef}
        className={`${
          isMobileMenuOpen ? 'flex' : 'hidden'
        } lg:flex flex-col lg:flex-row absolute lg:static top-[4rem] left-0 w-full lg:w-auto bg-[#F6F9FC] lg:bg-transparent gap-4 lg:gap-[2rem] font-semibold text-opacity-100 cursor-pointer p-4 lg:p-0 z-50 lg:h-full`}
      >
        {navItems.map(item => (
          <li
            key={item.label}
            className="relative group flex flex-col sm:items-center gap-2 sm:h-full"
            ref={el => {
              dropdownRefs.current[item.label] = el;
            }}
            onClick={() => handleDropdownClick(item.label)}
          >
            <span className="flex items-center justify-start h-full w-full ">
              <Link href={item.link ? item.link : '/landing'}>
                <p>{item.label}</p>
              </Link>

              {item.dropdown.length > 0 && (
                <RxCaretDown fontSize={30} className="opacity-50" />
              )}
            </span>

            <ul
              className={`${
                openDropdown === item.label ? 'block' : 'hidden'
              } sm:absolute sm:left-0 sm:top-11 sm:mt-2 sm:w-48 sm:bg-white sm:shadow-lg sm:rounded-lg sm:opacity-0 sm:group-hover:opacity-100 sm:group-hover:block sm:transition-opacity sm:duration-300`}
            >
              {item.dropdown.map((subItem, index) => (
                <Link key={index} href={subItem.link}>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    {subItem.label}
                  </li>
                </Link>
              ))}
            </ul>
          </li>
        ))}
        <div className="flex lg:hidden gap-3">
          <OutlineButton color="primary">
            <MdOutlineArrowRightAlt />
            <Link href="/signin">Login</Link>
          </OutlineButton>
          <Link href="/signup">
            <SolidButton>Start using</SolidButton>
          </Link>
        </div>
      </ul>

      <div className="lg:flex hidden gap-3">
        <OutlineButton color="darkPrimary">
          <MdOutlineArrowRightAlt />
          <Link href="/signin">Login</Link>
        </OutlineButton>
        {/* <Link href="/register">
          <SolidButton>Start using</SolidButton>
        </Link> */}

        <DropdownMenuDemo />
      </div>
    </nav>
  );
};

export default Navbar;
