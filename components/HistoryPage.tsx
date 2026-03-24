import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Star, Trash2, Pill, ArrowRight, Search } from 'lucide-react';
import { auth, db } from '../firebase';
import { collection, query, where, getDocs, deleteDoc, doc, orderBy } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { Page } from '../types';

interface HistoryItem {
  id: string;
  drugName: string;
  timestamp: any;
}

interface BookmarkItem {
  id: string;
  drugName: string;
  drugData: any;
  timestamp: any;
}

interface HistoryPageProps {
  setCurrentPage: (page: Page) => void;
}

const HistoryPage: React.FC<HistoryPageProps> = ({ setCurrentPage }) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'history' | 'bookmarks'>('history');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        fetchData(user.uid);
      } else {
        setCurrentPage(Page.Auth);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchData = async (uid: string) => {
    setIsLoading(true);
    try {
      // Fetch History
      const historyQuery = query(
        collection(db, 'search_history'),
        where('userId', '==', uid),
        orderBy('timestamp', 'desc')
      );
      const historySnap = await getDocs(historyQuery);
      setHistory(historySnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as HistoryItem)));

      // Fetch Bookmarks
      const bookmarksQuery = query(
        collection(db, 'bookmarks'),
        where('userId', '==', uid),
        orderBy('timestamp', 'desc')
      );
      const bookmarksSnap = await getDocs(bookmarksQuery);
      setBookmarks(bookmarksSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as BookmarkItem)));
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteItem = async (id: string, type: 'history' | 'bookmarks') => {
    try {
      await deleteDoc(doc(db, type === 'history' ? 'search_history' : 'bookmarks', id));
      if (type === 'history') {
        setHistory(prev => prev.filter(item => item.id !== id));
      } else {
        setBookmarks(prev => prev.filter(item => item.id !== id));
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 md:py-24 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tight">Your Activity</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your search history and bookmarked medications.</p>
      </div>

      <div className="flex justify-center p-1 bg-gray-100 dark:bg-gray-900 rounded-2xl w-fit mx-auto">
        <button
          onClick={() => setActiveTab('history')}
          className={`px-8 py-3 rounded-xl font-black text-sm uppercase tracking-widest transition-all ${activeTab === 'history' ? 'bg-white dark:bg-black text-cyan-600 shadow-lg' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
        >
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span>History</span>
          </div>
        </button>
        <button
          onClick={() => setActiveTab('bookmarks')}
          className={`px-8 py-3 rounded-xl font-black text-sm uppercase tracking-widest transition-all ${activeTab === 'bookmarks' ? 'bg-white dark:bg-black text-yellow-500 shadow-lg' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
        >
          <div className="flex items-center space-x-2">
            <Star className="w-4 h-4" />
            <span>Bookmarks</span>
          </div>
        </button>
      </div>

      <div className="min-h-[400px]">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-cyan-600/20 border-t-cyan-600 rounded-full animate-spin" />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {activeTab === 'history' ? (
              <motion.div
                key="history"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-4"
              >
                {history.length === 0 ? (
                  <div className="text-center py-20 bg-gray-50 dark:bg-gray-900/50 rounded-[2rem] border-2 border-dashed border-gray-200 dark:border-gray-800">
                    <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 font-medium">No search history found.</p>
                  </div>
                ) : (
                  history.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-cyan-600/30 transition-all group">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-cyan-50 dark:bg-cyan-900/30 rounded-xl text-cyan-600">
                          <Pill className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-xl font-black text-gray-900 dark:text-white">{item.drugName}</h3>
                          <p className="text-xs text-gray-400 font-medium">
                            {item.timestamp?.toDate().toLocaleDateString()} at {item.timestamp?.toDate().toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => deleteItem(item.id, 'history')}
                          className="p-2 text-gray-400 hover:text-rose-500 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </motion.div>
            ) : (
              <motion.div
                key="bookmarks"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {bookmarks.length === 0 ? (
                  <div className="col-span-full text-center py-20 bg-gray-50 dark:bg-gray-900/50 rounded-[2rem] border-2 border-dashed border-gray-200 dark:border-gray-800">
                    <Star className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 font-medium">No bookmarked medications found.</p>
                  </div>
                ) : (
                  bookmarks.map((item) => (
                    <div key={item.id} className="p-8 bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 hover:border-yellow-500/30 transition-all group relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full -mr-16 -mt-16" />
                      <div className="relative z-10 space-y-6">
                        <div className="flex justify-between items-start">
                          <div className="p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-xl text-yellow-600">
                            <Star className="w-6 h-6 fill-current" />
                          </div>
                          <button 
                            onClick={() => deleteItem(item.id, 'bookmarks')}
                            className="p-2 text-gray-400 hover:text-rose-500 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                        <div>
                          <h3 className="text-2xl font-black text-gray-900 dark:text-white">{item.drugName}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mt-2">
                            {item.drugData?.uses.join(', ')}
                          </p>
                        </div>
                        <button 
                          onClick={() => setCurrentPage(Page.Home)}
                          className="flex items-center space-x-2 text-sm font-black text-yellow-600 dark:text-yellow-500 uppercase tracking-widest group-hover:translate-x-2 transition-transform"
                        >
                          <span>View Details</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
