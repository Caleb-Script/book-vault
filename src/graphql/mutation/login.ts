import { gql } from '@apollo/client';

export const GET_TOKEN = gql`
  mutation Token($username: String!, $password: String!) {
    token(username: $username, password: $password) {
      access_token
      expires_in
      refresh_token
      refresh_expires_in
    }
  }
`;
