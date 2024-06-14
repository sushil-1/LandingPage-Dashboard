import React from 'react';

interface HeaderProps {
  content: string;
}

const Header: React.FC<HeaderProps> = ({ content }) => {
  return (
      <h1 className="text-4xl font-bold">{content}</h1>
  );
};

export default Header;
