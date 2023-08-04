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
    cy.get('input[formControlName=email]').type('yoga@studio.com');
    cy.get('input[formControlName=password]').type(`${'test!1234'}{enter}{enter}`);
    cy.url().should('include', '/sessions');

    cy.intercept('GET', '/api/session', [
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
    ]).as('getSessions');
  });

  it('should display list successfully', () => {
    // Wait the get is done
    cy.wait('@getSessions');
    cy.get('.items .item').should('exist');
    cy.get('.mat-card-title span').first().should('have.text', 'My first session');
    cy.get('.mat-card-title span').last().should('have.text', 'My second session');
  });
});