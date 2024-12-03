import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Practice from './pages/Practice/Practice';
import "./App.css";

function App() {
  return (
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/practice" element={<Practice />} />
        </Routes>
  );
}

export default App;
