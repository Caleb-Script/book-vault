import {
  Box,
  Button,
  Flex,
  Heading,
  Separator,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ProgressCircleRing,
  ProgressCircleRoot,
  ProgressCircleValueText,
} from '../components/ui/progress-circle';
import { useAuth } from '../context/AuthContext';

const UserPage = () => {
  const { user, logout } = useAuth();
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.expires_in) {
      const timer = setInterval(() => {
        setRemainingTime((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      setRemainingTime(user.expires_in);

      return () => clearInterval(timer);
    }
  }, [user?.expires_in]);

  const handleLogout = () => {
    logout();
    navigate('/'); // Weiterleitung zur Startseite nach Logout
  };

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, '0');
    const minutes = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${secs}`;
  };

  if (!user) {
    return (
      <VStack
        height="100vh"
        justify="center"
        align="center"
        bg="gray.900"
        color="white"
      >
        <ProgressCircleRoot value={null} color="yellow.400">
          <ProgressCircleRing cap="round" />
        </ProgressCircleRoot>
        <Text mt={4} fontSize="lg">
          Lade Benutzerdaten...
        </Text>
      </VStack>
    );
  }

  return (
    <Box bg="gray.900" color="white" minHeight="100vh" p={8}>
      <Flex justify="center" align="center" flexDir="column">
        <Box
          bg="gray.800"
          p={8}
          borderRadius="lg"
          boxShadow="xl"
          w="100%"
          maxW="500px"
        >
          <Heading
            as="h2"
            size="lg"
            mb={4}
            textAlign="center"
            color="yellow.400"
          >
            Benutzerprofil
          </Heading>
          <Separator mb={4} borderColor="yellow.400" />
          <VStack spacing={4} align="stretch">
            <Text fontSize="lg">
              <strong>Vorname:</strong> {user.given_name}
            </Text>
            <Text fontSize="lg">
              <strong>Nachname:</strong> {user.family_name}
            </Text>
            <Text fontSize="lg">
              <strong>Benutzername:</strong> {user.username}
            </Text>
            <Text fontSize="lg">
              <strong>Email:</strong> {user.email}
            </Text>
          </VStack>
          <Separator my={4} borderColor="yellow.400" />
          <Flex justify="center" align="center" flexDir="column">
            <ProgressCircleRoot
              value={(remainingTime / user.expires_in) * 100}
              color="yellow.400"
              size={'lg'}
            >
              <ProgressCircleValueText />
              <ProgressCircleRing />
            </ProgressCircleRoot>
            <Text mt={2} fontSize="sm" color="gray.400">
              Zeit bis zur Token-Ablauf:
              {remainingTime > 0 ? formatTime(remainingTime) : 'Abgelaufen'}
            </Text>
          </Flex>
          <Button
            mt={6}
            w="100%"
            colorScheme="yellow"
            onClick={handleLogout}
            _hover={{ bg: 'yellow.500', color: 'black' }}
          >
            Logout
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default UserPage;
