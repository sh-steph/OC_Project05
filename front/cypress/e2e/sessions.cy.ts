import * as Cypress from 'cypress';

describe('List sessions spec', () => {
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
          name: 'My first session',
          description: 'This is the first yoga session.',
          date: new Date().toISOString(),
          teacher_id: 1,
          users: [1, 2],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 2,
          name: 'My second session',
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
        url: '/api/session/1',
      },
      {
        id: 1,
        name: 'My first session',
        description: 'This is the first yoga session.',
        date: new Date().toISOString(),
        teacher_id: 1,
        users: [1, 2],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    ).as('getSessionsDetail');

    cy.intercept(
      {
        method: 'GET',
        url: '/api/teacher/1',
      },
      {
        id: 1,
        lastName: 'DELAHAYE',
        firstName: 'Margot',
        createdAt: '2023-07-21T15:28:40',
        updatedAt: '2023-07-21T15:28:40',
      }
    ).as('getTeacher1');

    cy.get('input[formControlName=email]').type('yoga@studio.com');
    cy.get('input[formControlName=password]').type(
      `${'test!1234'}{enter}{enter}`
    );
    cy.url().should('include', '/sessions');
  });

  it('should display a list of sessions', () => {
    // Wait the get is done
    cy.wait('@getSessions').then(() => {
      cy.get('.items .item').should('exist');
    });
  });
  it('should display Create et Delete buttons if the user is admin', () => {
    cy.get('.list button[routerLink="create"]').should('exist');
    // marche pas car iteration ?
    // cy.get('.items .item button[routerLink=="detail"]').click();
    cy.contains('.items .item button', 'Detail').click();
    cy.url().should('include', '/sessions/detail/1');
    cy.wait('@getSessionsDetail').then(() => {
      cy.contains('button', 'Delete').should('exist');
    });
  });
});
