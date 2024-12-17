import { Box, Button, Heading, Stack, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Startseite = () => {
  const [count, setCount] = useState(0);
  const randomBookIds = [1, 20, 30, 40, 50, 60];

  const handleRandomNavigation = () => {
    const randomId =
      randomBookIds[Math.floor(Math.random() * randomBookIds.length)];
    return `/buch/${randomId}`; // Navigiere zur zufälligen Buchseite
  };

  return (
    <>
      <Box textAlign="center" p={5}>
        <Heading mb={4}>Willkommen zur Buch-App</Heading>
        <Button
          colorScheme="teal"
          onClick={() => setCount((count) => count + 1)}
        >
          counter: {count}
        </Button>
        <Text mb={4}>Hier kannst du Details zu Büchern ansehen und ändern.</Text>
        <Stack>
          {/* Link zur Buch-Detailansicht */}
          <Link to="/buch/1">
            <Button colorScheme="teal">Buch mit ID 1 anzeigen</Button>
          </Link>
          <Link to="/buch/20">
            <Button colorScheme="blue">Buch mit ID 20 anzeigen</Button>
          </Link>
          <Link to={handleRandomNavigation()}>
            <Button colorScheme="blue">Zufälliges Buch anzeigen</Button>
          </Link>

          {/* Link zur Buch-Ändern-Seite */}
          {/* Stelle sicher, dass die Route für das Bearbeiten des Buches korrekt ist */}
          <Link to="/buch/40/bearbeiten">
            <Button colorScheme="purple">Buch mit der ID 40 ändern</Button>
          </Link>
        </Stack>
      </Box>
    </>
  );
};

export default Startseite;
