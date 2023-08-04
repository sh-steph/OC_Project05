describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should login successfully', () => {
    cy.intercept('POST', '/api/auth/login', {
      body: {
        id: 1,
        username: 'userName',
        firstName: 'firstName',
        lastName: 'lastName',
        admin: true,
      },
    });

    cy.intercept(
      {
        method: 'GET',
        url: '/api/session',
      },
      []
    ).as('session');

    cy.get('input[formControlName=email]').type('yoga@studio.com');
    cy.get('input[formControlName=password]').type(
      `${'test!1234'}{enter}{enter}`
    );

    cy.url().should('include', '/sessions');
  });

  it('should not login if field is invalid', () => {

    cy.get('input[formControlName=email]').type('yoga@studio.com');
    cy.get('input[formControlName=password]').type('fakePassword');
    cy.get('[type="submit"]').click();

    cy.get('.error').should('contain', 'An error occurred');

    cy.get('input[formControlName=email]').focus().clear();
    cy.get('input[formControlName=password]').focus().clear();

    cy.get('input[formControlName=email]').type('fakeMail@fake.com');
    cy.get('input[formControlName=password]').type('test!1234');
    cy.get('[type="submit"]').click();

    cy.get('.error').should('contain', 'An error occurred');
  });
});
