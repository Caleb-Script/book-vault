import React from "react";
import { Box, Button, Container, Heading, Text, Input } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import Navbar from "../features/navbar";
import Footer from "../features/footer";
import './design/homepage.css'; // CSS importieren

const Homepage: React.FC = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  return (
    <>
    <Container
      maxW="container.lg"
      centerContent
      position="relative"
      paddingTop="80px"
      className="header"  // Die Klasse für den Header
    >
      <Navbar />

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

      <Box py={10} textAlign="center" className="header">
        <Heading as="h1" size="2xl" mb={6} className="h1">
          Deine digitale Bibliothek jederzeit griffbereit
        </Heading>

        <Text mb={8}>
          Mit BookVault kannst du deine Bücher kinderleicht organisieren, durchsuchen und entdecken.
          Verwalte deine Sammlung, entdecke neue Geschichten und halte deine Lieblingsbücher immer griffbereit – alles an einem Ort.
        </Text>

        <Box className="search-box" mt={6}>
          <Input
            placeholder="Search a Book"
            size="lg"
            borderRadius="full"
            borderColor="#f39c12"
            _placeholder={{ color: "gray.500" }}
            _focus={{ borderColor: "orange.500", boxShadow: "0 0 10px orange" }}
            mb={4}
          />
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button size="lg" className="search-box-button">
              Search
            </Button>
          </motion.div>
        </Box>
      </Box>
    </Container>
    <Footer /> 
    </>
  );
};

export default Homepage;
