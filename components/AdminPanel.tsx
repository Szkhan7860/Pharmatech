import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { Activity, Search, Star, Trophy, Users, ArrowLeft } from 'lucide-react';
import { Page } from '../types';

interface AdminPanelProps {
  setCurrentPage: (page: Page) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ setCurrentPage }) => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSearches: 0,
    totalBookmarks: 0,
    totalQuizzes: 0,
  });
  const [mostSearched, setMostSearched] = useState<{ name: string; count: number }[]>([]);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        const usersSnap = await getDocs(collection(db, 'users'));
        const searchesSnap = await getDocs(collection(db, 'search_history'));
        const bookmarksSnap = await getDocs(collection(db, 'bookmarks'));
        const quizzesSnap = await getDocs(collection(db, 'quiz_results'));

        setStats({
          totalUsers: usersSnap.size,
          totalSearches: searchesSnap.size,
          totalBookmarks: bookmarksSnap.size,
          totalQuizzes: quizzesSnap.size,
        });

        // Calculate most searched
        const searchCounts: { [key: string]: number } = {};
        searchesSnap.forEach(doc => {
          const data = doc.data();
          searchCounts[data.drugName] = (searchCounts[data.drugName] || 0) + 1;
        });

        const sortedSearches = Object.entries(searchCounts)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);
        
        setMostSearched(sortedSearches);

        // Recent activity
        const activities: any[] = [];
        searchesSnap.forEach(doc => activities.push({ ...doc.data(), type: 'search', id: doc.id }));
        bookmarksSnap.forEach(doc => activities.push({ ...doc.data(), type: 'bookmark', id: doc.id }));
        
        const sortedActivities = activities
          .sort((a, b) => b.timestamp?.toMillis() - a.timestamp?.toMillis())
          .slice(0, 10);
        
        setRecentActivity(sortedActivities);

      } catch (err) {
        console.error('Error fetching admin stats:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const COLORS = ['#0891b2', '#0e7490', '#155e75', '#164e63', '#064e3b'];

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
        <div className="w-20 h-20 border-8 border-cyan-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Loading Analytics...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-16 space-y-12">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <button 
            onClick={() => setCurrentPage(Page.Profile)}
            className="flex items-center text-cyan-600 font-bold mb-4 hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Profile
          </button>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tighter">Admin <span className="text-cyan-600">Analytics</span></h1>
          <p className="text-gray-600 dark:text-gray-400 font-medium">System performance and user engagement metrics.</p>
        </div>
        <div className="p-4 bg-cyan-50 dark:bg-cyan-900/30 rounded-3xl text-cyan-600">
          <Activity className="w-10 h-10" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Users', value: stats.totalUsers, icon: <Users />, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Total Searches', value: stats.totalSearches, icon: <Search />, color: 'text-cyan-600', bg: 'bg-cyan-50' },
          { label: 'Total Bookmarks', value: stats.totalBookmarks, icon: <Star />, color: 'text-yellow-600', bg: 'bg-yellow-50' },
          { label: 'Quizzes Taken', value: stats.totalQuizzes, icon: <Trophy />, color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] shadow-xl border border-gray-200 dark:border-gray-800 flex items-center space-x-6"
          >
            <div className={`p-4 rounded-2xl ${stat.bg} dark:bg-opacity-10 ${stat.color}`}>
              {React.cloneElement(stat.icon as React.ReactElement, { className: 'w-8 h-8' })}
            </div>
            <div>
              <p className="text-sm font-black text-gray-500 uppercase tracking-widest">{stat.label}</p>
              <p className="text-3xl font-black text-gray-900 dark:text-white">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Most Searched Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-900 p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-gray-200 dark:border-gray-800"
        >
          <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-8 tracking-tight flex items-center">
            <Search className="w-6 h-6 mr-3 text-cyan-600" />
            Most Searched Drugs
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mostSearched}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.1} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontWeight: 'bold' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontWeight: 'bold' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111827', border: 'none', borderRadius: '1rem', color: '#fff' }}
                  itemStyle={{ color: '#06b6d4' }}
                />
                <Bar dataKey="count" fill="#0891b2" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Recent Activity List */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-900 p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-gray-200 dark:border-gray-800"
        >
          <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-8 tracking-tight flex items-center">
            <Activity className="w-6 h-6 mr-3 text-cyan-600" />
            Recent Activity
          </h3>
          <div className="space-y-4">
            {recentActivity.map((activity, i) => (
              <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-black rounded-2xl border border-transparent hover:border-cyan-600/30 transition-all">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${activity.type === 'search' ? 'bg-cyan-100 text-cyan-600' : 'bg-yellow-100 text-yellow-600'}`}>
                    {activity.type === 'search' ? <Search className="w-4 h-4" /> : <Star className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">{activity.drugName}</p>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-widest">{activity.type}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-400 font-bold">
                  {activity.timestamp?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPanel;
