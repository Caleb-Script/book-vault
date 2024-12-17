import { gql } from '@apollo/client';

export const UPDATE_BUCH = gql`
  mutation UpdateBuch($id: ID!, $input: BuchUpdateInput!) {
    update(id: $id, input: $input) {
      id
      version
      isbn
      rating
      art
      preis
      lieferbar
      datum
      homepage
      schlagwoerter
      rabatt
      titel {
        titel
        untertitel
      }
    }
  }
`;
