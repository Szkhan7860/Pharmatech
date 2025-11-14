
import React, { useState, useRef, useEffect } from 'react';
import { getDrugInfo } from '../services/geminiService';
import { DrugInfo, Page } from '../types';

interface HomePageProps {
  setCurrentPage: (page: Page) => void;
}

const QuickLinkButton: React.FC<{ onClick: () => void; children: React.ReactNode; }> = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="flex items-center justify-center gap-3 w-full sm:w-auto text-left bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow transform hover:scale-105"
  >
    {children}
  </button>
);

const HomePage: React.FC<HomePageProps> = ({ setCurrentPage }) => {
  const [drugName, setDrugName] = useState('');
  const [drugInfo, setDrugInfo] = useState<DrugInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!drugName.trim()) return;

    setIsLoading(true);
    setError(null);
    setDrugInfo(null);

    try {
      const info = await getDrugInfo(drugName);
      setDrugInfo(info);
    } catch (err) {
      setError('Failed to fetch drug information. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const ResultCard: React.FC<{ info: DrugInfo }> = ({ info }) => (
    <div className="mt-8 w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 animate-fade-in">
      <h2 className="text-3xl font-bold text-cyan-400 mb-4">{info.name}</h2>
      
      <div className="grid md:grid-cols-2 gap-6 text-left">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 border-b-2 border-cyan-500 pb-2 mb-3">Uses</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
            {info.uses.map((use, index) => <li key={index}>{use}</li>)}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 border-b-2 border-cyan-500 pb-2 mb-3">Dosage</h3>
          <p className="text-gray-700 dark:text-gray-300">{info.dosage}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 border-b-2 border-cyan-500 pb-2 mb-3">Side Effects</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
            {info.sideEffects.map((effect, index) => <li key={index}>{effect}</li>)}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 border-b-2 border-cyan-500 pb-2 mb-3">Substitutes</h3>
          {info.substitutes && info.substitutes.length > 0 ? (
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              {info.substitutes.map((sub, index) => <li key={index}>{sub}</li>)}
            </ul>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No specific substitutes listed.</p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-2">PharmaTech Hub</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">Your gateway to pharmaceutical + technology insights.</p>
      
      <form onSubmit={handleSearch} className="w-full max-w-xl">
        <div className="flex items-center bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 rounded-full shadow-lg overflow-hidden">
          <input
            ref={inputRef}
            type="text"
            value={drugName}
            onChange={(e) => setDrugName(e.target.value)}
            placeholder="Enter medicine name (e.g., Aspirin)"
            className="w-full bg-transparent p-4 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none"
            aria-label="Medicine name"
          />
          <button
            type="submit"
            disabled={isLoading || !drugName.trim()}
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-4 px-6 transition-all duration-300 disabled:bg-gray-500 dark:disabled:bg-gray-600 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30"
            aria-label="Search for medicine"
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : 'Search'}
          </button>
        </div>
      </form>
      
      <div className="mt-12 w-full max-w-4xl flex flex-col sm:flex-row flex-wrap justify-center gap-4">
        <QuickLinkButton onClick={() => setCurrentPage(Page.InteractionChecker)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11" />
          </svg>
          <span>Interaction Checker</span>
        </QuickLinkButton>
        <QuickLinkButton onClick={() => setCurrentPage(Page.Blog)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 12h6m-3-4h.01M17 16h.01" />
          </svg>
          <span>Blog Hub</span>
        </QuickLinkButton>
        <QuickLinkButton onClick={() => setCurrentPage(Page.Contact)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span>Contact Us</span>
        </QuickLinkButton>
      </div>

      {error && <p className="mt-4 text-red-500 dark:text-red-400">{error}</p>}
      {drugInfo && <ResultCard info={drugInfo} />}
    </div>
  );
};

export default HomePage;