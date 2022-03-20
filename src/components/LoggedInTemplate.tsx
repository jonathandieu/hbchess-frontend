import { Outlet, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useRef, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import {
  PlayIcon,
  UsersIcon,
  ChartSquareBarIcon,
  ViewListIcon,
  LogoutIcon
} from '@heroicons/react/outline';
import { resetCredentials } from '../app/features/auth/authSlice';
import { useAppDispatch } from '../hooks/store';

const LoggedInTemplate = () => {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });
  const sidebarRef = useRef(document.createElement('div'));
  const mobileSidebarRef = useRef(document.createElement('div'));
  const [sidebarWidth, setSidebarWidth] = useState(0);
  const [mobileSidebarWidth, setMobileSidebarWidth] = useState(0);

  useEffect(() => {
    if (!user) {
      navigate('/auth/login', { replace: true });
    }
  }, [user]);

  useEffect(() => {
    setSidebarWidth(sidebarRef.current.clientWidth);
    setMobileSidebarWidth(mobileSidebarRef.current.clientHeight);
  }, [sidebarRef.current, mobileSidebarRef.current]);

  const closeSidebar = () => {
    if (sidebarRef !== null) {
      sidebarRef.current.classList.add('-translate-x-full');
    }
  };

  const handleLogout = () => {
    dispatch(resetCredentials());
    navigate('/', { replace: true });
  };

  return (
    <div className="flex relative flex-col h-screen md:flex-row">
      <div
        ref={mobileSidebarRef}
        className="flex justify-between text-green-100 bg-green-800 md:hidden"
      >
        <a href="#" className="block p-4 font-bold text-white">
          HBChess
        </a>

        <button
          className="p-4 focus:bg-green-700 focus:outline-none"
          onClick={() => {
            if (sidebarRef !== null) {
              sidebarRef.current.classList.toggle('-translate-x-full');
            }
          }}
        >
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      <div
        ref={sidebarRef}
        className="flex absolute inset-y-0 left-0 z-10 flex-col py-7 px-2 space-y-6 w-64 text-gray-100 bg-gray-800 transition duration-200 ease-in-out -translate-x-full md:relative md:translate-x-0"
      >
        <Link
          to="/dashboard"
          className="flex items-center px-4 space-x-2 text-white"
          onClick={closeSidebar}
        >
          <svg
            className="w-8 h-8"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
            />
          </svg>
          <span className="text-2xl font-extrabold">HBChess</span>
        </Link>

        <nav className="flex flex-col flex-1">
          <Link
            to="/dashboard/play"
            className="flex flex-row py-2.5 px-4 hover:text-white hover:bg-green-700 rounded transition duration-200"
            onClick={closeSidebar}
          >
            <span className="flex items-center pr-2">
              <PlayIcon
                className="w-5 h-5 text-gray-50 group-hover:text-nyanza"
                aria-hidden="true"
              />
            </span>
            Play Game
          </Link>
          <Link
            to="/dashboard/teams"
            className="flex flex-row py-2.5 px-4 hover:text-white hover:bg-green-700 rounded transition duration-200"
            onClick={closeSidebar}
          >
            <span className="flex items-center pr-2">
              <UsersIcon
                className="w-5 h-5 text-gray-50 group-hover:text-nyanza"
                aria-hidden="true"
              />
            </span>
            Teams
          </Link>
          <Link
            to="/dashboard/stats"
            className="flex flex-row py-2.5 px-4 hover:text-white hover:bg-green-700 rounded transition duration-200"
            onClick={closeSidebar}
          >
            <span className="flex items-center pr-2">
              <ChartSquareBarIcon
                className="w-5 h-5 text-gray-50 group-hover:text-nyanza"
                aria-hidden="true"
              />
            </span>
            My Stats
          </Link>
          <Link
            to="/dashboard/leaderboard"
            className="flex flex-row py-2.5 px-4 hover:text-white hover:bg-green-700 rounded transition duration-200"
            onClick={closeSidebar}
          >
            <span className="flex items-center pr-2">
              <ViewListIcon
                className="w-5 h-5 text-gray-50 group-hover:text-nyanza"
                aria-hidden="true"
              />
            </span>
            Leaderboard
          </Link>
          <div className="flex flex-1 items-end">
            <button
              className="flex flex-row py-2.5 px-4 w-full hover:text-white hover:bg-green-700 rounded transition duration-200"
              onClick={handleLogout}
            >
              <span className="flex items-center pr-2">
                <LogoutIcon
                  className="w-5 h-5 text-gray-50 group-hover:text-nyanza"
                  aria-hidden="true"
                />
              </span>
              Sign Out
            </button>
          </div>
        </nav>
      </div>

      <div className="flex-1 w-full h-full">
        <div className="h-full bg-center bg-hero-pattern blur-sm" />
        {isDesktop ? (
          <div
            className="absolute top-0 right-0 h-full"
            style={{
              width: `calc(100% - ${sidebarWidth}px)`
            }}
          >
            <Outlet />
          </div>
        ) : (
          <div
            className="absolute right-0 bottom-0 w-full"
            style={{
              height: `calc(100% - ${mobileSidebarWidth}px)`
            }}
          >
            <Outlet />
          </div>
        )}
      </div>
    </div>
  );
};

export default LoggedInTemplate;
