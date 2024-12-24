import React, { useState } from 'react';
import { Box, Container, Grid, Text, Heading, Button, Icon } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { BUECHER } from '../graphql/queries';
import Navbar from '../features/navbar';
import { Checkbox } from '@/components/ui/checkbox';
import BookCard from '../features/BookCard';
import background from '../features/icon/background.png';

interface Book {
  id: string;
  isbn: string;
  preis: string;
  rating: number;
  titel: { titel: string };
  image: string;
  untertitel: string;
  schlagwoerter: string;
}

const ITEMS_PER_PAGE = 4;

const SucheBuch: React.FC = () => {
  const { data, loading, error } = useQuery(BUECHER);
  const [filters, setFilters] = useState({
    JAVASCRIPT: false,
    TYPESCRIPT: false,
    JAVA: false,
    PYTHON: false,
  });
  const [currentPage, setCurrentPage] = useState(1);

  if (loading) {
    return (
      <>
        <Navbar />
        <Box textAlign="center" pt="90px">
          <Text fontSize="lg">Lade Buchdetails...</Text>
        </Box>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <Box textAlign="center" pt="90px">
          <Text color="red.500">Fehler: {error.message}</Text>
        </Box>
      </>
    );
  }

  const books: Book[] = data?.buecher || [];

  const filteredBooks = books.filter((book) => {
    const activeFilters = Object.keys(filters).filter((key) => filters[key as keyof typeof filters]);

    if (activeFilters.length === 0) return true; // Keine Filter ausgewählt

    const bookSchlagwoerter = book.schlagwoerter
      ? Array.isArray(book.schlagwoerter)
        ? book.schlagwoerter.map((word) => word.toUpperCase())
        : typeof book.schlagwoerter === 'string'
        ? [book.schlagwoerter.toUpperCase()]
        : []
      : [];

    return bookSchlagwoerter.some((word) => activeFilters.includes(word));
  });

  const toggleFilter = (key: keyof typeof filters) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const totalPages = Math.ceil(filteredBooks.length / ITEMS_PER_PAGE);
  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <Container
      maxW="100%"
      minHeight="100vh"
      bgImage={`url(${background})`}
      bgRepeat="no-repeat"
      bgSize="cover"
      bgPos="center"
      px={4}
      mb={40}
    >
      <Navbar />
      <Box pt="90px" bg="transparent">
        <Heading
          fontSize={48}
          fontStyle="bold"
          fontFamily="Bona Nova"
          textAlign="center"
          mb={6}
          color="#CC9600"
        >
          Entdecke alle Bücher hier!
        </Heading>
        <Grid
          mb={6}
          display="flex"
          justifyContent="center"
          alignItems="center"
          padding="1.5%"
          gap={4}
          fontFamily="Bona Nova"
          color="#CC9960"
        >
          {Object.keys(filters).map((filterKey) => (
            <Checkbox
              size="md"
              key={filterKey}
              checked={filters[filterKey as keyof typeof filters]}
              onChange={() => toggleFilter(filterKey as keyof typeof filters)}
            >
              {filterKey}
            </Checkbox>
          ))}
        </Grid>
        <Grid
          templateColumns="repeat(4, 1fr)"
          gap="15%"
          justifyContent="center"
          alignItems="center"
          maxW="800px"
          mx="auto"
        >
          {paginatedBooks.map((book: Book) => (
            <Box
              key={book.id}
              border="1px solid #ddd"
              borderRadius="25px"
              overflow="hidden"
              w="264px"  // Set width to 264px
              h="436px"  // Set height to 436px
              alignItems="center"
              justifyContent="center"
            >
              <BookCard
                id={book.id}
                isbn={book.isbn}
                preis={book.preis}
                rating={book.rating}
                titel={book.titel}
                image={book.image}
                untertitel={book.untertitel}
              />
            </Box>
          ))}
        </Grid>
        <Box display="flex" justifyContent="center" mt={12} alignItems="center">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            mx={2}
            w="80px"
            h="45px"
            borderRadius="15px" 
            bg={currentPage === 1 ? "rgba(0, 0, 0, 0.7)" : "#000000"}
            color="#CC9600"
            _disabled={{
              bg: "rgba(0, 0, 0, 0)",
              cursor: "not-allowed",
            }}
            _hover={{
              bg: currentPage === 1 ? "rgba(0, 0, 0, 0.4)" : "#333333", // Hover-Effekt
            }}
          >
            Previous
          </Button>
          <Box display="flex" alignItems="center" gap={2}>
            {Array.from({ length: totalPages }, (_, index) => (
              <Box
                key={index}
                w={4}
                h={4}
                borderRadius="full"
                bg={currentPage === index + 1 ? "#CC9600" : "rgba(204, 150, 0, 0.4)"}
                cursor="pointer"
                onClick={() => setCurrentPage(index + 1)}
                transition="background-color 0.3s"
              />
            ))}
          </Box>
          <Button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            mx={2}
            w="70px" 
            h="45px" 
            borderRadius="15px"
            bg={currentPage === totalPages ? "rgba(0, 0, 0, 0.7)" : "#000000"}
            color="#CC9600"
            _hover={{
              bg: currentPage === totalPages ? "rgba(0, 0, 0, 0.7)" : "#333333",
            }}
            _disabled={{
              cursor: "not-allowed",
            }}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SucheBuch;
