import { Route, Routes } from 'react-router-dom';
import BuchDetails from './pages/detailAnsicht';
import Startseite from './pages/startseite';
import BuchAendern from './pages/ändereBuch';

const App = () => {
  return (
    <>
      <Routes>
        {/* Startseite */}
        <Route path="/" element={<Startseite />} />
        {/* Buchdetails mit dynamischer ID */}
        <Route path="/buch/:id" element={<BuchDetails />} />
        {/* Route zum Ändern eines Buchs */}
        <Route path="/buch/:id/bearbeiten" element={<BuchAendern />} />
      </Routes>
    </>
  );
};

export default App;
