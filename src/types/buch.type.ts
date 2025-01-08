export type Buch = {
    id: number,
    version: number,
    isbn: string,
    rating: number,
    art: string,
    preis: number,
    rabatt: string,
    lieferbar: boolean,
    datum: string,
    homepage: string,
    schlagwoerter: string[],
    titel?: Titel,
    abbildungen?: Abbildung[],
    datei?: BuchFile,
    erzeugt: string,
    aktualisiert: string,
}

type Titel = {
    id: number | undefined,
    titel: string,
    untertitel: string | undefined,
}

type BuchFile = {
    id: number | undefined;
    filename: string | undefined;
    data: Uint8Array | undefined;
    buch: Buch | undefined;
}

type Abbildung = {
    id: number | undefined,
    beschriftung: string,
    contentType: string | undefined,
}

