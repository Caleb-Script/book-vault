export const validateFields = (buch: any): { [key: string]: string } => {
  const errors: { [key: string]: string } = {};

  // ISBN Validierung
  if (!buch.isbn || !/^\d{10,13}$/.test(buch.isbn)) {
    errors.isbn = 'ISBN muss eine gültige 10- oder 13-stellige Zahl sein.';
  }

  // Titel Validierung
  if (!buch.titel?.titel || buch.titel.titel.trim().length === 0) {
    errors.titel = 'Titel darf nicht leer sein.';
  } else if (buch.titel.titel.length < 5) {
    errors.titel = 'Titel muss mindestens 5 Zeichen haben.';
  } else if (!/^[a-zA-ZäöüÄÖÜß\s]+$/.test(buch.titel.titel)) {
    errors.titel = 'Titel darf nur Buchstaben enthalten.';
  }

  // Untertitel Validierung
  if (buch.titel?.untertitel) {
    if (buch.titel.untertitel.length < 5) {
      errors.untertitel = 'Untertitel muss mindestens 5 Zeichen haben.';
    } else if (!/^[a-zA-ZäöüÄÖÜß\s]+$/.test(buch.titel.untertitel)) {
      errors.untertitel = 'Untertitel darf nur Buchstaben enthalten.';
    }
  }

  // Rating Validierung
  if (buch.rating < 0 || buch.rating > 5 || isNaN(buch.rating)) {
    errors.rating = 'Rating muss eine Zahl zwischen 0 und 5 sein.';
  }

  // Buchart Validierung
  if (!buch.art || !['EPUB', 'HARDCOVER', 'PAPERBACK'].includes(buch.art)) {
    errors.art = 'Buchart ist ungültig.';
  }

  // Preis Validierung
  if (isNaN(buch.preis) || buch.preis <= 0) {
    errors.preis = 'Preis muss eine positive Zahl sein.';
  }

  // Rabatt Validierung
  if (isNaN(buch.rabatt) || buch.rabatt < 0 || buch.rabatt > 100) {
    errors.rabatt = 'Rabatt muss zwischen 0 und 100 liegen.';
  }

  // Datum Validierung
  if (!buch.datum || !/^\d{4}-\d{2}-\d{2}$/.test(buch.datum)) {
    errors.datum = 'Datum muss im Format JJJJ-MM-TT sein.';
  }

  // Homepage Validierung
  if (buch.homepage && !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(buch.homepage)) {
    errors.homepage = 'Homepage muss eine gültige URL sein.';
  }

  // Schlagwörter Validierung
  if (
    buch.schlagwoerter &&
    (!Array.isArray(buch.schlagwoerter) ||
      buch.schlagwoerter.some((tag: string) => tag.trim() === ''))
  ) {
    errors.schlagwoerter = 'Schlagwörter dürfen nicht leer sein.';
  }

  // Abbildungen Validierung
  if (
    buch.abbildungen &&
    buch.abbildungen.some(
      (abbildung: any) =>
        !abbildung.beschriftung ||
        abbildung.beschriftung.trim().length === 0 ||
        !abbildung.contentType ||
        abbildung.contentType.trim().length === 0,
    )
  ) {
    errors.abbildungen =
      'Jede Abbildung muss eine Beschriftung und einen Content-Typ haben.';
  }

  return errors;
};
