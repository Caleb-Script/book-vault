// src/services/apolloClient.ts
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import Cookies from 'js-cookie';

// Apollo Client Setup
const client = new ApolloClient({
  link: new HttpLink({
    uri: import.meta.env.VITE_GRAPHQL_URL,
    headers: {
        Authorization: `Bearer ${Cookies.get('access_token') || ''}`,
    },
  }),
  cache: new InMemoryCache(),
});


export default client;
