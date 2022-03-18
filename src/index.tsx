import React from 'react';
import ReactDOM from 'react-dom';
import LoggedOutTemplate from './components/LoggedOutTemplate';
import LoggedInTemplate from './components/LoggedInTemplate';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Leaderboard from './pages/Leaderboard';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { ToastContainer } from 'react-toastify';

import './styles/index.css';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Used to keep UI in sync with the URL, only reloading components that need to be changed instead of entire page

const persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoggedOutTemplate />}>
              <Route path="/" element={<Landing />} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/signup" element={<Register />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
            </Route>

            <Route path="/dashboard" element={<LoggedInTemplate />}>
              {' '}
            </Route>
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
    <ToastContainer
      position="bottom-left"
      autoClose={false}
      newestOnTop
      closeOnClick
      pauseOnFocusLoss
      theme="dark"
      draggable={false}
    />
  </React.StrictMode>,
  document.getElementById('root')
);
