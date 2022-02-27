import React from 'react';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <h1 className="text-5xl pb-4 text-center text-green-500 font-serif">
        Welcome! <br />
        Everything is fine
      </h1>

      <div className="flex flex-row space-x-5">
        <Link
          to="/auth/login"
          className="text-2xl px-4 py-2 border-2 border-green-300 rounded-lg text-gray-700 shadow-md"
        >
          Login
        </Link>

        <Link
          to="/auth/register"
          className="text-2xl px-4 py-2 border-2 border-green-300 rounded-lg text-gray-700 shadow-md"
        >
          Register
        </Link>
      </div>
    </div>
  );
}

export default Landing;
