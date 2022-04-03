import { Team, useGetAllTeamsQuery } from '../app/services/teamsApi';
import { Fragment } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, SearchIcon } from '@heroicons/react/solid';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';

interface OpponentTeamSearchProps {
  selected: Team | null;
  setSelected: (selected: Team | null) => void;
}

const OpponentTeamSearch = ({
  selected,
  setSelected
}: OpponentTeamSearchProps) => {
  const { user } = useAuth();
  const [searchParam, setSearchParam] = useState<string>('');

  const { data: allTeams = [], isFetching } = useGetAllTeamsQuery({
    limit: 0,
    offset: 0
  });

  const teams: Array<Team> = allTeams.filter((team) => {
    const target =
      `${team.senderUsername} - ${team.recipientUsername}`.toLowerCase();
    return (
      target.includes(searchParam.toLowerCase()) &&
      team.sender !== user?.id &&
      team.recipient !== user?.id
    );
  });

  return (
    <div>
      <div className="p-8">
        <h1 className="py-4 text-xl">Pick An Opponent Team:</h1>
        <Combobox value={selected} onChange={setSelected}>
          <div className="relative mt-1">
            <div className="overflow-hidden relative w-full text-left bg-white rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300/75 shadow-md cursor-default sm:text-sm">
              <Combobox.Input
                className="py-2 pr-10 pl-3 w-full text-sm leading-5 text-gray-900 border-none focus:ring-0"
                displayValue={(team: Team) =>
                  team
                    ? `${team.senderUsername} - ${team.recipientUsername}`
                    : ''
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
                ) : teams.length === 0 ? (
                  <Combobox.Option
                    key={0}
                    className="relative py-2 pr-4 pl-10 cursor-default select-none"
                    value={0}
                  >
                    <div className="relative py-2 px-4 text-gray-700 cursor-default select-none">
                      Team not found{' '}
                    </div>
                  </Combobox.Option>
                ) : (
                  teams.map((team, index) => (
                    <Combobox.Option
                      key={team._id ?? index}
                      className={({ active }) =>
                        `cursor-default select-none relative py-2 pl-10 pr-4 ${
                          active ? 'text-white bg-teal-600' : 'text-gray-900'
                        }`
                      }
                      value={team}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            {team.senderUsername} - {team.recipientUsername}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? 'text-white' : 'text-teal-600'
                              }`}
                            >
                              <CheckIcon
                                className="w-5 h-5"
                                aria-hidden="true"
                              />
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
      </div>{' '}
    </div>
  );
};

export default OpponentTeamSearch;
