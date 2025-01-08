import client from '@/api/apolloClient';
import { useMutation } from '@apollo/client';
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Switch } from '../components/ui/switch';
import { CREATE_BUCH } from '../graphql/mutation'; // Mutation zum Erstellen eines neuen Buches

const BuchErstellen = () => {
  const navigate = useNavigate();

  // GraphQL Mutation zum Erstellen eines Buches
  const [createBuch] = useMutation(CREATE_BUCH, { client });

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

  const handleCreate = async () => {
    try {
        console.log('Token im LocalStorage:', localStorage.getItem('authToken'));
      const result = await createBuch({
        variables: {
          ...buch,
        },
      });

      console.log('Buch erfolgreich erstellt:', result);
      navigate(`/buch/${result.data.createBuch.id}`);
    } catch (err) {
      console.error('Fehler beim Erstellen des Buches:', err);
    }
  };

//   if (loading) {
//     return (
//       <Flex align="center" justify="center" minH="100vh" bg="gray.800">
//         <Text fontSize="lg" color="white">
//           Lade Buchdetails...
//         </Text>
//       </Flex>
//     );
//   }

//   if (error) {
//     return (
//       <Flex align="center" justify="center" minH="100vh" bg="gray.800">
//         <Text color="red.500">Fehler: {error.message}</Text>
//       </Flex>
//     );
//   }
// dafür fehlt oben diese Zeile: 
//   // GraphQL Query, um Buchdetails zu laden
//   const { data, loading, error } = useQuery(BUCH, {
//     variables: { id },
//   });
// bin mir aber nicht sicher ob man das braucht


  return (
    <Box color="white" minH="100vh" p={10}>
      <Flex direction="column" gap={10}>
        <Heading as="h1" size="xl">
          Neues Buch erstellen
        </Heading>

        <VStack gap={4} align="start">
          {/* Titel */}
          <Box>
            <Text>Titel</Text>
            <Input
              name="titel"
              value={buch.titel}
              onChange={handleInputChange}
              bg="gray.700"
              color="white"
            />
          </Box>

          {/* Untertitel */}
          <Box>
            <Text>Untertitel</Text>
            <Input
              name="untertitel"
              value={buch.untertitel}
              onChange={handleInputChange}
              bg="gray.700"
              color="white"
            />
          </Box>

          {/* ISBN */}
          <Box>
            <Text>ISBN</Text>
            <Input
              name="isbn"
              value={buch.isbn}
              onChange={handleInputChange}
              bg="gray.700"
              color="white"
            />
          </Box>

          {/* Preis */}
          <Box>
            <Text>Preis</Text>
            <Input
              name="preis"
              value={buch.preis}
              onChange={handleInputChange}
              bg="gray.700"
              color="white"
              type="number"
            />
          </Box>

          {/* Rabatt */}
          <Box>
            <Text>Rabatt</Text>
            <Input
              name="rabatt"
              value={buch.rabatt}
              onChange={handleInputChange}
              bg="gray.700"
              color="white"
              type="number"
            />
          </Box>

          {/* Lieferbar */}
          <Box>
            <Text>Lieferbar</Text>
            <Switch
              name="lieferbar"
              checked={buch.lieferbar}
              inputProps={{ onChange: handleInputChange }}
              colorScheme="green"
            />
          </Box>

          {/* Datum */}
          <Box>
            <Text>Datum</Text>
            <Input
              name="datum"
              value={buch.datum}
              onChange={handleInputChange}
              bg="gray.700"
              color="white"
              type="date"
            />
          </Box>

          {/* Homepage */}
          <Box>
            <Text>Homepage</Text>
            <Input
              name="homepage"
              value={buch.homepage}
              onChange={handleInputChange}
              bg="gray.700"
              color="white"
            />
          </Box>
        </VStack>

        <Button colorScheme="yellow" onClick={handleCreate}>
          Buch erstellen
        </Button>
      </Flex>
    </Box>
  );
};

export default BuchErstellen;
