import React from 'react';
import ReactDOM from 'react-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import './styles/index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Used to keep UI in sync with the URL, only reloading components that need to be changed instead of entire page
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
