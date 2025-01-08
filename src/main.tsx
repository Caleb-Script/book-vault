import { Provider as ChakraProvider } from '@/components/ui/provider';
import { ApolloProvider } from '@apollo/client';
import { ClientOnly, Skeleton } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react/box';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import client from './api/apolloClient';
import App from './App';
import { ColorModeToggle } from './components/color-mode-toggle';
import ErrorBoundary from './components/ErrorBoundary';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ApolloProvider client={client}>
        <ThemeProvider>
          <ChakraProvider>
            <AuthProvider>
              <BrowserRouter>
                <Box pos="absolute" top="4" right="4">
                  <ClientOnly
                    fallback={<Skeleton w="10" h="10" rounded="md" />}
                  >
                    <ColorModeToggle />
                  </ClientOnly>
                </Box>
                <App />
              </BrowserRouter>
            </AuthProvider>
          </ChakraProvider>
        </ThemeProvider>
      </ApolloProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
