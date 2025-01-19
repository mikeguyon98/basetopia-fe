import React from 'react';
import { Video, FileText } from 'lucide-react';

export function ContentCard({ item }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img src={item.thumbnail || "/placeholder.svg"} alt={item.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <div className="flex items-center mb-2">
          {item.type === 'video' ? (
            <Video className="text-red-600 mr-2" size={20} />
          ) : (
            <FileText className="text-red-600 mr-2" size={20} />
          )}
          <span className="text-sm text-gray-500 capitalize">{item.type}</span>
        </div>
        <h3 className="text-lg font-semibold mb-2 text-red-600">{item.title}</h3>
        <p className="text-sm text-gray-600 mb-4">{item.description}</p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>{item.author}</span>
          <span>{item.date}</span>
        </div>
      </div>
    </div>
  );
}
