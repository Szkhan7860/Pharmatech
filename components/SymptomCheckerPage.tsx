import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ShieldAlert, Pill, ArrowRight, Activity } from 'lucide-react';
import { getSymptomSuggestions } from '../services/geminiService';
import { SymptomSuggestion } from '../types';

const SymptomCheckerPage: React.FC = () => {
  const [symptoms, setSymptoms] = useState('');
  const [suggestion, setSuggestion] = useState<SymptomSuggestion | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim()) return;

    setIsLoading(true);
    setError(null);
    setSuggestion(null);

    try {
      const result = await getSymptomSuggestions(symptoms);
      setSuggestion(result);
    } catch (err) {
      setError('Failed to get suggestions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-16">
      <div className="text-center space-y-6 mb-12 md:mb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-cyan-50 dark:bg-cyan-900/30 rounded-full text-cyan-600 dark:text-cyan-400 font-black uppercase tracking-widest text-xs mb-4"
        >
          <Activity className="w-4 h-4" />
          <span>Symptom Analyzer</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white tracking-tighter leading-tight"
        >
          Symptom to <span className="text-cyan-600">Drug</span>
        </motion.h1>
        
        <p className="text-lg md:text-2xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed font-medium">
          Enter your symptoms to get AI-powered first-line drug suggestions.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleCheck} className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative flex flex-col md:flex-row gap-3 md:gap-4 bg-white dark:bg-gray-900 p-3 md:p-4 rounded-2xl md:rounded-[2rem] shadow-2xl border border-gray-100 dark:border-gray-800">
            <div className="flex-1 flex items-center px-3 md:px-4">
              <Search className="w-5 h-5 md:w-6 md:h-6 text-gray-400 mr-3 md:mr-4" />
              <input
                type="text"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="e.g., Fever, headache..."
                className="w-full bg-transparent border-none focus:ring-0 text-gray-900 dark:text-white text-base md:text-lg placeholder-gray-500"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-cyan-600 hover:bg-cyan-700 text-white font-black py-3 md:py-4 px-6 md:px-8 rounded-xl md:rounded-2xl transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-cyan-600/20"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Analyze</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </form>

        {error && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 text-rose-500 text-center font-bold"
          >
            {error}
          </motion.p>
        )}

        <AnimatePresence>
          {suggestion && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-12 space-y-8"
            >
              <div className="bg-white dark:bg-gray-900 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-600/5 rounded-full -mr-32 -mt-32 blur-3xl" />
                
                <div className="relative z-10 space-y-8 md:space-y-10">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6">
                    <div className="space-y-1 md:space-y-2">
                      <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-cyan-600">Analysis Results</span>
                      <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">Suggested Medications</h2>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {suggestion.suggestedDrugs.map((drug, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-6 bg-gray-50 dark:bg-black rounded-3xl border border-gray-100 dark:border-gray-800 group hover:border-cyan-600/30 transition-colors"
                      >
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="p-3 bg-cyan-50 dark:bg-cyan-900/30 rounded-2xl text-cyan-600 group-hover:scale-110 transition-transform">
                            <Pill className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="text-xl font-black text-gray-900 dark:text-white">{drug.name}</h3>
                            <p className="text-xs font-bold text-cyan-600 uppercase tracking-widest">{drug.class}</p>
                          </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {drug.reason}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="p-5 sm:p-6 md:p-8 bg-rose-50 dark:bg-rose-950/40 rounded-2xl md:rounded-3xl border border-rose-100 dark:border-rose-900/30">
                    <div className="flex items-start space-x-3 md:space-x-4">
                      <ShieldAlert className="w-5 h-5 md:w-6 md:h-6 text-rose-600 dark:text-rose-400 shrink-0 mt-1" />
                      <div className="space-y-1 md:space-y-2">
                        <h4 className="text-base md:text-lg font-black text-rose-900 dark:text-rose-200">Medical Disclaimer</h4>
                        <p className="text-sm md:text-base text-rose-800 dark:text-rose-300 leading-relaxed italic">
                          {suggestion.disclaimer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SymptomCheckerPage;
