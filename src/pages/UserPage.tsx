import { Box, Button, Heading, Spinner, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const UserPage = () => {
  const { user, logout } = useAuth();
  const [remainingTime, setRemainingTime] = useState<number>(0);

  useEffect(() => {
    if (user?.expires_in) {
      const timer = setInterval(() => {
        setRemainingTime((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      setRemainingTime(user.expires_in);

      return () => clearInterval(timer);
    }
  }, [user?.expires_in]);

  if (!user) {
    return (
      <VStack
        height="100vh"
        justify="center"
        align="center"
        bg="#000"
        color="#fff"
      >
        <Spinner size="xl" color="#cc9600" />
        <Text mt={4}>Lade Benutzerdaten...</Text>
      </VStack>
    );
  }

  return (
    <Box
      minHeight="100vh"
      bg="gray.800"
      color="white"
      p={8}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <VStack spacing={6} p={6} bg="gray.700" borderRadius="lg" boxShadow="lg">
        <Heading color="#cc9600">Benutzerprofil</Heading>
        <Text>Vorname: {user.given_name}</Text>
        <Text>Nachname: {user.family_name}</Text>
        <Text>Benutzername: {user.username}</Text>
        <Text>Email: {user.email}</Text>
        <Text>
          Token läuft ab in: {Math.floor(remainingTime / 60)} Minuten{' '}
          {remainingTime % 60} Sekunden
        </Text>
        <Button colorScheme="yellow" onClick={logout}>
          Logout
        </Button>
      </VStack>
    </Box>
  );
};

export default UserPage;
