import { Box, Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useTheme } from './context/ThemeContext';
import Navbar from './features/navBar';
import BuchDetails from './pages/detailAnsicht';
import Homepage from './pages/homepage';
// import Login from './pages/login';
import LoginPage from './pages/kp';
import UserPage from './pages/UserPage';
import BuchAendern from './pages/ändereBuch';
import Startseite from './pages/bücher';
import BuchErstellen from './pages/neuesBuch';

const App = () => {
  const navbarHeight = '60px'; // Höhe der Navbar
  const { isDarkMode } = useTheme();

  useEffect(() => {
    document.body.style.backgroundColor = isDarkMode ? '#000' : '#fff';
    document.body.style.color = isDarkMode ? '#fff' : '#000';
  }, [isDarkMode]);

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
          <Route path="/homepage" element={<Homepage />} />

          {/* <PrivateRoute>

          </PrivateRoute> */}
          {/* Homepage */}
          <Route path="/" element={<Startseite />} />

          {/* Buchdetails */}
          <Route path="/buch/:id" element={<BuchDetails />} />

          {/* Route zum Erstellen eines Buches */}
          <Route path="/neuesBuch" element={<BuchErstellen />} />

          {/* Route zum Ändern eines Buches */}
          <Route path="/buch/:id/bearbeiten" element={<BuchAendern />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/user" element={<UserPage />} />
        </Routes>
      </Box>
    </Flex>
  );
};

export default App;
