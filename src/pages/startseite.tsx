import { Box, Button, Heading, Stack, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import reactLogo from '../assets/react.svg';
import viteLogo from '/vite.svg';

const Startseite = () => {
  const [count, setCount] = useState(0);
  const navigate = useNavigate(); // Hook für Navigation
  const randomBookIds = [1, 20, 30, 40, 50, 60];

  const handleRandomNavigation = () => {
    const randomId =
      randomBookIds[Math.floor(Math.random() * randomBookIds.length)];
    navigate(`/buch/${randomId}`); // Navigiere zur zufälligen Buchseite
  };
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <Button colorScheme="teal" onClick={handleRandomNavigation}>
          Zufälliges Buch anzeigen
        </Button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Box textAlign="center" p={5}>
        <Heading mb={4}>Willkommen zur Buch-App</Heading>
        <Text mb={4}>Hier kannst du Details zu Büchern ansehen.</Text>
        <Stack>
          <RouterLink to="/buch/1">
            <Button colorScheme="teal">Buch mit ID 1 anzeigen</Button>
          </RouterLink>
          <RouterLink to="/buch/20">
            <Button colorScheme="blue">Buch mit ID 20 anzeigen</Button>
          </RouterLink>
        </Stack>
      </Box>
    </>
  );
};

export default Startseite;
