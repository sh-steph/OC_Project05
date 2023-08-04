import * as Cypress from 'cypress';

describe('Register spec', () => {
  beforeEach(() => {
    cy.visit('/register');
  });

  it('Should create a new user', () => {
    cy.intercept('POST', '/api/auth/register', {
      body: {
        lastName: 'myTestLastName',
        firstName: 'myTestFirstName',
        email: 'myTestEmail@test.com',
        password: 'myTestPassword',
      },
    });
    cy.get('input[formControlName=lastName]').type('myTestLastName');
    cy.get('input[formControlName=firstName]').type('myTestFirstName');
    cy.get('input[formControlName=email]').type('myTestEmail@test.com');
    cy.get('input[formControlName=password]').type('myTestPassword');
    cy.get('[type="submit"]').click();

    cy.url().should('include', '/login');
  });

  it('should not register a user if the email is invalid', () => {
    cy.get('[formControlName="firstName"]').type('myTestFirstName');
    cy.get('[formControlName="lastName"]').type('myTestLastName');
    cy.get('[formControlName="email"]').type('myTestEmail@e');
    cy.get('[formControlName="password"]').type('myTestPassword');  
    cy.get('[type="submit"]').click();

    cy.get('.error').should('contain', 'An error occurred');
  });
});
