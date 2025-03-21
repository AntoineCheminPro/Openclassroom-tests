import { expect } from '@jest/globals';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import '@testing-library/jest-dom';

import { MeComponent } from './me.component';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../interfaces/user.interface';
import { of } from 'rxjs';

describe('MeComponent', () => {
  let component: MeComponent;
  let fixture: ComponentFixture<MeComponent>;
  let mockSessionService: Partial<SessionService>;
  let mockUserService: Partial<UserService>;
  let mockRouter: Partial<Router>;
  let user: User;

  beforeEach(async () => {
    user = {
      id: 1,
      email: 'yoga@user.com',
      password: 'none!',
      firstName: 'yoga',
      lastName: 'yoga',
      admin: false,
      createdAt: new Date('07/14/2024'),
    };

    mockSessionService = {
      sessionInformation: {
        admin: true,
        id: 1,
        firstName: '',
        lastName: '',
        type: '',
        username: '',
        token: ''
      },
      logOut: jest.fn(() => of({}))
    };

    mockUserService = {
      getById: jest.fn(() => of(user)),
      delete: jest.fn(() => of(null)),
    };

    mockRouter = {
      navigate: jest.fn(),
    };

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
      providers: [
        { provide: SessionService, useValue: mockSessionService },
        { provide: UserService, useValue: mockUserService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve the user by their ID', () => {
    expect(mockUserService.getById).toHaveBeenCalled();
    expect(component.user).toEqual(user);
  });

  it('should display the user information and the delete button', () => {
    const [
      nameElement,
      emailElement,
      deleteAccountParagraph,
      createAtElement,
      updateAtElement
    ] = fixture.nativeElement.querySelectorAll('p') as HTMLParagraphElement[];

    const deleteAccountButton = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

    expect(nameElement.textContent).toEqual(`Name: ${user.firstName} ${user.lastName.toUpperCase()}`);
    expect(emailElement.textContent).toEqual(`Email: ${user.email}`);

    expect(deleteAccountParagraph.textContent).toEqual('Delete my account:');
    expect(deleteAccountButton).toBeTruthy();

    expect(createAtElement.textContent).toEqual('Create at:  July 14, 2024');
    expect(updateAtElement.textContent).toEqual('Last update:  ');
  });

  it('should delete the user account when the delete button is clicked', () => {
    const deleteSession = jest.spyOn(mockUserService, 'delete');
    const route = jest.spyOn(mockRouter, 'navigate').mockImplementation(async () => true);
    const logOut = jest.spyOn(mockSessionService, 'logOut');
    const matSnackBar = jest.spyOn(TestBed.inject(MatSnackBar), 'open').mockImplementation();

    component.delete();

    expect(matSnackBar).toHaveBeenCalledWith('Your account has been deleted !', 'Close', { duration: 3000 });
    expect(deleteSession).toHaveBeenCalled();
    expect(logOut).toHaveBeenCalled();
    expect(route).toHaveBeenCalledWith(['/']);
  });

  it('should navigate back when the back button is clicked', () => {
    const back = jest.spyOn(window.history, 'back');
    component.back();
    expect(back).toHaveBeenCalled();
  });
});
