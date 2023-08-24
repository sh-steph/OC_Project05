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
    }).as('getLogin');

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
    cy.get('input[formControlName=email]').type('yoga@studio.com');
    cy.get('input[formControlName=password]').type(
      `${'test!1234'}{enter}{enter}`
    );
    cy.url().should('include', '/sessions');
    cy.get('.list button[routerLink="create"]').click();
    cy.url().should('include', '/sessions/create');
  });

  it('should create a new session', () => {
    const newSession = {
      name: 'My New Session',
      description: 'This is a new session.',
      date: '2023-08-01',
      teacher_id: 2,
    };

    cy.intercept('POST', '/api/session', {
      body: {
        name: newSession.name,
        date: newSession.date,
        teacher_id: newSession.teacher_id,
        users: null,
        description: newSession.description,
      },
    }).as('postCreateSession');

    cy.get('input[formControlName=name]').type(newSession.name);
    cy.get('input[formControlName=date]').type(newSession.date);
    cy.get('textarea[formControlName=description]').type(
      newSession.description
    );
    cy.get('mat-select[formControlName=teacher_id]').click();
    // Select teacher
    cy.get('.mat-option').last().click();
    cy.get('button[type="submit"]').click();
  });
  it('should return an error for invalid submit', () => {
    // Ne rien remplir dans le formulaire
    cy.get('button[type="submit"]').should('be.disabled');
    // Invalid form
    cy.get('input[formControlName=name]').type('test');
    cy.get('input[formControlName=name]').clear();
    cy.get('input[formControlName=date]').type('2023-07-20');
    cy.get('input[formControlName=date]').clear();
    cy.get('textarea[formControlName=description]').type('This is a very long description');
    cy.get('textarea[formControlName=description]').clear();
    cy.get('button[type="submit"]').should('be.disabled');
    cy.url().should('include', '/sessions/create');
  });
});
