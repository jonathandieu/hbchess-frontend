import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import { useInGame } from '../hooks/useInGame';
import { useGameState } from '../hooks/useGameState';
import { useSaveGameMutation } from '../app/services/gameApi';
import { useNavigate } from 'react-router-dom';
import { resetGame } from '../app/features/game/gameSlice';
import { useAppDispatch } from '../hooks/store';

const ShowResultDialog = () => {
  const { result, white, black, moves } = useGameState();
  const { roomId } = useInGame();
  const [saveGame] = useSaveGameMutation();

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsOpen(result !== '');
    saveGame({
      white: white._id,
      black: black._id,
      winner: result,
      gameId: roomId,
      moves
    });
  }, [result]);

  function closeModal() {
    setIsOpen(false);
  }

  return (
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
            <div className="inline-block overflow-hidden p-6 my-8 w-full max-w-lg text-left align-middle bg-gray-300 rounded-2xl shadow-xl transition-all">
              <div className="flex flex-col items-center w-full h-full">
                <Dialog.Title
                  as="h1"
                  className="text-2xl font-medium leading-6 text-gray-900"
                >
                  {result !== 'Draw' ? `${result} Wins` : result}
                </Dialog.Title>
                <div className="flex flex-1 justify-between items-end mt-4">
                  <button
                    type="button"
                    className="flex justify-center items-center py-1.5 px-4 h-10 text-lg font-medium text-center bg-green-600 hover:bg-green-700 rounded transition duration-200"
                    onClick={() => {
                      dispatch(resetGame());
                      closeModal();
                      navigate('/dashboard');
                    }}
                  >
                    Back to Dashboard
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ShowResultDialog;
