import { useColorModeValue } from '@/components/ui/color-mode';
import { useQuery } from '@apollo/client';
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BUECHER } from '../graphql/query/get-buch.query.ts';
import img from './icon/vorstellung.png';

const MotionFlex = motion(Flex);
const MotionBox = motion(Box);

export const Vorstellung: React.FC = () => {
  const { data, loading, error } = useQuery(BUECHER);
  const navigate = useNavigate();

  const bgBox = useColorModeValue('white', 'black');
  const textBox = useColorModeValue('black', 'white');

  if (loading) {
    return (
      <Flex justify="center" align="center" minHeight="300px">
        <Text fontSize="lg" color="#CC9600">
          Lade Daten...
        </Text>
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex justify="center" align="center" minHeight="300px">
        <Text fontSize="lg" color="red.500">
          Fehler beim Laden: {error.message}
        </Text>
      </Flex>
    );
  }

  const buecher = data?.buecher || [];

  const handleDiscoverMore = () => {
    navigate('/alleBuecher');
  };

  return (
    <AnimatePresence>
      <MotionFlex
        direction={{ base: 'column', md: 'row' }}
        align="center"
        justify="center"
        p={8}
        bg={bgBox}
        color={textBox}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        {/* Bildbereich */}
        <MotionBox
          w={{ base: '100%', md: '50%' }}
          h="300px"
          borderRadius="lg"
          display="flex"
          justifyContent="center"
          alignItems="center"
          mb={{ base: 8, md: 0 }}
          mr={{ md: 8 }}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Image src={img} alt="Vorstellung" objectFit="cover" />
        </MotionBox>

        {/* Textbereich */}
        <VStack gap={4} align="start" w={{ base: '100%', md: '50%' }}>
          <Heading as="h1" size="2xl">
            Deine Lieblings
            <span style={{ color: '#CC9600' }}>bücher sind hier!</span>
          </Heading>
          <Text
            fontFamily="Bona Nova"
            letterSpacing="1.4px"
            lineHeight="shorter"
            fontSize="lg"
            color={textBox}
          >
            Kaufe deine Lieblingsbücher ganz einfach online! Genieße exklusive
            Angebote und Rabatte auf ausgewählte Titel. Entdecke Sonderangebote,
            die das Lesen erschwinglicher machen. Jetzt einkaufen und mehr
            sparen!
          </Text>
          <Flex
            w="100%"
            justify="space-between"
            color={useColorModeValue('black', '#CC9600')}
          >
            <VStack>
              <Heading size="lg" color="#CC9600">
                {buecher.length}
              </Heading>
              <Text>Bücher im Sortiment</Text>
            </VStack>
            <VStack>
              <Heading size="lg" color="#CC9600">
                1K+
              </Heading>
              <Text>Registrierte Mitglieder</Text>
            </VStack>
            <VStack>
              <Heading size="lg" color="#CC9600">
                50+
              </Heading>
              <Text>Standorte</Text>
            </VStack>
          </Flex>
          <Button
            bg="#CC9600"
            color="white"
            _hover={{ bg: '#D4A000' }}
            size="lg"
            onClick={handleDiscoverMore}
          >
            Entdecke mehr
          </Button>
        </VStack>
      </MotionFlex>
    </AnimatePresence>
  );
};
