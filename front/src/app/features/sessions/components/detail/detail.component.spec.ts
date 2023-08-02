import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { expect } from '@jest/globals';
import { SessionService } from '../../../../services/session.service';

import { DetailComponent } from './detail.component';
import { Session } from '../../interfaces/session.interface';
import { SessionApiService } from '../../services/session-api.service';
import { User } from 'src/app/interfaces/user.interface';
import { of, throwError } from 'rxjs';
import { SessionInformation } from 'src/app/interfaces/sessionInformation.interface';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let service: SessionService;
  let session: Session;
  let sessionApiService: SessionApiService;
  let userData: User;
  let sessionInformation: SessionInformation;

  const mockSessionService = {
    sessionInformation: {
      admin: true,
      id: 1,
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatSnackBarModule,
        ReactiveFormsModule,
      ],
      declarations: [DetailComponent],
      providers: [{ provide: SessionService, useValue: mockSessionService }],
    }).compileComponents();
    service = TestBed.inject(SessionService);
    fixture = TestBed.createComponent(DetailComponent);
    sessionApiService = TestBed.inject(SessionApiService);
    component = fixture.componentInstance;
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
  it('should display session detail', () => {
    // Mock a session detail
    session = {
      id: 2,
      name: 'testSessionDetail',
      description: 'testDescription',
      date: new Date(),
      teacher_id: 1,
      users: [1, 3, 5, 6],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Mock the service method to return the list of sessions
    const sessionApiServiceSpy = jest
      .spyOn(sessionApiService, 'detail')
      .mockReturnValue(of(session));

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      // Query the template to find the session details
      const sessionName = fixture.nativeElement.querySelector('h1');
      const sessionDescription =
        fixture.nativeElement.querySelector('.description');
      const sessionAttendees =
        fixture.nativeElement.querySelector('.attendees');
      const sessionDate = fixture.nativeElement.querySelector('.date');
      // Assert that the session details are displayed correctly
      expect(sessionName.textContent).toContain(session.name);
      expect(sessionDescription.textContent).toContain(session.description);
      expect(sessionAttendees.textContent).toContain(String(session.users.length) + 'attendees');
      expect(sessionDate.textContent).toContain(session.date);
    });
  });

  it('should display the button Delete if the user is admin', () => {
    sessionInformation = {
      token: 'testToken',
      type: 'testType',
      id: 1,
      username: 'testUsername',
      firstName: 'testFirstName',
      lastName: 'testLastName',
      admin: true,
    };

    fixture.detectChanges();
    expect(sessionInformation.admin).toBe(true);
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

  it('should Delete the session', () => {
    // Mock a session detail
  session = {
    id: 2,
    name: 'testSessionDetail',
    description: 'testDescription',
    date: new Date(),
    teacher_id: 1,
    users: [1, 3, 5, 6],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // Mock the service method to return the session detail
  const sessionApiServiceSpy = jest
    .spyOn(sessionApiService, 'detail')
    .mockReturnValue(of(session));

  // Mock the service method to delete the session
  const deleteSessionSpy = jest
    .spyOn(sessionApiService, 'delete')
    .mockReturnValue(of(session));

  fixture.detectChanges();

  // Wait for the end of detection
  fixture.whenStable().then(() => {
    // Query the template to find the delete button
    const deleteButton = fixture.nativeElement.querySelector('.delete-button');
    expect(deleteButton).toBeTruthy();
    // Simulate a click on the delete button
    deleteButton.click();
    // Expect the delete method to be called with the correct session id
    expect(deleteSessionSpy).toHaveBeenCalledWith(session.id);
  });
  });
});
