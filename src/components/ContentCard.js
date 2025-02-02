import React, { useState } from 'react';
import { X } from 'lucide-react';

export function ContentCard({ item }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          <img 
            src={item.thumbnail || "/placeholder.svg"} 
            alt={item.title} 
            className="w-full h-48 object-cover" 
          />
        </div>
        
        <div className="p-4 relative z-10">          
          <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-blue-400 transition-colors duration-300">
            {item.title}
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div 
            className="bg-dark-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <button 
                onClick={handleCloseModal}
                className="absolute top-4 right-4 z-20 p-1 bg-black/50 rounded-full hover:bg-black/70"
              >
                <X className="text-white" size={24} />
              </button>
              
              <div className="relative">
                {item.videoUrl ? (
                  <video 
                    controls 
                    autoPlay 
                    className="w-full h-[400px] object-cover"
                  >
                    <source src={item.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img 
                    src={item.thumbnail} 
                    alt={item.title}
                    className="w-full h-[400px] object-cover"
                  />
                )}
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-4">{item.title}</h2>
              <p className="text-gray-400 mb-6">{item.description}</p>
              
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm text-gray-400 mr-2">Players:</span>
                  {item.players?.map((player, index) => (
                    <PillLabel key={index} text={player} type="player" />
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm text-gray-400 mr-2">Teams:</span>
                  {item.teams?.map((team, index) => (
                    <PillLabel key={index} text={team} type="team" />
                  ))}
                </div>
                
                <div className="flex justify-end items-center text-sm text-gray-400">
                  <span>{item.date}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
