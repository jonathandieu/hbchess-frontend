import { Fragment, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, SearchIcon } from '@heroicons/react/solid';
import { useSearchQuery } from '../app/services/usersApi';
import { useCreateTeamMutation } from '../app/services/teamsApi';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';

const UsersSearch = () => {
  const [selected, setSelected] = useState<{
    id: string;
    username: string;
  } | null>(null);
  const [searchParam, setSearchParam] = useState<string>('');

  const { currentData: users = [], isFetching } = useSearchQuery(
    searchParam.trim(),
    {
      refetchOnMountOrArgChange: true,
      skip: searchParam.trim() === ''
    }
  );
  const [createTeam, { isLoading }] = useCreateTeamMutation();

  const handleCreateTeam = async () => {
    try {
      await createTeam({
        username: selected?.username ?? ''
      }).unwrap();
      setSearchParam('');
      setSelected(null);
      toast.dismiss();
    } catch (err) {
      toast.error(err.data.message);
      setSearchParam('');
      setSelected(null);
    }
  };

  return (
    <div className="p-8 w-[90%] text-gray-100 bg-gray-800 rounded-lg shadow-2xl xl:w-2/3 2xl:w-1/3">
      <h1 className="py-4 text-2xl 2xl:text-4xl">Search for Teammate:</h1>
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <div className="overflow-hidden relative w-full text-left bg-white rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300/75 shadow-md cursor-default sm:text-sm">
            <Combobox.Input
              className="py-2 pr-10 pl-3 w-full text-sm leading-5 text-gray-900 border-none focus:ring-0"
              displayValue={(user: { id: number; username: string }) =>
                user ? user.username : ''
              }
              onChange={(event) => {
                setSearchParam(event.target.value);
              }}
            />
            <Combobox.Button className="flex absolute inset-y-0 right-0 items-center pr-2">
              <SearchIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Combobox.Options className="overflow-auto absolute py-1 mt-1 w-full max-h-60 text-base bg-white rounded-md focus:outline-none ring-1 ring-black/5 shadow-lg sm:text-sm">
              {isFetching ? (
                <Combobox.Option
                  key={0}
                  className="relative py-2 pr-4 pl-10 cursor-default select-none"
                  value={0}
                >
                  <div className="relative py-2 px-4 text-gray-700 cursor-default select-none">
                    Loading...
                  </div>
                </Combobox.Option>
              ) : users.length === 0 ? (
                <Combobox.Option
                  key={0}
                  className="relative py-2 pr-4 pl-10 cursor-default select-none"
                  value={0}
                >
                  <div className="relative py-2 px-4 text-gray-700 cursor-default select-none">
                    User not found{' '}
                  </div>
                </Combobox.Option>
              ) : (
                users.map((user, index) => (
                  <Combobox.Option
                    key={user._id ?? index}
                    className={({ active }) =>
                      `cursor-default select-none relative py-2 pl-10 pr-4 ${
                        active ? 'text-white bg-teal-600' : 'text-gray-900'
                      }`
                    }
                    value={user}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {user.username}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          >
                            <CheckIcon className="w-5 h-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
      <div className="flex justify-center pt-4 w-full">
        <button
          className="flex flex-row justify-center items-center py-2.5 px-4 w-44 h-12 text-center hover:text-white bg-green-600 hover:bg-green-700 rounded transition duration-200"
          onClick={handleCreateTeam}
        >
          {isLoading ? <Spinner /> : <p>Send Request</p>}
        </button>
      </div>
    </div>
  );
};

export default UsersSearch;
