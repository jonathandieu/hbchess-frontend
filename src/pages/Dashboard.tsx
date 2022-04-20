import PlayGameButton from '../components/PlayGameButton';
import PreviousGamesList from '../components/PreviousGamesList';

function Dashboard() {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="flex flex-col items-center p-8 w-full text-gray-100 bg-gray-800 rounded-lg shadow-2xl xl:w-2/3 2xl:w-2/3">
        <PlayGameButton toLink="/dashboard/play">Play A Game</PlayGameButton>
        <PreviousGamesList />
      </div>
    </div>
  );
}

export default Dashboard;
