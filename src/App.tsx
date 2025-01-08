import { Box, Flex } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './features/navBar';
import BuchDetails from './pages/detailAnsicht';
import Homepage from './pages/homepage';
import Startseite from './pages/startseite';

const App = () => {
  const navbarHeight = '60px'; // Höhe der Navbar

  return (
    <Flex direction="column" height="100vh">
      {/* Navbar bleibt oben */}
      <Box
        as="header"
        width="100%"
        height={navbarHeight}
        boxShadow="sm"
        position="fixed"
        top="0"
        left="0"
        zIndex="1"
        bg="white" // Hintergrundfarbe, um Überlagerungen zu vermeiden
      >
        <Navbar />
      </Box>

      {/* Seiteninhalt unterhalb der Navbar */}
      <Box
        as="main"
        flex="1"
        overflowY="auto"
        mt={navbarHeight} // Platz für die Navbar schaffen
      >
        <Routes>
          {/* Startseite */}
          <Route path="/" element={<Startseite />} />

          {/* Homepage */}
          <Route path="/homepage" element={<Homepage />} />

          {/* Buchdetails */}
          <Route path="/buch/:id" element={<BuchDetails />} />
        </Routes>
      </Box>
    </Flex>
  );
};

export default App;
