import { useQuery } from '@apollo/client';
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Link,
  Spinner,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { isValidElement, ReactNode } from 'react';
import { FaCheckCircle, FaStar, FaTimesCircle } from 'react-icons/fa';
import { Link as RouterLink, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import { Tag } from '../components/ui/tag';
import { useTheme } from '../context/ThemeContext';
import { BUCH, BUECHER } from '../graphql/query/get-buch.query';
import '../styles/slick.css';
import '../styles/slider.css';
import { Buch } from '../types/buch.type';

const BuchDetails = () => {
  const { id } = useParams();
  const { isDarkMode } = useTheme();

  const { data, loading, error } = useQuery(BUCH, {
    variables: { id },
  });

  const {
    data: allBooksData,
    loading: allBooksLoading,
    error: allBooksError,
  } = useQuery(BUECHER);

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

  const buch: Buch = data.buch;
  const allBooks: Buch[] = allBooksData.buecher || [];

  const similarBooks = allBooks.filter((book) => {
    if (!book || !book.schlagwoerter || !buch.schlagwoerter) return false;
    if (book.id === buch.id) return false;
    return book.schlagwoerter.some((tag) => buch.schlagwoerter.includes(tag));
  });

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
      <Flex
        direction={{ base: 'column', lg: 'row' }}
        align={{ lg: 'flex-start' }}
        gap={8}
      >
        {/* Linke Spalte: Bild, Titel und Aktionen */}
        <VStack flex="1" gap={6} align="center">
          <Image
            src={buch.bild || 'https://via.placeholder.com/300'}
            alt={buch.titel?.titel || 'Buchbild'}
            borderRadius="lg"
            boxShadow="lg"
          />
          <Box textAlign="center">
            <Heading as="h1" size="xl" color="#cc9600">
              {buch.titel?.titel}
            </Heading>
            {buch.titel?.untertitel && (
              <Text fontSize="lg" fontStyle="italic" color="#cc9600" mt={2}>
                {buch.titel.untertitel}
              </Text>
            )}
          </Box>
          <Stack direction="row" gap={4}>
            <Button
              colorScheme="yellow"
              variant="solid"
              bg="#cc9600"
              color="black"
            >
              Bearbeiten
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
                  //bg={isDarkMode ? '#000' : '#fff'}
                  borderRadius="md"
                  boxShadow="lg"
                  maxW="200px"
                  mx="auto"
                  borderWidth="1px"
                  //borderColor={isDarkMode ? '#fff' : '#000'}
                  borderColor={'#cc9600'}
                >
                  <Image
                    src={
                      similarBook?.abbildungen?.[0]?.contentType ||
                      'https://via.placeholder.com/150'
                    }
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

        {/* Rechte Spalte: Details */}
        <Box flex="2">
          <Heading as="h2" size="lg" mb={6} color="#cc9600">
            Details
          </Heading>
          <Stack gap={5}>
            <DetailBox label="ISBN" content={buch.isbn} />
            <DetailBox label="Preis" content={`${buch.preis} EUR`} />
            <DetailBox label="Rabatt" content={`${buch.rabatt}%`} />
            <DetailBox
              label="Lieferbar"
              content={
                <Flex align="center" gap={2}>
                  {buch.lieferbar ? (
                    <FaCheckCircle
                      style={{ color: 'green', fontSize: '1.25rem' }}
                    />
                  ) : (
                    <FaTimesCircle
                      style={{ color: 'red', fontSize: '1.25rem' }}
                    />
                  )}
                  <Text>{buch.lieferbar ? 'Ja' : 'Nein'}</Text>
                </Flex>
              }
            />
            <DetailBox label="Datum" content={buch.datum} />
            <DetailBox
              label="Homepage"
              content={
                <Link
                  href={buch.homepage}
                  color={isDarkMode ? '#000' : '#fff'}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {buch.homepage}
                </Link>
              }
            />
            <DetailBox
              label="Bewertung"
              content={
                <HStack gap={1}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <FaStar key={i} color={i < buch.rating ? '#fff' : '#000'} />
                  ))}
                </HStack>
              }
            />
            <DetailBox
              label="Schlagwörter"
              content={
                <HStack wrap="wrap" gap={2}>
                  {buch.schlagwoerter.map((wort) => (
                    <Tag key={wort} size="lg" bg="#cc9600" color="black">
                      {wort}
                    </Tag>
                  ))}
                </HStack>
              }
            />
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
};

const DetailBox = ({
  label,
  content,
}: {
  label: string;
  content: ReactNode;
}) => (
  <Box
    bg="#cc9600"
    p={4}
    borderRadius="md"
    borderWidth="1px"
    borderColor="black"
  >
    <Text fontSize="sm" color="black" mb={2}>
      {label}
    </Text>
    <Box fontSize="md" fontWeight="bold" color="black">
      {isValidElement(content) ? content : <Text>{content}</Text>}
    </Box>
  </Box>
);

export default BuchDetails;
