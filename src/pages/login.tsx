import { Field } from '@/components/ui/field';
import { Box, Button, Container, Heading, Input, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();

  // States für Eingaben und Fehler
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ username: false, password: false });

  // Validierungs- und Navigationslogik
  const handleLogin = () => {
    const newErrors = {
      username: !username.trim(),
      password: !password.trim(),
    };

    setErrors(newErrors);

    if (!newErrors.username && !newErrors.password) {
      alert('Erfolgreich eingeloggt!');
      navigate('/homepage'); // Weiterleitung nach erfolgreichem Login
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <Container maxW="container.lg" centerContent position="relative">
      <Box py={10} textAlign="center">
        <Heading as="h2" size="2xl" mb={6} color="yellow.600">
          Melden Sie sich bei Ihrem Konto an
        </Heading>

        <Field label="Benutzername" invalid={errors.username}>
          <Input
            placeholder="me@example.com"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && (
            <Text color="red.500" mt={1}>
              Benutzername ist erforderlich.
            </Text>
          )}
        </Field>

        <Field label="Passwort" invalid={errors.password}>
          <Input
            placeholder="Passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <Text color="red.500" mt={1}>
              Passwort ist erforderlich.
            </Text>
          )}
        </Field>

        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          style={{ marginTop: '10px' }}
        >
          <Button colorScheme="teal" onClick={handleLogin}>
            Anmelden
          </Button>
        </motion.div>

        {/* {(errors.username || errors.password) && (
        <Alert status="error">
            Benutzername oder Passwort ist falsch
        </Alert>
        )} */}
      </Box>
    </Container>
  );
};

export default Login;
