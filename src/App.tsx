import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import BuchDetails from './pages/detailAnsicht';
import Startseite from './pages/startseite';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          {/* Startseite */}
          <Route path="/" element={<Startseite />} />
          {/* Route für Buchdetails mit dynamischer ID */}
          <Route path="/buch/:id" element={<BuchDetails />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
