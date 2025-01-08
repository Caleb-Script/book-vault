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
import { useNavigate } from 'react-router-dom'; // Importiere useNavigate
import { BUECHER } from '../graphql/queries.ts';
import img from './icon/vorstellung.png';

const MotionFlex = motion(Flex);
const MotionBox = motion(Box);

export const Vorstellung: React.FC = () => {
  const { data, loading, error } = useQuery(BUECHER);
  const navigate = useNavigate();

  const bgBox = useColorModeValue('white', 'black');
  const textBox = useColorModeValue('black', 'white');

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading data: {error.message}</Text>;

  const buecher = data.buecher || [];

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
        <MotionBox
          w={{ base: '100%', md: '50%' }}
          h="300px"
          bg={bgBox}
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
          <Image src={img} alt="Icon" />
        </MotionBox>

        <VStack gap={4} align="start" w={{ base: '100%', md: '50%' }}>
          <Heading as="h1" size="6xl">
            Deine Lieblings
            <span style={{ color: '#CC9600' }}>bücher sind hier!</span>
          </Heading>
          <Text
            fontFamily="Bona Nova"
            letterSpacing="1.4px"
            lineHeight="shorter"
            fontSize="22px"
            color={useColorModeValue('black', 'white')}
          >
            Kaufe deine Lieblingsbücher ganz einfach online! Genieße exklusive
            Angebote und Rabatte auf ausgewählte Titel. Tauche in unsere
            Sammlung ein und entdecke Sonderangebote, die das Lesen
            erschwinglicher machen. Jetzt einkaufen und bei jedem Kauf mehr
            sparen!
          </Text>
          <Flex
            w="100%"
            justify="space-between"
            color={useColorModeValue('black', 'yellow.300')}
          >
            <VStack>
              <Heading textAlign="left" size="xl" color="#CC9600">
                {buecher.length}
              </Heading>
              <Text color="#CC9600">Bücher im Sortiment</Text>
            </VStack>
            <VStack>
              <Heading size="xl" color="#CC9600">
                1K+
              </Heading>
              <Text color="#CC9600">Registrierte Mitglieder</Text>
            </VStack>
            <VStack>
              <Heading size="xl" color="#CC9600">
                50+
              </Heading>
              <Text color="#CC9600">Standorte</Text>
            </VStack>
          </Flex>
          <Button
            bg="black"
            color="white"
            borderColor="#CC9600"
            borderRadius={10}
            _hover={{ bg: '#CC9600' }}
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
