import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, CheckCircle2, XCircle, ArrowRight, RefreshCcw, Trophy } from 'lucide-react';
import { generateQuizQuestions } from '../services/geminiService';
import { QuizQuestion } from '../types';
import { auth, db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const QuizPage: React.FC = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuestions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await generateQuizQuestions();
      setQuestions(data);
    } catch (err) {
      setError('Failed to load quiz questions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleOptionSelect = (index: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
    if (index === questions[currentQuestionIndex].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = async () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
    } else {
      setShowResult(true);
      // Save quiz result if user is logged in
      if (auth.currentUser) {
        try {
          await addDoc(collection(db, 'quiz_results'), {
            userId: auth.currentUser.uid,
            score: score,
            totalQuestions: questions.length,
            timestamp: serverTimestamp(),
          });
        } catch (err) {
          console.error('Error saving quiz result:', err);
        }
      }
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setShowResult(false);
    fetchQuestions();
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
        <div className="w-20 h-20 border-8 border-cyan-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Generating Quiz...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <XCircle className="w-20 h-20 text-rose-500" />
        <p className="text-xl font-bold text-gray-900 dark:text-white">{error}</p>
        <button
          onClick={resetQuiz}
          className="bg-cyan-600 hover:bg-cyan-700 text-white font-black py-4 px-8 rounded-2xl transition-all flex items-center space-x-2"
        >
          <RefreshCcw className="w-5 h-5" />
          <span>Try Again</span>
        </button>
      </div>
    );
  }

  if (showResult) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto text-center space-y-12 py-16"
      >
        <div className="relative inline-block">
          <div className="absolute -inset-4 bg-cyan-600/20 rounded-full blur-2xl animate-pulse" />
          <Trophy className="w-32 h-32 text-cyan-600 relative z-10 mx-auto" />
        </div>
        
        <div className="space-y-4">
          <h2 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tighter">Quiz Complete!</h2>
          <p className="text-2xl text-gray-600 dark:text-gray-400 font-medium">
            You scored <span className="text-cyan-600 font-black">{score}</span> out of <span className="text-gray-900 dark:text-white font-black">{questions.length}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={resetQuiz}
            className="bg-cyan-600 hover:bg-cyan-700 text-white font-black py-5 px-8 rounded-2xl transition-all flex items-center justify-center space-x-3 shadow-xl shadow-cyan-600/20"
          >
            <RefreshCcw className="w-6 h-6" />
            <span className="text-lg">Retake Quiz</span>
          </button>
          <button
            onClick={() => window.location.reload()}
            className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-black py-5 px-8 rounded-2xl transition-all flex items-center justify-center space-x-3"
          >
            <BookOpen className="w-6 h-6" />
            <span className="text-lg">Study More</span>
          </button>
        </div>
      </motion.div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-16">
      <div className="flex items-center justify-between mb-12">
        <div className="space-y-1">
          <p className="text-xs font-black text-cyan-600 uppercase tracking-widest">Question {currentQuestionIndex + 1} of {questions.length}</p>
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">Pharmacology Quiz</h1>
        </div>
        <div className="p-4 bg-cyan-50 dark:bg-cyan-900/30 rounded-2xl text-cyan-600">
          <BookOpen className="w-8 h-8" />
        </div>
      </div>

      <div className="space-y-8">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-900 p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-gray-200 dark:border-gray-800 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-600/5 rounded-full -mr-32 -mt-32 blur-3xl" />
          
          <div className="relative z-10 space-y-10">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white leading-tight">
              {currentQuestion.question}
            </h2>

            <div className="grid grid-cols-1 gap-4">
              {currentQuestion.options.map((option, index) => {
                const isCorrect = index === currentQuestion.correctAnswer;
                const isSelected = selectedOption === index;
                const showCorrect = selectedOption !== null && isCorrect;
                const showWrong = isSelected && !isCorrect;

                return (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(index)}
                    disabled={selectedOption !== null}
                    className={`
                      p-6 rounded-2xl text-left text-lg font-bold transition-all duration-300 border-2 flex items-center justify-between
                      ${selectedOption === null 
                        ? 'bg-gray-50 dark:bg-black border-transparent hover:border-cyan-600 hover:bg-white dark:hover:bg-gray-900' 
                        : showCorrect 
                          ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500 text-emerald-700 dark:text-emerald-400' 
                          : showWrong 
                            ? 'bg-rose-50 dark:bg-rose-900/20 border-rose-500 text-rose-700 dark:text-rose-400' 
                            : 'bg-gray-50 dark:bg-black border-transparent opacity-50'
                      }
                    `}
                  >
                    <span>{option}</span>
                    {showCorrect && <CheckCircle2 className="w-6 h-6 shrink-0" />}
                    {showWrong && <XCircle className="w-6 h-6 shrink-0" />}
                  </button>
                );
              })}
            </div>

            <AnimatePresence>
              {selectedOption !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 md:p-8 bg-cyan-50 dark:bg-cyan-900/20 rounded-3xl border border-cyan-100 dark:border-cyan-900/30 space-y-4"
                >
                  <div className="flex items-center space-x-3 text-cyan-600">
                    <CheckCircle2 className="w-6 h-6" />
                    <span className="text-lg font-black uppercase tracking-widest">Explanation</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                    {currentQuestion.explanation}
                  </p>
                  <button
                    onClick={handleNext}
                    className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-black py-4 px-8 rounded-2xl transition-all flex items-center justify-center space-x-2 shadow-xl shadow-cyan-600/20"
                  >
                    <span>{currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default QuizPage;
