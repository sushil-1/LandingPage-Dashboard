import React from 'react';

interface ImageProps {
  content: string; // Assuming content is a URL
}

const Image: React.FC<ImageProps> = ({ content }) => {
  return (
      <img src={content} alt="Content" className="max-w-full max-h-full object-contain" />
  );
};

export default Image;
