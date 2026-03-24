import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, AlertTriangle, Info, CheckCircle2, Search, ArrowRight, Pill, Share2, Check } from 'lucide-react';
import { checkDrugInteractions } from '../services/geminiService';
import { InteractionResult, InteractionSeverity } from '../types';

const InteractionCheckerPage: React.FC = () => {
  const [drug1, setDrug1] = useState('');
  const [drug2, setDrug2] = useState('');
  const [interactionResult, setInteractionResult] = useState<InteractionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCopyToast, setShowCopyToast] = useState(false);

  const handleShare = (result: InteractionResult) => {
    const text = `Interaction between ${result.drugs[0]} and ${result.drugs[1]} is ${result.severity}: ${result.description}`;
    navigator.clipboard.writeText(text).then(() => {
      setShowCopyToast(true);
      setTimeout(() => setShowCopyToast(false), 3000);
    });
  };

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
          bg: 'bg-rose-50 dark:bg-rose-950/40',
          border: 'border-rose-500',
          text: 'text-rose-800 dark:text-rose-300',
          accent: 'bg-rose-500',
          icon: <ShieldAlert className="w-8 h-8 md:w-10 md:h-10" />,
        };
      case 'Moderate':
        return {
          bg: 'bg-amber-50 dark:bg-amber-950/40',
          border: 'border-amber-500',
          text: 'text-amber-800 dark:text-amber-300',
          accent: 'bg-amber-500',
          icon: <AlertTriangle className="w-8 h-8 md:w-10 md:h-10" />,
        };
      case 'Mild':
        return {
          bg: 'bg-blue-50 dark:bg-blue-950/40',
          border: 'border-blue-500',
          text: 'text-blue-800 dark:text-blue-300',
          accent: 'bg-blue-500',
          icon: <Info className="w-8 h-8 md:w-10 md:h-10" />,
        };
      case 'None':
        return {
          bg: 'bg-emerald-50 dark:bg-emerald-950/40',
          border: 'border-emerald-500',
          text: 'text-emerald-800 dark:text-emerald-300',
          accent: 'bg-emerald-500',
          icon: <CheckCircle2 className="w-8 h-8 md:w-10 md:h-10" />,
        };
      default:
        return {
          bg: 'bg-gray-50 dark:bg-gray-900/40',
          border: 'border-gray-500',
          text: 'text-gray-800 dark:text-gray-300',
          accent: 'bg-gray-500',
          icon: <Search className="w-8 h-8 md:w-10 md:h-10" />,
        };
    }
  };
  
  const ResultCard: React.FC<{ result: InteractionResult }> = ({ result }) => {
    const { bg, border, text, accent, icon } = getSeverityInfo(result.severity);
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`mt-8 md:mt-12 w-full max-w-3xl rounded-2xl md:rounded-[2rem] shadow-2xl p-6 md:p-8 border-2 ${border} ${bg} relative overflow-hidden`}
      >
        <div className={`absolute top-0 right-0 w-32 h-32 ${accent} opacity-5 rounded-full -mr-16 -mt-16`} />
        
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 relative z-10">
          <div className={`p-3 md:p-4 rounded-xl md:rounded-2xl ${accent} bg-opacity-10 dark:bg-opacity-20 ${text}`}>
            {icon}
          </div>
          <div className="flex-grow space-y-3 md:space-y-4 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div>
                <span className={`text-[10px] md:text-xs font-bold uppercase tracking-widest ${text} opacity-70`}>Analysis Result</span>
                <h3 className={`text-2xl md:text-3xl font-black ${text}`}>{result.severity} Interaction</h3>
                <p className="text-[10px] font-bold text-gray-400 italic mt-1">Based on standard clinical guidelines. Verify with official pharmacopoeia.</p>
              </div>
              <button
                onClick={() => handleShare(result)}
                className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-xl font-black text-xs uppercase tracking-widest transition-all transform hover:scale-105 active:scale-95 shadow-lg ${accent} text-white hover:brightness-110`}
              >
                <Share2 className="w-4 h-4" />
                <span>Share Result</span>
              </button>
            </div>
            <p className="text-base md:text-lg text-gray-900 dark:text-gray-100 leading-relaxed font-medium">
              {result.description}
            </p>
            <div className="pt-2 md:pt-4 flex flex-wrap justify-center md:justify-start gap-3 md:gap-4">
              <div className="px-3 py-1.5 md:px-4 md:py-2 bg-white/50 dark:bg-black/40 rounded-lg md:rounded-xl border border-white/20 dark:border-white/10 text-xs md:text-sm font-bold flex items-center space-x-2">
                <Pill className="w-3 h-3 md:w-4 md:h-4" />
                <span>{result.drugs[0]}</span>
              </div>
              <div className="px-3 py-1.5 md:px-4 md:py-2 bg-white/50 dark:bg-black/40 rounded-lg md:rounded-xl border border-white/20 dark:border-white/10 text-xs md:text-sm font-bold flex items-center space-x-2">
                <Pill className="w-3 h-3 md:w-4 md:h-4" />
                <span>{result.drugs[1]}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };


  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
      <div className="text-center space-y-4 md:space-y-6 mb-8 md:mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tight leading-tight"
        >
          Drug Interaction <span className="text-rose-600 dark:text-rose-500">Checker</span>
        </motion.h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Ensure patient safety by identifying potential contraindications between multiple medications using our clinical AI engine.
        </p>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-900 p-5 sm:p-8 md:p-12 rounded-2xl md:rounded-[2.5rem] shadow-2xl border border-gray-200 dark:border-gray-800 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-500 to-orange-600" />
        
        <form onSubmit={handleCheck} className="space-y-6 md:space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest ml-1">Medication A</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-rose-500 transition-colors">
                  <Pill className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={drug1}
                  onChange={(e) => setDrug1(e.target.value)}
                  placeholder="e.g. Warfarin"
                  className="w-full bg-gray-50 dark:bg-black border-2 border-transparent focus:border-rose-500 rounded-xl md:rounded-2xl p-4 pl-12 text-gray-900 dark:text-white placeholder-gray-500 outline-none transition-all"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest ml-1">Medication B</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-rose-500 transition-colors">
                  <Pill className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={drug2}
                  onChange={(e) => setDrug2(e.target.value)}
                  placeholder="e.g. Aspirin"
                  className="w-full bg-gray-50 dark:bg-black border-2 border-transparent focus:border-rose-500 rounded-xl md:rounded-2xl p-4 pl-12 text-gray-900 dark:text-white placeholder-gray-500 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !drug1.trim() || !drug2.trim()}
            className="w-full bg-rose-600 hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-600 text-white font-black py-4 md:py-5 px-8 rounded-xl md:rounded-2xl transition-all duration-300 disabled:bg-gray-200 dark:disabled:bg-gray-800 disabled:cursor-not-allowed flex items-center justify-center space-x-3 shadow-xl shadow-rose-600/20 transform hover:scale-[1.01] active:scale-[0.99]"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Search className="w-6 h-6" />
                <span className="text-lg">Analyze Interactions</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
      </motion.div>
      
      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-8 p-4 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 rounded-2xl border border-rose-100 dark:border-rose-900/30 text-center font-bold"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col items-center">
        <AnimatePresence>
          {interactionResult && <ResultCard result={interactionResult} />}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showCopyToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex items-center space-x-3 px-6 py-4 bg-emerald-600 text-white rounded-2xl shadow-2xl shadow-emerald-600/30 border border-emerald-500/50"
          >
            <div className="p-1.5 bg-white/20 rounded-lg">
              <Check className="w-5 h-5" />
            </div>
            <span className="font-black text-sm uppercase tracking-widest">Result Copied to Clipboard!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-12 md:mt-16 p-6 md:p-8 bg-gray-100 dark:bg-gray-900/50 rounded-2xl md:rounded-3xl border border-gray-200 dark:border-gray-800 flex items-start space-x-4">
        <Info className="w-6 h-6 text-rose-600 dark:text-rose-500 shrink-0 mt-1" />
        <div className="space-y-2">
          <h4 className="font-bold text-gray-900 dark:text-white">Clinical Note</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Our interaction checker uses advanced AI to synthesize data from multiple clinical sources. However, it is not exhaustive. Always consult the official Prescribing Information (PI) and a licensed pharmacist for definitive guidance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InteractionCheckerPage;
