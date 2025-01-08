import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '@/components/ui/select';
import {
  Box,
  createListCollection,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { Suchkriterien } from '../types/buch.type';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

// Bucharten-Daten
const buchArten = createListCollection({
  items: [
    { value: 'EPUB', label: 'E-Book (EPUB)' },
    { value: 'HARDCOVER', label: 'Hardcover' },
    { value: 'PAPERBACK', label: 'Taschenbuch' },
  ],
});

const FilterDialog = ({
  applyFilters,
}: {
  applyFilters: (filters: Suchkriterien) => void;
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [filters, setFilters] = useState<Suchkriterien>({
    titel: undefined,
    isbn: undefined,
    rating: undefined,
    art: undefined,
    lieferbar: undefined,
    rabatt: undefined,
  });

  const handleInputChange = (key: keyof Suchkriterien, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          colorScheme="yellow"
          color="#cc9600"
        >
          Filteroptionen öffnen
        </Button>
      </DialogTrigger>
      <DialogContent
        bg="#1a1a1a"
        borderRadius="lg"
        boxShadow="lg"
        maxW="500px"
        ref={contentRef}
      >
        <DialogHeader>
          <DialogTitle color="#cc9600" fontSize="2xl">
            Filteroptionen
          </DialogTitle>
        </DialogHeader>
        <DialogBody>
          <VStack gap={6} align="stretch">
            <Box>
              <Text color="#cc9600" mb={2}>
                ISBN:
              </Text>
              <Input
                placeholder="ISBN eingeben"
                color="white"
                bg="gray.800"
                borderColor="gray.600"
                _hover={{ borderColor: '#cc9600' }}
                _focus={{ borderColor: "#cc9600" }}
                value={filters.isbn || ''}
                onChange={(e) =>
                  handleInputChange('isbn', e.target.value || undefined)
                }
              />
            </Box>
            <Box>
              <Text color="#cc9600" mb={2}>
                Bewertung:
              </Text>
              <Input
                placeholder="Bewertung (1-5)"
                type="number"
                color="white"
                bg="gray.800"
                borderColor="gray.600"
                _hover={{ borderColor: '#cc9600' }}
                _focus={{ borderColor: "#cc9600" }}
                min={1}
                max={5}
                value={filters.rating || ''}
                onChange={(e) =>
                  handleInputChange(
                    'rating',
                    e.target.value ? parseInt(e.target.value) : undefined,
                  )
                }
              />
            </Box>
            <Box>
              <SelectRoot
                size="lg"
                value={filters.art?.toString()}
                onValueChange={(value) =>
                  handleInputChange('art', value || undefined)
                }
                collection={buchArten}
              >
                <SelectLabel color="#cc9600">Buchart: </SelectLabel>
                <SelectTrigger>
                  <SelectValueText placeholder="Buchart auswählen" />
                </SelectTrigger>
                <SelectContent
                  portalRef={contentRef}
                  color={'#cc9600'}
                  bgColor={'gray.800'}
                >
                  {buchArten.items.map((buchart) => (
                    <SelectItem item={buchart.value} key={buchart.value}>
                      {buchart.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
            </Box>
            <Checkbox
              colorScheme="yellow"
              checked={filters.lieferbar || false}
              onChange={(e) => handleInputChange('lieferbar', (e.target as HTMLInputElement).checked)}
            >
              Nur verfügbare Bücher
            </Checkbox>
            <Checkbox
              colorScheme="yellow"
              checked={filters.rabatt || false}
              onChange={(e) => handleInputChange('rabatt', (e.target as HTMLInputElement).checked)}
            >
              Nur rabattierte Bücher
            </Checkbox>
          </VStack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline" size="lg" colorScheme="gray">
              Abbrechen
            </Button>
          </DialogActionTrigger>
          <Button
            onClick={() => applyFilters(filters)}
            size="lg"
            colorScheme="yellow"
          >
            Anwenden
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};

export default FilterDialog;
