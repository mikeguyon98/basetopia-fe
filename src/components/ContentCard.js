import React, { useState } from 'react';
import { Video, FileText, X } from 'lucide-react';

export function ContentCard({ item }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleVideoClick = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="group relative bg-dark-800 rounded-lg overflow-hidden border border-dark-700 hover:border-blue-500/50 transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {isPlaying && item.videoUrl ? (
        <div className="relative">
          <button 
            onClick={handleVideoClick}
            className="absolute top-2 right-2 z-20 p-1 bg-black/50 rounded-full hover:bg-black/70"
          >
            <X className="text-white" size={20} />
          </button>
          <video 
            controls 
            autoPlay 
            className="w-full h-48 object-cover"
          >
            <source src={item.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ) : (
        <div 
          onClick={item.videoUrl ? handleVideoClick : undefined} 
          className={item.videoUrl ? "cursor-pointer relative" : "relative"}
        >
          <img 
            src={item.thumbnail || "/placeholder.svg"} 
            alt={item.title} 
            className="w-full h-48 object-cover" 
          />
          {item.videoUrl && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
              <Video className="text-white" size={48} />
            </div>
          )}
        </div>
      )}
      
      <div className="p-4 relative z-10">
        <div className="flex items-center mb-2">
          {item.type === 'video' ? (
            <Video className="text-blue-400 mr-2" size={20} />
          ) : (
            <FileText className="text-blue-400 mr-2" size={20} />
          )}
          <span className="text-sm text-gray-400 capitalize">{item.type}</span>
        </div>
        
        <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-blue-400 transition-colors duration-300">
          {item.title}
        </h3>
        
        <p className="text-sm text-gray-400 mb-4">
          {item.description}
        </p>
        
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span className="text-gray-400">{item.author}</span>
          <span className="text-gray-400">{item.date}</span>
        </div>
      </div>
    </div>
  );
}
