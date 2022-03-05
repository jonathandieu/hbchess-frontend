import React from 'react';
import { Link } from 'react-router-dom';
import {
  QuestionMarkCircleIcon,
  ViewListIcon,
  UserAddIcon,
  LoginIcon
} from '@heroicons/react/outline';

const LoggedOutTemplate: React.FC = ({ children }) => {
  return (
    <div className="grid grid-cols-5 lg:grid-cols-8 xl:grid-cols-10 2xl:grid-cols-12 h-screen">
      <div className="col-span-1 bg-cadet pl-2 pt-4 flex flex-col space-y-10">
        <Link
          to="/"
          className="text-lg xl:text-xl 2xl:text-2xl text-gray-50 hover:text-nyanza group w-full flex flex-row"
        >
          <span className="flex items-center pr-2">
            <QuestionMarkCircleIcon
              className="h-5 w-5 text-gray-50 group-hover:text-nyanza"
              aria-hidden="true"
            />
          </span>
          BHChess
        </Link>
        <Link
          to="/leaderboard"
          className="xl:text-xl 2xl:text-2xl text-gray-50 hover:text-nyanza group w-full flex flex-row"
        >
          <span className="flex items-center pr-2">
            <ViewListIcon
              className="h-5 w-5 text-gray-50 group-hover:text-nyanza"
              aria-hidden="true"
            />
          </span>
          Leaderboard
        </Link>
        <Link
          to="/auth/signup"
          className="xl:text-xl 2xl:text-2xl text-gray-50 hover:text-nyanza group w-full flex flex-row"
        >
          <span className="flex items-center pr-2">
            <UserAddIcon
              className="h-5 w-5 text-gray-50 group-hover:text-nyanza"
              aria-hidden="true"
            />
          </span>
          Sign Up
        </Link>
        <Link
          to="/auth/login"
          className="xl:text-xl 2xl:text-2xl text-gray-50 hover:text-nyanza group w-full flex flex-row"
        >
          <span className="flex items-center pr-2">
            <LoginIcon
              className="h-5 w-5 text-gray-50 group-hover:text-nyanza"
              aria-hidden="true"
            />
          </span>
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
