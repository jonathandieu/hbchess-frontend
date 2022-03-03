import React from 'react';
import { Link } from 'react-router-dom';

const ButtonLink: React.FC<{ toLink: string }> = ({ children, toLink }) => {
  return (
    <Link
      to={toLink}
      className="text-center bg-gray-800 hover:bg-gray-700 text-gray-50 rounded-xl px-8 py-4 text-lg lg:text-xl xl:text-3xl 2xl:text-5xl font-semibold"
    >
      {children}
    </Link>
  );
};

export default ButtonLink;
