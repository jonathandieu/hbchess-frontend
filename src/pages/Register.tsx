import React from 'react';
import LoggedOutTemplate from '../components/LoggedOutTemplate';

function Register() {
  return (
    <LoggedOutTemplate>
      <div className="flex justify-center items-center h-full w-full">
        <div className="bg-gray-100 rounded-md p-4 shadow-2xl w-4/5 xl:w-1/2 2xl:w-1/3 h-2/3 lg:h-1/2 flex flex-col items-center">
          <div className="flex flex-col justify-center items-center space-y-2 md:space-y-5 w-2/3 h-4/5">
            <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-center text-green-500 font-serif mb-5">
              Sign Up Today!
            </h1>
            <div className="flex flex-col lg:flex-row justify-between w-full">
              <label className="text-lg md:text-xl text-gray-800">
                Username
              </label>
              <input type="text" className="form-input px-4 py-3 rounded-md" />
            </div>
            <div className="flex flex-col lg:flex-row justify-between w-full">
              <label className="text-lg md:text-xl text-gray-800">Email</label>
              <input type="email" className="form-input px-4 py-3 rounded-md" />
            </div>
            <div className="flex flex-col lg:flex-row justify-between w-full">
              <label className="text-lg md:text-xl text-gray-800">
                Password
              </label>
              <input
                type="password"
                className="form-input px-4 py-3 rounded-md"
              />
            </div>
          </div>
          <div className="h-1/5 w-full flex flex-col items-center justify-end">
            <button className="py-2 px-2 rounded-full bg-forest-green-web hover:bg-green-500 sm:text-lg md:text-xl font-semibold w-1/2">
              Create Account
            </button>
            <div className="text-lg text-gray-800 mt-4">
              {' Have an account? '}
              <span className="text-lg text-forest-green-web hover:text-green-500 cursor-pointer">
                Sign in.
              </span>
            </div>
          </div>
        </div>
      </div>
    </LoggedOutTemplate>
  );
}

export default Register;
