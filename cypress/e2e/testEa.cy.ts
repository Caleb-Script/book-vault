import './commands';

const FRONTEND_URL = Cypress.env('frontendUrl') || 'https://localhost:3001';
const PASSWORD = Cypress.env('password') || 'p';
const USERNAME = Cypress.env('username') || 'admin';

describe('Book Vault Tests', () => {
  beforeEach(() => {
    cy.log(`FRONTEND_URL: ${FRONTEND_URL}`);
    cy.visit(FRONTEND_URL);
  });

  it('Überprüfe Login', () => {
    cy.get('[data-cy=login-link]').should('exist').and('be.visible').click();
    cy.url().should('include', '/login');

    cy.get('[data-cy=login-username]').type(USERNAME);
    cy.get('[data-cy=login-password]').type(PASSWORD);
    cy.get('[data-cy=login-button-second]').click();
    cy.wait(2000);
    cy.get('[data-cy=logo]').should('exist');
  });

  it('Überprüfe Default Zustand', () => {
    cy.get('[data-cy=login-link]').should('exist');
    cy.get('[data-cy=logo]').should('exist');
    cy.get('[data-cy=Suche]').should('exist');
    cy.get('[data-cy=neuesBuch]').should('not.exist');

    // Login durchführen
    cy.get('[data-cy=login-link]').click();
    cy.get('[data-cy=login-username]').type(USERNAME);
    cy.get('[data-cy=login-password]').type(PASSWORD);
    cy.get('[data-cy=login-button-second]').click();
    cy.wait(2000);

    cy.get('[data-cy="Neues Buch"]').should('exist');
  });

  it('Überprüfe Suche mit gegebener ISBN', () => {
    cy.get('[data-cy=logo]').click();

    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'get-buch.query.ts') {
        req.alias = 'searchBooks';
      }
    });

    cy.get('[data-cy=filter]').click();
    cy.wait(2000);
    cy.get('[data-cy=isbn]').click();
    cy.get('[data-cy=isbn-post]').type('978-3-897-22583-1');
    cy.get('[data-cy=post-apply]').click();
  });

  it('Überprüfe Anzeige eines Buches und Ändern von Buchdetails', () => {
    cy.get('[data-cy=logo]').click();
    cy.intercept('POST', '**/graphql/**').as('searchRequest');
    cy.get('[data-cy=filter]').click();
    cy.wait(2000);
    cy.get('[data-cy=isbn]').click();
    cy.get('[data-cy=isbn-post]').type('978-3-897-22583-1');
    cy.get('[data-cy=post-apply]').click();
    cy.get('[data-cy=book-table]').within(() => {
      cy.contains('Alpha').should('exist');
    });
    cy.contains('Alpha').click();
    cy.wait(2000);

    cy.get('[data-cy=login-link]').click();
    cy.get('[data-cy=login-username]').type(USERNAME);
    cy.get('[data-cy=login-password]').type(PASSWORD);
    cy.get('[data-cy=login-button-second]').click();
    cy.wait(2000);

    cy.get('[data-cy=edit-button]').click();
    cy.get('[data-cy=preis-post] input').clear().type('100');
    cy.get('[data-cy=post-rating]').eq(0).click();
    cy.get('[data-cy=type]').contains('DRUCKAUSGABE').click();
    cy.get('[data-cy=post-lieferbar]').click();
    cy.get('[data-cy=post-button-form]').click();
  });
  it('Überprüfe Logout', () => {
    cy.get('[data-cy=logo]').click();
    cy.get('[data-cy=login-link]').click();
    cy.get('[data-cy=login-username]').type(USERNAME);
    cy.get('[data-cy=login-password]').type(PASSWORD);
    cy.get('[data-cy=login-button-second]').click();
    cy.wait(2000);
    cy.get('[data-cy=logout-button]').click();
    cy.get('[data-cy=login-link]').should('exist');
  });
});
