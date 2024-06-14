import React from 'react';

interface TextBlockProps {
  content: string;
}

const TextBlock: React.FC<TextBlockProps> = ({ content }) => {
  return (
      <p className='font-semibold text-2xl'>
        {content}
      </p>
  );
};

export default TextBlock;
