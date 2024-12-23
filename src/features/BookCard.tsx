import React from 'react';
import { Box, Link, Text, Image, IconButton } from '@chakra-ui/react';
import { Rating } from '@/components/ui/rating';
import warenkorb from './icon/warenkorb.png'

interface BookProps {
  id: string;
  isbn: string;
  preis: string;
  rating: number;
  titel: { titel: string };
  image: string;
  untertitel: string;
}

const BookCard: React.FC<BookProps> = ({
  id,
  isbn,
  preis,
  rating,
  titel,
  image,
  untertitel,
}) => {
  return (
    <>
    <Box
      key={id}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="sm"
      bg="transparent"
      p="12"
      textAlign="left"
    >
      {/* Bild */}
      <Link href={`/buch/${id}`} _focus={{outline: 'none'}}>
        <Image
          src={image || "https://via.placeholder.com/150"} // Use actual image or placeholder
          alt={titel.titel}
          boxSize="200px"
          objectFit="cover"
          borderRadius="md"
          mb="4"
          _hover={{ transform: 'scale(1.05)', transition: '0.3s' }}
          _active={{ borderColor: 'transparent'}}
        />
      </Link>
      <Link href={`/buch/${id}`}>
        <Text fontFamily="Bona Nova" fontSize="xl" fontWeight="bold" mb="2" color="#CC9600">
          {titel.titel}
        </Text>
      </Link>
      <Text fontSize="sm" color="#CC9600" fontFamily="Bona Nova">
        {isbn}
      </Text>
      <Text fontSize="sm" color="#CC9600" fontFamily="Bona Nova">
        {preis} €
      </Text>
      <Rating readOnly value={rating} size="sm" />
      <Text fontSize="sm" color="#CC9600" fontFamily="Bona Nova">
        {untertitel}
      </Text>
      <IconButton 
        fontFamily="Bona Nova" 
        color="#CC9600" 
        bg="black" 
        borderColor="#CC9600" 
        borderRadius={100} 
        mt={3} 
        px="auto"
        
      >
        <Image src={warenkorb}></Image>In den Warenkorb
      </IconButton>
    </Box>
    </>
  );
};

export default BookCard;
