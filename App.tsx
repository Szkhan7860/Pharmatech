import React, { useState } from 'react';
import { Page } from './types';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import InteractionCheckerPage from './components/InteractionCheckerPage';
import SymptomCheckerPage from './components/SymptomCheckerPage';
import DoseCalculatorPage from './components/DoseCalculatorPage';
import QuizPage from './components/QuizPage';
import BlogPage from './components/BlogPage';
import ContactPage from './components/ContactPage';
import AuthPage from './components/AuthPage';
import ProfilePage from './components/ProfilePage';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);

  const renderPage = () => {
    switch (currentPage) {
      case Page.Home:
        return <HomePage setCurrentPage={setCurrentPage} />;
      case Page.InteractionChecker:
        return <InteractionCheckerPage />;
      case Page.SymptomChecker:
        return <SymptomCheckerPage />;
      case Page.DoseCalculator:
        return <DoseCalculatorPage />;
      case Page.Quiz:
        return <QuizPage />;
      case Page.Blog:
        return <BlogPage />;
      case Page.Contact:
        return <ContactPage />;
      case Page.Auth:
        return <AuthPage setCurrentPage={setCurrentPage} />;
      case Page.Profile:
        return <ProfilePage setCurrentPage={setCurrentPage} />;
      case Page.AdminPanel:
        return <AdminPanel setCurrentPage={setCurrentPage} />;
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