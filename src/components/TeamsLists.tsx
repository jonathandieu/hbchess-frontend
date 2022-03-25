import { useGetTeamsQuery, Team } from '../app/services/teamsApi';
import { useAuth } from '../hooks/useAuth';

const TeamsLists = () => {
  const { data: teams } = useGetTeamsQuery();
  const { user } = useAuth();
  const partition = (array: Array<Team>, isValid: (team: Team) => boolean) => {
    const pass: Array<Team> = [];
    const fail: Array<Team> = [];
    array.forEach((element) => {
      if (isValid(element)) {
        pass.push(element);
      } else {
        fail.push(element);
      }
    });
    return [pass, fail];
  };

  const [acceptedTeams, pendingTeams] = partition(
    teams ?? [],
    (team) => team.accepted
  );

  return (
    <div className="flex flex-col space-y-4 w-[90%] md:flex-row md:justify-between md:space-y-0 md:w-1/3">
      <div className="p-8 h-min text-gray-100 bg-gray-800 rounded-lg shadow-2xl md:w-[calc(50%-10px)]">
        <h1 className="py-4 text-3xl text-center">Incoming & Pending:</h1>
        <ol className="space-y-4 text-xl font-medium list-disc">
          {pendingTeams.map((team) => {
            return (
              <li className="" key={team._id}>
                {user?.id === team.sender ? (
                  <div className="flex flex-row justify-between">
                    {team.recipientUsername}
                    <span className="py-1.5 text-lg text-gray-200">
                      Pending
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-row justify-between">
                    {team.senderUsername}
                    <button className="py-1.5 px-4 text-lg hover:text-white bg-green-600 hover:bg-green-700 rounded transition duration-200">
                      Accept
                    </button>
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </div>
      <div className="p-8 h-min text-gray-100 bg-gray-800 rounded-lg shadow-2xl md:w-[calc(50%-10px)]">
        <h1 className="py-4 text-3xl text-center">Your Teammates:</h1>
        <ol className="space-y-4 text-xl font-medium list-disc">
          {acceptedTeams.map((team) => {
            return (
              <li className="" key={team._id}>
                {user?.id === team.sender
                  ? team.recipientUsername
                  : team.senderUsername}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default TeamsLists;
