import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, LogIn, Menu, X, Pill, Activity, BookOpen, Calculator, MessageSquare, Home, Clock, Info, Camera } from 'lucide-react';
import { Page } from '../types';
import ThemeSwitcher from './ThemeSwitcher';
import { auth } from '../firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';

interface NavbarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const NavLink: React.FC<{
  page: Page;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
  isMobile?: boolean;
}> = ({ page, currentPage, setCurrentPage, children, icon, isMobile = false }) => {
  const isActive = currentPage === page;
  const baseClasses = "font-bold transition-all duration-200 flex items-center space-x-2";
  const mobileClasses = `w-full px-4 py-3 rounded-xl text-lg ${isActive ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/20' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`;
  const desktopClasses = `px-4 py-2 rounded-xl text-sm ${isActive ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/20' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'}`;

  return (
    <button
      onClick={() => setCurrentPage(page)}
      className={`${baseClasses} ${isMobile ? mobileClasses : desktopClasses}`}
      aria-current={isActive ? 'page' : undefined}
    >
      {icon && <span className={isMobile ? "w-6 h-6" : "w-4 h-4"}>{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

const Navbar: React.FC<NavbarProps> = ({ currentPage, setCurrentPage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const navigateTo = (page: Page) => {
    if (page !== currentPage) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <button onClick={() => navigateTo(Page.Home)} className="flex-shrink-0 flex items-center space-x-3 text-gray-900 dark:text-white font-black text-2xl tracking-tighter transition-transform hover:scale-[1.02] active:scale-[0.98]">
               <div className="p-2 bg-cyan-600 rounded-xl shadow-lg shadow-cyan-600/20">
                 <Pill className="h-6 w-6 text-white" />
               </div>
               <span className="text-gray-900 dark:text-white">PharmaTech <span className="text-cyan-600">Hub</span></span>
            </button>
          </div>

          <div className="hidden xl:block">
            <div className="ml-10 flex items-center space-x-1">
              <NavLink page={Page.Home} currentPage={currentPage} setCurrentPage={navigateTo} icon={<Home />}>Home</NavLink>
              <NavLink page={Page.InteractionChecker} currentPage={currentPage} setCurrentPage={navigateTo} icon={<Activity />}>Checker</NavLink>
              <NavLink page={Page.SymptomChecker} currentPage={currentPage} setCurrentPage={navigateTo} icon={<Activity />}>Symptoms</NavLink>
              <NavLink page={Page.PrescriptionScanner} currentPage={currentPage} setCurrentPage={navigateTo} icon={<Camera />}>Scanner</NavLink>
              <NavLink page={Page.DoseCalculator} currentPage={currentPage} setCurrentPage={navigateTo} icon={<Calculator />}>Calculator</NavLink>
              <NavLink page={Page.Quiz} currentPage={currentPage} setCurrentPage={navigateTo} icon={<BookOpen />}>Quiz</NavLink>
              <NavLink page={Page.Blog} currentPage={currentPage} setCurrentPage={navigateTo} icon={<MessageSquare />}>Blog</NavLink>
              <NavLink page={Page.About} currentPage={currentPage} setCurrentPage={navigateTo} icon={<Info />}>About</NavLink>
              <div className="ml-4 pl-4 border-l border-gray-200 dark:border-gray-800 flex items-center space-x-4">
                <ThemeSwitcher />
                {user ? (
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => navigateTo(Page.History)}
                      className={`p-2 rounded-xl transition-all ${currentPage === Page.History ? 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                      title="History"
                    >
                      <Clock className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => navigateTo(Page.Profile)}
                      className={`flex items-center space-x-2 p-1 pr-4 rounded-full border-2 transition-all ${currentPage === Page.Profile ? 'border-cyan-600 bg-cyan-50 dark:bg-cyan-900/20' : 'border-transparent hover:border-gray-200 dark:hover:border-gray-800'}`}
                    >
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center text-white">
                        <User className="w-5 h-5" />
                      </div>
                    )}
                    <span className="text-sm font-bold text-gray-900 dark:text-white truncate max-w-[100px]">
                      {user.displayName || 'Profile'}
                    </span>
                  </button>
                </div>
                ) : (
                  <button 
                    onClick={() => navigateTo(Page.Auth)}
                    className="flex items-center space-x-2 bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-xl font-black text-sm transition-all shadow-lg shadow-cyan-600/20"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Sign In</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="xl:hidden flex items-center space-x-4">
            <ThemeSwitcher />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              <NavLink page={Page.Home} currentPage={currentPage} setCurrentPage={navigateTo} isMobile icon={<Home />}>Home</NavLink>
              <NavLink page={Page.InteractionChecker} currentPage={currentPage} setCurrentPage={navigateTo} isMobile icon={<Activity />}>Interaction Checker</NavLink>
              <NavLink page={Page.SymptomChecker} currentPage={currentPage} setCurrentPage={navigateTo} isMobile icon={<Activity />}>Symptom Checker</NavLink>
              <NavLink page={Page.PrescriptionScanner} currentPage={currentPage} setCurrentPage={navigateTo} isMobile icon={<Camera />}>Prescription Scanner</NavLink>
              <NavLink page={Page.DoseCalculator} currentPage={currentPage} setCurrentPage={navigateTo} isMobile icon={<Calculator />}>Dose Calculator</NavLink>
              <NavLink page={Page.Quiz} currentPage={currentPage} setCurrentPage={navigateTo} isMobile icon={<BookOpen />}>Quiz Mode</NavLink>
              <NavLink page={Page.Blog} currentPage={currentPage} setCurrentPage={navigateTo} isMobile icon={<MessageSquare />}>Blog Hub</NavLink>
              <NavLink page={Page.About} currentPage={currentPage} setCurrentPage={navigateTo} isMobile icon={<Info />}>About Project</NavLink>
              <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                {user ? (
                  <div className="space-y-2">
                    <button 
                      onClick={() => navigateTo(Page.History)}
                      className={`w-full flex items-center space-x-4 p-4 rounded-2xl ${currentPage === Page.History ? 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600' : 'bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-300'}`}
                    >
                      <Clock className="w-6 h-6" />
                      <span className="font-black">Activity History</span>
                    </button>
                    <button 
                      onClick={() => navigateTo(Page.Profile)}
                      className="w-full flex items-center space-x-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-900"
                    >
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="Profile" className="w-12 h-12 rounded-full object-cover" />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-cyan-600 flex items-center justify-center text-white">
                        <User className="w-6 h-6" />
                      </div>
                    )}
                    <div className="text-left">
                      <p className="font-black text-gray-900 dark:text-white">{user.displayName || 'User'}</p>
                      <p className="text-xs text-gray-500 font-bold">View Profile</p>
                    </div>
                  </button>
                </div>
                ) : (
                  <button 
                    onClick={() => navigateTo(Page.Auth)}
                    className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-black py-4 rounded-2xl transition-all flex items-center justify-center space-x-3"
                  >
                    <LogIn className="w-6 h-6" />
                    <span className="text-lg">Sign In</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;