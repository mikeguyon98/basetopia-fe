import React from 'react';
import { useTranslation } from 'react-i18next';
import { ContentCard } from '../components/ContentCard';

// Mock data
const mockContent = [
  {
    id: 1,
    title: "Getting Started with React",
    description: "Learn the basics of React and how to build your first application",
    type: "video",
    thumbnail: "https://picsum.photos/seed/react/800/600",
    author: "Jane Doe",
    date: "2024-03-20"
  },
  {
    id: 2,
    title: "Advanced JavaScript Patterns",
    description: "Deep dive into advanced JavaScript patterns and best practices",
    type: "article",
    thumbnail: "https://picsum.photos/seed/js/800/600",
    author: "John Smith",
    date: "2024-03-19"
  },
  {
    id: 3,
    title: "CSS Grid Mastery",
    description: "Master CSS Grid layout with practical examples",
    type: "video",
    thumbnail: "https://picsum.photos/seed/css/800/600",
    author: "Alice Johnson",
    date: "2024-03-18"
  }
];

function ExplorePage() {
  const { t } = useTranslation();
  
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">{t('explore')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockContent.map((item) => (
          <ContentCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default ExplorePage;
