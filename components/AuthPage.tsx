import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LogIn, UserPlus, Mail, Lock, User, ArrowRight, Github, Chrome } from 'lucide-react';
import { auth, db } from '../firebase';
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Page } from '../types';

interface AuthPageProps {
  setCurrentPage: (page: Page) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ setCurrentPage }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Create/Update user profile
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          role: user.email === 'szcamps@gmail.com' ? 'admin' : 'user'
        });
      }

      setCurrentPage(Page.Home);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Ensure profile exists
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (!userDoc.exists()) {
          await setDoc(userDocRef, {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            role: user.email === 'szcamps@gmail.com' ? 'admin' : 'user'
          });
        }
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await updateProfile(user, { displayName });

        // Create profile
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          email: user.email,
          displayName: displayName,
          photoURL: user.photoURL,
          role: user.email === 'szcamps@gmail.com' ? 'admin' : 'user'
        });
      }
      setCurrentPage(Page.Home);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-16 min-h-[80vh] flex flex-col lg:flex-row items-center justify-center gap-12 md:gap-20">
      <motion.div 
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex-1 space-y-8 text-center lg:text-left"
      >
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-cyan-50 dark:bg-cyan-900/30 rounded-full text-cyan-600 dark:text-cyan-400 font-black uppercase tracking-widest text-xs">
          <User className="w-4 h-4" />
          <span>Join PharmaTech Hub</span>
        </div>
        
        <h1 className="text-5xl md:text-8xl font-black text-gray-900 dark:text-white tracking-tighter leading-tight">
          Unlock <span className="text-cyan-600">Clinical</span> Insights
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
          Create an account to save your searches, bookmark drugs, and track your quiz progress.
        </p>

        <div className="hidden lg:grid grid-cols-2 gap-6">
          <div className="p-6 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl">
            <h3 className="text-lg font-black text-gray-900 dark:text-white mb-2">Save Searches</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Access your clinical history anytime, anywhere.</p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl">
            <h3 className="text-lg font-black text-gray-900 dark:text-white mb-2">Quiz Progress</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Track your pharmacology exam preparation.</p>
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-gray-900 p-8 md:p-12 rounded-[3rem] shadow-2xl border border-gray-200 dark:border-gray-800 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-cyan-600" />
          
          <div className="flex items-center justify-between mb-10">
            <div className="space-y-1">
              <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 font-medium">
                {isLogin ? 'Sign in to continue' : 'Join our community today'}
              </p>
            </div>
            <div className="p-4 bg-cyan-50 dark:bg-cyan-900/30 rounded-2xl text-cyan-600">
              {isLogin ? <LogIn className="w-8 h-8" /> : <UserPlus className="w-8 h-8" />}
            </div>
          </div>

          <div className="space-y-6">
            <button
              onClick={handleGoogleSignIn}
              className="w-full bg-gray-50 dark:bg-black hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white font-black py-4 px-8 rounded-2xl transition-all flex items-center justify-center space-x-3 border-2 border-transparent hover:border-cyan-600/30 shadow-lg"
            >
              <Chrome className="w-6 h-6 text-cyan-600" />
              <span>Continue with Google</span>
            </button>

            <div className="relative flex items-center py-4">
              <div className="flex-grow border-t border-gray-200 dark:border-gray-800"></div>
              <span className="flex-shrink mx-4 text-gray-400 text-xs font-black uppercase tracking-widest">Or with email</span>
              <div className="flex-grow border-t border-gray-200 dark:border-gray-800"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatePresence mode="wait">
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2"
                  >
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-gray-50 dark:bg-black border-2 border-transparent focus:border-cyan-600 rounded-2xl p-4 pl-12 text-gray-900 dark:text-white placeholder-gray-500 outline-none transition-all"
                        required={!isLogin}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full bg-gray-50 dark:bg-black border-2 border-transparent focus:border-cyan-600 rounded-2xl p-4 pl-12 text-gray-900 dark:text-white placeholder-gray-500 outline-none transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-gray-50 dark:bg-black border-2 border-transparent focus:border-cyan-600 rounded-2xl p-4 pl-12 text-gray-900 dark:text-white placeholder-gray-500 outline-none transition-all"
                    required
                  />
                </div>
              </div>

              {error && (
                <p className="text-rose-500 text-sm font-bold bg-rose-50 dark:bg-rose-900/20 p-3 rounded-xl border border-rose-100 dark:border-rose-900/30 text-center">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-black py-5 px-8 rounded-2xl transition-all flex items-center justify-center space-x-3 shadow-xl shadow-cyan-600/20 transform hover:scale-[1.01] active:scale-[0.99]"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span className="text-lg">{isLogin ? 'Sign In' : 'Create Account'}</span>
                    <ArrowRight className="w-6 h-6" />
                  </>
                )}
              </button>
            </form>

            <div className="text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-gray-500 dark:text-gray-400 hover:text-cyan-600 font-bold transition-colors"
              >
                {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
