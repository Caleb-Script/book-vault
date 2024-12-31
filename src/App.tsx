import { Route, Routes } from 'react-router-dom';
import BuchDetails from './pages/detailAnsicht';
import Startseite from './pages/startseite';
import Homepage from './pages/homepage';
import Login from './pages/login';
import Navbar from './features/navbar';
import { Suspense } from 'react';
import { Box, Flex } from '@chakra-ui/react';

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
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/buch/:id" element={<BuchDetails />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Box>
    </Flex>
  );
};

export default App;
