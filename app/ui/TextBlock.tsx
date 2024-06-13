import React from 'react';

interface TextBlockProps {
  content: string;
}

const TextBlock: React.FC<TextBlockProps> = ({ content }) => {
  return (
    <div className="p-4 bg-white border rounded">
      <p>{content}</p>
    </div>
  );
};

export default TextBlock;
