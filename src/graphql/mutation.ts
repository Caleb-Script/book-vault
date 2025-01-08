import { gql } from '@apollo/client';

export const CREATE_BUCH = gql`
  mutation CreateBuch(
    $isbn: String!
    $rating: Int!
    # $art: Art!
    $preis: Float!
    $rabatt: Float!
    $lieferbar: Boolean!
    $datum: String!
    $homepage: String!
    $schlagwoerter: [String]!
    $titel: TitelInput!
  ) {
    create(
      input: {
        isbn: $isbn
        rating: $rating
        art: $art
        preis: $preis
        rabatt: $rabatt
        lieferbar: $lieferbar
        datum: $datum
        homepage: $homepage
        schlagwoerter: $schlagwoerter
        titel: $titel
      }
    ) {
      id
    }
  }
`;

export const UPDATE_BUCH = gql`
  mutation UpdateBuch(
    $id: ID
    $version: Int
    $isbn: String
    $rating: Int
    $art: Art
    $preis: Float
    $rabatt: Float
    $lieferbar: Boolean
    $datum: String
    $homepage: String
    $schlagwoerter: [String]
  ) {
    update(
      input: {
        id: $id
        version: $version
        isbn: $isbn
        rating: $rating
        art: $art
        preis: $preis
        rabatt: $rabatt
        lieferbar: $lieferbar
        datum: $datum
        homepage: $homepage
        schlagwoerter: $schlagwoerter
      }
    ) {
      version
    }
  }
`;
