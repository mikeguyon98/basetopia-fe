import React from 'react';

function ArticleContent({ content }) {
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
              return line.trim() ? <p key={i} className="text-gray-300 mb-2">{line}</p> : null;
            })}
          </div>
        );
      } else if (section.type === 'video') {
        return (
          <div key={index} className="mb-6">
            <div className="relative aspect-video">
              <video
                controls
                className="w-full h-full rounded-lg"
              >
                <source src={section.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <p className="text-sm text-gray-400 mt-2">{section.title}</p>
          </div>
        );
      }
      return null;
    });
  };

  return (
    <div className="max-w-3xl mx-auto">
      {renderContent()}
    </div>
  );
}

export default ArticleContent;