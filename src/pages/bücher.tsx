import { useQuery } from '@apollo/client';
import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Input,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import FilterDialog from '../components/Filter';
import { BUECHER } from '../graphql/queries';
import { Buch } from '../types/buch.type';

const Bücher = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [filters, setFilters] = useState({});

  const { data, loading, error, refetch } = useQuery<{ buecher: Buch[] }>(
    BUECHER,
    { variables: { ...filters } },
  );

  const books: Buch[] = data?.buecher || [];
  const booksPerPage = 4;

  const filteredBooks = books.filter((book) =>
    book.titel?.titel.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalBooks = filteredBooks.length;
  const totalPages = Math.ceil(totalBooks / booksPerPage);
  const displayedBooks = filteredBooks.slice(
    (currentPage - 1) * booksPerPage,
    currentPage * booksPerPage,
  );

  const openFilterDialog = () => setIsFilterDialogOpen(true);
  const closeFilterDialog = () => setIsFilterDialogOpen(false);

  const applyFilters = () => {
    refetch(filters);
    closeFilterDialog();
  };

  if (loading) {
    return (
      <VStack
        height="100vh"
        justify="center"
        align="center"
        bg="#000"
        color="#fff"
      >
        <Spinner size="xl" color="#cc9600" />
        <Text mt={4}>Lade Bücher...</Text>
      </VStack>
    );
  }

  if (error) {
    return (
      <VStack
        height="100vh"
        justify="center"
        align="center"
        bg="#000"
        color="#fff"
      >
        <Text>
          Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.
        </Text>
      </VStack>
    );
  }

  return (
    <Box
      minHeight="100vh"
      bgGradient="linear(to-b, black, gray.800)"
      py={10}
      px={5}
      color="white"
    >
      <Heading textAlign="center" mb={8} color="#cc9600">
        Alle Bücher
      </Heading>
      <HStack spacing={4} mb={8}>
        <Input
          placeholder="Suche nach einem Buch..."
          size="lg"
          borderColor="#cc9600"
          focusBorderColor="#cc9600"
          color="black"
          bg="white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FilterDialog />
        <Button
          onClick={openFilterDialog}
          bg="#cc9600"
          color="black"
          _hover={{ bg: 'orange.400' }}
        >
          Filter
        </Button>
      </HStack>
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        }}
        gap={6}
      >
        {displayedBooks.map((book) => (
          <GridItem
            key={book.id}
            bg="gray.700"
            p={4}
            borderRadius="lg"
            boxShadow="lg"
            _hover={{
              transform: 'scale(1.05)',
              transition: 'all 0.3s ease-in-out',
            }}
          >
            <VStack align="start" spacing={4}>
              <Image
                src="https://via.placeholder.com/150"
                alt={book.titel?.titel || 'Buch'}
                borderRadius="md"
                objectFit="cover"
                boxSize="200px"
              />
              <Box>
                <Text fontWeight="bold" fontSize="xl" color="#cc9600">
                  {book.titel?.titel || 'Unbekannter Titel'}
                </Text>
                {book.titel?.untertitel && (
                  <Text fontSize="sm" color="gray.300">
                    {book.titel.untertitel}
                  </Text>
                )}
              </Box>
              <Text color="gray.300">Preis: {book.preis.toFixed(2)} EUR</Text>
              <HStack spacing={4}>
                <Text
                  fontSize="sm"
                  color={book.lieferbar ? 'green.400' : 'red.400'}
                >
                  {book.lieferbar ? 'Verfügbar' : 'Nicht verfügbar'}
                </Text>
                <Text fontSize="sm">Bewertung: {book.rating}/5</Text>
              </HStack>
              <Button
                as={RouterLink}
                to={`/buch/${book.id}`}
                bg="#cc9600"
                color="black"
                _hover={{ bg: 'orange.400' }}
                size="sm"
              >
                Details ansehen
              </Button>
            </VStack>
          </GridItem>
        ))}
      </Grid>
      <HStack mt={8} justify="center">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          bg="#cc9600"
          color="black"
          _hover={{ bg: 'orange.400' }}
        >
          Zurück
        </Button>
        <Text>
          Seite {currentPage} von {totalPages}
        </Text>
        <Button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          bg="#cc9600"
          color="black"
          _hover={{ bg: 'orange.400' }}
        >
          Weiter
        </Button>
      </HStack>

      {/* Filter Dialog */}

      {/* <Dialog isOpen={isFilterDialogOpen} onClose={closeFilterDialog}>
        <DialogOverlay />
        <DialogContent>
          <DialogHeader>Filteroptionen</DialogHeader>
          <DialogBody>
            <HStack spacing={4}>
              <Checkbox
                isChecked={filters.lieferbar}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, lieferbar: e.target.checked }))
                }
              >
                Nur verfügbare Bücher
              </Checkbox>
              <NumberInput
                value={filters.rating || ''}
                onChange={(valueString) =>
                  setFilters((prev) => ({
                    ...prev,
                    rating: valueString ? parseInt(valueString) : undefined,
                  }))
                }
                placeholder="Min. Bewertung"
                min={0}
                max={5}
              >
                <NumberInputField />
              </NumberInput>
            </HStack>
          </DialogBody>
          <DialogFooter>
            <Button onClick={applyFilters} bg="#cc9600" color="black" _hover={{ bg: 'orange.400' }}>
              Anwenden
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}
    </Box>
  );
};

export default Bücher;
