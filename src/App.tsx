import { Route, Routes } from 'react-router-dom';
import BuchDetails from './pages/detailAnsicht';
import Startseite from './pages/startseite';

const App = () => {
  return (
    <>
        <Routes>
          {/* Startseite */}
          <Route path="/" element={<Startseite />} />
          {/* Route für Buchdetails mit dynamischer ID */}
          <Route path="/buch/:id" element={<BuchDetails />} />
        </Routes>
    </>
  );
};

export default App;
