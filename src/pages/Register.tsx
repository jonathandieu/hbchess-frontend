import React from 'react';
import LoggedOutTemplate from '../components/LoggedOutTemplate';

function Register() {
  return (
    <LoggedOutTemplate>
      <div className="flex justify-center items-center h-full w-full">
        <h1 className="text-5xl text-center text-green-500 font-serif">
          Welcome! <br />
          Everything is register
        </h1>
      </div>
    </LoggedOutTemplate>
  );
}

export default Register;
