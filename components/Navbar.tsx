import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  const baseClasses = "font-bold transition-all duration-200";
  const mobileClasses = `block px-4 py-3 rounded-xl text-lg ${isActive ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/20' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`;
  const desktopClasses = `px-4 py-2 rounded-xl text-sm ${isActive ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/20' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'}`;

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
    className="inline-flex items-center justify-center p-2 rounded-xl text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
    aria-controls="mobile-menu"
  >
    <span className="sr-only">Open main menu</span>
    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  </button>
);

const CloseIcon: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <button 
        onClick={onClick} 
        className="inline-flex items-center justify-center p-2 rounded-xl text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none" 
        aria-controls="mobile-menu" 
    >
        <span className="sr-only">Close main menu</span>
        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
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
    <nav className="bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <button onClick={() => navigateTo(Page.Home)} className="flex-shrink-0 flex items-center space-x-3 text-gray-900 dark:text-white font-black text-2xl tracking-tighter transition-transform hover:scale-[1.02] active:scale-[0.98]">
               <div className="p-2 bg-cyan-600 rounded-xl shadow-lg shadow-cyan-600/20">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                 </svg>
               </div>
               <span className="hidden sm:inline">PharmaTech <span className="text-cyan-600">Hub</span></span>
               <span className="sm:hidden text-cyan-600">PTH</span>
            </button>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-2">
              <NavLink page={Page.Home} currentPage={currentPage} setCurrentPage={navigateTo}>Home</NavLink>
              <NavLink page={Page.InteractionChecker} currentPage={currentPage} setCurrentPage={navigateTo}>Checker</NavLink>
              <NavLink page={Page.DoseCalculator} currentPage={currentPage} setCurrentPage={navigateTo}>Calculator</NavLink>
              <NavLink page={Page.Blog} currentPage={currentPage} setCurrentPage={navigateTo}>Blog</NavLink>
              <NavLink page={Page.Contact} currentPage={currentPage} setCurrentPage={navigateTo}>Contact</NavLink>
              <div className="ml-4 pl-4 border-l border-gray-200 dark:border-gray-800">
                <ThemeSwitcher />
              </div>
            </div>
          </div>
          <div className="md:hidden flex items-center space-x-4">
            <ThemeSwitcher />
            {isMobileMenuOpen ? <CloseIcon onClick={() => setIsMobileMenuOpen(false)} /> : <HamburgerIcon onClick={() => setIsMobileMenuOpen(true)} />}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 overflow-hidden"
            id="mobile-menu"
          >
              <div className="px-4 pt-2 pb-6 space-y-2">
                <NavLink page={Page.Home} currentPage={currentPage} setCurrentPage={handleMobileLinkClick} isMobile={true}>Home</NavLink>
                <NavLink page={Page.InteractionChecker} currentPage={currentPage} setCurrentPage={handleMobileLinkClick} isMobile={true}>Interaction Checker</NavLink>
                <NavLink page={Page.DoseCalculator} currentPage={currentPage} setCurrentPage={handleMobileLinkClick} isMobile={true}>Dose Calculator</NavLink>
                <NavLink page={Page.Blog} currentPage={currentPage} setCurrentPage={handleMobileLinkClick} isMobile={true}>Blog Hub</NavLink>
                <NavLink page={Page.Contact} currentPage={currentPage} setCurrentPage={handleMobileLinkClick} isMobile={true}>Contact Us</NavLink>
              </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;