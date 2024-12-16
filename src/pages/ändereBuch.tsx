import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Input, Text, VStack } from '@chakra-ui/react';
import { BUCH } from '../graphql/queries';  // GraphQL Query für Buch
import { UPDATE_BUCH } from '../graphql/mutation';  // GraphQL Mutation für Buch-Aktualisierung

const BuchAendern = () => {
  const { id } = useParams(); // Holen der Buch-ID aus der URL
  const navigate = useNavigate(); // Um nach dem Update auf eine andere Seite zu navigieren

  // Query, um das Buch anhand der ID zu laden
  const { data, loading, error } = useQuery(BUCH, {
    variables: { id },
  });

  // Mutation für das Aktualisieren des Buches
  const [updateBuch, { loading: updating, error: updateError, data: updateData }] = useMutation(UPDATE_BUCH);

  // Zustand für das Buchformular
  const [buch, setBuch] = useState({
    titel: '',
    untertitel: '',
    preis: 0,
    rabatt: 0,
    lieferbar: false,
    datum: '',
    homepage: '',
    rating: 0,
  });

  useEffect(() => {
    if (data) {
      const { buch } = data;
      setBuch({
        titel: buch.titel.titel,
        untertitel: buch.titel.untertitel,
        preis: buch.preis,
        rabatt: buch.rabatt,
        lieferbar: buch.lieferbar,
        datum: buch.datum,
        homepage: buch.homepage,
        rating: buch.rating,
      });
    }
  }, [data]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setBuch((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleUpdate = async () => {
    // Validierung (z. B. sicherstellen, dass Preis eine positive Zahl ist)
    if (buch.preis <= 0) {
      alert('Der Preis muss größer als 0 sein');
      return;
    }

    try {
      await updateBuch({
        variables: {
          id,
          input: {
            titel: buch.titel,
            untertitel: buch.untertitel,
            preis: parseFloat(buch.preis.toString()),
            rabatt: parseInt(buch.rabatt.toString(), 10),
            lieferbar: buch.lieferbar,
            datum: buch.datum,
            homepage: buch.homepage,
            rating: buch.rating,
          },
        },
      });

      // Nach erfolgreichem Update den Benutzer zur Detailansicht weiterleiten
      navigate(`/buch/${id}`);
    } catch (err) {
      console.error('Fehler beim Aktualisieren des Buches:', err);
    }
  };

  if (loading) {
    return <Text color="white">Lade Buchdaten...</Text>;
  }

  if (error) {
    return <Text color="red.500">Fehler beim Laden des Buches: {error.message}</Text>;
  }

  return (
    <Box color="white" minH="100vh" p={10}>
      <VStack align="start" gap={4}>
        <Text>Titel</Text>
        <Input
          type="text"
          name="titel"
          value={buch.titel}
          onChange={handleInputChange}
        />

        <Text>Untertitel</Text>
        <Input
          type="text"
          name="untertitel"
          value={buch.untertitel}
          onChange={handleInputChange}
        />

        <Text>Preis (€)</Text>
        <Input
          type="number"
          name="preis"
          value={buch.preis}
          onChange={handleInputChange}
        />

        <Text>Rabatt (%)</Text>
        <Input
          type="number"
          name="rabatt"
          value={buch.rabatt}
          onChange={handleInputChange}
        />

        <Text>Veröffentlichungsdatum</Text>
        <Input
          type="date"
          name="datum"
          value={buch.datum}
          onChange={handleInputChange}
        />

        <Text>Homepage</Text>
        <Input
          type="text"
          name="homepage"
          value={buch.homepage}
          onChange={handleInputChange}
        />

        <Text>Bewertung (1-5)</Text>
        <Input
          type="number"
          name="rating"
          min="1"
          max="5"
          value={buch.rating}
          onChange={handleInputChange}
        />

        <Text>Lieferbar</Text>
        <Input
          type="checkbox"
          name="lieferbar"
          checked={buch.lieferbar}
          onChange={handleInputChange}
        />
      </VStack>

      <Button colorScheme="blue" onClick={handleUpdate} mt={5}>
        Buch aktualisieren
      </Button>

      {updateError && <Text color="red.500">{updateError.message}</Text>}
      {updateData && <Text color="green.500">Buch erfolgreich aktualisiert!</Text>}
    </Box>
  );
};

export default BuchAendern;
