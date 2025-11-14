import React, { useState } from 'react';
import { checkDrugInteractions } from '../services/geminiService';
import { InteractionResult, InteractionSeverity } from '../types';

// Icon components for different severity levels
const SevereIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
);

const ModerateIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const MildIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const NoneIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const InteractionCheckerPage: React.FC = () => {
  const [drug1, setDrug1] = useState('');
  const [drug2, setDrug2] = useState('');
  const [interactionResult, setInteractionResult] = useState<InteractionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!drug1.trim() || !drug2.trim()) return;

    setIsLoading(true);
    setError(null);
    setInteractionResult(null);

    try {
      const result = await checkDrugInteractions(drug1, drug2);
      setInteractionResult(result);
    } catch (err) {
      setError('Failed to check interactions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getSeverityInfo = (severity: InteractionSeverity) => {
    switch (severity) {
      case 'Severe':
        return {
          styles: 'bg-red-100 dark:bg-red-900/50 border-red-500 text-red-800 dark:text-red-200',
          icon: <SevereIcon />,
        };
      case 'Moderate':
        return {
          styles: 'bg-orange-100 dark:bg-orange-900/50 border-orange-500 text-orange-800 dark:text-orange-200',
          icon: <ModerateIcon />,
        };
      case 'Mild':
        return {
          styles: 'bg-yellow-100 dark:bg-yellow-900/50 border-yellow-500 text-yellow-800 dark:text-yellow-200',
          icon: <MildIcon />,
        };
      case 'None':
        return {
          styles: 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-800 dark:text-green-200',
          icon: <NoneIcon />,
        };
      default:
        return {
          styles: 'bg-gray-200 dark:bg-gray-700 border-gray-500 text-gray-800 dark:text-gray-200',
          icon: null,
        };
    }
  };
  
  const ResultCard: React.FC<{ result: InteractionResult }> = ({ result }) => {
    const { styles, icon } = getSeverityInfo(result.severity);
    return (
      <div className={`mt-8 w-full max-w-3xl rounded-lg shadow-xl p-6 border-l-8 ${styles} animate-fade-in text-left`}>
        <div className="flex items-center mb-4">
            {icon}
            <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider opacity-80">Interaction Severity</h3>
                <p className="text-2xl font-bold">{result.severity}</p>
            </div>
        </div>
        <p className="text-lg">{result.description}</p>
      </div>
    );
  };


  return (
    <div className="flex flex-col items-center text-center px-4">
      <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-2">Drug Interaction Checker</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">Enter two drug names to check for potential harmful interactions.</p>
      
      <form onSubmit={handleCheck} className="w-full max-w-xl space-y-4">
        <input
          type="text"
          value={drug1}
          onChange={(e) => setDrug1(e.target.value)}
          placeholder="Enter first drug name"
          className="w-full bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 rounded-lg p-4 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-cyan-500"
          aria-label="First drug name"
        />
        <input
          type="text"
          value={drug2}
          onChange={(e) => setDrug2(e.target.value)}
          placeholder="Enter second drug name"
          className="w-full bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 rounded-lg p-4 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-cyan-500"
          aria-label="Second drug name"
        />
        <button
          type="submit"
          disabled={isLoading || !drug1.trim() || !drug2.trim()}
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 disabled:bg-gray-500 dark:disabled:bg-gray-600 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30"
          aria-label="Check for interactions"
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : 'Check Interactions'}
        </button>
      </form>
      
      {error && <p className="mt-4 text-red-500 dark:text-red-400">{error}</p>}
      {interactionResult && <ResultCard result={interactionResult} />}
    </div>
  );
};

export default InteractionCheckerPage;
