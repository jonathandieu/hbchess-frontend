import React from 'react';
import { useGetDashboardQuery } from '../app/services/gameApi';
import { useGameState } from '../hooks/useGameState';

const PreviousGamesList = () => {
  const { isWhite } = useGameState();

  const { data: finishedGames = [] } = useGetDashboardQuery();

  const whiteTeam = `${game.white.sender.username} - ${game.white.recipient.username}`;
  const blackTeam = `${game.black.sender.username} - ${game.black.recipient.username}`;
  return (
    <>
      <h1 className="pb-3 w-full text-3xl border-b-2 border-gray-300">
        Previous Games:
      </h1>

      <div className="overflow-x-auto relative mt-5 w-full shadow-md">
        <table className="w-full text-lg text-left text-gray-500 table-auto">
          <thead className="text-base text-gray-700 uppercase bg-gray-300">
            <tr>
              <th scope="col" className="py-3 px-6">
                Your Team
              </th>
              <th scope="col" className="py-3 px-6">
                Opponent Team
              </th>
              <th scope="col" className="py-3 px-6">
                Result
              </th>
            </tr>
          </thead>
          <tbody>
            {finishedGames.map((game) => {
              return (
                <tr
                  className="bg-white hover:bg-gray-200 border-b"
                  key={game._id}
                >
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {isWhite ? whiteTeam : blackTeam}
                  </th>
                  <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                    {isWhite ? blackTeam : whiteTeam}
                  </td>
                  <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                    {game.result !== 'Draw'
                      ? `${game.result} Wins`
                      : game.result}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PreviousGamesList;
