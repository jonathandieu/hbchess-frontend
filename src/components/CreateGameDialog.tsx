import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import TeammateSearch from './TeammateSearch';
import { SelectedValue } from './TeammateSearch';

interface CreateGameDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  createGame: (selected: SelectedValue) => void;
}

const CreateGameDialog = ({
  isOpen,
  setIsOpen,
  createGame
}: CreateGameDialogProps) => {
  const [selected, setSelected] = useState<{
    id: string;
    username: string;
  } | null>(null);

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
            <div className="inline-block overflow-hidden p-6 my-8 w-full max-w-md h-1/3 text-left align-middle bg-gray-100 rounded-2xl shadow-xl transition-all">
              <div className="flex flex-col h-full">
                <Dialog.Title
                  as="h1"
                  className="text-2xl font-medium leading-6 text-gray-900"
                >
                  Create A New Game
                </Dialog.Title>
                <div className="mt-2">
                  <TeammateSearch
                    selected={selected}
                    setSelected={setSelected}
                  />
                </div>

                <div className="flex flex-1 justify-between items-end mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center py-2 px-4 text-sm font-medium text-green-900 bg-green-100 hover:bg-green-200 rounded-md border border-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                    onClick={() => {
                      createGame(selected);
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
  );
};

export default CreateGameDialog;
