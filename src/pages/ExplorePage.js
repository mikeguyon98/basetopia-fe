import React from 'react';
import { useTranslation } from 'react-i18next';
import { ContentCard } from '../components/ContentCard';

// Mock data
const mockContent = [
  {
    id: 1,
    title: "Baseball Pitching Fundamentals",
    description: "Master the basic pitching techniques and grips for different pitch types",
    type: "video",
    thumbnail: "https://picsum.photos/seed/baseball1/800/600",
    videoUrl: "https://mlb-cuts-diamond.mlb.com/FORGE/2024/2024-02/22/4cf6d8fb-5dab6c56-f3c3f4a2-csvm-diamondx64-asset_1280x720_59_4000K.mp4",
    author: "Mike Martinez",
    date: "2024-03-20"
  },
  {
    id: 2,
    title: "History of the World Series",
    description: "Explore the most memorable moments in World Series history",
    type: "article",
    thumbnail: "https://picsum.photos/seed/baseball2/800/600",
    author: "Sarah Thompson",
    date: "2024-03-19"
  },
  {
    id: 3,
    title: "Advanced Batting Techniques",
    description: "Improve your hitting with professional batting tips and drills",
    type: "video",
    thumbnail: "https://picsum.photos/seed/baseball3/800/600",
    author: "David Rodriguez",
    date: "2024-03-18"
  },
  {
    id: 4,
    title: "Baseball Analytics 101",
    description: "Understanding modern baseball statistics and sabermetrics",
    type: "article",
    thumbnail: "https://picsum.photos/seed/baseball4/800/600",
    author: "Emily Chen",
    date: "2024-03-17"
  },
  {
    id: 5,
    title: "Fielding and Defense Mastery",
    description: "Essential defensive skills and positioning strategies",
    type: "video",
    thumbnail: "https://picsum.photos/seed/baseball5/800/600",
    author: "Carlos Ramirez",
    date: "2024-03-16"
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
