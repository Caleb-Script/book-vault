import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '@/components/ui/select';
import { useMutation } from '@apollo/client';
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import AbbildungenSection from '../components/AbbildungenSection';
import DateiUploadSection from '../components/DateiUploadSection';
import FormSection from '../components/FormSection';
import { validateFields } from '../components/Validation';
import { CREATE_MUTATION } from '../graphql/mutation/create-buch.mutation';
import { Buch } from '../types/buch.type';
import { Switch } from '../components/ui/switch';
import { useTheme } from '../context/ThemeContext';

const Schlagwoerter = ['JAVASCRIPT', 'TYPESCRIPT', 'JAVA', 'PYTHON'];

const BuchErstellen = () => {
  const navigate = useNavigate();
  const [buch, setBuch] = useState<Buch>({
    id: 0,
    version: 1,
    isbn: '',
    rating: 0,
    art: 'EPUB',
    preis: 0,
    rabatt: '0',
    lieferbar: false,
    datum: '',
    homepage: '',
    schlagwoerter: [],
    titel: { id: undefined, titel: '', untertitel: '' },
    abbildungen: [],
    datei: { id: undefined, filename: '', data: undefined },
    erzeugt: '',
    aktualisiert: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { isDarkMode } = useTheme(); // Dunkelmodus aus dem Kontext
  const [createBuch, { loading }] = useMutation(CREATE_MUTATION, {
    onCompleted: (data) => {
      console.log('Buch erfolgreich erstellt:', data);
      navigate('/');
    },
    onError: (error) => {
      console.error('Fehler beim Erstellen des Buches:', error);
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBuch((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSchlagwortToggle = (schlagwort: string) => {
    setBuch((prev) => {
      const isSelected = prev.schlagwoerter.includes(schlagwort);
      return {
        ...prev,
        schlagwoerter: isSelected
          ? prev.schlagwoerter.filter((tag) => tag !== schlagwort)
          : [...prev.schlagwoerter, schlagwort],
      };
    });
  };

  const handleSubmit = async () => {
    const validationErrors = validateFields(buch);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      console.log('Fehler:', validationErrors);
      return;
    }

    const input = {
      isbn: buch.isbn || null,
      rating: buch.rating || null,
      art: buch.art || null,
      preis: parseFloat(buch.preis.toString()) || null,
      rabatt: parseFloat(buch.rabatt) / 100 || null,
      lieferbar: buch.lieferbar || null,
      datum: buch.datum || null,
      homepage: buch.homepage || null,
      schlagwoerter: buch.schlagwoerter.length > 0 ? buch.schlagwoerter : null,
      titel: {
        titel: buch?.titel?.titel || null,
        untertitel: buch?.titel?.untertitel || null,
      },
      abbildungen:
        buch.abbildungen && buch.abbildungen.length > 0
          ? buch?.abbildungen?.map(({ beschriftung, contentType }) => ({
              beschriftung: beschriftung || null,
              contentType: contentType || null,
            }))
          : null,
    };

    console.log('Buch erstellen:', input);

    try {
      await createBuch({ variables: { input } });
      navigate('/');
    } catch (error) {
      console.error('Fehler beim Erstellen des Buches:', error);
    }
  };

  return (
    <Box maxW="800px" mx="auto" color="white" minH="100vh" p={10}>
      <Flex direction="column" gap={8}>
        <Heading as="h1" size="xl" textAlign="center" color="yellow.400">
          Neues Buch erstellen
        </Heading>
        <VStack gap={6} align="stretch">
          <FormSection
            label="ISBN"
            name="isbn"
            value={buch.isbn}
            onChange={handleInputChange}
            error={errors.isbn}
          />
          <FormSection
            label="Titel"
            name="titel"
            value={buch?.titel?.titel ?? ''}
            onChange={(e) =>
              setBuch((prev) => ({
                ...prev,
                titel: { ...prev.titel, titel: e.target.value },
              }))
            }
            error={errors.titel}
          />
          <FormSection
            label="Untertitel"
            name="untertitel"
            value={buch.titel.untertitel}
            onChange={(e) =>
              setBuch((prev) => ({
                ...prev,
                titel: { ...prev.titel, untertitel: e.target.value },
              }))
            }
            error={errors.untertitel}
          />
          <FormSection
            label="Preis"
            name="preis"
            value={buch.preis}
            onChange={handleInputChange}
            type="number"
            error={errors.preis}
          />
          <FormSection
            label="Homepage"
            name="homepage"
            value={buch.homepage}
            onChange={handleInputChange}
            error={errors.homepage}
          />

          {/* Rabatt */}
          <Flex direction="column">
            <Text mb={2} color={'#cc9600'} border={'#cc9600'}>
              Rabatt (%)
            </Text>
            <HStack align="center" color={'#cc9600'} border={'#cc9600'}>
              <input
                type="range"
                name="rabatt"
                color={isDarkMode ? 'white' : 'black'}
                min={0}
                max={100}
                step={1}
                value={buch.rabatt}
                onChange={(e) =>
                  setBuch((prev) => ({
                    ...prev,
                    rabatt: e.target.value,
                  }))
                }
              />
              <Text>{buch.rabatt}%</Text>
            </HStack>
          </Flex>

          {/* Lieferbar */}
          <Flex direction="column">
            <Text mb={2} color={'#cc9600'} border={'#cc9600'}>
              Verfügbar
            </Text>
            <Switch
              color={'#cc9600'}
              border={'#cc9600'}
              isChecked={buch.lieferbar}
              onChange={(e) =>
                setBuch((prev) => ({ ...prev, lieferbar: e.target.checked }))
              }
              colorScheme="teal"
            >
              {buch.lieferbar ? 'Ja' : 'Nein'}
            </Switch>
          </Flex>

          {/* Art */}
          <Box>
            <Text color={'#cc9600'} border={'#cc9600'}>
              Buchart
            </Text>
            <SelectRoot
              color={'#cc9600'}
              border={'#cc9600'}
              items={['EPUB', 'HARDCOVER', 'PAPERBACK']}
              value={buch.art}
              onValueChange={(value) =>
                setBuch((prev) => ({ ...prev, art: value }))
              }
            >
              <SelectLabel color={'#cc9600'} border={'#cc9600'}>
                Buchart
              </SelectLabel>
              <SelectTrigger color={'#cc9600'} border={'#cc9600'}>
                <SelectValueText color={'#cc9600'} border={'#cc9600'} />
              </SelectTrigger>
              <SelectContent color={'#cc9600'} border={'#cc9600'}>
                {['EPUB', 'HARDCOVER', 'PAPERBACK'].map((art) => (
                  <SelectItem
                    key={art}
                    item={art}
                    color={'#cc9600'}
                    border={'#cc9600'}
                  >
                    {art}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
          </Box>

          <Flex direction="column">
            <Text color={'#cc9600'} border={'#cc9600'}>
              Bewertung (Rating)
            </Text>
            <HStack color={'#cc9600'} border={'#cc9600'} mt={2} spacing={1}>
              {Array.from({ length: 5 }, (_, i) => (
                <FaStar
                  key={i}
                  size="1.5em"
                  cursor="pointer"
                  color={i < buch.rating ? '#ffc107' : 'gray.300'}
                  onClick={() =>
                    setBuch((prev) => ({
                      ...prev,
                      rating: i + 1,
                    }))
                  }
                />
              ))}
            </HStack>
            <Text mt={2} color={'#cc9600'} border={'#cc9600'}>
              {buch.rating} von 5
            </Text>
          </Flex>

          {/* Datum */}
          <Flex direction="column">
            <Text color={'#cc9600'} border={'#cc9600'}>
              Veröffentlichungsdatum
            </Text>
            <Box bg="gray.700" p={2} borderRadius="md">
              <DatePicker
                selected={buch.datum ? new Date(buch.datum) : null}
                onChange={(date: Date) =>
                  setBuch((prev) => ({
                    ...prev,
                    datum: date.toISOString(),
                  }))
                }
                dateFormat="dd.MM.yyyy"
              />
            </Box>
          </Flex>

          {/* Schlagwörter */}
          <Flex direction="column">
            <Text color={'#cc9600'} border={'#cc9600'}>
              Schlagwörter
            </Text>
            <Box mt={2} color={'#cc9600'} border={'#cc9600'}>
              {Schlagwoerter.map((tag) => (
                <Button
                  color={'#cc9600'}
                  border={'#cc9600'}
                  key={tag}
                  variant={
                    buch.schlagwoerter.includes(tag) ? 'solid' : 'outline'
                  }
                  onClick={() => handleSchlagwortToggle(tag)}
                  colorScheme="orange"
                  size="sm"
                  mr={2}
                >
                  {tag}
                </Button>
              ))}
            </Box>
          </Flex>
          <AbbildungenSection
            abbildungen={buch.abbildungen}
            onAdd={() =>
              setBuch((prev) => ({
                ...prev,
                abbildungen: [
                  ...prev.abbildungen,
                  { beschriftung: '', contentType: '' },
                ],
              }))
            }
            onRemove={(index) =>
              setBuch((prev) => ({
                ...prev,
                abbildungen: prev.abbildungen.filter((_, i) => i !== index),
              }))
            }
            onChange={(e, index, field) =>
              setBuch((prev) => ({
                ...prev,
                abbildungen: prev.abbildungen.map((a, i) =>
                  i === index ? { ...a, [field]: e.target.value } : a,
                ),
              }))
            }
          />
        </VStack>
        <Button onClick={handleSubmit} colorScheme="yellow" isLoading={loading}>
          Buch erstellen
        </Button>
      </Flex>
    </Box>
  );
};

export default BuchErstellen;
