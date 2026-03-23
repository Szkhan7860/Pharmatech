import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, Info, AlertCircle, ShieldAlert, CheckCircle2, ArrowRight, User, Weight, Ruler, Pill } from 'lucide-react';

const DoseCalculatorPage: React.FC = () => {
  const [hasAcknowledged, setHasAcknowledged] = useState<boolean>(false);
  const [age, setAge] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [adultDose, setAdultDose] = useState<string>('');
  const [results, setResults] = useState<{
    youngs?: number;
    clarks?: number;
    bsa?: number;
    bsaValue?: number;
  }>({});

  const calculateDose = () => {
    const a = parseFloat(age);
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const d = parseFloat(adultDose);

    if (isNaN(d)) return;

    const newResults: typeof results = {};

    // Young's Rule (Age)
    if (!isNaN(a) && a > 0) {
      newResults.youngs = (a / (a + 12)) * d;
    }

    // Clark's Rule (Weight - assuming kg)
    if (!isNaN(w) && w > 0) {
      newResults.clarks = (w / 70) * d;
    }

    // BSA Method (Mosteller formula)
    if (!isNaN(w) && w > 0 && !isNaN(h) && h > 0) {
      const bsa = Math.sqrt((h * w) / 3600);
      newResults.bsaValue = bsa;
      newResults.bsa = (bsa / 1.73) * d;
    }

    setResults(newResults);
  };

  useEffect(() => {
    calculateDose();
  }, [age, weight, height, adultDose]);

  if (!hasAcknowledged) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-900 p-6 md:p-12 rounded-2xl md:rounded-[2.5rem] shadow-2xl border-2 border-amber-100 dark:border-amber-900/30 space-y-6 md:space-y-8 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-3 bg-amber-500" />
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6">
            <div className="p-4 md:p-5 bg-amber-100 dark:bg-amber-900/30 rounded-2xl md:rounded-3xl text-amber-600 dark:text-amber-500">
              <ShieldAlert className="w-10 h-10 md:w-12 md:h-12" />
            </div>
            <div className="space-y-1 md:space-y-2 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight">Clinical Disclaimer</h2>
              <p className="text-amber-600 dark:text-amber-500 font-bold uppercase tracking-widest text-[10px] md:text-xs">Mandatory Acknowledgment Required</p>
            </div>
          </div>

          <div className="space-y-4 md:space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg">
            <p className="font-bold text-gray-900 dark:text-white">
              By using this Pediatric Dose Calculator, you agree to the following:
            </p>
            <ul className="space-y-3 md:space-y-4">
              {[
                "This tool is for informational and educational purposes only.",
                "It must not be used as a substitute for professional medical judgment.",
                "Calculations are based on generalized clinical formulas which may not account for individual patient complexities.",
                "Always verify dosages with official drug labeling and a qualified professional.",
                "PharmaTech Hub assumes no liability for errors resulting from the use of this tool."
              ].map((item, i) => (
                <li key={i} className="flex items-start space-x-3">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => setHasAcknowledged(true)}
            className="w-full py-4 md:py-5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl md:rounded-2xl font-black text-lg md:text-xl transition-all transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center space-x-3 shadow-2xl shadow-amber-600/30"
          >
            <CheckCircle2 className="w-6 h-6 md:w-7 md:h-7" />
            <span>I Understand & Acknowledge</span>
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 space-y-8 md:space-y-12">
      <div className="text-center space-y-4 md:space-y-6">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tight"
        >
          Pediatric <span className="text-cyan-600 dark:text-cyan-500">Dose Calculator</span>
        </motion.h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Precision dosing using standard clinical formulas. Input patient parameters to calculate age, weight, and BSA-based pediatric dosages.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12">
        {/* Input Section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 bg-white dark:bg-gray-900 p-6 md:p-10 rounded-2xl md:rounded-[2.5rem] shadow-2xl border border-gray-200 dark:border-gray-800 space-y-6 md:space-y-8 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-cyan-600" />
          
          <div className="flex items-center space-x-3 text-cyan-600 dark:text-cyan-500 mb-2">
            <Calculator className="w-7 h-7 md:w-8 md:h-8" />
            <h2 className="text-xl md:text-2xl font-bold">Patient Parameters</h2>
          </div>

          <div className="space-y-5 md:space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Adult Dose (mg)</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-cyan-600 transition-colors">
                  <Pill className="w-5 h-5" />
                </div>
                <input
                  type="number"
                  value={adultDose}
                  onChange={(e) => setAdultDose(e.target.value)}
                  placeholder="e.g. 500"
                  className="w-full bg-gray-50 dark:bg-black border-2 border-transparent focus:border-cyan-600 rounded-xl md:rounded-2xl p-4 pl-12 text-gray-900 dark:text-white placeholder-gray-500 outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-2">
                <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Age (Years)</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-cyan-600 transition-colors">
                    <User className="w-5 h-5" />
                  </div>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="e.g. 5"
                    className="w-full bg-gray-50 dark:bg-black border-2 border-transparent focus:border-cyan-600 rounded-xl md:rounded-2xl p-4 pl-12 text-gray-900 dark:text-white placeholder-gray-500 outline-none transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Weight (kg)</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-cyan-600 transition-colors">
                    <Weight className="w-5 h-5" />
                  </div>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="e.g. 20"
                    className="w-full bg-gray-50 dark:bg-black border-2 border-transparent focus:border-cyan-600 rounded-xl md:rounded-2xl p-4 pl-12 text-gray-900 dark:text-white placeholder-gray-500 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Height (cm)</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-cyan-600 transition-colors">
                  <Ruler className="w-5 h-5" />
                </div>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="e.g. 110"
                  className="w-full bg-gray-50 dark:bg-black border-2 border-transparent focus:border-cyan-600 rounded-xl md:rounded-2xl p-4 pl-12 text-gray-900 dark:text-white placeholder-gray-500 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          <div className="p-4 md:p-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/30 rounded-2xl md:rounded-3xl flex items-start space-x-3 md:space-x-4">
            <AlertCircle className="w-5 h-5 md:w-6 md:h-6 text-amber-600 dark:text-amber-500 shrink-0 mt-1" />
            <p className="text-xs md:text-sm text-amber-900 dark:text-amber-200 leading-relaxed font-medium">
              <strong>Clinical Note:</strong> These formulas are general guidelines. Pediatric dosing often requires specific mg/kg calculations based on the drug's therapeutic index and patient history.
            </p>
          </div>
        </motion.div>

        {/* Results Section */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-3 space-y-6 md:space-y-8"
        >
          <div className="bg-white dark:bg-gray-900 p-6 md:p-10 rounded-2xl md:rounded-[2.5rem] shadow-2xl border border-gray-200 dark:border-gray-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-600/5 rounded-full -mr-32 -mt-32 blur-3xl" />
            
            <div className="flex items-center space-x-3 text-cyan-600 dark:text-cyan-500 mb-8 md:mb-10 relative z-10">
              <Info className="w-7 h-7 md:w-8 md:h-8" />
              <h2 className="text-xl md:text-2xl font-bold">Calculated Results</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 relative z-10">
              {/* Young's Rule */}
              <div className="p-5 md:p-6 rounded-2xl md:rounded-3xl bg-gray-50 dark:bg-black border border-gray-100 dark:border-gray-800 group hover:border-cyan-600/30 transition-colors">
                <div className="flex justify-between items-center mb-3 md:mb-4">
                  <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">Young's Rule</span>
                  <span className="px-2 py-0.5 bg-gray-200 dark:bg-gray-800 rounded text-[9px] md:text-[10px] font-mono text-gray-600 dark:text-gray-400">Age Based</span>
                </div>
                <div className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-1 md:mb-2">
                  {results.youngs ? `${results.youngs.toFixed(2)}` : '---'} <span className="text-base md:text-lg font-bold text-gray-400">mg</span>
                </div>
                <p className="text-[10px] md:text-xs text-gray-500">Formula: Adult Dose × [Age / (Age + 12)]</p>
              </div>

              {/* Clark's Rule */}
              <div className="p-5 md:p-6 rounded-2xl md:rounded-3xl bg-gray-50 dark:bg-black border border-gray-100 dark:border-gray-800 group hover:border-cyan-600/30 transition-colors">
                <div className="flex justify-between items-center mb-3 md:mb-4">
                  <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">Clark's Rule</span>
                  <span className="px-2 py-0.5 bg-gray-200 dark:bg-gray-800 rounded text-[9px] md:text-[10px] font-mono text-gray-600 dark:text-gray-400">Weight Based</span>
                </div>
                <div className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-1 md:mb-2">
                  {results.clarks ? `${results.clarks.toFixed(2)}` : '---'} <span className="text-base md:text-lg font-bold text-gray-400">mg</span>
                </div>
                <p className="text-[10px] md:text-xs text-gray-500">Formula: Adult Dose × [Weight(kg) / 70]</p>
              </div>

              {/* BSA Method */}
              <div className="md:col-span-2 p-6 md:p-8 rounded-2xl md:rounded-3xl bg-cyan-600 text-white shadow-xl shadow-cyan-600/20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500" />
                
                <div className="flex justify-between items-center mb-4 md:mb-6 relative z-10">
                  <div className="space-y-1">
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-80">BSA Method</span>
                    <h3 className="text-lg md:text-xl font-black">Most Accurate Guideline</h3>
                  </div>
                  <div className="px-2 py-0.5 md:px-3 md:py-1 bg-white/20 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-widest">Gold Standard</div>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 md:gap-6 relative z-10">
                  <div className="text-5xl md:text-6xl font-black">
                    {results.bsa ? `${results.bsa.toFixed(2)}` : '---'} <span className="text-xl md:text-2xl font-bold opacity-60">mg</span>
                  </div>
                  {results.bsaValue && (
                    <div className="sm:text-right">
                      <div className="text-[10px] md:text-xs font-bold opacity-60 uppercase tracking-widest mb-1">Calculated BSA</div>
                      <div className="text-xl md:text-2xl font-black">{results.bsaValue.toFixed(3)} <span className="text-xs md:text-sm font-bold opacity-60">m²</span></div>
                    </div>
                  )}
                </div>
                <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-white/20 text-[10px] md:text-xs opacity-80 relative z-10">
                  Formula: Adult Dose × [BSA / 1.73] • BSA calculated via Mosteller formula
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8 bg-gray-100 dark:bg-gray-900/50 rounded-2xl md:rounded-[2rem] border border-gray-200 dark:border-gray-800 flex items-center space-x-4 md:space-x-6">
            <div className="p-3 md:p-4 bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-sm shrink-0">
              <Info className="w-5 h-5 md:w-6 md:h-6 text-cyan-600 dark:text-cyan-500" />
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed italic text-xs md:text-sm">
              "The Body Surface Area (BSA) method is generally considered the most accurate as it correlates better with physiological processes like metabolic rate and renal function."
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DoseCalculatorPage;
