
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Pill, ShieldAlert, BookOpen, Mail, ArrowRight, Calculator } from 'lucide-react';
import { getDrugInfo } from '../services/geminiService';
import { DrugInfo, Page } from '../types';

interface HomePageProps {
  setCurrentPage: (page: Page) => void;
}

const FeatureCard: React.FC<{ 
  onClick: () => void; 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  color: string;
}> = ({ onClick, icon, title, description, color }) => (
  <motion.button
    whileHover={{ y: -8, scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="flex flex-col items-start p-6 md:p-10 bg-white dark:bg-gray-900 rounded-2xl md:rounded-[2.5rem] shadow-xl border border-gray-200 dark:border-gray-800 text-left group transition-all duration-300 relative overflow-hidden"
  >
    <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 dark:bg-black rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
    
    <div className={`p-4 rounded-2xl mb-6 ${color} bg-opacity-10 dark:bg-opacity-20 group-hover:scale-110 transition-transform duration-300 relative z-10`}>
      {React.cloneElement(icon as React.ReactElement, { className: `w-7 h-7 md:w-8 md:h-8 ${color.replace('bg-', 'text-')}` })}
    </div>
    <h3 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white mb-3 relative z-10 tracking-tight">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed text-sm md:text-base relative z-10">{description}</p>
    <div className="mt-auto flex items-center text-sm font-black text-cyan-600 dark:text-cyan-500 group-hover:translate-x-2 transition-transform duration-300 relative z-10 uppercase tracking-widest">
      <span>Launch Tool</span>
      <ArrowRight className="ml-2 w-4 h-4" />
    </div>
  </motion.button>
);

const HomePage: React.FC<HomePageProps> = ({ setCurrentPage }) => {
  const [drugName, setDrugName] = useState('');
  const [drugInfo, setDrugInfo] = useState<DrugInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 md:mt-16 w-full max-w-5xl bg-white dark:bg-gray-900 rounded-2xl md:rounded-[3rem] shadow-2xl p-6 md:p-16 border border-gray-200 dark:border-gray-800 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/5 rounded-full -mr-48 -mt-48 blur-3xl" />
      
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 md:mb-16 gap-6">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-500">Clinical Drug Profile</span>
            <h2 className="text-4xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tighter leading-tight">{info.name}</h2>
          </div>
          <div className="self-start md:self-center flex items-center space-x-3 px-6 py-3 bg-cyan-50 dark:bg-cyan-900/30 rounded-2xl text-cyan-600 dark:text-cyan-400 font-black uppercase tracking-widest text-xs">
            <Pill className="w-5 h-5" />
            <span>AI Verified</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 text-left">
          <div className="space-y-10 md:space-y-12">
            <section>
              <h3 className="text-lg md:text-xl font-black text-gray-900 dark:text-white mb-6 flex items-center tracking-tight">
                <div className="w-2 h-6 bg-cyan-600 rounded-full mr-4" />
                Primary Indications
              </h3>
              <ul className="space-y-4">
                {info.uses.map((use, index) => (
                  <li key={index} className="flex items-start text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed">
                    <div className="mt-2.5 mr-4 w-1.5 h-1.5 rounded-full bg-cyan-600 shrink-0" />
                    {use}
                  </li>
                ))}
              </ul>
            </section>
            
            <section>
              <h3 className="text-lg md:text-xl font-black text-gray-900 dark:text-white mb-6 flex items-center tracking-tight">
                <div className="w-2 h-6 bg-amber-500 rounded-full mr-4" />
                Dosage Guidelines
              </h3>
              <div className="p-6 md:p-8 bg-amber-50 dark:bg-amber-900/20 rounded-2xl md:rounded-3xl border border-amber-100 dark:border-amber-900/30">
                <p className="text-amber-900 dark:text-amber-200 text-base md:text-lg leading-relaxed font-medium italic">
                  {info.dosage}
                </p>
              </div>
            </section>
          </div>

          <div className="space-y-10 md:space-y-12">
            <section>
              <h3 className="text-lg md:text-xl font-black text-gray-900 dark:text-white mb-6 flex items-center tracking-tight">
                <div className="w-2 h-6 bg-rose-600 rounded-full mr-4" />
                Common Side Effects
              </h3>
              <div className="flex flex-wrap gap-3">
                {info.sideEffects.map((effect, index) => (
                  <span key={index} className="px-4 py-2 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 rounded-xl text-sm md:text-base font-bold border border-rose-100 dark:border-rose-900/30">
                    {effect}
                  </span>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-lg md:text-xl font-black text-gray-900 dark:text-white mb-6 flex items-center tracking-tight">
                <div className="w-2 h-6 bg-emerald-500 rounded-full mr-4" />
                Potential Substitutes
              </h3>
              {info.substitutes && info.substitutes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {info.substitutes.map((sub, index) => (
                    <div key={index} className="p-4 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-xl text-sm md:text-base font-black border border-emerald-100 dark:border-emerald-900/30 text-center uppercase tracking-widest">
                      {sub}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">No common substitutes listed.</p>
              )}
            </section>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-24">
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center space-y-8 mb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-cyan-50 dark:bg-cyan-900/30 rounded-full text-cyan-600 dark:text-cyan-400 text-sm font-bold mb-4"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span>Next-Gen Pharmaceutical Intelligence</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-6xl md:text-8xl font-black text-gray-900 dark:text-white tracking-tight leading-[1.1] md:leading-[0.9]"
        >
          Your Gateway to <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-700 dark:from-cyan-400 dark:to-blue-500">PharmaTech</span> Insights
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed px-4"
        >
          Access real-time drug information, check interactions, and calculate dosages with our AI-powered clinical toolkit.
        </motion.p>
        
        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSearch} 
          className="w-full max-w-2xl px-2"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl sm:rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative flex flex-col sm:flex-row items-center bg-white dark:bg-gray-900 rounded-2xl sm:rounded-[2rem] shadow-2xl overflow-hidden p-2 border border-gray-200 dark:border-gray-800">
              <div className="hidden sm:flex pl-6 text-gray-400">
                <Search className="w-6 h-6" />
              </div>
              <input
                ref={inputRef}
                type="text"
                value={drugName}
                onChange={(e) => setDrugName(e.target.value)}
                placeholder="Search medicine (e.g., Metformin)"
                className="w-full bg-transparent py-4 px-4 text-base md:text-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none"
              />
              <button
                type="submit"
                disabled={isLoading || !drugName.trim()}
                className="w-full sm:w-auto bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-500 dark:hover:bg-cyan-600 text-white font-black py-4 px-8 sm:px-10 rounded-xl sm:rounded-[1.5rem] transition-all duration-300 disabled:bg-gray-300 dark:disabled:bg-gray-800 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Search</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.form>
      </div>

      <AnimatePresence>
        {error && (
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center text-rose-600 dark:text-rose-400 font-bold mb-8"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {drugInfo && <ResultCard info={drugInfo} />}
      </AnimatePresence>
      
      {/* Features Grid */}
      {!drugInfo && (
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          <FeatureCard 
            onClick={() => setCurrentPage(Page.InteractionChecker)}
            icon={<ShieldAlert />}
            title="Interaction Checker"
            description="Identify potential harmful drug-to-drug interactions instantly with our AI engine."
            color="bg-rose-600"
          />
          <FeatureCard 
            onClick={() => setCurrentPage(Page.DoseCalculator)}
            icon={<Calculator />}
            title="Dose Calculator"
            description="Calculate pediatric and adult dosages using standard clinical formulas like BSA and Clark's Rule."
            color="bg-cyan-600"
          />
          <FeatureCard 
            onClick={() => setCurrentPage(Page.Blog)}
            icon={<BookOpen />}
            title="Knowledge Hub"
            description="Stay updated with the latest trends in pharmaceutical technology and AI in healthcare."
            color="bg-emerald-600"
          />
        </motion.div>
      )}
    </div>
  );
};

export default HomePage;