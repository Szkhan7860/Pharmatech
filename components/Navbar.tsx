import React, { useState } from 'react';
import { Page } from '../types';
import ThemeSwitcher from './ThemeSwitcher';

interface NavbarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const NavLink: React.FC<{
  page: Page;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  children: React.ReactNode;
  isMobile?: boolean;
}> = ({ page, currentPage, setCurrentPage, children, isMobile = false }) => {
  const isActive = currentPage === page;
  const baseClasses = "font-medium transition-colors duration-200";
  const mobileClasses = `block px-3 py-2 rounded-md text-base ${isActive ? 'bg-cyan-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`;
  const desktopClasses = `px-3 py-2 rounded-md text-sm ${isActive ? 'bg-cyan-500 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'}`;

  return (
    <button
      onClick={() => setCurrentPage(page)}
      className={`${baseClasses} ${isMobile ? mobileClasses : desktopClasses}`}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
    </button>
  );
};

const HamburgerIcon: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
    aria-controls="mobile-menu"
    aria-expanded="false"
  >
    <span className="sr-only">Open main menu</span>
    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  </button>
);

const CloseIcon: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <button 
        onClick={onClick} 
        className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" 
        aria-controls="mobile-menu" 
        aria-expanded="true"
    >
        <span className="sr-only">Close main menu</span>
        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
    </button>
);


const Navbar: React.FC<NavbarProps> = ({ currentPage, setCurrentPage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigateTo = (page: Page) => {
    if (page !== currentPage) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setCurrentPage(page);
  };
  
  const handleMobileLinkClick = (page: Page) => {
    navigateTo(page);
    setIsMobileMenuOpen(false);
  }

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button onClick={() => navigateTo(Page.Home)} className="flex-shrink-0 flex items-center space-x-2 text-gray-800 dark:text-white font-bold text-xl">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
               <span>PharmaTech Hub</span>
            </button>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <NavLink page={Page.Home} currentPage={currentPage} setCurrentPage={navigateTo}>Home</NavLink>
              <NavLink page={Page.InteractionChecker} currentPage={currentPage} setCurrentPage={navigateTo}>Interaction Checker</NavLink>
              <NavLink page={Page.Blog} currentPage={currentPage} setCurrentPage={navigateTo}>Blog Hub</NavLink>
              <NavLink page={Page.Contact} currentPage={currentPage} setCurrentPage={navigateTo}>Contact</NavLink>
              <ThemeSwitcher />
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <ThemeSwitcher />
            {isMobileMenuOpen ? <CloseIcon onClick={() => setIsMobileMenuOpen(false)} /> : <HamburgerIcon onClick={() => setIsMobileMenuOpen(true)} />}
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <NavLink page={Page.Home} currentPage={currentPage} setCurrentPage={handleMobileLinkClick} isMobile={true}>Home</NavLink>
              <NavLink page={Page.InteractionChecker} currentPage={currentPage} setCurrentPage={handleMobileLinkClick} isMobile={true}>Interaction Checker</NavLink>
              <NavLink page={Page.Blog} currentPage={currentPage} setCurrentPage={handleMobileLinkClick} isMobile={true}>Blog Hub</NavLink>
              <NavLink page={Page.Contact} currentPage={currentPage} setCurrentPage={handleMobileLinkClick} isMobile={true}>Contact</NavLink>
            </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;