import {
  Box,
  Container,
  Flex,
  Heading,
  IconButton,
  Text,
} from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Footer from '../features/footer.js';
import Navbar from '../features/navBar.js';
import './design/homepage.css';
import { Vorstellung } from '../features/vorstellung.js';
import { Link } from 'react-router-dom';

const MotionBox = motion(Box);

const HeaderSection: React.FC = () => (
  <MotionBox
    py={10}
    textAlign="center"
    className="header"
    initial={{ opacity: 0, x: 300 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -300 }}
    transition={{ duration: 0.5 }}
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

const BestsellerSection: React.FC = () => (
  <MotionBox
    py={10}
    textAlign="center"
    className="bestseller"
    initial={{ opacity: 0, x: 300 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -300 }}
    transition={{ duration: 0.5 }}
  >
    <Heading as="h2" size="lg" mb={6} className="h2">
      Bestseller
    </Heading>
    <Text>
      Entdecke die beliebtesten Bücher, die unsere Leser nicht aus der Hand
      legen können.
    </Text>
  </MotionBox>
);

const CategoriesSection: React.FC = () => (
  <MotionBox
    py={10}
    textAlign="center"
    className="categories"
    initial={{ opacity: 0, x: 300 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -300 }}
    transition={{ duration: 0.5 }}
  >
    <Heading as="h2" size="lg" mb={6} className="h2">
      Beliebte Kategorien
    </Heading>
    <Text>Entdecke Bücher in deinen Lieblingskategorien.</Text>
    <Flex mt={4} justify="center" gap={6}>
      {['Fantasy', 'Romane', 'Wissenschaft'].map((category) => (
        <Box
          key={category}
          bg="orange.400"
          p={4}
          borderRadius="md"
          boxShadow="lg"
          cursor="pointer"
          color="white"
          _hover={{ transform: 'scale(1.05)', transition: '0.3s' }}
        >
          {category}
        </Box>
      ))}
    </Flex>
  </MotionBox>
);

const BookOfTheMonthSection: React.FC = () => {
  const bookNumbers = [1, 20, 30, 40, 50, 60];
  const [randomBook, setRandomBook] = useState<number>(bookNumbers[0]);

  useEffect(() => {
    setRandomBook(bookNumbers[Math.floor(Math.random() * bookNumbers.length)]);
  }, []);

  return (
    <MotionBox
      py={10}
      textAlign="center"
      className="book-of-the-month"
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -300 }}
      transition={{ duration: 0.5 }}
    >
      <Heading as="h2" size="lg" mb={6} className="h2">
        Buch des Monats
      </Heading>
      <Text fontSize="md" mb={4}>
        Entdecke unser ausgewähltes Buch des Monats, das Leser begeistert.
      </Text>
      <Box
        bg="orange.300"
        p={6}
        borderRadius="lg"
        boxShadow="xl"
        color="white"
        maxW="400px"
        mx="auto"
        fontSize="2xl"
        fontWeight="bold"
      >
        <Link to={`/buch/${randomBook}`}>Buch #{randomBook}</Link>
      </Box>
    </MotionBox>
  );
};

const Homepage: React.FC = () => {
  const [view, setView] = useState<
    'home' | 'bestseller' | 'categories' | 'bookOfTheMonth'
  >('home');

  useEffect(() => {
    const interval = setInterval(() => {
      setView((prev) => {
        if (prev === 'home') return 'bestseller';
        if (prev === 'bestseller') return 'categories';
        if (prev === 'categories') return 'bookOfTheMonth';
        return 'home';
      });
    }, 5000); // Ansicht wechselt alle 5 Sekunden

    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setView((prev) => {
      if (prev === 'home') return 'bookOfTheMonth';
      if (prev === 'bestseller') return 'home';
      if (prev === 'categories') return 'bestseller';
      return 'categories';
    });
  };

  const handleNext = () => {
    setView((prev) => {
      if (prev === 'home') return 'bestseller';
      if (prev === 'bestseller') return 'categories';
      if (prev === 'categories') return 'bookOfTheMonth';
      return 'home';
    });
  };

  return (
    <Box bg="gray.900" color="white" minH="100vh">
      <Navbar />
      <Container maxW="container.lg" centerContent pt="80px">
        <Flex position="relative" align="center" justify="center" w="100%">
          <IconButton
            aria-label="Zurück"
            position="absolute"
            left="5%"
            size="lg"
            colorScheme="orange"
            onClick={handlePrev}
          >
            <FaArrowLeft />
          </IconButton>
          <AnimatePresence mode="wait">
            {view === 'home' && <HeaderSection />}
            {view === 'bestseller' && <BestsellerSection />}
            {view === 'categories' && <CategoriesSection />}
            {view === 'bookOfTheMonth' && <BookOfTheMonthSection />}
          </AnimatePresence>
          <IconButton
            aria-label="Weiter"
            position="absolute"
            right="5%"
            size="lg"
            colorScheme="orange"
            onClick={handleNext}
          >
            <FaArrowRight />
          </IconButton>
        </Flex>
      </Container>
      <Vorstellung />
    </Box>
  );
};

export default Homepage;
