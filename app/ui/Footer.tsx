import React from 'react';

interface FooterProps {
  content: string;
}

const Footer: React.FC<FooterProps> = ({ content }) => {
  return (
        <footer
          className='flex items-center justify-center bg-blue-700 text-white'
        >
            <p 
              className="m-2"
            >
              {content}
            </p>
        </footer>
  );
};

export default Footer;
