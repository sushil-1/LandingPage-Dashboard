import React from 'react';

interface HeaderProps {
  content: string;
}

const Header: React.FC<HeaderProps> = ({ content }) => {
  return (
    <div className="p-4 bg-gray-200 rounded">
      <h1 className="text-2xl font-bold">{content}</h1>
    </div>
  );
};

export default Header;
