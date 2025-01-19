import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardBody, Chip } from "@material-tailwind/react";

const mockVideos = [
  {
    id: 1,
    thumbnail: "https://placehold.co/300x200",
    title: "Amazing Home Run",
    player: "Mike Trout",
    team: "Los Angeles Angels",
    league: "MLB"
  },
  // Add more mock videos...
];

function ExplorePage() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">{t('explore.title')}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockVideos.map((video) => (
          <Card key={video.id} className="overflow-hidden">
            <CardHeader floated={false} className="h-48">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover"
              />
            </CardHeader>
            <CardBody>
              <h3 className="text-lg font-semibold mb-2">{video.title}</h3>
              <div className="flex flex-wrap gap-2">
                <Chip value={video.player} />
                <Chip value={video.team} />
                <Chip value={video.league} />
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default ExplorePage;

