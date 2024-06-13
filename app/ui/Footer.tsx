import React from 'react';

interface FooterProps {
  content: string;
}

const Footer: React.FC<FooterProps> = ({ content }) => {
  return (
    <div className="bg-gray-900 text-gray-300 py-8">
      <div className="max-w-screen-xl mx-auto px-4">
        <footer className="flex justify-between items-center">
          <div className="text-lg">
            <p className="mt-2">{content}</p>
          </div>
          <div className="text-lg">
            <p className="font-semibold">Follow Us</p>
            <div className="flex space-x-4 mt-2">
              <a href="#" className="text-gray-300 hover:text-gray-100">
                Twitter
              </a>
              <a href="#" className="text-gray-300 hover:text-gray-100">
                Facebook
              </a>
              <a href="#" className="text-gray-300 hover:text-gray-100">
                Instagram
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
