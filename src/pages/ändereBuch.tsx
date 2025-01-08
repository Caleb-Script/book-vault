import client from '@/api/apolloClient';
import { useMutation, useQuery } from '@apollo/client';
import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Input,
  Spinner,
  Text,
  Stack,
  VStack,
} from '@chakra-ui/react';
import { FaCheckCircle, FaStar, FaTimesCircle } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import { Tag } from '../components/ui/tag';
import { useTheme } from '../context/ThemeContext';
import { UPDATE_BUCH } from '../graphql/mutation/update-buch.mutation'; // Mutation zum Aktualisieren des Buches
import { BUCH, BUECHER } from '../graphql/query/get-buch.query';
import { Buch } from '../types/buch.type';

const BuchÄndern = () => {
  // Parameter aus der URL extrahieren
  const { id } = useParams();
  const { isDarkMode } = useTheme(); // Dunkelmodus aus dem Kontext
  const navigate = useNavigate();

  // GraphQL Query zum Laden der Buchdetails
  const { data, loading, error } = useQuery(BUCH, {
    variables: { id },
  });

  // Weitere Buchdaten für ähnliche Bücher
  const {
    data: allBooksData,
    loading: allBooksLoading,
    error: allBooksError,
  } = useQuery(BUECHER);

  // GraphQL Mutation zum Aktualisieren des Buches
  const [updateBuch] = useMutation(UPDATE_BUCH, { client });

  // Typen für Buchdaten
  type BuchTyp = {
    titel: string;
    untertitel: string;
    isbn: string;
    preis: number;
    rabatt: number;
    lieferbar: boolean;
    datum: string;
    homepage: string;
    rating: number;
    schlagwoerter: string[];
  };

  // Zustand für Buchdaten initialisieren
  const [buch, setBuch] = useState<BuchTyp>({
    titel: '',
    untertitel: '',
    isbn: '',
    preis: 0,
    rabatt: 0,
    lieferbar: false,
    datum: '',
    homepage: '',
    rating: 0,
    schlagwoerter: [],
  });

  // Effekt: Wenn Buchdetails geladen sind, in den Zustand setzen
  useEffect(() => {
    if (data) {
      const buch = data.buch;
      setBuch({
        titel: buch.titel,
        untertitel: buch.untertitel,
        isbn: buch.isbn,
        preis: buch.preis,
        rabatt: buch.rabatt,
        lieferbar: buch.lieferbar,
        datum: buch.datum,
        homepage: buch.homepage,
        rating: buch.rating,
        schlagwoerter: buch.schlagwoerter,
      });
    }
  }, [data]);

  // Handler für Eingabeänderungen
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setBuch((prevBuch) => ({
      ...prevBuch,
      [name]:
        type === 'checkbox'
          ? checked
          : name === 'preis' || name === 'rabatt'
            ? parseFloat(value)
            : value,
    }));
  };

  // Buchdaten aktualisieren
  const handleUpdate = async () => {
    try {
      const preisFloat = buch.preis; // Preis bereits als Float
      const rabattFloat = buch.rabatt; // Rabatt ebenfalls als Float
      console.log('Token im LocalStorage:', localStorage.getItem('authToken'));
      const result = await updateBuch({
        variables: {
          id,
          isbn: buch.isbn,
          rating: buch.rating,
          preis: preisFloat, // Preis als Float
          rabatt: rabattFloat, // Rabatt als Float
          lieferbar: buch.lieferbar,
          datum: buch.datum,
          homepage: buch.homepage,
          schlagwoerter: buch.schlagwoerter,
        },
      });

      console.log('Update erfolgreich:', result);
      navigate(`/buch/${id}`); // Nach Update zur Detailseite navigieren
    } catch (err) {
      console.error('Fehler beim Aktualisieren:', err);
    }
  };

  // Lade- oder Fehlerzustände anzeigen
  if (loading || allBooksLoading) {
    return (
      <Flex align="center" justify="center" height="100vh" bg="black">
        <Spinner size="xl" color="#cc9600" />
        <Text fontSize="lg" color="white" ml={4}>
          Lade Buchdetails...
        </Text>
      </Flex>
    );
  }

  if (error || allBooksError) {
    return (
      <Flex align="center" justify="center" height="100vh" bg="black">
        <Text fontSize="lg" color="red.500">
          Fehler: {error?.message || allBooksError?.message}
        </Text>
      </Flex>
    );
  }

  // Buchdaten und alle Bücher extrahieren
  const buchData: Buch = data.buch;
  const allBooks: Buch[] = allBooksData.buecher || [];

  // Ähnliche Bücher filtern, basierend auf Schlagwörtern
  const similarBooks = allBooks.filter((book) => {
    if (!book || !book.schlagwoerter || !buch.schlagwoerter) return false;
    if (book.id === buchData.id) return false; // Das aktuelle Buch nicht einbeziehen
    return book.schlagwoerter.some((tag) => buch.schlagwoerter.includes(tag));
  });

  // Slider-Einstellungen für ähnliche Bücher
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Box
      width="100vw"
      minHeight="100vh"
      bgGradient="linear(to-b, black, black)"
      py={10}
      px={5}
      color="white"
      bgColor={isDarkMode ? '#000' : '#fff'}
    >
      <Flex direction={{ base: 'column', lg: 'row' }} align={{ lg: 'flex-start' }} gap={8}>
        {/* Linke Spalte: Bild, Titel und Aktionen */}
        <VStack flex="1" gap={6} align="center">
          <Image
            src={buchData.abbildungen?.[0]?.beschriftung || 'https://via.placeholder.com/300'}
            alt={buchData.titel?.titel || 'Buchbild'}
            borderRadius="lg"
            boxShadow="lg"
          />
          <Box textAlign="center">
            <Heading as="h1" size="xl" color="#cc9600">
              {buchData.titel?.titel}
            </Heading>
            {buchData.titel?.untertitel && (
              <Text fontSize="lg" fontStyle="italic" color="#cc9600" mt={2}>
                {buchData.titel.untertitel}
              </Text>
            )}
          </Box>
          <Stack direction="row" gap={4}>
            <Button
              colorScheme="yellow"
              variant="solid"
              bg="#cc9600"
              color="black"
              onClick={handleUpdate}
            >
              Updaten
            </Button>
            <Button
              colorScheme="red"
              variant="outline"
              borderColor="#cc9600"
              color="#cc9600"
            >
              Löschen
            </Button>
          </Stack>
          <RouterLink to="/">
            <Button colorScheme="blue" size="lg" bg="#cc9600" color="black">
              Zurück zur Startseite
            </Button>
          </RouterLink>

          {/* Ähnliche Bücher als Karussell */}
          <Box mt={10} width="100%">
            <Heading as="h3" size="lg" mb={5} color="#cc9600">
              Ähnliche Bücher
            </Heading>
            <Slider {...sliderSettings}>
              {similarBooks.map((similarBook) => (
                <Box
                  key={similarBook.id}
                  textAlign="center"
                  p={3}
                  borderRadius="md"
                  boxShadow="lg"
                  maxW="200px"
                  mx="auto"
                  borderWidth="1px"
                  borderColor={'#cc9600'}
                >
                  <Image
                    src={similarBook?.abbildungen?.[0]?.contentType || 'https://via.placeholder.com/150'}
                    alt={similarBook?.titel?.titel}
                    mb={2}
                    borderRadius="md"
                    boxSize="150px"
                    objectFit="cover"
                  />
                  <Text fontWeight="bold" color="#cc9600" lineClamp={2}>
                    {similarBook?.titel?.titel}
                  </Text>
                  <Button
                    mt={3}
                    size="sm"
                    colorScheme="yellow"
                    bg="#cc9600"
                    color="black"
                    onClick={() =>
                      (window.location.href = `https://localhost:3001/buch/${similarBook.id}`)
                    }
                  >
                    Details ansehen
                  </Button>
                </Box>
              ))}
            </Slider>
          </Box>
        </VStack>

        {/* Rechte Spalte: Buchdetails und Bearbeitungsformular */}
        <Box flex="2">
          <Heading as="h2" size="lg" mb={6} color="#cc9600">
            Details
          </Heading>
          <Stack gap={5}>
            {/* Formularfelder für Buchdetails */}
            <Box bg="#cc9600" p={4} borderRadius="md" borderWidth="1px" borderColor="black">
              <Text fontSize="sm" color="black" mb={2}>
                ISBN
              </Text>
              <Input
                name="isbn"
                value={buchData.isbn}
                onChange={handleInputChange}
                fontSize="md"
                color="black"
                mb={2}
              />
            </Box>

            {/* Weitere Eingabefelder für Preis, Rabatt, Lieferbarkeit, Datum, Homepage, Bewertung und Schlagwörter */}
            {/* Preis */}
            <Box bg="#cc9600" p={4} borderRadius="md" borderWidth="1px" borderColor="black">
              <Text fontSize="sm" color="black" mb={2}>
                Preis
              </Text>
              <Input
                name="preis"
                value={buchData.preis}
                onChange={handleInputChange}
                fontSize="md"
                color="black"
                mb={2}
              />
            </Box>

            {/* Rabatt */}
            <Box bg="#cc9600" p={4} borderRadius="md" borderWidth="1px" borderColor="black">
              <Text fontSize="sm" color="black" mb={2}>
                Rabatt
              </Text>
              <Input
                name="rabatt"
                value={buchData.rabatt} // Rabatt direkt als Wert ohne "%"
                onChange={handleInputChange}
                fontSize="md"
                color="black"
                mb={2}
              />
            </Box>

            {/* Lieferbarkeit */}
            <Box bg="#cc9600" p={4} borderRadius="md" borderWidth="1px" borderColor="black">
              <Text fontSize="sm" color="black" mb={2}>
                Lieferbar
              </Text>
              <Flex align="center" gap={2}>
                {buchData.lieferbar ? (
                  <FaCheckCircle style={{ color: 'green', fontSize: '1.25rem' }} />
                ) : (
                  <FaTimesCircle style={{ color: 'red', fontSize: '1.25rem' }} />
                )}
                <Text fontSize="md" color="black">
                  {buchData.lieferbar ? 'Ja' : 'Nein'}
                </Text>
              </Flex>
            </Box>

            {/* Weitere Eingabefelder für Datum und Homepage */}
            <Box bg="#cc9600" p={4} borderRadius="md" borderWidth="1px" borderColor="black">
              <Text fontSize="sm" color="black" mb={2}>
                Datum
              </Text>
              <Input
                name="datum"
                value={buchData.datum}
                onChange={handleInputChange}
                fontSize="md"
                color="black"
                mb={2}
              />
            </Box>

            {/* Homepage */}
            <Box bg="#cc9600" p={4} borderRadius="md" borderWidth="1px" borderColor="black">
              <Text fontSize="sm" color="black" mb={2}>
                Homepage
              </Text>
              <Input
                name="homepage"
                value={buchData.homepage}
                onChange={handleInputChange}
                fontSize="md"
                color={isDarkMode ? '#000' : '#fff'}
              />
            </Box>

            {/* Bewertung */}
            <Box bg="#cc9600" p={4} borderRadius="md" borderWidth="1px" borderColor="black">
              <Text fontSize="sm" color="black" mb={2}>
                Bewertung
              </Text>
              <HStack gap={1}>
                {Array.from({ length: 5 }, (_, i) => (
                  <FaStar key={i} color={i < buch.rating ? '#fff' : '#000'} />
                ))}
              </HStack>
            </Box>

            {/* Schlagwörter */}
            <Box bg="#cc9600" p={4} borderRadius="md" borderWidth="1px" borderColor="black">
              <Text fontSize="sm" color="black" mb={2}>
                Schlagwörter
              </Text>
              <HStack wrap="wrap" gap={2}>
                {buch.schlagwoerter.map((wort) => (
                  <Tag key={wort} fontSize="md" size="lg" bg="#cc9600" color="black">
                    {wort}
                  </Tag>
                ))}
              </HStack>
            </Box>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
};

export default BuchÄndern;
