import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { BLOG_ARTICLES } from '../constants';
import { Article } from '../types';

const ArticleCard: React.FC<{ article: Article; index: number; onReadMore: (article: Article) => void }> = ({ article, index, onReadMore }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
    whileHover={{ y: -10 }}
    className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-xl hover:shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 flex flex-col group transition-shadow duration-500"
  >
    <div className="relative h-64 overflow-hidden">
      <motion.img 
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.8 }}
        src={article.imageUrl} 
        alt={article.title} 
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
      <div className="absolute bottom-6 left-6 right-6">
        <div className="flex items-center space-x-2 text-white/90 text-[10px] font-black uppercase tracking-[0.2em]">
          <Tag className="w-3 h-3 text-cyan-400" />
          <span>Clinical Insight</span>
        </div>
      </div>
    </div>
    <div className="p-8 flex flex-col flex-grow space-y-5">
      <div className="flex items-center justify-between text-gray-400 text-[10px] font-black uppercase tracking-widest">
        <div className="flex items-center space-x-1.5">
          <Calendar className="w-3 h-3" />
          <span>March 2026</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <Clock className="w-3 h-3" />
          <span>5 min read</span>
        </div>
      </div>
      <h3 className="text-2xl font-black text-gray-900 dark:text-white leading-tight group-hover:text-cyan-600 transition-colors duration-300">{article.title}</h3>
      <p className="text-gray-600 dark:text-gray-400 text-base line-clamp-3 leading-relaxed flex-grow font-medium">{article.snippet}</p>
      <button 
        onClick={() => onReadMore(article)} 
        className="w-full bg-gray-50 dark:bg-gray-800/50 hover:bg-cyan-600 text-gray-900 dark:text-white hover:text-white font-black py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-3 group/btn uppercase tracking-widest text-xs"
      >
        <span>Read Full Article</span>
        <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-2 transition-transform" />
      </button>
    </div>
  </motion.div>
);

const ArticleDetail: React.FC<{ article: Article; onBack: () => void }> = ({ article, onBack }) => (
  <motion.div 
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -50 }}
    transition={{ duration: 0.5, ease: "circOut" }}
    className="max-w-4xl mx-auto px-4 py-12 md:py-20"
  >
    <motion.button 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      onClick={onBack} 
      className="mb-12 flex items-center space-x-3 text-gray-500 hover:text-cyan-600 dark:text-gray-400 dark:hover:text-cyan-400 font-black uppercase tracking-widest text-xs transition-colors group"
    >
      <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg group-hover:bg-cyan-50 dark:group-hover:bg-cyan-900/30 transition-colors">
        <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
      </div>
      <span>Back to Insights</span>
    </motion.button>
    
    <article className="space-y-12">
      <div className="space-y-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center space-x-4 text-cyan-600 dark:text-cyan-500 text-xs font-black uppercase tracking-[0.3em]"
        >
          <span className="px-3 py-1 bg-cyan-50 dark:bg-cyan-900/30 rounded-full">Pharmacy Practice</span>
          <span>•</span>
          <span className="flex items-center space-x-2">
            <Calendar className="w-3 h-3" />
            <span>March 2026</span>
          </span>
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-5xl md:text-8xl font-black text-gray-900 dark:text-white tracking-tighter leading-[0.95]"
        >
          {article.title}
        </motion.h1>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="relative h-[400px] md:h-[600px] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white dark:border-gray-800"
      >
        <img 
          src={article.imageUrl} 
          alt={article.title} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="prose prose-2xl dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-10 text-xl md:text-2xl leading-relaxed font-medium"
      >
        {article.content.split('\n').map((paragraph, index) => (
          <p key={index} className="first-letter:text-6xl first-letter:font-black first-letter:text-cyan-600 first-letter:mr-3 first-letter:float-left first-letter:leading-[0.8]">{paragraph}</p>
        ))}
      </motion.div>
    </article>
  </motion.div>
);

const BlogPage: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {!selectedArticle ? (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-7xl mx-auto px-4 py-16 md:py-24"
          >
            <div className="text-center space-y-6 mb-20 md:mb-32">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-cyan-50 dark:bg-cyan-900/30 rounded-full text-cyan-600 dark:text-cyan-400 text-xs font-black uppercase tracking-widest"
              >
                <Tag className="w-4 h-4" />
                <span>Knowledge Base</span>
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="text-6xl md:text-9xl font-black text-gray-900 dark:text-white tracking-tighter leading-none"
              >
                PharmaTech <span className="text-cyan-600">Insights</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-xl md:text-3xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed font-medium"
              >
                Deep dives into clinical pharmacology, digital health trends, and the future of pharmaceutical care.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-16">
              {BLOG_ARTICLES.map((article, index) => (
                <ArticleCard 
                  key={article.id} 
                  article={article} 
                  index={index}
                  onReadMore={setSelectedArticle} 
                />
              ))}
            </div>
          </motion.div>
        ) : (
          <ArticleDetail 
            key="detail"
            article={selectedArticle} 
            onBack={() => setSelectedArticle(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlogPage;
