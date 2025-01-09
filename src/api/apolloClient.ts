// src/services/apolloClient.ts
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

// Apollo Client Setup
const client = new ApolloClient({
  link: new HttpLink({
    uri: import.meta.env.VITE_GRAPHQL_URL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    },
  }),
  cache: new InMemoryCache(),
});


export default client;
