import { Provider } from '@/components/ui/provider';
import { ApolloProvider } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import client from './api/apolloClient';
import App from './App';
import { Box } from '@chakra-ui/react/box';
import { ClientOnly, Skeleton } from '@chakra-ui/react';
import { ColorModeToggle } from './components/color-mode-toggle';
import Navbar from './features/navbar';
import ErrorBoundary from './components/ErrorBoundary';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ApolloProvider client={client}>
        <Provider>
          <Router>
            <Box pos="absolute" top="4" right="4">
              <ClientOnly fallback={<Skeleton w="10" h="10" rounded="md" />}>
                <ColorModeToggle />
              </ClientOnly>
            </Box>
            <App />
          </Router>
        </Provider>
      </ApolloProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
