import {
  useGetTeamsQuery,
  useAcceptTeamMutation
} from '../app/services/teamsApi';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';

const TeamsLists = () => {
  const { data: teams } = useGetTeamsQuery();
  const [acceptTeam, { isLoading }] = useAcceptTeamMutation();
  const { user } = useAuth();

  const handleAcceptTeam = async (username: string) => {
    try {
      await acceptTeam({ username }).unwrap();
    } catch (err) {
      toast.error(err.data.message);
    }
  };

  const { acceptedTeams, pendingTeams } = teams || {
    acceptedTeams: [],
    pendingTeams: []
  };

  return (
    <div className="flex flex-col space-y-4 w-[90%] md:flex-row md:justify-between md:space-y-0 xl:w-2/3 2xl:w-1/3">
      <div className="p-8 h-min text-gray-100 bg-gray-800 rounded-lg shadow-2xl md:w-[calc(50%-10px)]">
        <h1 className="py-4 text-xl text-center 2xl:text-3xl">
          Incoming & Pending:
        </h1>
        <ol className="space-y-4 text-lg font-medium list-disc 2xl:text-xl">
          {pendingTeams.map((team) => {
            return (
              <li className="" key={team._id}>
                {user?.id === team.sender._id ? (
                  <div className="flex flex-row justify-between">
                    {team.recipient.username}
                    <span className="py-1.5 text-lg text-gray-200">
                      Pending
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-row justify-between">
                    {team.sender.username}
                    <button
                      className="flex flex-row justify-center items-center py-1.5 px-4 w-24 h-10 text-lg hover:text-white bg-green-600 hover:bg-green-700 rounded transition duration-200"
                      onClick={() => handleAcceptTeam(team.sender.username)}
                    >
                      {isLoading ? <Spinner /> : <p>Accept</p>}
                    </button>
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </div>
      <div className="p-8 h-min text-gray-100 bg-gray-800 rounded-lg shadow-2xl md:w-[calc(50%-10px)]">
        <h1 className="py-4 text-xl text-center 2xl:text-3xl">
          Your Teammates:
        </h1>
        <ol className="space-y-4 text-lg font-medium list-disc 2xl:text-xl">
          {acceptedTeams.map((team) => {
            return (
              <li className="" key={team._id}>
                {user?.id === team.sender._id
                  ? team.recipient.username
                  : team.sender.username}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default TeamsLists;
