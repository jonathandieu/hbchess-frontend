import React from 'react';
import { Link } from 'react-router-dom';

const PlayGameButton: React.FC<{ toLink: string }> = ({ children, toLink }) => {
  return (
    <Link
      to={toLink}
      className="inline-flex justify-center items-center py-2 px-4 mb-10 w-3/5 h-24 text-5xl font-medium text-center bg-green-600 hover:bg-green-700 rounded"
    >
      {children}
    </Link>
  );
};

export default PlayGameButton;
