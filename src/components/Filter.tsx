import { HStack, Input, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { Button } from './ui/button';
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

const FilterDialog = ({
  applyFilters,
}: {
  applyFilters: (filters: any) => void;
}) => {
  const [filters, setFilters] = useState({});

  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Filter
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filteroptionen</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <HStack spacing={4}>
            <Input
              placeholder="Min. Bewertung"
              type="number"
              min={0}
              max={5}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  rating: e.target.value ? parseInt(e.target.value) : undefined,
                }))
              }
            />
            <Input
              type="checkbox"
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, lieferbar: e.target.checked }))
              }
            />
            <Text>Nur verfügbare Bücher</Text>
          </HStack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Abbrechen</Button>
          </DialogActionTrigger>
          <Button onClick={() => applyFilters(filters)} variant="solid">
            Anwenden
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};

export default FilterDialog;
