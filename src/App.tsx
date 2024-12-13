import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import BuchDetails from './pages/detailAnsicht';
import Startseite from './pages/startseite';
import Tests from './pages/test';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          {/* Startseite */}
          <Route path="/" element={<Startseite />} />
          {/* Route für Buchdetails mit dynamischer ID */}
          <Route path="/buch/:id" element={<BuchDetails />} />
          <Route path="/test/:id" element={<Tests />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
