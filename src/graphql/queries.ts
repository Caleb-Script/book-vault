import { gql } from '@apollo/client';

export const BUCH = gql`
  query Buecher($id: ID!) {
    buch(id: $id) {
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


export const BUECHER = gql`
  query Buecher($titel: String, $isbn: String, $rating: Int, $art: Art, $lieferbar: Boolean, $rabatt: Boolean) {
    buecher(
        suchkriterien: { titel: $titel, isbn: $isbn, rating: $rating, art: $art, lieferbar: $lieferbar }
    ) {
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
        titel {
            titel
            untertitel
        }
        rabatt(short: $rabatt)
    }
}
`;
