import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getAuth } from 'firebase/auth';
import ArticleContent from './ArticleContent';

function GeneratedArticle({ article, onLanguageChange }) {
  const { t, i18n } = useTranslation();
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishError, setPublishError] = useState(null);
  const [publishSuccess, setPublishSuccess] = useState(false);
  
  const languages = [
    { code: 'en', label: 'English', emoji: '🇺🇸' },
    { code: 'es', label: 'Español', emoji: '🇪🇸' },
    { code: 'ja', label: '日本語', emoji: '🇯🇵' }
  ];

  const handlePublish = async () => {
    setIsPublishing(true);
    setPublishError(null);
    setPublishSuccess(false);

    try {
      // Format the request body with empty tags
      const requestBody = {
        highlight_data: {
          ...article,
          player_tags: [],
          team_tags: []
        }
      };

      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/ml/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await getAuth().currentUser.getIdToken()}`
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to publish article');
      }

      setPublishSuccess(true);
      setTimeout(() => setPublishSuccess(false), 5000);
    } catch (err) {
      setPublishError(err.message);
    } finally {
      setIsPublishing(false);
    }
  };

  if (!article) return null;

  const currentArticle = article[i18n.language];

  return (
    <div className="max-w-3xl mx-auto mt-8 bg-dark-800 rounded-lg p-6">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">
          {currentArticle?.title}
        </h1>
        
        <div className="flex gap-4 items-center">
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

          <button
            onClick={handlePublish}
            disabled={isPublishing}
            className={`px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 ${
              isPublishing ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isPublishing ? t('publishing') : t('publish')}
          </button>
        </div>
      </div>
      
      {publishSuccess && (
        <div className="mb-4 p-3 bg-green-500/20 border border-green-500 rounded-md text-green-500">
          {t('publishSuccess')}
        </div>
      )}
      
      {publishError && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-md text-red-500">
          {publishError}
        </div>
      )}
      
      <ArticleContent content={currentArticle?.content} />
    </div>
  );
}

export default GeneratedArticle;