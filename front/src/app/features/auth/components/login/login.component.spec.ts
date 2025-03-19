import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { expect } from '@jest/globals';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import { LoginComponent } from './login.component';
import { SessionService } from 'src/app/services/session.service';
import { AuthService } from '../../services/auth.service';
import { SessionInformation } from '../../../../interfaces/sessionInformation.interface';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockRouter: Partial<Router>;
  let mockAuthService: Partial<AuthService>;
  let mockSessionService: Partial<SessionService>;

  beforeEach(async () => {
    mockRouter = {
      navigate: jest.fn(),
    };

    mockAuthService = {
      login: jest.fn(() => of({} as SessionInformation))
    };

    mockSessionService = {
      logIn: jest.fn(() => of())
    };

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        { provide: SessionService, useValue: mockSessionService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
      ],
      imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the login component', () => {
    expect(component).toBeTruthy();
  });

  it('should not log in a user if credentials are incorrect or an exception occurs', () => {
    const loginSpy = jest.spyOn(mockAuthService, 'login').mockImplementation(() => throwError(() => {}));

    component.submit();
    fixture.detectChanges();

    expect(loginSpy).toHaveBeenCalled();
    expect(component.onError).toBe(true);

    const errorElement = fixture.nativeElement.querySelector('.error') as HTMLElement;
    expect(errorElement.textContent).toEqual('An error occurred');
  });

  it('should log in a user successfully if credentials are correct, update session, and navigate to sessions page', () => {
    component.submit();

    expect(component.onError).toBe(false);
    expect(mockAuthService.login).toHaveBeenCalled();
    expect(mockSessionService.logIn).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/sessions']);
  });
});
