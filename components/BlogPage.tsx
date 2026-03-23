import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { BLOG_ARTICLES } from '../constants';
import { Article } from '../types';

const ArticleCard: React.FC<{ article: Article; onReadMore: (article: Article) => void }> = ({ article, onReadMore }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-white dark:bg-gray-900 rounded-2xl md:rounded-[2rem] shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800 flex flex-col group"
  >
    <div className="relative h-56 md:h-64 overflow-hidden">
      <img 
        src={article.imageUrl} 
        alt={article.title} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
    <div className="p-6 md:p-8 flex flex-col flex-grow space-y-4">
      <div className="flex items-center space-x-2 text-cyan-600 dark:text-cyan-500 text-xs font-black uppercase tracking-widest">
        <span className="px-2 py-1 bg-cyan-50 dark:bg-cyan-900/30 rounded-lg">Clinical Insight</span>
        <span>•</span>
        <span>5 min read</span>
      </div>
      <h3 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white leading-tight group-hover:text-cyan-600 transition-colors">{article.title}</h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base line-clamp-3 leading-relaxed flex-grow">{article.snippet}</p>
      <button 
        onClick={() => onReadMore(article)} 
        className="w-full bg-gray-100 dark:bg-gray-800 hover:bg-cyan-600 dark:hover:bg-cyan-600 text-gray-900 dark:text-white hover:text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 group/btn"
      >
        <span>Read Full Article</span>
        <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
      </button>
    </div>
  </motion.div>
);

const ArticleDetail: React.FC<{ article: Article; onBack: () => void }> = ({ article, onBack }) => (
  <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
    <button 
      onClick={onBack} 
      className="mb-8 md:mb-12 flex items-center space-x-2 text-gray-500 hover:text-cyan-600 dark:text-gray-400 dark:hover:text-cyan-400 font-bold transition-colors group"
    >
      <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
      <span>Back to Insights</span>
    </button>
    
    <article className="space-y-8 md:space-y-12">
      <div className="space-y-4 md:space-y-6">
        <div className="flex items-center space-x-3 text-cyan-600 dark:text-cyan-500 text-sm font-black uppercase tracking-[0.2em]">
          <span>Pharmacy Practice</span>
          <span>•</span>
          <span>March 2025</span>
        </div>
        <h1 className="text-4xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tight leading-[1.1]">{article.title}</h1>
      </div>

      <div className="relative h-[300px] md:h-[500px] rounded-2xl md:rounded-[3rem] overflow-hidden shadow-2xl">
        <img 
          src={article.imageUrl} 
          alt={article.title} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-6 md:space-y-8 text-lg md:text-xl leading-relaxed">
        {article.content.split('\n').map((paragraph, index) => (
          <p key={index} className="first-letter:text-4xl first-letter:font-black first-letter:text-cyan-600 first-letter:mr-1">{paragraph}</p>
        ))}
      </div>
    </article>
  </div>
);

const BlogPage: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  if (selectedArticle) {
    return <ArticleDetail article={selectedArticle} onBack={() => setSelectedArticle(null)} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-16">
      <div className="text-center space-y-4 md:space-y-6 mb-12 md:mb-20">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-8xl font-black text-gray-900 dark:text-white tracking-tighter"
        >
          PharmaTech <span className="text-cyan-600">Insights</span>
        </motion.h1>
        <p className="text-lg md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed font-medium">
          Deep dives into clinical pharmacology, digital health trends, and the future of pharmaceutical care.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {BLOG_ARTICLES.map(article => (
          <ArticleCard key={article.id} article={article} onReadMore={setSelectedArticle} />
        ))}
      </div>
    </div>
  );
};

export default BlogPage;