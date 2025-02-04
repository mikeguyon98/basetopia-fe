import React, { useState } from 'react';
import PostModal from './PostModal';
import { useTranslation } from 'react-i18next';

export function ContentCard({ item }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { i18n } = useTranslation();

  const currentContent = item[i18n.language] || {};
  
  // Extract first video URL from content if available
  const getFirstVideoUrl = () => {
    if (!currentContent || !currentContent.content) {
      return null;
    }
    const match = currentContent.content.match(/\[.*\]\((https:\/\/mlb-cuts-diamond\.mlb\.com.*\.mp4)\)/);
    return match ? match[1] : null;
  };

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = (e) => {
    if (e) e.stopPropagation();
    setIsModalOpen(false);
  };

  const PillLabel = ({ text, type }) => (
    <span className={`
      px-2 py-1 rounded-full text-xs font-medium
      ${type === 'player' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'}
    `}>
      {text}
    </span>
  );

  return (
    <>
      <div 
        onClick={handleCardClick}
        className="group relative bg-dark-800 rounded-lg overflow-hidden border border-dark-700 hover:border-blue-500/50 transition-all duration-300 cursor-pointer"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative">
          {getFirstVideoUrl() && (
            <video 
              className="w-full h-48 object-cover"
              muted
              onMouseOver={e => e.target.play()}
              onMouseOut={e => {
                e.target.pause();
                e.target.currentTime = 0;
              }}
            >
              <source src={getFirstVideoUrl()} type="video/mp4" />
            </video>
          )}
        </div>
        
        <div className="p-4 relative z-10">          
          <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
            {currentContent?.title || ''}
          </h3>
          
          <div className="flex flex-wrap gap-2 mb-2">
            {item.players?.[0] && <PillLabel text={item.players[0]} type="player" />}
            {item.teams?.[0] && <PillLabel text={item.teams[0]} type="team" />}
          </div>
          
          <div className="flex justify-end items-center text-sm text-gray-500">
            <span className="text-gray-400">{item.date}</span>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <PostModal 
          post={item} 
          onClose={handleCloseModal} 
        />
      )}
    </>
  );
}
