import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  Input,
  Flex,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { ColorModeToggle } from "../components/color-mode-toggle.jsx";
import { Vorstellung } from "../features/vorstellung.js"
import Navbar from "../features/navBar.js";
import "./design/homepage.css";

const MotionButton = motion(Button);
const MotionBox = motion(Box);

const HeaderSection: React.FC = () => {
  return (
    <MotionBox
      py={10}
      textAlign="center"
      className="header"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <Heading as="h1" size="xl" mb={6} className="h1">
        Deine digitale Bibliothek jederzeit griffbereit
      </Heading>
      <Text fontSize={{ base: "md", md: "lg" }} mb={8}>
        Mit BookVault kannst du deine Bücher kinderleicht organisieren, durchsuchen und entdecken.
        Verwalte deine Sammlung, entdecke neue Geschichten und halte deine Lieblingsbücher immer griffbereit – alles an einem Ort.
      </Text>
    </MotionBox>
  );
};

const SearchBox: React.FC = () => (
  <div className="header">
  <Heading as="h1" mb={6} className="h1">
    Suchen Sie nach einem bestimmten Buch
  </Heading>
  <MotionBox
    mt={6}
    display="flex"
    flexDirection="column"
    alignItems="center"
    className="search-box"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
  >
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
      alignSelf="center"
    >
      Search
    </MotionButton>
  </MotionBox>
  </div>
);

const Homepage: React.FC = () => {
  const [view, setView] = useState<"home" | "search" | "details">("home");

  const handlePrevious = () => {
    if (view === "details") {
      setView("search");
    } else if (view === "search") {
      setView("home");
    }
  };

  const handleNext = () => {
    if (view === "home") {
      setView("search");
    } else if (view === "search") {
      setView("details");
    }
  };

  return (
    <>
      <Container
        maxW="container.lg"
        centerContent
        position="relative"
        pt="80px"
      >
        <Navbar />
        <ColorModeToggle />
        <AnimatePresence mode="wait">
          {view === "home" && <HeaderSection/>}
          {view === "search" && <SearchBox />}
          {view === "details" && <Vorstellung />}
        </AnimatePresence>

        <Flex mt={6} justify="center" gap={4}>
          <Button
            onClick={handlePrevious}
            _hover={{ textDecoration: "underline" }}
            color={view === "home" ? "gray.500" : "orange.400"} 
          >
            Previous
          </Button>

          <Box display="flex" alignItems="center" gap={10} position="relative" >
            <Text color={view === "home" ? "orange.400" : "gray.500"}>1</Text>
            <Text color={view === "search" ? "orange.400" : "gray.500"}>2</Text>
            <Text color={view === "details" ? "orange.400" : "gray.500"}>3</Text>
          </Box>

          <Button
            onClick={handleNext}
            _hover={{ textDecoration: "underline" }}
            color={view === "details" ? "gray.500" : "orange.400"}
          >
            Next
          </Button>
        </Flex>
      </Container>
    </>
  );
};

export default Homepage;
