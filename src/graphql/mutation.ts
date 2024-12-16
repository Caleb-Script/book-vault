import { gql } from '@apollo/client';

export const UPDATE_BUCH = gql`
  mutation UpdateBuch($id: ID!, $input: BuchUpdateInput!) {
    update(input: $input) {
      version
    }
  }
`;
