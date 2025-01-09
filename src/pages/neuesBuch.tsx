import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  VStack,
  // Wrap,
  // WrapItem,
} from '@chakra-ui/react';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import AbbildungenSection from '../components/AbbildungenSection';
import DateiUploadSection from '../components/DateiUploadSection';
import FormSection from '../components/FormSection';
import { validateFields } from '../components/Validation';
import { Buch } from '../types/buch.type';

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
    rabatt: 0,
    lieferbar: false,
    datum: '',
    homepage: '',
    schlagwoerter: [],
    titel: { id: undefined, titel: '', untertitel: '' },
    abbildungen: [],
    datei: { id: undefined, filename: '', data: undefined, buch: undefined },
    erzeugt: '',
    aktualisiert: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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
      return;
    }

    try {
      console.log('Buch erfolgreich erstellt:', buch);
      navigate('/');
    } catch (error) {
      console.error('Fehler beim Erstellen des Buches:', error);
    }
  };

  return (
    <Box maxW="800px" mx="auto" color="white" minH="100vh" p={10}>
      <Flex direction="column" gap={8}>
        <Heading as="h1" size="xl">
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
            value={buch.titel.titel}
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
          {/* Rabatt */}
          <Flex direction="column">
            <Text>Rabatt (%)</Text>
            <Slider
              value={buch.rabatt}
              onValueChange={(value) =>
                setBuch((prev) => ({ ...prev, rabatt: value[0] }))
              }
              max={100}
              min={0}
              step={1}
              size="lg"
              colorPalette="green"
            >
              {/* <SliderTrack />
              <SliderThumb /> */}
            </Slider>
            <Text mt={2}>{buch.rabatt}%</Text>
          </Flex>
          {/* Art */}
          <Box>
            <Text>Art</Text>
            <SelectRoot
              items={['EPUB', 'HARDCOVER', 'PAPERBACK']}
              value={buch.art}
              onValueChange={(value) =>
                setBuch((prev) => ({ ...prev, art: value }))
              }
            >
              <SelectLabel>Buchart</SelectLabel>
              <SelectTrigger>
                <SelectValueText />
              </SelectTrigger>
              <SelectContent>
                {['EPUB', 'HARDCOVER', 'PAPERBACK'].map((art) => (
                  <SelectItem key={art} value={art}>
                    {art}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
          </Box>
          {/* Datum */}
          <Flex direction="column">
            <Text>Veröffentlichungsdatum</Text>
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
            <Text>Schlagwörter</Text>
            <Box mt={2}>
              {Schlagwoerter.map((tag) => (
                <Button key={tag}>
                  <Button
                    variant={
                      buch.schlagwoerter.includes(tag) ? 'solid' : 'outline'
                    }
                    onClick={() => handleSchlagwortToggle(tag)}
                    colorScheme="orange"
                    size="sm"
                  >
                    {tag}
                  </Button>
                </Button>
              ))}
            </Box>
          </Flex>
          <DateiUploadSection
            onFileUpload={(file) => {
              console.log(file);
            }}
          />
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
        <Button onClick={handleSubmit} colorScheme="yellow">
          Buch erstellen
        </Button>
      </Flex>
    </Box>
  );
};

export default BuchErstellen;
