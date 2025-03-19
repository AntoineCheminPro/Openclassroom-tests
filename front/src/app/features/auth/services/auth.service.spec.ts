import { TestBed } from "@angular/core/testing";
import { HttpClientModule } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { expect } from '@jest/globals';

import { AuthService } from "./auth.service";
import { SessionInformation } from "../../../interfaces/sessionInformation.interface";
import { LoginRequest } from "../interfaces/loginRequest.interface";

describe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ]
    });
    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create the authentication service', () => {
    expect(authService).toBeTruthy();
  });

  it('should send a POST request to register a user', () => {
    const registerRequest = {
      email: 'yoga@user.com',
      password: 'none!',
      firstName: 'yoga',
      lastName: 'yoga',
    };

    authService.register(registerRequest).subscribe({
      next: (data: void): void => {},
      error: () => {
        console.log('Failed to register');
      }
    });

    const req = httpTestingController.expectOne('api/auth/register');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(registerRequest);
    req.flush(null);
  });

  it('should send a POST request to log in a user', () => {
    const loginRequest: LoginRequest = {
      email: 'yoga@user.com',
      password: 'none!'
    };

    const expectedResponse: SessionInformation = {
      token: '',
      type: '',
      id: 1,
      username: 'yoga@user.com',
      firstName: '',
      lastName: '',
      admin: false
    };

    authService.login(loginRequest).subscribe((response: SessionInformation) => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpTestingController.expectOne('api/auth/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(loginRequest);
    req.flush(expectedResponse);
  });
});
