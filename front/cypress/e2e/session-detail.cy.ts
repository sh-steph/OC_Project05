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
        url: '/api/session/1',
      },
      {
        id: 1,
        name: 'My First Session',
        description: 'This is the first yoga session.',
        date: new Date('2023-08-12'),
        teacher_id: 1,
        users: [1, 2],
        createdAt: new Date('2023-08-12'),
        updatedAt: new Date('2023-08-12'),
      }
    ).as('getSessionsDetail');

    cy.intercept(
      {
        method: 'GET',
        url: '/api/teacher',
      },
      [
        {
          id: 1,
          lastName: 'DELAHAYE',
          firstName: 'Margot',
          createdAt: '2023-07-21T15:28:40',
          updatedAt: '2023-07-21T15:28:40',
        },
        {
          id: 2,
          lastName: 'SAHILI',
          firstName: 'Nassim',
          createdAt: '2023-06-02T15:28:40',
          updatedAt: '2023-10-29T15:28:40',
        },
      ]
    ).as('getAllTeacher');

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

  it('should check if the informations of the session are correct and display the Delete buttons if the user is admin', () => {
    cy.get('.list button[routerLink="create"]').should('exist');
    // marche pas car iteration ?
    // cy.get('.items .item button[routerLink=="detail"]').click();
    cy.contains('.items .item button', 'Detail').click();
    cy.url().should('include', '/sessions/detail/1');
    cy.wait('@getSessionsDetail').then(() => {
      // dur ou dynamique ?
      cy.contains('.mat-card-title h1', 'My First Session').should('exist');
      cy.contains('.description', 'This is the first yoga session.').should(
        'exist'
      );
      cy.contains('.created', 'Create at: August 12, 2023').should('exist');
      cy.contains('.updated', 'Last update: August 12, 2023').should('exist');
      cy.get('.ml1').should('contain', 'Margot DELAHAYE');
      cy.get('.ml1').should('contain', '2 attendees');
      cy.contains('button', 'Delete').should('exist');
    });
  });

  it('should delete a session', () => {
    cy.intercept(
      {
        method: 'DELETE',
        url: '/api/session/1',
      },
      {
        id: 1,
        name: 'My First Session',
        description: 'This is the first yoga session.',
        date: new Date('2023-08-12'),
        teacher_id: 1,
        users: [1, 2],
        createdAt: new Date('2023-08-12'),
        updatedAt: new Date('2023-08-12'),
      }
    ).as('DeleteSession1');

    cy.contains('.items .item button', 'Detail').click();
    cy.url().should('include', '/sessions/detail/1');
    cy.contains('button', 'Delete').click();
    cy.url().should('include', '/sessions');
  });

  it('should update a session', () => {
    cy.intercept(
      {
        method: 'PUT',
        url: '/api/session/1',
      },
      {
        id: 1,
        name: 'My First Session',
        description: 'This is the first yoga session.',
        date: new Date('2023-08-12'),
        teacher_id: 1,
        users: [1, 2],
        createdAt: new Date('2023-08-12'),
        updatedAt: new Date('2023-08-12'),
      }
    ).as('UpdateSession1');

    const updatedSession = {
      name: 'My Updated session',
      date: '2023-12-24',
      teacher_id: 2,
      description: 'My updated description.',
      users: [2],
    };

    cy.contains('.items .item button', 'Edit').click();
    cy.url().should('include', '/sessions/update/1');
    cy.contains('button', 'Save').should('exist');
    cy.get('input[formControlName=name]').clear();
    cy.get('input[formControlName=name]').type(updatedSession.name);
    cy.get('input[formControlName=date]').clear();
    cy.get('input[formControlName=date]').type(updatedSession.date);
    cy.get('textarea[formControlName=description]').clear();
    cy.get('textarea[formControlName=description]').type(
      updatedSession.description
    );
    cy.get('mat-select[formControlName=teacher_id]').click();
    cy.get('.mat-option').last().click();
    cy.url().should('include', '/sessions');
    cy.contains('button', 'Save').click();
  });

  it('should return an error if some field is missing during the update session form', () => {
    cy.intercept(
      {
        method: 'PUT',
        url: '/api/session/1',
      },
      {
        id: 1,
        name: 'My First Session',
        description: 'This is the first yoga session.',
        date: new Date('2023-08-12'),
        teacher_id: 1,
        users: [1, 2],
        createdAt: new Date('2023-08-12'),
        updatedAt: new Date('2023-08-12'),
      }
    ).as('DeleteSession1');

    const updatedSession = {
      name: 'My Updated session',
      date: '2023-12-24',
      teacher_id: 2,
      description: 'My updated description.',
      users: [2],
    };

    cy.contains('.items .item button', 'Edit').click();
    cy.url().should('include', '/sessions/update/1');
    cy.contains('button', 'Save').should('exist');
    cy.get('input[formControlName=name]').clear();
    cy.get('input[formControlName=date]').clear();
    cy.get('textarea[formControlName=description]').clear();
    cy.get('mat-select[formControlName=teacher_id]').click();
    cy.get('.mat-option').last().click();
    cy.get('input[formControlName=name]').should('have.class', 'ng-invalid');
    cy.get('input[formControlName=date]').should('have.class', 'ng-invalid');
    cy.get('textarea[formControlName=description]').should('have.class', 'ng-invalid');
    cy.contains('button', 'Save').should('be.disabled');
  });
});
