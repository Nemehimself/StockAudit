import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="w-full py-6  px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main footer content */}
        <div className="flex flex-col space-y-8 lg:space-y-0 lg:flex-row lg:justify-between">
          {/* Left section - Logo and description */}
          <div className="w-full lg:w-1/3 lg:pr-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
              MCOM REDEEM and EXCHANGES
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Loyalty application for every business. Your customer collects
              points, credit, rewards or coupons for purchasing or visiting your
              business. Reward your customers too, and they will surely come
              back to you.
            </p>
          </div>

          {/* Right section - Navigation */}
          <div className="flex flex-col sm:flex-row space-y-8 sm:space-y-0 sm:space-x-16 lg:space-x-24">
            {/* First navigation column */}
            <nav className="flex-shrink-0">
              <ul className="space-y-3 sm:space-y-4">
                <li>
                  <Link
                    href="/loyalty-programs"
                    className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200"
                  >
                    Loyalty programs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/functions"
                    className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200"
                  >
                    Functions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/segments"
                    className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200"
                  >
                    Segments
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Second navigation column */}
            <nav className="flex-shrink-0">
              <ul className="space-y-3 sm:space-y-4">
                <li>
                  <Link
                    href="/terms"
                    className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200"
                  >
                    Privacy
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Copyright notice */}
        <div className="mt-8 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-400">
            © All rights reserved. Made by MCOM
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
