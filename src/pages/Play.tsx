import { useState } from 'react';
import CreateGameDialog from '../components/CreateGameDialog';
import { useGetGamesQuery } from '../app/services/gameApi';
import { useAuth } from '../hooks/useAuth';

function Play() {
  const [joined, setJoined] = useState(false);
  const { token } = useAuth();
  const { data: games = [] } = useGetGamesQuery(token);

  if (joined) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <h1 className="pb-2 mb-7 w-full text-3xl text-center">
          Waiting for players to join
        </h1>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center items-center w-full h-full">
        <div className="flex flex-row p-4 space-y-4 w-[90%] text-white bg-gray-800 rounded-lg shadow-2xl md:flex-row md:justify-between md:space-y-0 md:w-1/2">
          <CreateGameDialog setJoined={setJoined} />
          <div className="flex flex-col flex-1 justify-center items-center p-2 w-4/5">
            <h1 className="pb-2 mb-7 w-full text-3xl text-center border-b-2 border-gray-300">
              Games Available:
            </h1>
            <ol className="space-y-4 w-3/4 text-2xl list-disc">
              {games.map((game, index) => {
                return (
                  <li key={index}>
                    <div className="flex flex-row justify-between w-full">
                      <p>
                        {game.hostTeam.senderUsername} -{' '}
                        {game.hostTeam.recipientUsername} /{' '}
                        {game.guestTeam.senderUsername} -{' '}
                        {game.hostTeam.recipientUsername}
                      </p>
                      <button className="flex justify-center items-center py-1.5 px-4 w-32 h-10 text-lg font-medium text-center bg-green-600 hover:bg-green-700 rounded transition duration-200">
                        Join Game
                      </button>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </>
  );
}

export default Play;
