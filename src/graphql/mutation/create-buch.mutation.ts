import { gql } from '@apollo/client';

export const CREATE_BUCH = gql`
  mutation CreateBuch($input: CreateBuchInput!) {
    createBuch(input: $input) {
      id
      titel
    }
  }
`;
// export const CREATE_BUCH = gql`
//   mutation CreateBuch(
//     $isbn: String!
//     $rating: Int!
//     # $art: Art!
//     $preis: Float!
//     $rabatt: Float!
//     $lieferbar: Boolean!
//     $datum: String!
//     $homepage: String!
//     $schlagwoerter: [String]!
//     $titel: TitelInput!
//   ) {
//     create(
//       input: {
//         isbn: $isbn
//         rating: $rating
//         art: $art
//         preis: $preis
//         rabatt: $rabatt
//         lieferbar: $lieferbar
//         datum: $datum
//         homepage: $homepage
//         schlagwoerter: $schlagwoerter
//         titel: $titel
//       }
//     ) {
//       id
//     }
//   }
// `;
