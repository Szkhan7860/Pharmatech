import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Mail, LogOut, Bookmark, History, Settings, Shield, ArrowRight, Trash2, LayoutDashboard, Pill } from 'lucide-react';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import { doc, getDoc, updateDoc, onSnapshot, collection, query, where, deleteDoc, getDocs } from 'firebase/firestore';
import { Page, UserProfile } from '../types';

interface ProfilePageProps {
  setCurrentPage: (page: Page) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ setCurrentPage }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [searches, setSearches] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!auth.currentUser) {
      setCurrentPage(Page.Auth);
      return;
    }

    const uid = auth.currentUser.uid;

    // Listen to user profile
    const unsubProfile = onSnapshot(doc(db, 'users', uid), (doc) => {
      if (doc.exists()) {
        setProfile(doc.data() as UserProfile);
      }
    });

    // Listen to bookmarks
    const qBookmarks = query(collection(db, 'bookmarks'), where('userId', '==', uid));
    const unsubBookmarks = onSnapshot(qBookmarks, (snapshot) => {
      const b = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBookmarks(b);
    });

    // Listen to searches
    const qSearches = query(collection(db, 'search_history'), where('userId', '==', uid));
    const unsubSearches = onSnapshot(qSearches, (snapshot) => {
      const s = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSearches(s);
      setIsLoading(false);
    }, (err) => {
      setError(err.message);
      setIsLoading(false);
    });

    return () => {
      unsubProfile();
      unsubBookmarks();
      unsubSearches();
    };
  }, [setCurrentPage]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setCurrentPage(Page.Home);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const removeBookmark = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'bookmarks', id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const removeSavedSearch = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'search_history', id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
        <div className="w-20 h-20 border-8 border-cyan-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Loading Profile...</p>
      </div>
    );
  }

  const user = auth.currentUser;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
        {/* Sidebar */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] shadow-2xl border border-gray-200 dark:border-gray-800 text-center space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-cyan-600" />
            
            <div className="relative inline-block">
              <div className="w-32 h-32 rounded-full border-4 border-cyan-600 p-1">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="Profile" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <div className="w-full h-full rounded-full bg-cyan-50 dark:bg-cyan-900/30 flex items-center justify-center text-cyan-600">
                    <User className="w-16 h-16" />
                  </div>
                )}
              </div>
              <div className="absolute bottom-0 right-0 p-2 bg-cyan-600 rounded-full text-white shadow-lg">
                <Settings className="w-5 h-5" />
              </div>
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">{user?.displayName || 'User'}</h2>
              <p className="text-gray-500 dark:text-gray-400 font-medium flex items-center justify-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>{user?.email}</span>
              </p>
            </div>

            <div className="pt-6 border-t border-gray-100 dark:border-gray-800 space-y-4">
              {profile?.role === 'admin' && (
                <button
                  onClick={() => setCurrentPage(Page.AdminPanel)}
                  className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-black py-4 px-8 rounded-2xl transition-all flex items-center justify-center space-x-3 shadow-lg shadow-cyan-600/20"
                >
                  <LayoutDashboard className="w-5 h-5" />
                  <span>Admin Panel</span>
                </button>
              )}
              <button
                onClick={handleSignOut}
                className="w-full bg-rose-50 dark:bg-rose-900/20 hover:bg-rose-100 dark:hover:bg-rose-900/40 text-rose-600 font-black py-4 px-8 rounded-2xl transition-all flex items-center justify-center space-x-3"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          <div className="bg-cyan-600 p-8 rounded-[2.5rem] text-white space-y-6 shadow-2xl shadow-cyan-600/30">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/20 rounded-2xl">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black">Account Status</h3>
            </div>
            <p className="text-cyan-100 font-medium leading-relaxed">
              Your account is verified. You have full access to clinical tools and saved data.
            </p>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 space-y-8"
        >
          {/* Bookmarks */}
          <section className="bg-white dark:bg-gray-900 p-8 md:p-12 rounded-[3rem] shadow-2xl border border-gray-200 dark:border-gray-800 space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-4 bg-cyan-50 dark:bg-cyan-900/30 rounded-2xl text-cyan-600">
                  <Bookmark className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Bookmarked Drugs</h2>
              </div>
              <span className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-600 dark:text-gray-400 font-black text-sm">
                {bookmarks.length} Saved
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {bookmarks.length ? (
                bookmarks.map((bookmark, index) => (
                  <motion.div
                    key={bookmark.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 bg-gray-50 dark:bg-black rounded-3xl border border-gray-100 dark:border-gray-800 group hover:border-cyan-600/30 transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-cyan-50 dark:bg-cyan-900/30 rounded-2xl text-cyan-600">
                        <Pill className="w-5 h-5" />
                      </div>
                      <span className="text-lg font-bold text-gray-900 dark:text-white">{bookmark.drugName}</span>
                    </div>
                    <button 
                      onClick={() => removeBookmark(bookmark.id)}
                      className="p-2 text-gray-400 hover:text-rose-600 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-12 text-center space-y-4">
                  <p className="text-gray-500 dark:text-gray-400 font-medium">No drugs bookmarked yet.</p>
                  <button 
                    onClick={() => setCurrentPage(Page.Home)}
                    className="text-cyan-600 font-black flex items-center justify-center space-x-2 mx-auto hover:translate-x-2 transition-transform"
                  >
                    <span>Explore Drugs</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* Saved Searches */}
          <section className="bg-white dark:bg-gray-900 p-8 md:p-12 rounded-[3rem] shadow-2xl border border-gray-200 dark:border-gray-800 space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-4 bg-cyan-50 dark:bg-cyan-900/30 rounded-2xl text-cyan-600">
                  <History className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Saved Searches</h2>
              </div>
              <span className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-600 dark:text-gray-400 font-black text-sm">
                {searches.length} Recent
              </span>
            </div>

            <div className="space-y-4">
              {searches.length ? (
                searches.map((search, index) => (
                  <motion.div
                    key={search.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 bg-gray-50 dark:bg-black rounded-3xl border border-gray-100 dark:border-gray-800 group hover:border-cyan-600/30 transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-cyan-50 dark:bg-cyan-900/30 rounded-2xl text-cyan-600">
                        <History className="w-5 h-5" />
                      </div>
                      <span className="text-lg font-bold text-gray-900 dark:text-white">{search.drugName}</span>
                    </div>
                    <button 
                      onClick={() => removeSavedSearch(search.id)}
                      className="p-2 text-gray-400 hover:text-rose-600 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </motion.div>
                ))
              ) : (
                <div className="py-12 text-center">
                  <p className="text-gray-500 dark:text-gray-400 font-medium">No saved searches yet.</p>
                </div>
              )}
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;
