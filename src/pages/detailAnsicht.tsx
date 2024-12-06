// src/BuchDetails.tsx
import { useQuery } from '@apollo/client';
import { Box, Button } from '@chakra-ui/react';
import { useParams } from 'react-router-dom'; // Importiere useParams
import { BUCH } from '../graphql/queries';
import React from 'react';

const BuchDetails = () => {
  const { id } = useParams(); // Extrahiere die 'id' aus der URL

  const { data, loading, error } = useQuery(BUCH, {
    variables: { id: id }, // Übergib die id als Variable
  });

  if (loading) return <Box>Loading...</Box>;
  if (error) return <Box>Error: {error.message}</Box>;

  return (
    <Box p={5}>
      <Box>ID: {data.buch.id}</Box>
      <Box>Version: {data.buch.version}</Box>
      <Box>ISBN: {data.buch.isbn}</Box>
      <Box>Rating: {data.buch.rating}</Box>
      <Box>Art: {data.buch.art}</Box>
      <Box>Preis: {data.buch.preis}</Box>
      <Box>Lieferbar: {data.buch.lieferbar}</Box>
      <Box>Datum: {data.buch.datum}</Box>
      <Box>Homepage: {data.buch.homepage}</Box>
      <Box>Schlagwörter: {data.buch.schlagwoerter}</Box>
      <Box>Rabatt: {data.buch.rabatt}</Box>
      <Button colorScheme="teal">Click me</Button>
    </Box>
  );
};

export default BuchDetails;
