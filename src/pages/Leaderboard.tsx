import { useState } from 'react';
import { useGetAllTeamsQuery } from '../app/services/teamsApi';

function Leaderboard() {
  const [offset, setOffset] = useState<number>(0);

  const { data: leaderboard = [] } = useGetAllTeamsQuery(
    {
      offset,
      limit: 10
    },
    {
      refetchOnMountOrArgChange: true
    }
  );

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="flex flex-row p-4 space-y-4 w-[90%] text-white bg-gray-800 rounded-lg shadow-2xl md:flex-row md:justify-between md:space-y-0 md:w-1/2">
        <div className="flex flex-col flex-1 justify-center items-center p-2 w-4/5">
          <h1 className="pb-2 mb-7 w-full text-3xl text-center border-b-2 border-gray-300">
            Leaderboard
          </h1>
          <ol className="space-y-4 w-3/4 text-2xl list-disc">
            {leaderboard.map((team, index) => {
              return (
                <li key={index}>
                  <div className="flex flex-row justify-between w-full">
                    <p>
                      {team.sender.username} - {team.recipient.username}
                    </p>

                    <div className="flex justify-center items-center">
                      <p>
                        <span className="text-green-500">
                          {team.wins.length}
                        </span>{' '}
                        -{' '}
                        <span className="text-gray-300">
                          {team.ties.length}
                        </span>{' '}
                        -{' '}
                        <span className="text-red-500">
                          {team.losses.length}
                        </span>
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
          <div className="flex flex-row justify-between items-center w-full">
            <button
              className="mt-3 w-full text-3xl text-center"
              onClick={() => {
                setOffset(offset > 0 ? offset - 10 : offset);
              }}
            >
              👈
            </button>
            <button
              className="mt-3 w-full text-3xl text-center"
              onClick={() => {
                setOffset(offset + 10);
              }}
            >
              👉
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
