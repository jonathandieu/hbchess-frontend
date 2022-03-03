import React from 'react';
import LoggedOutTemplate from '../components/LoggedOutTemplate';

function Login() {
  return (
    <LoggedOutTemplate>
      <div className="flex justify-center items-center w-full h-full">
        <h1 className="text-5xl text-center text-green-500 font-serif">
          Welcome! <br />
          Everything is login
        </h1>
      </div>
    </LoggedOutTemplate>
  );
}

export default Login;
