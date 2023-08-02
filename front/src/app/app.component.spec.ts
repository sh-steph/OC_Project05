import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { expect } from '@jest/globals';

import { AppComponent } from './app.component';
import { SessionService } from './services/session.service';
import { AuthService } from './features/auth/services/auth.service';
import { is } from 'cypress/types/bluebird';


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let sessionService: SessionService;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatToolbarModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        AuthService,
        SessionService
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    sessionService = TestBed.inject(SessionService);
    fixture.detectChanges();
  });

  afterEach(() => {
    // Reset spy
    jest.clearAllMocks();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should logout the user', () => {
    // Mock the logOut method of SessionService
    const sessionSpyService = jest.spyOn(sessionService, 'logOut');
    component.logout();
    fixture.detectChanges();
  
    // Assert that the user is logged out.
    expect(sessionSpyService).toHaveBeenCalled();
    component.$isLogged().subscribe((isLogged) =>{
      expect(isLogged).toBe(false);
    })
  });
});
