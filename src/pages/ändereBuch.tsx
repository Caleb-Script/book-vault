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
  Text,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { Switch } from '../components/ui/switch';
import { Tag } from '../components/ui/tag';
import { UPDATE_BUCH } from '../graphql/mutation/update-buch.mutation'; // Mutation zum Aktualisieren des Buches
import { BUCH } from '../graphql/query/get-buch.query';

const BuchÄndern = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // GraphQL Query, um Buchdetails zu laden
  const { data, loading, error } = useQuery(BUCH, {
    variables: { id },
  });

  // GraphQL Mutation zum Aktualisieren des Buches
  const [updateBuch] = useMutation(UPDATE_BUCH, { client });

  type BuchTyp = {
    titel: string;
    untertitel: string;
    isbn: string;
    preis: number; // Preis sollte ein number sein
    rabatt: number; // Rabatt sollte ein number sein
    lieferbar: boolean;
    datum: string;
    homepage: string;
    rating: number;
    schlagwoerter: string[];
  };

  const [buch, setBuch] = useState<BuchTyp>({
    titel: '',
    untertitel: '',
    isbn: '',
    preis: 0, // number
    rabatt: 0, // number
    lieferbar: false,
    datum: '',
    homepage: '',
    rating: 0,
    schlagwoerter: [],
  });

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

  // Handler für die Eingabeänderungen
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

  const handleUpdate = async () => {
    try {
      const preisFloat = buch.preis; // Ist bereits ein Float
      const rabattFloat = buch.rabatt; // Ist bereits ein Float
      console.log('Token im LocalStorage:', localStorage.getItem('authToken'));
      const result = await updateBuch({
        variables: {
          id,
          isbn: buch.isbn,
          rating: buch.rating,
          preis: preisFloat, // Float-Wert
          rabatt: rabattFloat, // Float-Wert
          lieferbar: buch.lieferbar,
          datum: buch.datum,
          homepage: buch.homepage,
          schlagwoerter: buch.schlagwoerter,
        },
      });

      console.log('Update erfolgreich:', result);
      navigate(`/buch/${id}`);
    } catch (err) {
      console.error('Fehler beim Aktualisieren:', err);
    }
  };

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

  const buchData = data.buch;

  return (
    <Box color="white" minH="100vh" p={10}>
      <Flex direction={{ base: 'column', lg: 'row' }} gap={10}>
        {/* Linke Spalte: Bild und Aktionen */}
        <Box flex="1">
          <Image
            src="https://via.placeholder.com/150"
            alt={buchData.id}
            borderRadius="md"
            mb={5}
            boxShadow="lg"
          />
          <Heading as="h2" size="lg" mb={3}>
            {buchData.id}
          </Heading>
          <Text fontSize="md" mb={5} fontStyle="italic">
            {buchData.art}
          </Text>
          <VStack gap={4}>
            {/* Schaltfläche zur Bearbeitung */}
            <Button colorScheme="yellow" size="lg" onClick={handleUpdate}>
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

        {/* Rechte Spalte: Buchdetails und Bearbeitungsformular */}
        <Box flex="2">
          <HStack align="start" gap={5} my={4}>
            {/* ISBN */}
            <Box borderWidth="1px" borderRadius="md" p={4} bg="gray.800">
              <Text fontSize="sm" color="gray.400" mb={1}>
                ISBN
              </Text>
              <Input
                name="isbn"
                value={buch.isbn}
                onChange={handleInputChange}
                bg="gray.700"
                color="white"
                border="none"
              />
            </Box>

            {/* Preis */}
            <Box borderWidth="1px" borderRadius="md" p={4} bg="gray.800">
              <Text fontSize="sm" color="gray.400" mb={1}>
                Preis
              </Text>
              <Input
                name="preis"
                value={buch.preis}
                onChange={handleInputChange}
                bg="gray.700"
                color="white"
                type="number"
                border="none"
              />
            </Box>

            {/* Rabatt */}
            <Box borderWidth="1px" borderRadius="md" p={4} bg="gray.800">
              <Text fontSize="sm" color="gray.400" mb={1}>
                Rabatt
              </Text>
              <Input
                name="rabatt"
                value={buch.rabatt} // Rabatt direkt als Wert ohne "%"
                onChange={handleInputChange}
                bg="gray.700"
                color="white"
                type="number" // Setzen Sie den Typ als "number"
                border="none"
              />
            </Box>

            {/* Lieferbar */}
            <Box borderWidth="1px" borderRadius="md" p={4} bg="gray.800">
              <Text fontSize="sm" color="gray.400" mb={1}>
                Lieferbar
              </Text>
              <Switch
                name="lieferbar"
                checked={buch.lieferbar}
                inputProps={{ onChange: handleInputChange }}
                colorScheme="green"
              />
            </Box>
          </HStack>

          <HStack align="start" gap={5} my={4}>
            {/* Datum */}
            <Box borderWidth="1px" borderRadius="md" p={4} bg="gray.800">
              <Text fontSize="sm" color="gray.400" mb={1}>
                Datum
              </Text>
              <Input
                name="datum"
                value={buch.datum}
                onChange={handleInputChange}
                bg="gray.700"
                color="white"
                type="date"
                border="none"
              />
            </Box>

            {/* Homepage */}
            <Box borderWidth="1px" borderRadius="md" p={4} bg="gray.800">
              <Text fontSize="sm" color="gray.400" mb={1}>
                Homepage
              </Text>
              <Input
                name="homepage"
                value={buch.homepage}
                onChange={handleInputChange}
                bg="gray.700"
                color="white"
                type="text"
                border="none"
              />
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
                    colorScheme={i < buch.rating ? 'yellow' : 'gray'}
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
                {buch.schlagwoerter.map((wort) => (
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

export default BuchÄndern;
