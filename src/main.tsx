import { ApolloProvider } from '@apollo/client';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'; // ChakraProvider importieren
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; // Importiere die App-Komponente
import client from './services/apolloClient';


createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ChakraProvider value={defaultSystem}>
        <App />
      </ChakraProvider>
    </ApolloProvider>
  </React.StrictMode>,
);
