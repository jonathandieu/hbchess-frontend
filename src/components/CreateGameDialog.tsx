import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import TeammateSearch from './TeammateSearch';
import OpponentTeamSearch from './OpponentTeamSearch';
import { Team } from '../app/services/teamsApi';
import { useCreateGameMutation } from '../app/services/gameApi';
import { toast } from 'react-toastify';
import { setInGame } from '../app/features/game/gameSlice';
import { useAppDispatch } from '../hooks/store';
import { useAuth } from '../hooks/useAuth';

const CreateGameDialog = () => {
  const [selectedTeammate, setSelectedTeammate] = useState<{
    teamId: string;
    teammateId: string;
    username: string;
  } | null>(null);

  const [selectedOpponentTeam, setSelectedOpponentTeam] = useState<Team | null>(
    null
  );
  const [createGame] = useCreateGameMutation();
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  const { user } = useAuth();

  function closeModal() {
    setIsOpen(false);
  }

  const handleCreateGame = async () => {
    try {
      const result = await createGame({
        whiteId: selectedTeammate?.teamId ?? '',
        blackId: selectedOpponentTeam?._id ?? ''
      }).unwrap();
      dispatch(setInGame({ game: result.game, id: user?.id ?? '' }));
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center w-56">
        <button
          className="flex justify-center items-center py-2.5 px-4 w-44 h-12 text-xl font-medium text-center bg-green-600 hover:bg-green-700 rounded transition duration-200"
          onClick={() => setIsOpen(true)}
        >
          Create Game
        </button>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="overflow-y-auto fixed inset-0"
          onClose={closeModal}
        >
          <div className="h-screen text-center">
            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block overflow-hidden p-6 my-8 w-full max-w-2xl h-3/4 text-left align-middle bg-gray-100 rounded-2xl shadow-xl transition-all">
                <div className="flex flex-col h-full">
                  <Dialog.Title
                    as="h1"
                    className="text-2xl font-medium leading-6 text-gray-900"
                  >
                    Create A New Game
                  </Dialog.Title>
                  <div className="mt-2">
                    <TeammateSearch
                      selected={selectedTeammate}
                      setSelected={setSelectedTeammate}
                    />

                    <OpponentTeamSearch
                      selected={selectedOpponentTeam}
                      setSelected={setSelectedOpponentTeam}
                    />
                  </div>

                  <div className="flex flex-1 justify-between items-end mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center py-2 px-4 text-sm font-medium text-green-900 bg-green-100 hover:bg-green-200 rounded-md border border-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        handleCreateGame();
                        closeModal();
                      }}
                    >
                      Create Game
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center py-2 px-4 text-sm font-medium text-green-900 rounded-md border border-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CreateGameDialog;
