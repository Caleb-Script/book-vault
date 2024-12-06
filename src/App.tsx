import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import BuchDetails from './pages/detailAnsicht';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          {/* Route für Buchdetails mit dynamischer ID */}
          <Route path="/buch/:id" element={<BuchDetails />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
