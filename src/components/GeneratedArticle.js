import React from 'react';
import { useTranslation } from 'react-i18next';
import ArticleContent from './ArticleContent';

function GeneratedArticle({ article, onLanguageChange }) {
  const { i18n } = useTranslation();
  const languages = [
    { code: 'en', label: 'English', emoji: '🇺🇸' },
    { code: 'es', label: 'Español', emoji: '🇪🇸' },
    { code: 'ja', label: '日本語', emoji: '🇯🇵' }
  ];

  if (!article) return null;

  const currentArticle = article[i18n.language];

  return (
    <div className="max-w-3xl mx-auto mt-8 bg-dark-800 rounded-lg p-6">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">
          {currentArticle?.title}
        </h1>
        
        <select 
          onChange={(e) => onLanguageChange(e.target.value)}
          value={i18n.language}
          className="px-3 py-2 bg-dark-800 text-white border border-dark-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {languages.map(({ code, label, emoji }) => (
            <option key={code} value={code}>
              {emoji} {label}
            </option>
          ))}
        </select>
      </div>
      
      <ArticleContent content={currentArticle?.content} />
    </div>
  );
}

export default GeneratedArticle;