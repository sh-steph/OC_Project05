import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SessionService } from 'src/app/services/session.service';

import { MeComponent } from './me.component';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user.interface';
import { of } from 'rxjs';

describe('MeComponent', () => {
  let component: MeComponent;
  let fixture: ComponentFixture<MeComponent>;
  let userService: UserService;
  let user: User;

  const mockSessionService = {
    sessionInformation: {
      admin: true,
      id: 1
    }
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MeComponent],
      imports: [
        MatSnackBarModule,
        HttpClientModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule
      ],
      providers: [{ provide: SessionService, useValue: mockSessionService }, UserService],
    })
      .compileComponents();

    fixture = TestBed.createComponent(MeComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  afterEach(() => {
    // Reset spy
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display user information', () => {
    user = {
      id: 1,
      email: 'testEmail',
      lastName: 'testLastName',
      firstName: 'testFirstName',
      admin: true,
      password: 'testPassord',
      createdAt: new Date,
      updatedAt: new Date
    }

    // Spy on the UserService getById method to return the mock user
    const userSpyService = jest
    .spyOn(userService, 'getById')
    .mockReturnValue(of(user));

    component.ngOnInit();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      // Get the element p from html
    const getElementFromPHTML = fixture.nativeElement.querySelector('p');

    // Expect the element contents to match the mock user data
    expect(getElementFromPHTML.textContent).toContain(`Name: ${user.firstName} ${user.lastName.toUpperCase()}`);
    expect(getElementFromPHTML.textContent).toContain(`Email: ${user.email}`);
    expect(getElementFromPHTML.textContent).toContain(`Create at: ${user.createdAt}`);
    expect(getElementFromPHTML.textContent).toContain(`Last update: ${user.updatedAt}`);
    })
    
  });
});
