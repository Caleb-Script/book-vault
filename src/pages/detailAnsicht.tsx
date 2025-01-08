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
import { FaStar } from 'react-icons/fa';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { Switch } from '../components/ui/switch';
import { Tag } from '../components/ui/tag';
import { BUCH } from '../graphql/queries';

const BuchDetails = () => {
  const { id } = useParams();

  const { data, loading, error } = useQuery(BUCH, {
    variables: { id },
  });

  if (loading) {
    return (
      <Flex align="center" justify="center" height="100vh" bg="gray.900">
        <Spinner size="xl" color="orange.400" />
        <Text fontSize="lg" color="white" ml={4}>
          Lade Buchdetails...
        </Text>
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex align="center" justify="center" height="100vh" bg="gray.900">
        <Text fontSize="lg" color="red.500">
          Fehler: {error.message}
        </Text>
      </Flex>
    );
  }

  const buch: Buch = data.buch;

  return (
    <Box
      width="100vw"
      minHeight="100vh"
      bgGradient="linear(to-b, gray.800, gray.900)"
      py={10}
      px={5}
      color="white"
    >
      <Flex
        direction={{ base: 'column', lg: 'row' }}
        align={{ lg: 'flex-start' }}
        gap={8}
      >
        {/* Linke Spalte: Bild, Titel und Aktionen */}
        <VStack flex="1" spacing={6} align="center">
          <Image
            src={buch.bild || 'https://via.placeholder.com/300'}
            alt={buch.titel?.titel || 'Buchbild'}
            borderRadius="lg"
            boxShadow="lg"
          />
          {/* Titel und Untertitel */}
          <Box textAlign="center">
            <Heading as="h1" size="xl">
              {buch.titel?.titel}
            </Heading>
            {buch.titel?.untertitel && (
              <Text fontSize="lg" fontStyle="italic" color="gray.400" mt={2}>
                {buch.titel.untertitel}
              </Text>
            )}
          </Box>
          {/* Aktionen */}
          <Stack direction="row" spacing={4}>
            <Button colorScheme="yellow" variant="solid">
              Bearbeiten
            </Button>
            <Button colorScheme="red" variant="outline">
              Löschen
            </Button>
          </Stack>
          <RouterLink to="/">
            <Button colorScheme="blue" size="lg">
              Zurück zur Startseite
            </Button>
          </RouterLink>
        </VStack>

        {/* Rechte Spalte: Details */}
        <Box flex="2">
          <Heading as="h2" size="lg" mb={6}>
            Details
          </Heading>
          <Stack spacing={5}>
            <DetailBox label="ISBN" content={buch.isbn} />
            <DetailBox label="Preis" content={`${buch.preis} EUR`} />
            <DetailBox label="Rabatt" content={`${buch.rabatt}`} />
             <DetailBox
              label="Lieferbar"
              content={
                buch.lieferbar ? (
                  <HStack>
                    <Text>Ja</Text>
                  </HStack>
                ) : (
                  <HStack>

                    <Text>Nein</Text>
                  </HStack>
                )
              }
            />
            <DetailBox label="Datum" content={buch.datum} />
            <DetailBox
              label="Homepage"
              content={
                <Link href={buch.homepage} color="teal.300" isExternal>
                  {buch.homepage}
                </Link>
              }
            />
            <DetailBox
              label="Bewertung"
              content={
                <HStack spacing={1}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <FaStar
                      key={i}
                      color={i < buch.rating ? 'orange' : 'gray'}
                    />
                  ))}
                </HStack>
              }
            />
            <DetailBox
              label="Schlagwörter"
              content={
                <HStack wrap="wrap" spacing={2}>
                  {buch.schlagwoerter.map((wort: string) => (
                    <Tag key={wort} size="lg" colorScheme="yellow">
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
  content: React.ReactNode;
}) => (
  <Box
    bg="gray.700"
    p={4}
    borderRadius="md"
    borderWidth="1px"
    borderColor="gray.600"
  >
    <Text fontSize="sm" color="gray.400" mb={2}>
      {label}
    </Text>
    <Text fontSize="md" fontWeight="bold">
      {content}
    </Text>
  </Box>
);

export default BuchDetails;
