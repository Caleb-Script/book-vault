import { useQuery, useMutation } from '@apollo/client';
import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Link,
  Text,
  VStack,
  Input,
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { Switch } from '../components/ui/switch';
import { Tag } from '../components/ui/tag';
import { BUCH } from '../graphql/queries';
import { UPDATE_BUCH } from '../graphql/mutation'; // Mutation zum Aktualisieren des Buches
import { Link as RouterLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

const BuchÄndern = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // GraphQL Query, um Buchdetails zu laden
  const { data, loading, error } = useQuery(BUCH, {
    variables: { id },
  });

  // GraphQL Mutation zum Aktualisieren des Buches
  const [updateBuch] = useMutation(UPDATE_BUCH);

  // Initialer Zustand für die Bearbeitung des Buches
  const [buch, setBuch] = useState({
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

  useEffect(() => {
    if (data) {
      const { buch } = data;
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
    setBuch({
      ...buch,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleUpdate = async () => {
    console.log("Aktualisiere das Buch...", buch); // Debug-Log für den aktuellen Buch-Zustand

    console.log(buch.rabatt);
    try {
      const result = await updateBuch({
        variables: {
          id,
          input: {
            titel: buch.titel,
            untertitel: buch.untertitel,
            isbn: buch.isbn,
            preis: buch.preis, // Stelle sicher, dass der Typ stimmt
            rabatt: buch.rabatt,
            lieferbar: buch.lieferbar,
            datum: buch.datum,
            homepage: buch.homepage,
            rating: buch.rating,
            schlagwoerter: buch.schlagwoerter,
          },
        },
      });
  
      console.log("Update-Ergebnis:", result); // Debug-Ausgabe des Mutations-Ergebnisses
      navigate(`/buch/${id}`); // Weiterleitung nach dem Update
    } catch (err) {
      console.error("Fehler beim Aktualisieren des Buches:", err);
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
          <RouterLink to={"/"}>
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
              <Flex align="center">
              <Input
                name="rabatt"
                value={buch.rabatt}
                onChange={handleInputChange}
                bg="gray.700"
                color="white"
                type="string"
                border="none"
                flex="1" // Sorgt dafür, dass das Input-Field die verfügbare Breite nutzt
                />
                <Text ml={2} fontSize="md" color="white">
                  %
                </Text>
              </Flex>
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
                  <Tag key={wort} size="lg" variant="solid" colorScheme="yellow">
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
