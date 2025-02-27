export type Buch = {
  id?: number;
  version?: number;
  isbn: string;
  rating: number;
  art: BuchArt;
  preis: number;
  rabatt: string;
  lieferbar: boolean;
  datum: string;
  homepage: string;
  schlagwoerter: string[];
  titel?: Titel;
  abbildungen?: Abbildung[];
  datei?: BuchFile;
  erzeugt: string;
  aktualisiert: string;
};

type Titel = {
  id?: number | undefined;
  titel: string;
  untertitel: string | undefined;
};

type BuchFile = {
  id?: number | undefined;
  filename: string | undefined;
  data: Uint8Array | undefined;
};

type Abbildung = {
  id?: number | undefined;
  beschriftung: string;
  contentType: string | undefined;
};

export type BuchArt = 'EPUB' | 'HARDCOVER' | 'PAPERBACK';

export type Suchkriterien = {
  titel: string | undefined;
  isbn: string | undefined;
  rating: number | undefined;
  art: BuchArt | undefined;
  lieferbar: boolean | undefined;
  rabatt: boolean | undefined;
};
