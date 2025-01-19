import React from 'react';
import { useTranslation } from 'react-i18next';

function ExplorePage() {
  const { t } = useTranslation();
  
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold">Explore Page</h1>
      {/* Add your explore page content here */}
    </div>
  );
}

export default ExplorePage;
