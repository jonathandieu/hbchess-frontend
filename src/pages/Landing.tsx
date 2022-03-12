import React from 'react';
import LoggedOutTemplate from '../components/LoggedOutTemplate';
import ButtonLink from '../components/ButtonLink';
function Landing() {
  return (
    <LoggedOutTemplate>
      <div className="flex-0 min-h-full w-full flex flex-col justify-center items-center space-y-8">
        <h1 className="text-4xl xl:text-6xl 2xl:text-9xl text-gray-800 w-2/3 text-center font-bold drop-shadow-2xl">
          Play Hand Brain Chess With Friends!
        </h1>
        <ButtonLink toLink="/auth/signup">Sign Up</ButtonLink>
      </div>
    </LoggedOutTemplate>
  );
}

export default Landing;
