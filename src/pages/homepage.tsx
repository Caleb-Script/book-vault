import { BUECHER } from '@/graphql/queries.js';
import { useLazyQuery } from '@apollo/client';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ColorModeToggle } from '../components/color-mode-toggle.jsx';
import Footer from '../features/footer';
import Navbar from '../features/navBar.js';
import { Vorstellung } from '../features/vorstellung.js';
import './design/homepage.css';

const MotionBox = motion(Box);
const MotionButton = motion(Button);

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
      <Text fontSize={{ base: 'md', md: 'lg' }} mb={8}>
        Mit BookVault kannst du deine Bücher kinderleicht organisieren,
        durchsuchen und entdecken. Verwalte deine Sammlung, entdecke neue
        Geschichten und halte deine Lieblingsbücher immer griffbereit – alles an
        einem Ort.
      </Text>
    </MotionBox>
  );
};

const SearchBox: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const [fetchBooks, { data, loading, error }] = useLazyQuery(BUECHER, {
    variables: { titel: searchTerm },
    fetchPolicy: 'network-only',
  });

  const handleSearch = async () => {
    await fetchBooks();
    if (data?.buecher?.length > 0) {
      const bookId = data.buecher[0].id;
      navigate(`/buch/${bookId}`);
    } else {
      alert('Buch nicht gefunden!');
    }
  };

  return (
    <Box
      mt={6}
      display="flex"
      flexDirection="column"
      alignItems="center"
      className="search-box"
    >
      <Input
        placeholder="Search a Book..."
        size="lg"
        borderRadius="full"
        borderColor="orange.300"
        _placeholder={{ color: 'gray.500', textAlign: 'center' }}
        _focus={{ borderColor: 'orange.500' }}
        mb={4}
        width="100%"
        maxW="500px"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <MotionButton
        className="button"
        size="lg"
        bg="orange.400"
        borderRadius="15px"
        color="white"
        _hover={{ bg: 'orange.500' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        alignSelf="center"
        onClick={handleSearch}
      >
        Search
      </MotionButton>

      {loading && <Spinner mt={4} size="lg" color="orange.500" />}
      {error && (
        <Text color="red.500" mt={4}>
          Fehler beim Laden der Daten: {error.message}
        </Text>
      )}
    </Box>
  );
};

const Homepage: React.FC = () => {
  const [view, setView] = useState<'home' | 'search' | 'details'>('home');

  const handlePrevious = () => {
    if (view === 'details') {
      setView('search');
    } else if (view === 'search') {
      setView('home');
    }
  };

  const handleNext = () => {
    if (view === 'home') {
      setView('search');
    } else if (view === 'search') {
      setView('details');
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
          {view === 'home' && <HeaderSection />}
          {view === 'search' && <SearchBox />}
          {view === 'details' && <Vorstellung />}
        </AnimatePresence>
        <Flex mt={6}>
          {view !== 'home' && (
            <Button onClick={handlePrevious} mr={4}>
              Previous
            </Button>
          )}
          {view !== 'details' && <Button onClick={handleNext}>Next</Button>}
        </Flex>
      </Container>
      <Footer />
    </>
  );
};

export default Homepage;
