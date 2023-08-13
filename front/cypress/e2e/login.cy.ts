describe('Login spec', () => {
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
    });

    cy.intercept(
      {
        method: 'GET',
        url: '/api/session',
      },
      [{
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
      },]
    ).as('session');
  });

  it('should login successfully', () => {
    cy.get('input[formControlName=email]').type('yoga@studio.com');
    cy.get('input[formControlName=password]').type(
      `${'test!1234'}{enter}{enter}`
    );

    cy.url().should('include', '/sessions');
  });

  it('should not login if field is invalid', () => {
    cy.intercept('POST', '/api/auth/login', {
      statusCode: 400,
      body: {
        error: 'Invalid credentials',
      },
    })

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

  it('should not login if the fields are empties', () => {
    cy.get('input[formControlName=email]').type('yoga@studio.com');
    cy.get('input[formControlName=email]').clear();
    cy.get('input[formControlName=password]').type('fakePassword');
    cy.get('input[formControlName=password]').clear();
    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('should display error if a require field is missing', () => {
    cy.get('input[formControlName=email]').type('yoga@studio.com');
    cy.get('input[formControlName=email]').clear();
    cy.get('input[formControlName=password]').type('fakePassword');
    cy.get('input[formControlName=email]').should('have.class', 'mat-input-element mat-form-field-autofill-control ng-tns-c55-0 cdk-text-field-autofill-monitored ng-dirty ng-invalid ng-touched');
    cy.get('button[type="submit"]').should('be.disabled');
  });
});
