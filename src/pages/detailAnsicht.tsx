import { useQuery } from '@apollo/client';
import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { Switch } from '../components/ui/switch';
import { Tag } from '../components/ui/tag';
import { BUCH } from '../graphql/queries';
import { Link as RouterLink } from 'react-router-dom';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

const BuchDetails = () => {
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
    <Box
      // color="white"
      // minH="100vh"
      // p={10}
      w="100vw"
      h="100vh"
      backgroundImage="url('/src/assets/Hintergrund.png')"
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
    >
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
          <VStack gap={4}>
            <Button colorScheme="yellow" size="lg">
              Update
            </Button>
            <Button colorScheme="red" size="lg">
              Delete
            </Button>
          </VStack>
          <RouterLink to={'/'}>
            <Button colorScheme="blue">Startseite</Button>
          </RouterLink>
        </Box>

        {/* Rechte Spalte: Buchdetails */}
        <Box flex="2">
          <HStack align="start" gap={5} my={4}>
            {/* ISBN */}
            <Box borderWidth="1px" borderRadius="md" p={4} bg="gray.800">
              <Text fontSize="sm" color="gray.400" mb={1}>
                ISBN
              </Text>
              <Text fontSize="md" fontWeight="bold">
                {buch.isbn}
              </Text>
            </Box>

            {/* Preis */}
            <Box borderWidth="1px" borderRadius="md" p={4} bg="gray.800">
              <Text fontSize="sm" color="gray.400" mb={1}>
                Preis
              </Text>
              <Text fontSize="md" fontWeight="bold">
                {buch.preis} EUR
              </Text>
            </Box>

            {/* Rabatt */}
            <Box borderWidth="1px" borderRadius="md" p={4} bg="gray.800">
              <Text fontSize="sm" color="gray.400" mb={1}>
                Rabatt
              </Text>
              <Text fontSize="md" fontWeight="bold">
                {buch.rabatt}
              </Text>
            </Box>

            {/* Lieferbar */}
            <Box borderWidth="1px" borderRadius="md" p={4} bg="gray.800">
              <Text fontSize="sm" color="gray.400" mb={1}>
                Lieferbar
              </Text>
              <Switch checked={buch.lieferbar} size="md" colorScheme="green" />
            </Box>
          </HStack>

          <HStack align="start" gap={5} my={4}>
            {/* Datum */}
            <Box borderWidth="1px" borderRadius="md" p={4} bg="gray.800">
              <Text fontSize="sm" color="gray.400" mb={1}>
                Datum
              </Text>
              <Text fontSize="md" fontWeight="bold">
                {buch.datum}
              </Text>
            </Box>

            {/* Homepage */}
            <Box borderWidth="1px" borderRadius="md" p={4} bg="gray.800">
              <Text fontSize="sm" color="gray.400" mb={1}>
                Homepage
              </Text>
              <Link href={buch.homepage} color="teal.300">
                {buch.homepage}
              </Link>
            </Box>

            {/* Bewertung */}
            <Box borderWidth="1px" borderRadius="md" p={4} bg="gray.800">
              <Text fontSize="sm" color="gray.400" mb={1}>
                Bewertung
              </Text>

              <HStack>
                {[...Array(5)].map((_, i) => (
                  <Badge
                    key={i}
                    color={i < buch.rating ? 'yellow.100' : 'grey.100'}
                    bgColor={i < buch.rating ? 'yellow.900' : 'grey.900'}
                    px={2}
                    borderRadius="full"
                  >
                    ★
                  </Badge>
                ))}
              </HStack>
            </Box>
          </HStack>

          <HStack align="start" gap={5} my={4}>
            {/* Schlagwörter */}
            <Box borderWidth="1px" borderRadius="md" p={4} bg="gray.800">
              <Text fontSize="sm" color="gray.400" mb={1}>
                Schlagwörter
              </Text>
              <HStack gap={2}>
                {buch.schlagwoerter.map((wort: string) => (
                  <Tag
                    key={wort}
                    size="lg"
                    variant="solid"
                    colorScheme="yellow"
                  >
                    {wort}
                  </Tag>
                ))}
              </HStack>
            </Box>
          </HStack>
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

export default BuchDetails;
