import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { expect } from '@jest/globals';
import { SessionService } from 'src/app/services/session.service';
import { SessionApiService } from '../../services/session-api.service';

import { FormComponent } from './form.component';
import { Session } from '../../interfaces/session.interface';
import { of, throwError } from 'rxjs';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let session: Session;
  let sessionApiService: SessionApiService;

  const mockSessionService = {
    sessionInformation: {
      admin: true,
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatSelectModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: SessionService, useValue: mockSessionService },
        SessionApiService,
      ],
      declarations: [FormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormComponent);
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

  it('should create session', () => {
    // Mock a new session
    session = {
      name: 'testSession',
      description: 'testDescription',
      date: new Date(),
      teacher_id: 1,
      users: [1, 2, 5, 6],
    };

    const sessionApiServiceSpy = jest
      .spyOn(sessionApiService, 'create')
      .mockReturnValue(of(session));

    // Set the form values
    component.sessionForm?.setValue(session);

    fixture.detectChanges();

    // Trigger the form submit
    component.submit();

    // Expect the create method to be called with the form values
    expect(sessionApiServiceSpy).toHaveBeenCalledWith(session);
  });

  it('should display error message when required fields are missing', () => {
    // Set the form values with valid values for non-required fields
    component.sessionForm?.setValue({
      name: 'testSession',
      description: 'testDescription',
      date: new Date(),
      teacher_id: 1,
      users: [1, 2, 5, 6],
    });

    const sessionApiServiceSpy = jest.spyOn(sessionApiService, 'create');
    // Trigger the form submit
    component.submit();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      // Expect the create method NOT to be called since the form is invalid
      expect(sessionApiServiceSpy).not.toHaveBeenCalled();

      expect(component.sessionForm?.valid).toBe(false);
      expect(component.sessionForm?.get('name')?.invalid).toBe(true);
      expect(component.sessionForm?.get('name')?.hasError('required')).toBe(true);
      expect(component.sessionForm?.get('date')?.invalid).toBe(true);
      expect(component.sessionForm?.get('date')?.hasError('required')).toBe(true);
      expect(component.sessionForm?.get('teacher_id')?.invalid).toBe(true);
      expect(component.sessionForm?.get('teacher_id')?.hasError('required')).toBe(true);
      expect(component.sessionForm?.get('description')?.invalid).toBe(true);
      expect(component.sessionForm?.get('description')?.hasError('required')).toBe(true);    
    });
  });
});
