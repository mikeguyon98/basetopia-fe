import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ContentCard } from '../components/ContentCard';
import GeneratedArticle from '../components/GeneratedArticle';
import { fetchWithAuth } from '../api/client';
import { getAuth } from 'firebase/auth';

function ExplorePage() {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('feed');
  const [inputText, setInputText] = useState('');
  const [generatedArticle, setGeneratedArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [content, setContent] = useState([]); 
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({
    players: [],
    teams: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/ml/agent/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await getAuth().currentUser.getIdToken()}`
        },
        body: JSON.stringify({
          user_query: inputText,
          input_language: i18n.language
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate article');
      }

      setGeneratedArticle(data.final_response);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await fetchWithAuth('/api/ml/posts/all');
        setContent(posts);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError(err.message);
      }
    };

    fetchPosts();
  }, []);

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults({ players: [], teams: [] });
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/posts/search?query=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setSearchResults(data);
    } catch (err) {
      console.error('Error searching:', err);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      handleSearch(searchQuery);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const renderSearchResults = () => {
    if (!searchQuery.trim()) return null;

    return (
      <div className="space-y-6">
        {searchResults.players.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Players</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.players.map(player => (
                <div key={player.id} className="bg-dark-800 p-4 rounded-lg border border-dark-700">
                  <div className="flex items-center space-x-3">
                    {player.headshot_url && (
                      <img 
                        src={player.headshot_url} 
                        alt={player.mlb_person_fullName}
                        className="w-12 h-12 rounded-full"
                      />
                    )}
                    <div>
                      <h4 className="font-medium">{player.mlb_person_fullName}</h4>
                      <p className="text-sm text-gray-400">{player.mlb_position_name}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {searchResults.teams.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Teams</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.teams.map(team => (
                <div key={team.id} className="bg-dark-800 p-4 rounded-lg border border-dark-700">
                  <div className="flex items-center space-x-3">
                    {team.logo_url && (
                      <img 
                        src={team.logo_url} 
                        alt={team.mlb_name}
                        className="w-12 h-12"
                      />
                    )}
                    <div>
                      <h4 className="font-medium">{team.mlb_name}</h4>
                      <p className="text-sm text-gray-400">{team.mlb_locationName}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderContent = () => {
    if (activeTab === 'explore') {
      return (
        <div className="space-y-6">
          <div className="max-w-2xl mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('search')}
              className="w-full px-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          {renderSearchResults()}
        </div>
      );
    }

    if (activeTab === 'agent') {
      return (
        <div className="max-w-2xl mx-auto mt-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full h-40 p-4 bg-dark-800 border border-dark-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={t('agentPlaceholder')}
              disabled={isLoading}
            />
            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}
            <button
              type="submit"
              className={`w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={isLoading}
            >
              {isLoading ? t('loading') : t('createArticle')}
            </button>
          </form>

          {generatedArticle && (
            <GeneratedArticle 
              article={generatedArticle}
              onLanguageChange={(lang) => i18n.changeLanguage(lang)}
            />
          )}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {content.map((item) => (
          <ContentCard key={item.id} item={item} />
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-lg border border-dark-700 p-1 bg-dark-800">
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              activeTab === 'feed'
                ? 'bg-blue-500 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('feed')}
          >
            {t('feed')}
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              activeTab === 'explore'
                ? 'bg-blue-500 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('explore')}
          >
            {t('explore')}
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              activeTab === 'agent'
                ? 'bg-blue-500 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('agent')}
          >
            ✨ {t('agent')}
          </button>
        </div>
      </div>

      {renderContent()}
    </div>
  );
}

export default ExplorePage;
