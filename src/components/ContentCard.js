import React from 'react';
import { Video, FileText } from 'lucide-react';

export function ContentCard({ item }) {
  return (
    <div className="group relative bg-dark-800 rounded-lg overflow-hidden border border-dark-700 hover:border-blue-500/50 transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <img 
        src={item.thumbnail || "/placeholder.svg"} 
        alt={item.title} 
        className="w-full h-48 object-cover" 
      />
      
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
