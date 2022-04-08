import { useGameState } from '../hooks/useGameState';

const Sidebar = () => {
  const gameState = useGameState();

  return (
    <div className="flex flex-col w-[25%] h-[90%] bg-gray-800 rounded-lg shadow-2xl">
      <div className="flex flex-row justify-around items-center py-4 w-full border-b-2">
        <h1 className="text-2xl text-center text-gray-100">White:</h1>
        <ol className="w-min text-xl list-disc text-gray-100">
          <li>{gameState.white.sender.username}</li>
          <li>{gameState.white.recipient.username}</li>
        </ol>
      </div>

      <div className="flex flex-row justify-around items-center py-4 w-full border-b-2">
        <h1 className="text-2xl text-center text-gray-100">Black:</h1>
        <ol className="w-min text-xl list-disc text-gray-100">
          <li>{gameState.black.sender.username}</li>
          <li>{gameState.black.recipient.username}</li>
        </ol>
      </div>
    </div>
  );
};

export default Sidebar;
