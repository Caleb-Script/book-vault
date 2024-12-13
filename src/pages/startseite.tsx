import { Box, Button, Heading, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const Startseite = () => {
  return (
    <Box textAlign="center" p={5}>
      <Heading mb={4}>Willkommen zur Buch-App</Heading>
      <Text mb={4}>Hier kannst du Details zu Büchern ansehen.</Text>
      <Stack>
        <RouterLink to="/buch/1">
          <Button colorScheme="teal">
            Buch mit ID 1 anzeigen
          </Button>
        </RouterLink>
        <RouterLink to="/buch/2">
          <Button colorScheme="blue">
            Buch mit ID 2 anzeigen
          </Button>
        </RouterLink>
      </Stack>
    </Box>
  );
};

export default Startseite;
