describe('Log out spec', () => {
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

    it('should log out', () => {
        cy.contains('span.link', 'Logout').click();
    });
});