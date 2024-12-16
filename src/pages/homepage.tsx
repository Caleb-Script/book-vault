import React from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  Input,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Navbar from "../features/navbar";
import Footer from "../features/footer";
import "./design/homepage.css"

const MotionButton = motion(Button);

const HeaderSection: React.FC = () => {

  return (
    <Box py={10} textAlign="center" className="header" >
      <Heading as="h1" size="xl" mb={6} className="h1">
        Deine digitale Bibliothek jederzeit griffbereit
      </Heading>
      <Text fontSize={{ base: "md", md: "lg" }} mb={8}>
        Mit BookVault kannst du deine Bücher kinderleicht organisieren, durchsuchen und entdecken. 
        Verwalte deine Sammlung, entdecke neue Geschichten und halte deine Lieblingsbücher immer griffbereit – alles an einem Ort.
      </Text>
    </Box>
  );
};

const SearchBox: React.FC = () => (
  <Box mt={6} display="flex" flexDirection="column" alignItems="center" className="search-box">
    <Input
      placeholder="Search a Book..."
      size="lg"
      borderRadius="full"
      borderColor="orange.300"
      _placeholder={{ color: "gray.500", textAlign: "center" }}
      _focus={{ borderColor: "orange.500" }}
      mb={4}
      width="100%" 
      maxW="500px" 
    />
    <MotionButton
      className="button"
      size="lg"
      bg="orange.400"
      borderRadius="15px"
      color="white"
      font-family="Bona Nova"
      _hover={{ bg: "orange.500" }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      alignSelf="center" // Garantiert zentrierte Positionierung
    >
      Search
    </MotionButton>
  </Box>
);


const Homepage: React.FC = () => (
  <>
    <Container
      maxW="container.lg"
      centerContent
      position="relative"
      pt="80px"
    >
      <Navbar />
      <HeaderSection />
      <SearchBox />
    </Container>
    <Footer />
  </>
);

export default Homepage;
