import React from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import ArticleContent from './ArticleContent';

function PostModal({ post, onClose }) {
  const { i18n } = useTranslation();
  const languages = [
    { code: 'en', label: 'English', emoji: '🇺🇸' },
    { code: 'es', label: 'Español', emoji: '🇪🇸' },
    { code: 'ja', label: '日本語', emoji: '🇯🇵' }
  ];

  const currentContent = post[i18n.language];

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div 
        className="bg-dark-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 relative">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">
              {currentContent?.title}
            </h1>
            
            <div className="flex items-center gap-6">
              <select 
                onChange={(e) => i18n.changeLanguage(e.target.value)}
                value={i18n.language}
                className="px-3 py-2 bg-dark-800 text-white border border-dark-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {languages.map(({ code, label, emoji }) => (
                  <option key={code} value={code}>
                    {emoji} {label}
                  </option>
                ))}
              </select>

              <button 
                onClick={onClose}
                className="p-1 bg-dark-700 rounded-full hover:bg-dark-600"
              >
                <X className="text-white" size={24} />
              </button>
            </div>
          </div>
          
          <ArticleContent content={currentContent?.content} />
        </div>
      </div>
    </div>
  );
}

export default PostModal;