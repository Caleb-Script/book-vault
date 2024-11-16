import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import Homepage from './pages/homepage';
import DetailAnsicht from './pages/detailAnsicht';
import ÄndereBuch from './pages/ändereBuch';
import NeuesBuch from './pages/neuesBuch';
import SucheBuch from './pages/sucheBuch';

const App: React.FC = () => {
  return (
    <ThemeProvider attribute="class">
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/detailAnsicht" element={<DetailAnsicht />} />
          <Route path="/ändereBuch" element={<ÄndereBuch />} />
          <Route path="/neuesBuch" element={<NeuesBuch />} />
          <Route path="/sucheBuch" element={<SucheBuch />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
