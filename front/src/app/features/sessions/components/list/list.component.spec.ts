import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { expect } from '@jest/globals';
import { SessionService } from 'src/app/services/session.service';

import { ListComponent } from './list.component';
import { Session } from '../../interfaces/session.interface';
import { SessionApiService } from '../../services/session-api.service';
import { of } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let sessionsList: Session[];
  let sessionApiService: SessionApiService;
  let userData: User;

  const mockSessionService = {
    sessionInformation: {
      admin: true,
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [HttpClientModule, MatCardModule, MatIconModule],
      providers: [
        { provide: SessionService, useValue: mockSessionService },
        SessionApiService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    sessionApiService = TestBed.inject(SessionApiService);
    fixture.detectChanges();
  });

  afterEach(() => {
    // Reset spy
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Check if it display list of sessions
  it('should display list of sessions', () => {
    // Mock a list of sessions
    sessionsList = [
      {
        id: 1,
        name: 'Test Session 01',
        description: 'My Session Test 01',
        date: new Date(),
        teacher_id: 1,
        users: [1, 2, 3],
      },
      {
        id: 2,
        name: 'Test Session 01',
        description: 'My Session Test 02',
        date: new Date(),
        teacher_id: 2,
        users: [1, 4],
      },
    ];

    // Mock the service method to return the list of sessions
    const sessionApiServiceAllSpy = jest
      .spyOn(sessionApiService, 'all')
      .mockReturnValue(of(sessionsList));
    fixture.detectChanges();

    // Wait the detect changes is done
    fixture.whenStable().then(() => {
      // Get all the session in the template through class 'item' where the loop come from
      const sessionsObject = fixture.nativeElement.querySelectorAll('.item');

      // Check the length of sessions list
      expect(sessionsObject.length).toBe(sessionsList.length);

      // Check if the session names are displayed correctly
      for (let i = 0; i < sessionsObject.length; i++) {
        const card = sessionsObject[i];
        expect(card.querySelector('.mat-card-title').textContent).toContain(sessionsList[i].name);
        expect(card.querySelector('.mat-card-subtitle').textContent).toContain(sessionsList[i].date);
        expect(card.querySelector('.mat-card-content').textContent).toContain(sessionsList[i].description);
      }
    });
  });

  it('should display the buttons Create and Detail if the user is admin', () => {
    userData = {
      id: 1,
      email: 'testUserAdmin@test.com',
      lastName: 'testLastName',
      firstName: 'testFirstName',
      admin: true,
      password: 'testAdminPassword',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    jest.spyOn(sessionApiService, 'all').mockReturnValue(of(sessionsList));

    fixture.detectChanges();

    // Wait the detect changes is done
    fixture.whenStable().then(() => {
      // Query the template to find the buttons
      const createButton = fixture.nativeElement.querySelector('[routerLink="create"]');
      const detailButton = fixture.nativeElement.querySelector('[routerLink^="detail"]');
      // Assert that the buttons are present
      expect(createButton).toBeTruthy();
      expect(detailButton).toBeTruthy();
    });
  });
});
