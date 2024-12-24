import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  Input,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { ColorModeToggle } from "../components/color-mode-toggle.jsx";
import { Vorstellung } from "../features/vorstellung.js"
import Navbar from "../features/navBar.js";
import "./design/homepage.css";
import { useNavigate } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { BUECHER } from "@/graphql/queries.js";

const MotionBox = motion(Box);

const HeaderSection: React.FC = () => {
  return (
    <>
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
      
      <Vorstellung/>

      <Heading fontFamily="Bona Nova" fontSize="4xl" color="#CC9600" mb={6}>
        <strong>Funktionen:</strong>
      </Heading>

      <Text fontFamily="Bona Nova" fontSize="xl" textAlign="left" maxW="700px" mx="auto" mb={4}>
        <strong>Buchsuche:</strong> Finden Sie Bücher schnell und effizient, indem Sie den Titel oder andere Kriterien wie ISBN eingeben. 
        Unsere Suchfunktion zeigt Ihnen sofort relevante Ergebnisse.
      </Text>
      <Text fontFamily="Bona Nova" fontSize="xl" textAlign="left" maxW="700px" mx="auto" mb={4}>
        <strong>Alle Bücher:</strong> Stöbern Sie in Unserer gesamten Sammlung an Büchern, die übersichtlich dargestellt wird. Filtern und sortieren
        Sie die Bücher nach Kriterien wie Schlagwörter.
      </Text>
      <Text fontFamily="Bona Nova" fontSize="xl" textAlign="left" maxW="700px" mx="auto" mb={4}>
        <strong>Detailansicht:</strong> Erhalten Sie detaillierte Informationen zu einem Buch, einschließlich Titel, Untertitel, ISBN,
        Preis, Verfügbarkeit und vielem mehr.
      </Text>
      <Text fontFamily="Bona Nova" fontSize="xl" textAlign="left" maxW="700px" mx="auto">
        Entdecken Sie Ihre Lieblingsbücher und behalten Sie stets den Überblick über Ihre Sammlung. BookVault ist die perfekte Lösung
        für Buchliebhaber und Sammler!
      </Text>
  </>
  );
};

const SearchBox: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState();
  const navigate = useNavigate(); 

  const [fetchBooks, { data, loading, error }] = useLazyQuery(BUECHER, {
    variables: { titel: searchTerm },
    fetchPolicy: "network-only",
  });

  const handleSearch = async () => {
    await fetchBooks();

    if (data?.buecher?.length > 0) {
      const bookId = data.buecher[0].id; 
      navigate(`/buch/${bookId}`);
    } else {
      alert("Buch nicht gefunden!");
    }
  };

  return (
    <div className="header">
      <Heading as="h1" mb={6} className="h1">
        Suchen Sie nach einem bestimmten Buch
      </Heading>
      <motion.div
        style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
      >
        <Input
          placeholder="Search the title of your book..."
          size="lg"
          borderRadius="full"
          borderColor="orange.300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          _placeholder={{ color: "gray.500", textAlign: "center" }}
          _focus={{ borderColor: "orange.500" }}
          mb={4}
          width="100%"
          maxW="500px"
        />
        <motion.button
          className="button"
          style={{
            padding: "10px 20px",
            borderRadius: "15px",
            background: "orange.400",
            color: "white",
            fontFamily: "Bona Nova",
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSearch} 
        >
          Search
        </motion.button>
      </motion.div>

      {loading && <Spinner mt={4} size="lg" color="orange.500" />}

      {error && (
        <Text color="red.500" mt={4}>
          Fehler beim Laden der Daten: {error.message}
        </Text>
      )}
    </div>
  );
};


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
