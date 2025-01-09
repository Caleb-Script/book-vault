import { Box, Button, HStack, Input, Text } from '@chakra-ui/react';
import { Abbildung } from '../types/buch.type';

interface AbbildungenSectionProps {
  abbildungen: Abbildung[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: 'beschriftung' | 'contentType',
  ) => void;
}

const AbbildungenSection: React.FC<AbbildungenSectionProps> = ({
  abbildungen,
  onAdd,
  onRemove,
  onChange,
}) => {
  return (
    <Box>
      <Text fontSize="lg" mb={4}>
        Abbildungen
      </Text>
      {abbildungen.map((abbildung, index) => (
        <Box key={index} mb={4}>
          <Text color={'#cc9600'} border={'#cc9600'} mb={2}>
            Beschriftung
          </Text>
          <Input
            name="beschriftung"
            value={abbildung.beschriftung}
            onChange={(e) => onChange(e, index, 'beschriftung')}
            bg="gray.700"
            color="white"
            mb={2}
          />
          <Text color={'#cc9600'} border={'#cc9600'} mb={2}>
            Content Type
          </Text>
          <Input
            name="contentType"
            value={abbildung.contentType}
            onChange={(e) => onChange(e, index, 'contentType')}
            bg="gray.700"
            color="white"
          />
          <HStack mt={2}>
            <Button onClick={() => onRemove(index)} colorScheme="red">
              Entfernen
            </Button>
          </HStack>
        </Box>
      ))}
      <Button onClick={onAdd} colorScheme="teal" mt={4}>
        Weitere Abbildung hinzufügen
      </Button>
    </Box>
  );
};

export default AbbildungenSection;
