import React from 'react';

interface ImageProps {
  content: string; // Assuming content is a URL
}

const Image: React.FC<ImageProps> = ({ content }) => {
  return (
    <div className="p-4">
      <img src={content} alt="Content" className="rounded" style={{ maxWidth: '100%', height: 'auto' }} />
    </div>
  );
};

export default Image;
