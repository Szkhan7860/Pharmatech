import React, { useState } from 'react';
import { Page } from './types';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import InteractionCheckerPage from './components/InteractionCheckerPage';
import BlogPage from './components/BlogPage';
import ContactPage from './components/ContactPage';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);

  const renderPage = () => {
    switch (currentPage) {
      case Page.Home:
        return <HomePage setCurrentPage={setCurrentPage} />;
      case Page.InteractionChecker:
        return <InteractionCheckerPage />;
      case Page.Blog:
        return <BlogPage />;
      case Page.Contact:
        return <ContactPage />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col text-gray-900 dark:text-gray-100 font-sans">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main key={currentPage} className="flex-grow p-4 sm:p-6 lg:p-8 animate-fade-in">
        {renderPage()}
      </main>
      <Footer currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default App;