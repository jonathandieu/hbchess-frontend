import LoggedOutTemplate from '../components/LoggedOutTemplate';

function LeaderBoard() {
  return (
    <LoggedOutTemplate>
      <div className="flex justify-center items-center w-full h-full">
        <h1 className="font-serif text-5xl text-center text-green-500">
          Welcome! <br />
          Everything is leaderboard
        </h1>
      </div>
    </LoggedOutTemplate>
  );
}

export default LeaderBoard;
