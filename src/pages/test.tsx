import { useQuery } from '@apollo/client';
import {
  Badge,
  Box,
  Button,
  Separator,
  Flex,
  Heading,
  HStack,
  Image,
  Link,
  Stack,
  Tag,
  Text,
  VStack,
  Switch,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { BUCH } from '../graphql/queries';
import React from 'react';

const TestBuch = () => {
  const { id } = useParams();

  const { data, loading, error } = useQuery(BUCH, {
    variables: { id },
  });

  if (loading) {
    return (
      <Flex align="center" justify="center" minH="100vh" bg="gray.800">
        <Text fontSize="lg" color="white">
          Lade Buchdetails...
        </Text>
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex align="center" justify="center" minH="100vh" bg="gray.800">
        <Text color="red.500">Fehler: {error.message}</Text>
      </Flex>
    );
  }

  const buch = data.buch;

  return (
    <Box bg="gray.900" color="white" minH="100vh" p={10}>
      <Flex direction={{ base: 'column', lg: 'row' }} gap={10}>
        {/* Linke Spalte: Bild und Aktionen */}
        <Box flex="1">
          <Image
            src="https://via.placeholder.com/150"
            alt={buch.id}
            borderRadius="md"
            mb={5}
            boxShadow="lg"
          />
          <Heading as="h2" size="lg" mb={3}>
            {buch.id}
          </Heading>
          <Text fontSize="md" mb={5} fontStyle="italic">
            {buch.art}
          </Text>
          <Stack gap={4}>
            <Button colorScheme="yellow" size="lg">
              Update
            </Button>
            <Button colorScheme="red" size="lg">
              Delete
            </Button>
          </Stack>
        </Box>

        {/* Rechte Spalte: Details */}
        <Box flex="2">
          <VStack align="start" gap={5}>
            <Heading as="h1" size="xl">
              {buch.isbn}
            </Heading>
            <HStack gap={4}>
              <Box
                p={3}
                borderWidth="1px"
                borderColor="gray.500"
                borderRadius="md"
                bg="gray.800"
                textAlign="center"
              >
                <Text fontSize="md">
                  <strong>Preis:</strong> {buch.preis} EUR
                </Text>
              </Box>
              <Box
                p={3}
                borderWidth="1px"
                borderColor="gray.500"
                borderRadius="md"
                bg="gray.800"
                textAlign="center"
              >
                <Text fontSize="md">
                  <strong>Rabatt:</strong> {buch.rabatt}%
                </Text>
              </Box>
              <Box
                p={3}
                borderWidth="1px"
                borderColor="gray.500"
                borderRadius="md"
                bg="gray.800"
                textAlign="center"
              >
                <Text fontSize="md">
                  <strong>Lieferbar:</strong>{' '}
                  <Switch isChecked={buch.lieferbar} colorScheme="green" />
                </Text>
              </Box>
            </HStack>
            <HStack gap={4}>
              <Box
                p={3}
                borderWidth="1px"
                borderColor="gray.500"
                borderRadius="md"
                bg="gray.800"
                textAlign="center"
              >
                <Text fontSize="md">
                  <strong>Datum:</strong> {buch.datum}
                </Text>
              </Box>
              <Box
                p={3}
                borderWidth="1px"
                borderColor="gray.500"
                borderRadius="md"
                bg="gray.800"
                textAlign="center"
              >
                <Text fontSize="md">
                  <strong>Homepage:</strong>{' '}
                  <Link href={buch.homepage} color="teal.300">
                    {buch.homepage}
                  </Link>
                </Text>
              </Box>
            </HStack>
            <Separator my={4} />
            <HStack>
              <Text>
                <strong>Bewertung:</strong>
              </Text>
              {[...Array(5)].map((_, i) => (
                <Badge
                  key={i}
                  colorScheme={i < buch.rating ? 'yellow' : 'gray'}
                  px={2}
                  borderRadius="full"
                >
                  ★
                </Badge>
              ))}
            </HStack>
            <Separator my={4} />
            <HStack gap={4}>
              {buch.schlagwoerter.map((wort: string) => (
                <Box
                  key={wort}
                  p={2}
                  borderWidth="1px"
                  borderColor="gray.500"
                  borderRadius="md"
                  bg="gray.800"
                  textAlign="center"
                >
                  <Tag size="lg" variant="solid" colorScheme="yellow">
                    {wort}
                  </Tag>
                </Box>
              ))}
            </HStack>
          </VStack>
        </Box>
      </Flex>

      {/* Ähnliche Bücher */}
      <Box mt={10}>
        <Heading as="h3" size="lg" mb={5}>
          Ähnliche Bücher
        </Heading>
        <Flex gap={5}>
          <Box textAlign="center">
            <Image
              src="https://via.placeholder.com/100"
              alt="Epsilon"
              mb={2}
              borderRadius="md"
            />
            <Text>Epsilon</Text>
          </Box>
          <Box textAlign="center">
            <Image
              src="https://via.placeholder.com/100"
              alt="Phi"
              mb={2}
              borderRadius="md"
            />
            <Text>Phi</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default TestBuch;
