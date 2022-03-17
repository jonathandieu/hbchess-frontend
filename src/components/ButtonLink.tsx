import React from 'react';
import { Link } from 'react-router-dom';

const ButtonLink: React.FC<{ toLink: string }> = ({ children, toLink }) => {
  return (
    <Link
      to={toLink}
      className="py-4 px-6 text-lg font-semibold text-center text-gray-50 bg-gray-800 hover:bg-gray-700 rounded-xl lg:text-xl xl:text-3xl 2xl:text-5xl"
    >
      {children}
    </Link>
  );
};

export default ButtonLink;
