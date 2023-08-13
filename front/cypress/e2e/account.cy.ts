import * as Cypress from 'cypress';

describe('Account spec', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.intercept('POST', '/api/auth/login', {
      body: {
        id: 1,
        username: 'userName',
        firstName: 'firstName',
        lastName: 'lastName',
        admin: true,
      },
    }).as('login');

    cy.intercept(
        {
          method: 'GET',
          url: '/api/session',
        },
        [
          {
            id: 1,
            name: 'My First Session',
            description: 'This is the first yoga session.',
            date: new Date().toISOString(),
            teacher_id: 1,
            users: [1, 2],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: 2,
            name: 'My Second Session',
            description: 'This is the second yoga session.',
            date: new Date().toISOString(),
            teacher_id: 3,
            users: [2, 5, 6],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ]
      ).as('getSessions');

      cy.intercept(
        {
          method: 'GET',
          url: '/api/user/1',
        },
        {
            id: 1,
            email: "yoga@studio.com",
            lastName: "Admin",
            firstName: "Admin",
            admin: true,
            createdAt: "2023-07-21T15:28:40",
            updatedAt: "2023-07-21T15:28:40"
        }
      ).as('getUser1');

    cy.get('input[formControlName=email]').type('yoga@studio.com');
    cy.get('input[formControlName=password]').type(
      `${'test!1234'}{enter}{enter}`
    );
    cy.url().should('include', '/sessions');
  });

  it('should display user data', () => {
    cy.contains('.link', 'Account').click();
    cy.url().should('include', '/me');
    cy.wait('@getUser1').then(() => {
        cy.get('p').contains('Name: Admin ADMIN').should('exist');
        cy.get('p').contains('Email: yoga@studio.com').should('exist');
        cy.get('p').contains('Create at:').should('exist');
        cy.get('p').contains('Last update:').should('exist');
      });
  });
});
