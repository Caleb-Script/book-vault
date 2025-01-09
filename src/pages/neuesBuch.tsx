import client from '@/api/apolloClient';
import { useMutation } from '@apollo/client';
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Switch } from '../components/ui/switch';
import { CREATE_BUCH } from '../graphql/mutation/create-buch.mutation';

const BuchErstellen = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState({ text: '', type: '' });

  // type BuchTyp = {
  //   titel: string;
  //   untertitel: string;
  //   isbn: string;
  //   preis: number;
  //   rabatt: number;
  //   lieferbar: boolean;
  //   datum: string;
  //   homepage: string;
  //   rating: number;
  //   schlagwoerter: string[];
  // };

  const [buch, setBuch] = useState({
    isbn: '',
    rating: 0,
    art: '',
    preis: 0,
    rabatt: 0,
    lieferbar: false,
    datum: '',
    homepage: '',
    schlagwoerter: [],
    titel: {
      titel: '',
      untertitel: '',
    },
    abbildungen: [{
      beschriftung: '',
      contentType: ''
    }]
  });

  const [createBuch] = useMutation(CREATE_BUCH, {
    client,
    onCompleted: (data) => {
      setMessage({ text: `Das Buch "${data.createBuch.titel}" wurde erfolgreich erstellt!`, type: 'success' });
      setTimeout(() => {
        navigate('/'); // oder wohin auch immer nach dem Erstellen navigiert werden soll
      }, 2000);
    },
    onError: () => {
      setMessage({ text: 'Das Buch konnte nicht erstellt werden.', type: 'error' });
      setTimeout(() => {
        setMessage({ text: '', type: '' });
      }, 3000);
    }
  });

    // Handler für die Eingabeänderungen
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, type, checked } = e.target;

      setBuch((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    };

    const handleCreate = async () => {
      try {
        await createBuch({
          variables: {
            input: {
              ...buch,
              preis: Number(buch.preis),
              rabatt: Number(buch.rabatt),
            },
          },
        });
      } catch (err) {
        console.error('Fehler beim Erstellen des Buches:', err);
      }
    };

const handleAbbildungChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  index: number,
  field: 'beschriftung' | 'contentType'
) => {
  const { value } = e.target;

  setBuch((prevBuch) => {
    const updatedAbbildungen = [...prevBuch.abbildungen];
    updatedAbbildungen[index] = {
      ...updatedAbbildungen[index],
      [field]: value,
    };
    return { ...prevBuch, abbildungen: updatedAbbildungen };
  });
};

  const addAbbildung = () => {
    setBuch((prevBuch) => ({
      ...prevBuch,
      abbildungen: [...prevBuch.abbildungen, { beschriftung: '', contentType: '' }],
    }));
  };

  return (
    <Box maxW="800px" mx="auto" color="white" minH="100vh" p={10}>
        {message.text && (
        <Box
          p={4}
          mb={4}
          borderRadius="md"
          bg={message.type === 'success' ? 'green.500' : 'red.500'}
        >
          {message.text}
        </Box>
      )}

      <Flex direction="column" gap={8}>
        <Heading as="h1" size="xl">
          Neues Buch erstellen
        </Heading>

        <VStack gap={6} align="stretch">

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

          {/* Rating */}
          <Box>
            <Text>Rating</Text>
            <Input
              name="rating"
              value={buch.rating}
              onChange={handleInputChange}
              bg="gray.700"
              color="white"
              type="number"
            />
          </Box>

          {/* Art
          <Box>
            <Text>Art</Text>
            <Input
              name="art"
              value={buch.art}
              onChange={handleInputChange}
              bg="gray.700"
              color="white"
              type="number"
            />
          </Box> */}

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
              onCheckedChange={(checked) =>
                handleInputChange({
                  target: { name: 'lieferbar', checked, type: 'checkbox' },
                } as any)
              }
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

          {/* Schlagwörter */}
          <Box>
            <Text>Schlagwörter</Text>
            <Input
              name="schlagwörter"
              value={buch.schlagwoerter}
              onChange={handleInputChange}
              bg="gray.700"
              color="white"
            />
          </Box>

          {/* Titel */}
          <Box>
            <Text>Titel</Text>
            <Input
              name="titel"
              value={buch.titel.titel}
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
              value={buch.titel.untertitel}
              onChange={handleInputChange}
              bg="gray.700"
              color="white"
            />
          </Box>

          <Box>  
          <Heading as="h1" size="xl">
            Abbildungen
          </Heading>
          {buch.abbildungen.map((abbildung, index) => (
            <Box key={index} mb={4}>
              {/* Beschriftung */}
              <Text mb={2}>Beschriftung</Text>
              <Input
                name="beschriftung"
                value={abbildung.beschriftung}
                onChange={(e) => handleAbbildungChange(e, index, 'beschriftung')}
                bg="gray.700"
                color="white"
                mb={2}
              />

              {/* Content Type */}
              <Text mb={2}>Content Type</Text>
              <Input
                name="contentType"
                value={abbildung.contentType}
                onChange={(e) => handleAbbildungChange(e, index, 'contentType')}
                bg="gray.700"
                color="white"
              />
            </Box>
          ))}
          <Button
            onClick={addAbbildung}
            colorScheme="teal"
            mt={4}
          >
            Weitere Abbildung hinzufügen
          </Button>
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
