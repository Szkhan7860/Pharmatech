import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, FileText, Search, Pill, ShieldAlert, CheckCircle2, X, Camera, Image as ImageIcon } from 'lucide-react';
import { analyzePrescriptionImage } from '../services/geminiService';
import { DrugInfo } from '../types';

const PrescriptionScannerPage: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<DrugInfo[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file (PNG, JPG, etc.)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Data = e.target?.result as string;
      setImage(base64Data);
      setMimeType(file.type);
      setError(null);
      setResults(null);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image || !mimeType) return;

    setIsLoading(true);
    setError(null);
    try {
      // Extract base64 string from data URL
      const base64Image = image.split(',')[1];
      const data = await analyzePrescriptionImage(base64Image, mimeType);
      setResults(data);
    } catch (err: any) {
      setError(err.message || 'Failed to analyze the image.');
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setImage(null);
    setMimeType(null);
    setResults(null);
    setError(null);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 md:py-24 space-y-12">
      <div className="text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-cyan-50 dark:bg-cyan-900/30 rounded-full text-cyan-600 dark:text-cyan-400 text-xs font-black uppercase tracking-widest"
        >
          <Camera className="w-4 h-4" />
          <span>AI Vision Analysis</span>
        </motion.div>
        <h1 className="text-4xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
          Prescription <span className="text-cyan-600">Scanner</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Upload a clear photo of your prescription to identify medications, understand their uses, and see recommended dosages.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`relative group cursor-pointer border-4 border-dashed rounded-[2.5rem] p-12 transition-all duration-500 flex flex-col items-center justify-center space-y-6 min-h-[400px] overflow-hidden ${
              image 
                ? 'border-cyan-600 bg-cyan-50/30 dark:bg-cyan-900/10' 
                : 'border-gray-200 dark:border-gray-800 hover:border-cyan-600/50 hover:bg-gray-50 dark:hover:bg-gray-900/50'
            }`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => !image && fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
            />

            {image ? (
              <div className="relative w-full h-full flex flex-col items-center space-y-6">
                <img 
                  src={image} 
                  alt="Prescription Preview" 
                  className="max-h-[300px] rounded-2xl shadow-2xl object-contain border-4 border-white dark:border-gray-800"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    reset();
                  }}
                  className="absolute -top-4 -right-4 p-2 bg-rose-600 text-white rounded-full shadow-lg hover:bg-rose-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="text-center">
                  <p className="text-cyan-600 font-black uppercase tracking-widest text-xs">Image Ready</p>
                  <p className="text-gray-500 text-sm mt-1">Click the button below to analyze</p>
                </div>
              </div>
            ) : (
              <>
                <div className="p-8 bg-cyan-50 dark:bg-cyan-900/30 rounded-full text-cyan-600 group-hover:scale-110 transition-transform duration-500">
                  <Upload className="w-12 h-12" />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white">Upload Prescription</h3>
                  <p className="text-gray-500 dark:text-gray-400 font-medium">Drag and drop or click to browse</p>
                </div>
                <div className="flex items-center space-x-4 pt-4">
                  <div className="flex items-center space-x-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                    <ImageIcon className="w-4 h-4" />
                    <span>PNG, JPG</span>
                  </div>
                  <div className="w-1 h-1 bg-gray-300 rounded-full" />
                  <div className="flex items-center space-x-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                    <FileText className="w-4 h-4" />
                    <span>Max 10MB</span>
                  </div>
                </div>
              </>
            )}
          </motion.div>

          {image && !results && (
            <button
              onClick={handleAnalyze}
              disabled={isLoading}
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-black py-5 rounded-[2rem] transition-all duration-300 flex items-center justify-center space-x-3 shadow-2xl shadow-cyan-600/30 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Search className="w-6 h-6" />
                  <span className="text-lg uppercase tracking-widest">Analyze Prescription</span>
                </>
              )}
            </button>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-rose-50 dark:bg-rose-900/20 border-2 border-rose-100 dark:border-rose-900/30 rounded-3xl flex items-start space-x-4"
            >
              <ShieldAlert className="w-6 h-6 text-rose-600 shrink-0 mt-1" />
              <div>
                <h4 className="font-black text-rose-900 dark:text-rose-400 uppercase tracking-widest text-xs">Analysis Error</h4>
                <p className="text-rose-600 dark:text-rose-300 text-sm font-medium mt-1">{error}</p>
              </div>
            </motion.div>
          )}
        </div>

        <div className="space-y-8">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-20 space-y-6"
              >
                <div className="relative">
                  <div className="w-24 h-24 border-8 border-cyan-100 dark:border-cyan-900/30 rounded-full" />
                  <div className="absolute top-0 left-0 w-24 h-24 border-8 border-transparent border-t-cyan-600 rounded-full animate-spin" />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-widest">AI is Reading...</h3>
                  <p className="text-gray-500 dark:text-gray-400 font-medium italic">Extracting medication data from image</p>
                </div>
              </motion.div>
            ) : results ? (
              <motion.div
                key="results"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-widest">Detected Drugs</h2>
                  <div className="px-4 py-1.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center space-x-2">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{results.length} Medications Found</span>
                  </div>
                </div>

                <div className="space-y-6">
                  {results.map((drug, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="p-8 bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl hover:shadow-2xl transition-all group"
                    >
                      <div className="flex items-start justify-between">
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3">
                            <div className="p-3 bg-cyan-50 dark:bg-cyan-900/30 rounded-2xl text-cyan-600">
                              <Pill className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">{drug.name}</h3>
                          </div>
                          
                          <div className="space-y-4">
                            <div>
                              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Common Uses</span>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {drug.uses.map((use, i) => (
                                  <span key={i} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs font-bold text-gray-600 dark:text-gray-400">
                                    {use}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Recommended Dosage</span>
                              <p className="text-sm text-gray-700 dark:text-gray-300 font-medium mt-1 leading-relaxed">
                                {drug.dosage}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="p-6 bg-amber-50 dark:bg-amber-900/20 rounded-3xl border border-amber-100 dark:border-amber-900/30 flex items-start space-x-4">
                  <ShieldAlert className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
                  <p className="text-xs text-amber-800 dark:text-amber-300 font-medium leading-relaxed">
                    <span className="font-black uppercase tracking-widest block mb-1">Medical Disclaimer</span>
                    This analysis is for informational purposes only. AI may misinterpret handwriting or complex instructions. Always verify with your doctor or pharmacist before taking any medication.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center py-20 text-center space-y-6 border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-[2.5rem]"
              >
                <div className="p-8 bg-gray-50 dark:bg-gray-900/50 rounded-full text-gray-300">
                  <FileText className="w-16 h-16" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-gray-400 uppercase tracking-widest">No Analysis Yet</h3>
                  <p className="text-gray-400 dark:text-gray-500 font-medium max-w-[280px]">Upload a prescription image on the left to see results here.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionScannerPage;
