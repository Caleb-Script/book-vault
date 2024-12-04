import React from "react";
import { Box, Button, Container, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

const Homepage: React.FC = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <Container maxW="container.lg" centerContent position="relative">
      <Button
        colorScheme={theme === "dark" ? "yellow" : "blue"}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        position="absolute"
        top={4}
        left={4}
        zIndex={1}  
      >
        Theme wechseln
      </Button>

      <Box py={10} textAlign="center">
        <Heading as="h1" size="2xl" mb={6}>
          Book Vault
        </Heading>
        <Text fontSize="xl" color="gray.500" mb={8}>
            test123
        </Text>

        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button colorScheme="teal" onClick={() => handleNavigation("/detailAnsicht")}>
            Zur Detail Ansicht
          </Button>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          style={{ marginTop: "10px" }}
        >
          <Button colorScheme="teal" onClick={() => handleNavigation("/sucheBuch")}>
            Zum Suchen eines Buches
          </Button>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          style={{ marginTop: "10px" }}
        >
          <Button colorScheme="teal" onClick={() => handleNavigation("/ändereBuch")}>
            Zum Ändern eines Buches
          </Button>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          style={{ marginTop: "10px" }}
        >
          <Button colorScheme="teal" onClick={() => handleNavigation("/neuesBuch")}>
            Zum Erstellen eines Buches
          </Button>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          style={{ marginTop: "10px" }}
        >
          <Button colorScheme="teal" onClick={() => handleNavigation("/login")}>
            Zum Anmelden
          </Button>
        </motion.div>
      </Box>
    </Container>
  );
};

export default Homepage;
