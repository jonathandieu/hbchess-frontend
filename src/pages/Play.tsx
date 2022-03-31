import { useState } from 'react';
import CreateGameDialog from '../components/CreateGameDialog';
import { SelectedValue } from '../components/TeammateSearch';

function Play() {
  const [isOpen, setIsOpen] = useState(false);

  const handleCreateGame = (selected: SelectedValue) => {
    console.log(selected);
  };

  return (
    <>
      <CreateGameDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        createGame={handleCreateGame}
      />
      <div className="flex justify-center items-center w-full h-full">
        <div className="flex flex-row p-4 space-y-4 w-[90%] text-white bg-gray-800 rounded-lg shadow-2xl md:flex-row md:justify-between md:space-y-0 md:w-1/2">
          <div className="flex justify-center items-center w-56">
            <button
              className="flex justify-center items-center py-2.5 px-4 w-44 h-12 text-xl font-medium text-center bg-green-600 hover:bg-green-700 rounded transition duration-200"
              onClick={() => setIsOpen(true)}
            >
              Create Game
            </button>
          </div>

          <div className="flex flex-col flex-1 justify-center items-center p-2 w-4/5">
            <h1 className="pb-2 mb-7 w-full text-3xl text-center border-b-2 border-gray-300">
              Games Available:
            </h1>
            <ol className="space-y-4 w-3/4 text-2xl list-disc">
              <li>
                <div className="flex flex-row justify-between w-full">
                  <p>Game #1</p>
                  <button className="flex justify-center items-center py-1.5 px-4 w-32 h-10 text-lg font-medium text-center bg-green-600 hover:bg-green-700 rounded transition duration-200">
                    Join Game
                  </button>
                </div>
              </li>
              <li>Game #2</li>
              <li>Game #3</li>
              <li>Game #4</li>
            </ol>
          </div>
        </div>
      </div>
    </>
  );
}

export default Play;
