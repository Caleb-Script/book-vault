import { Route, Routes } from 'react-router-dom';
import BuchDetails from './pages/detailAnsicht';
import Startseite from './pages/startseite';
import Homepage from './pages/homepage';
import Navbar from './features/navBar';
import Login from './pages/login';
import { Suspense } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import BuchAendern from './pages/ändereBuch';

const App = () => {
  return (
    <Flex direction="column" height="100vh">
      {/* Navbar bleibt oben */}
      <Box as="header" width="100%" boxShadow="sm" zIndex="1">
        <Navbar />
      </Box>

      {/* Seiteninhalt unterhalb der Navbar */}
      <Box as="main" flex="1" overflow="auto">
        <Routes>
          <Route path="/" element={<Startseite />} />

          {/* Route für Buchdetails mit dynamischer ID */}
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/buch/:id" element={<BuchDetails />} />
          {/* Route zum Ändern eines Buchs */}
          <Route path="/buch/:id/bearbeiten" element={<BuchAendern />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Box>
    </Flex>
  );
};

export default App;
