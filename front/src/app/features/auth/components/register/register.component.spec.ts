import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { expect } from '@jest/globals';

import { RegisterComponent } from './register.component';
import { AuthService } from '../../services/auth.service';
import { RegisterRequest } from '../../interfaces/registerRequest.interface';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: AuthService;
  let registerRequest: RegisterRequest;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,  
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  afterEach(() => {
    // Reset spy
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a new account', () => {
    // Initiate registerRequest object
    registerRequest = {
      email: 'myTestEmail@test.com',
      firstName: 'testFirstName',
      lastName: 'testLastName',
      password: 'myTestPassword',
    };

    // Set the values of the form controls
    component.form.setValue(registerRequest);
  
    // Mock register() to return an error
    const authServiceSpy = jest
      .spyOn(authService, 'register')
      .mockReturnValue(of(undefined));

    // Set error to false
    component.onError = false;

    // Submit the form.
    component.submit();

    fixture.detectChanges();
    
    expect(component.onError).toBe(false);
    expect(authServiceSpy).toHaveBeenCalledWith(registerRequest);
  });

  it('should display error message when required fields are missing', () => {

    // Set error to true
    component.onError = true;

    component.submit();
    fixture.detectChanges();
  
    expect(component.onError).toBe(true);
    expect(jest.spyOn(authService, 'register')).not.toHaveBeenCalled();
    expect(component.form.controls['email'].invalid).toBe(true);
    expect(component.form.controls['email'].hasError('required')).toBe(true);
    expect(component.form.controls['firstName'].invalid).toBe(true);
    expect(component.form.controls['firstName'].hasError('required')).toBe(true);
    expect(component.form.controls['lastName'].invalid).toBe(true);
    expect(component.form.controls['lastName'].hasError('required')).toBe(true);
    expect(component.form.controls['password'].invalid).toBe(true);
    expect(component.form.controls['password'].hasError('required')).toBe(true);
  });
});
