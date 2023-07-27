import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { expect } from '@jest/globals';
import { SessionService } from 'src/app/services/session.service';

import { LoginComponent } from './login.component';
import { LoginRequest } from '../../interfaces/loginRequest.interface';
import { AuthService } from '../../services/auth.service';
import { throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let sessionService: SessionService;
  let loginRequest: LoginRequest;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [SessionService],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    sessionService = TestBed.inject(SessionService);
    fixture.detectChanges();
  });

  afterEach(() => {
    // Reset spy
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Check values and type of email and password
  it('should have a string type for both email and password', () => {
    // Initiate registerRequest object
    loginRequest = {
      email: 'myTestEmail@test.com',
      password: 'myTestPassword',
    };

    component.form.setValue(loginRequest);

    fixture.detectChanges();

    // Get the form value and check the properties
    const formValue = component.form.value as LoginRequest;

    // Check types
    expect(typeof formValue.email).toBe('string');
    expect(typeof formValue.password).toBe('string');
  });

  // Check if login or password are false
  it('should display error message on login failure', () => {
    // Initiate registerRequest object
    loginRequest = {
      email: 'myFalseTestEmail@test.com',
      password: 'myFalseTestPassword',
    };

    // Set the form values
    component.form.setValue(loginRequest);

    // Mock login() to return an error
    const authServiceSpy = jest
      .spyOn(authService, 'login')
      .mockReturnValue(throwError(() => 'Invalid credentials'));

    // Trigger the form submission
    component.submit();

    // Trigger change detection to update the component
    fixture.detectChanges();

    // Set error to true
    expect(component.onError).toBe(true);

    // Assert that the authService.login() method was called with the correct loginRequest
    expect(authServiceSpy).toHaveBeenCalledWith(loginRequest);
  });

  it('should display error message when required fields are missing', () => {

    // Set error to true
    component.onError = true;

    component.submit();
    fixture.detectChanges();
  
    expect(component.onError).toBe(true);
    expect(jest.spyOn(authService, 'login')).not.toHaveBeenCalled();
    expect(component.form.controls['email'].invalid).toBe(true);
    expect(component.form.controls['email'].hasError('required')).toBe(true);
    expect(component.form.controls['password'].invalid).toBe(true);
    expect(component.form.controls['password'].hasError('required')).toBe(true);
  });
});
