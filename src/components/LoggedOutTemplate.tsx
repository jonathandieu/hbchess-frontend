import React from 'react';
import { Link } from 'react-router-dom';

const LoggedOutTemplate: React.FC = ({ children }) => {
  return (
    <div className="grid grid-cols-5 lg:grid-cols-8 xl:grid-cols-10 2xl:grid-cols-12 h-screen">
      <div className="col-span-1 bg-cadet pl-2 pt-4 flex flex-col space-y-10">
        <Link
          to="/"
          className="text-lg xl:text-xl 2xl:text-2xl text-gray-50 hover:text-nyanza"
        >
          BHChess
        </Link>
        <Link
          to="/leaderboard"
          className="xl:text-xl 2xl:text-2xl text-gray-50 hover:text-nyanza"
        >
          Leaderboard
        </Link>
        <Link
          to="/auth/signup"
          className="xl:text-xl 2xl:text-2xl text-gray-50 hover:text-nyanza"
        >
          Sign Up
        </Link>
        <Link
          to="/auth/login"
          className="xl:text-xl 2xl:text-2xl text-gray-50 hover:text-nyanza"
        >
          Log In
        </Link>
      </div>
      <div className="col-start-2 col-end-6 lg:col-end-9 xl:col-end-11 2xl:col-end-13 bg-hero-pattern">
        {children}
      </div>
    </div>
  );
};

export default LoggedOutTemplate;
