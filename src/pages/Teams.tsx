import UsersSearch from '../components/UsersSearch';
import TeamsLists from '../components/TeamsLists';
function Teams() {
  return (
    <div className="flex flex-col justify-center items-center p-4 space-y-4 w-full h-min md:h-full">
      <UsersSearch />
      <TeamsLists />
    </div>
  );
}

export default Teams;
