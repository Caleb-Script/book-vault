import { gql } from '@apollo/client';

export const UPDATE_BUCH = gql`
  mutation UpdateBuch($id: ID,
  $version: Int,
  $isbn: String,
  $rating: Int,
  $art: Art,
  $preis: Float,
  $rabatt: Float,
  $lieferbar: Boolean,
  $datum: String,
  $homepage: String,
  $schlagwoerter: [String]) {
    update(input: {
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
        }) {
      version
    }
  }
`;
