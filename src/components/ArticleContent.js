import React, { useState } from 'react';
import { Play } from 'lucide-react';

function ArticleContent({ content }) {
  const [activeVideo, setActiveVideo] = useState(null);

  const renderContent = () => {
    // Split content by lines
    const lines = content.split('\n');
    let currentSection = [];
    const sections = [];

    lines.forEach(line => {
      // If we encounter a link with video URL
      if (line.match(/\[.*\]\((https:\/\/mlb-cuts-diamond\.mlb\.com.*\.mp4)\)/)) {
        // Push any accumulated content before this
        if (currentSection.length > 0) {
          sections.push({
            type: 'text',
            content: currentSection.join('\n')
          });
          currentSection = [];
        }
        
        // Extract video information
        const titleMatch = line.match(/\[(.*?)\]/);
        const urlMatch = line.match(/\((.*?)\)/);
        
        if (titleMatch && urlMatch) {
          sections.push({
            type: 'video',
            title: titleMatch[1],
            url: urlMatch[1]
          });
        }
      } else {
        currentSection.push(line);
      }
    });

    // Push any remaining content
    if (currentSection.length > 0) {
      sections.push({
        type: 'text',
        content: currentSection.join('\n')
      });
    }

    return sections.map((section, index) => {
      if (section.type === 'text') {
        return (
          <div key={index} className="prose prose-invert max-w-none mb-4">
            {section.content.split('\n').map((line, i) => {
              // Handle headers
              if (line.startsWith('#')) {
                const level = line.match(/^#+/)[0].length;
                const text = line.replace(/^#+\s/, '');
                const HeaderTag = `h${level}`;
                return <HeaderTag key={i} className="text-white font-bold mb-4">{text}</HeaderTag>;
              }
              // Handle regular paragraphs
              return <p key={i} className="text-gray-300 mb-2">{line}</p>;
            })}
          </div>
        );
      } else if (section.type === 'video') {
        return (
          <div key={index} className="mb-4">
            {activeVideo === section.url ? (
              <div className="relative aspect-video mb-2">
                <video
                  controls
                  autoPlay
                  className="w-full h-full rounded-lg"
                >
                  <source src={section.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : (
              <button
                onClick={() => setActiveVideo(section.url)}
                className="w-full bg-dark-800 rounded-lg p-4 flex items-center gap-3 hover:bg-dark-700 transition-colors"
              >
                <Play className="text-blue-500" />
                <span className="text-white">{section.title}</span>
              </button>
            )}
          </div>
        );
      }
    });
  };

  return (
    <div className="max-w-3xl mx-auto">
      {renderContent()}
    </div>
  );
}

export default ArticleContent;