import React from 'react';

const PreviousGamesList = () => {
  return (
    <>
      <h1 className="pb-3 w-full text-3xl border-b-2 border-gray-300">
        Previous Games:
      </h1>
      <div className="flex gap-x-48 pb-1 mt-5 text-xl border-b-2 border-gray-300">
        <div>Your Team</div>
        <div>Opponent Team</div>
        <div>Result</div>
      </div>
    </>
  );
};

export default PreviousGamesList;
