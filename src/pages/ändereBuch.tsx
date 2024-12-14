import { Box, Input, Select, Button, HStack, SliderTrack, SliderThumb, Text, Flex, Heading } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import { Slider } from "@/components/ui/slider";
import Navbar from "../features/navbar";
import Footer from "../features/footer";
import './design/homepage.css'; 

const ÄndereBuch: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [label, setLabel] = useState<string>('');
  const [isbn, setIsbn] = useState<string>('');
  const [genre, setGenre] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [discount, setDiscount] = useState<number>(0);

  // Funktion zum Handhaben von Input-Änderungen
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
    setter(e.target.value);
  };

  // Funktion zum Handhaben von Select-Änderungen
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
    setter(e.target.value);
  };

  return (
    <Box bg="black" color="white" minH="100vh" p={5}>
      <Heading textAlign="center" mb={6} color="yellow.400">
        Buch Ändern
      </Heading>
      <Flex justify="center" align="center">
        <Box
          p={6}
          bg="gray.800"
          borderRadius="lg"
          w="500px"
          boxShadow="lg"
          color="white"
        >
          {/* Titel */}
          <Input
            value={title}
            onChange={(e) => handleInputChange(e, setTitle)}
            placeholder="Titel ändern"
            mb={4}
          />

          {/* Label */}
          <Input
            value={label}
            onChange={(e) => handleInputChange(e, setLabel)}
            placeholder="Text ändern"
            mb={4}
          />

          {/* ISBN */}
          <Input
            value={isbn}
            onChange={(e) => handleInputChange(e, setIsbn)}
            placeholder="ISBN Nummer ändern"
            mb={4}
          />

          {/* Datum */}
          <Input
            type="date"
            value={date}
            onChange={(e) => handleInputChange(e, setDate)}
            mb={4}
          />

          <Text mt={2}>Rabatt: {discount}%</Text>

          {/* Buttons */}
          <HStack mt={6} justify="space-between">
            <Button colorScheme="red">Abbrechen</Button>
            <Button colorScheme="green">Ändern</Button>
          </HStack>
        </Box>
      </Flex>
    </Box>
  );
};

export default ÄndereBuch;
