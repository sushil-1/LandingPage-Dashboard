import React from 'react';

interface ImageProps {
  content: string; // Assuming content is a URL
}

const Image: React.FC<ImageProps> = ({ content }) => {
  return (
    <div className="flex-grow p-4 flex items-center justify-center">
      <img src={content} alt="Content" className="rounded max-w-full max-h-full object-contain" />
    </div>
  );
};

export default Image;
