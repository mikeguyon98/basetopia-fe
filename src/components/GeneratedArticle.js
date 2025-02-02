import React from 'react';
import { useTranslation } from 'react-i18next';

function GeneratedArticle({ article, onLanguageChange }) {
  const { i18n } = useTranslation();
  const languages = [
    { code: 'en', label: 'English', emoji: '🇺🇸' },
    { code: 'es', label: 'Español', emoji: '🇪🇸' },
    { code: 'ja', label: '日本語', emoji: '🇯🇵' }
  ];

  if (!article) return null;

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-dark-800 rounded-lg p-6">
      <div className="mb-4 flex justify-end">
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

      <h1 className="text-2xl font-bold mb-4 text-white">
        {article[i18n.language]?.title}
      </h1>
      
      <div className="prose prose-invert">
        <p className="text-gray-300 whitespace-pre-wrap">
          {article[i18n.language]?.content}
        </p>
      </div>
    </div>
  );
}

export default GeneratedArticle;