import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { AuthService } from './auth.service';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { AuthSession } from 'app/state/auth/auth.feature';
import { UserRole } from 'app/core/models/user/user-role.model';
import { SignupCredentials } from 'app/core/models/auth/signup.model';
import { User } from 'app/core/models/user/user.model';
import { LoginCredentials } from 'app/core/models/auth/login.model';

describe('AuthService', () => {
  let authService: AuthService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  const spyOnLocalStorageGetItem = jest.spyOn(
    LocalStorageService.prototype,
    'getItem'
  );
  const spyOnLocalStorageSetItem = jest.spyOn(
    LocalStorageService.prototype,
    'setItem'
  );
  const spyOnLocalStorageRemoveItem = jest.spyOn(
    LocalStorageService.prototype,
    'removeItem'
  );

  const mockUser: User = {
    id: '1',
    name: 'John Doe',
    role: UserRole.User,
  };

  const mockAuthSession: AuthSession = {
    user: mockUser,
    token: '001@1234567890',
    expiresAt: new Date(),
  };

  beforeEach(() => {
    jest.resetAllMocks();

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    authService = TestBed.inject(AuthService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  describe('restoreSession() method', () => {
    it('should call getItem() method of the LocalStorageService with the correct arguments', () => {
      authService.restoreSession();
      expect(spyOnLocalStorageGetItem).toHaveBeenCalledTimes(1);
      expect(spyOnLocalStorageGetItem).toHaveBeenCalledWith('auth', [
        'expiresAt',
      ]);
    });

    it('given LocalStorageService#getItem() returns a truthy value, should return it unchanged', () => {
      spyOnLocalStorageGetItem.mockReturnValue(mockAuthSession);
      expect(authService.restoreSession()).toEqual(mockAuthSession);
    });

    it('given LocalStorageService#getItem() returns a falsy value, should return it unchanged', () => {
      spyOnLocalStorageGetItem.mockReturnValue(undefined);
      expect(authService.restoreSession()).toBe(undefined);
    });
  });

  describe('saveSession() method', () => {
    it('should call setItem() method of the LocalStorageService with the correct arguments', () => {
      authService.saveSession(mockAuthSession);
      expect(spyOnLocalStorageSetItem).toHaveBeenCalledTimes(1);
      expect(spyOnLocalStorageSetItem).toHaveBeenCalledWith(
        'auth',
        mockAuthSession
      );
    });

    it('should return undefined', () => {
      expect(authService.saveSession(mockAuthSession)).toBe(undefined);
    });
  });

  describe('clearSession() method', () => {
    it('should call removeItem() method of the LocalStorageService with the correct arguments', () => {
      authService.clearSession();
      expect(spyOnLocalStorageRemoveItem).toHaveBeenCalledTimes(1);
      expect(spyOnLocalStorageRemoveItem).toHaveBeenCalledWith('auth');
    });

    it('should return undefined', () => {
      expect(authService.clearSession()).toBe(undefined);
    });
  });

  describe('signup() method', () => {
    const credentials: SignupCredentials = {
      userName: mockUser.name,
      email: 'john.doe@google.com',
      role: mockUser.role,
      password: '12345',
      passwordConfirm: '12345',
    };

    const signupEndpointUrl = '/auth/signup';

    it('should make a proper HTTP request', () => {
      authService
        .signup(credentials)
        .subscribe((response) => expect(response).toEqual(mockUser));

      const req = httpTestingController.expectOne(signupEndpointUrl);

      req.flush(mockUser);
    });

    it('should not send password confirmation to the backend', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { passwordConfirm: _, ...userData } = credentials;
      const spyOnHttpClientPost = jest.spyOn(httpClient, 'post');

      authService.signup(credentials).subscribe();

      const req = httpTestingController.expectOne(signupEndpointUrl);
      req.flush(mockUser);

      expect(spyOnHttpClientPost).toHaveBeenCalledWith(
        signupEndpointUrl,
        userData
      );
    });
  });

  describe('login() method', () => {
    const credentials: LoginCredentials = {
      userName: mockUser.name,
      password: '12345',
    };

    const loginEndpointUrl = '/auth/login';

    it('should make a proper HTTP request', () => {
      authService
        .login(credentials)
        .subscribe((response) => expect(response).toEqual(mockAuthSession));

      const req = httpTestingController.expectOne(loginEndpointUrl);

      req.flush(mockAuthSession);
    });

    it('upon successful login, should save session to local storage', () => {
      const spyOnSaveSession = jest.spyOn(authService, 'saveSession');

      authService.login(credentials).subscribe(() => {
        expect(spyOnSaveSession).toHaveBeenCalledTimes(1);
        expect(spyOnSaveSession).toHaveBeenCalledWith(mockAuthSession);
      });

      const req = httpTestingController.expectOne(loginEndpointUrl);
      req.flush(mockAuthSession);
    });
  });

  describe('logout() method', () => {
    const logoutEndpointUrl = '/auth/logout';

    it('should make a proper HTTP request', () => {
      authService.logout().subscribe((response) => expect(response).toBe(null));

      const req = httpTestingController.expectOne(logoutEndpointUrl);

      req.flush(null);
    });

    it('upon successful logout, should clear session from local storage', () => {
      const spyOnClearSession = jest.spyOn(authService, 'clearSession');

      authService.logout().subscribe(() => {
        expect(spyOnClearSession).toHaveBeenCalledTimes(1);
      });

      const req = httpTestingController.expectOne(logoutEndpointUrl);
      req.flush(null);
    });
  });
});
