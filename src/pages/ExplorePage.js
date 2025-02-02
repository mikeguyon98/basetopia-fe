import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ContentCard } from '../components/ContentCard';
import GeneratedArticle from '../components/GeneratedArticle';

// Mock data
const mockContent = [
  {
    id: 1,
    title: "Baseball Pitching Fundamentals",
    description: "Master the basic pitching techniques and grips for different pitch types",
    type: "video",
    thumbnail: "https://picsum.photos/seed/baseball1/800/600",
    videoUrl: "https://mlb-cuts-diamond.mlb.com/FORGE/2024/2024-02/22/4cf6d8fb-5dab6c56-f3c3f4a2-csvm-diamondx64-asset_1280x720_59_4000K.mp4",
    players: ["Clayton Kershaw", "Max Scherzer"],
    teams: ["Los Angeles Dodgers", "New York Mets"],
    date: "2024-03-20",
    isFollowed: true
  },
  {
    id: 2,
    title: "History of the World Series",
    description: "Explore the most memorable moments in World Series history",
    type: "article",
    thumbnail: "https://picsum.photos/seed/baseball2/800/600",
    author: "Sarah Thompson",
    date: "2024-03-19",
    isFollowed: false
  },
  {
    id: 3,
    title: "Advanced Batting Techniques",
    description: "Improve your hitting with professional batting tips and drills",
    type: "video",
    thumbnail: "https://picsum.photos/seed/baseball3/800/600",
    author: "David Rodriguez",
    date: "2024-03-18",
    isFollowed: true
  },
  {
    id: 4,
    title: "Baseball Analytics 101",
    description: "Understanding modern baseball statistics and sabermetrics",
    type: "article",
    thumbnail: "https://picsum.photos/seed/baseball4/800/600",
    author: "Emily Chen",
    date: "2024-03-17",
    isFollowed: false
  },
  {
    id: 5,
    title: "Fielding and Defense Mastery",
    description: "Essential defensive skills and positioning strategies",
    type: "video",
    thumbnail: "https://picsum.photos/seed/baseball5/800/600",
    author: "Carlos Ramirez",
    date: "2024-03-16",
    isFollowed: true
  }
].map(item => ({
  ...item,
  isFollowed: Math.random() < 0.5 // Randomly assign followed status for mock data
}));

function ExplorePage() {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('explore');
  const [inputText, setInputText] = useState('');
  const [generatedArticle, setGeneratedArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const filteredContent = activeTab === 'explore' 
    ? mockContent 
    : mockContent.filter(item => item.isFollowed);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/ml/agent/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_query: inputText,
          input_language: i18n.language
        }),
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      setGeneratedArticle(data.final_response);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
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
        {filteredContent.map((item) => (
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
              activeTab === 'following'
                ? 'bg-blue-500 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('following')}
          >
            {t('following')}
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
