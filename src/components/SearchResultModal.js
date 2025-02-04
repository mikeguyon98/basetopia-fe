import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X, ChevronDown, ChevronUp } from 'lucide-react';
import { fetchWithAuth } from '../api/client';
import ArticleContent from './ArticleContent';

function SearchResultModal({ id, type, onClose }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedPost, setExpandedPost] = useState(null);
  const { t, i18n } = useTranslation();
  
  const languages = [
    { code: 'en', label: 'English', emoji: '🇺🇸' },
    { code: 'es', label: 'Español', emoji: '🇪🇸' },
    { code: 'ja', label: '日本語', emoji: '🇯🇵' }
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const endpoint = type === 'player' 
          ? `/api/ml/posts/player/${id}`
          : `/api/ml/posts/team/${id}`;
        
        const data = await fetchWithAuth(endpoint);
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [id, type]);

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div 
        className="bg-dark-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 relative">
          <div className="flex justify-between items-center mb-6">
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

          {loading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              {t('noResults')}
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <div 
                  key={post.id} 
                  className="border border-dark-700 rounded-lg p-4"
                >
                  <div 
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                  >
                    <h2 className="text-lg font-semibold">
                      {post[i18n.language]?.title}
                    </h2>
                    {expandedPost === post.id ? (
                      <ChevronUp className="text-gray-400" />
                    ) : (
                      <ChevronDown className="text-gray-400" />
                    )}
                  </div>
                  
                  {expandedPost === post.id && (
                    <div className="mt-4">
                      <ArticleContent content={post[i18n.language]?.content} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchResultModal;