import {
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  Input,
  Separator,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaLock, FaUserAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      await login(username, password);
      navigate('/user'); // Weiterleitung zur User-Seite
    } catch (err) {
      setError('Login fehlgeschlagen. Bitte überprüfe deine Eingaben.');
    }
  };

  return (
    <Box
      bgGradient="linear(to-r, gray.900, black)"
      color="white"
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      px={4}
    >
      <VStack
        gap={6}
        bg="gray.800"
        p={8}
        borderRadius="xl"
        boxShadow="2xl"
        maxW="400px"
        w="full"
      >
        <Heading size="lg" color="#cc9600" textAlign="center">
          Willkommen zurück
        </Heading>
        <Text fontSize="sm" color="gray.400" textAlign="center">
          Melde dich an, um auf dein Konto zuzugreifen
        </Text>
        <Separator borderColor="gray.600" />

        {error && (
          <Text color="red.400" fontSize="sm" textAlign="center">
            {error}
          </Text>
        )}

        <VStack gap={4} w="full">
          <HStack w="full" gap={3} bg="gray.700" p={3} borderRadius="md">
            {/* <Icon as={FaUserAlt} color="gray.500" /> */}
            <Input
              placeholder="Benutzername"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              bg="transparent"
              border="none"
              _focus={{ borderColor: "transparent" }}
              color="white"
              _placeholder={{ color: 'gray.500' }}
            />
          </HStack>
          <HStack w="full" gap={3} bg="gray.700" p={3} borderRadius="md">
            {/* <Icon as={FaLock} color="gray.500" /> */}
            <Input
              placeholder="Passwort"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              bg="transparent"
              border="none"
              _focus={{ borderColor: "transparent" }}
              color="white"
              _placeholder={{ color: 'gray.500' }}
            />
          </HStack>
        </VStack>

        <Button
          w="full"
          bg="#cc9600"
          color="black"
          size="lg"
          _hover={{ bg: 'orange.500' }}
          onClick={handleLogin}
        >
          Einloggen
        </Button>

        <Text fontSize="sm" color="gray.400" textAlign="center">
          Hast du kein Konto?{' '}
          <Text as="span" color="#cc9600" cursor="pointer">
            Registrieren
          </Text>
        </Text>
      </VStack>
    </Box>
  );
};

export default Login;
