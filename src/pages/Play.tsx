import CreateGameDialog from '../components/CreateGameDialog';
import { useGetGamesQuery } from '../app/services/gameApi';
import { useAuth } from '../hooks/useAuth';
import { useInGame } from '../hooks/useInGame';
import Game from '../components/Game';
function Play() {
  const { token } = useAuth();
  const { data: games = [] } = useGetGamesQuery(token);
  const { inGame } = useInGame();

  if (inGame) {
    return <Game />;
  }

  return (
    <>
      <div className="flex justify-center items-center w-full h-full">
        <div className="flex flex-row p-4 space-y-4 w-[90%] text-white bg-gray-800 rounded-lg shadow-2xl md:flex-row md:justify-between md:space-y-0 md:w-1/2">
          <CreateGameDialog />
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
                        {game.white.sender.username} -{' '}
                        {game.white.recipient.username} /{' '}
                        {game.black.sender.username} -{' '}
                        {game.black.recipient.username}
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
