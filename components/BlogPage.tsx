import React, { useState } from 'react';
import { BLOG_ARTICLES } from '../constants';
import { Article } from '../types';

const ArticleCard: React.FC<{ article: Article; onReadMore: (article: Article) => void }> = ({ article, onReadMore }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-cyan-500/20 transition-all duration-300 flex flex-col">
    <img src={article.imageUrl} alt={article.title} className="w-full h-48 object-cover"/>
    <div className="p-6 flex flex-col flex-grow">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{article.title}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">{article.snippet}</p>
      <button 
        onClick={() => onReadMore(article)} 
        className="self-start bg-cyan-500 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:bg-cyan-600 hover:shadow-lg hover:shadow-cyan-500/20"
      >
        Read More
      </button>
    </div>
  </div>
);

const ArticleDetail: React.FC<{ article: Article; onBack: () => void }> = ({ article, onBack }) => (
  <div className="max-w-4xl mx-auto animate-fade-in">
    <button onClick={onBack} className="mb-8 text-cyan-500 dark:text-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-300 font-semibold">
      &larr; Back to Blog
    </button>
    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{article.title}</h1>
    <img src={article.imageUrl} alt={article.title} className="w-full h-auto max-h-96 object-cover rounded-lg shadow-lg mb-8"/>
    <div className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed space-y-4">
      {article.content.split('\n').map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  </div>
);

const BlogPage: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  if (selectedArticle) {
    return <ArticleDetail article={selectedArticle} onBack={() => setSelectedArticle(null)} />;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white text-center mb-10">PharmaTech Insights</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {BLOG_ARTICLES.map(article => (
          <ArticleCard key={article.id} article={article} onReadMore={setSelectedArticle} />
        ))}
      </div>
    </div>
  );
};

export default BlogPage;