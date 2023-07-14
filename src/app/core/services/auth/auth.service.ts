import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

import { AuthSession } from 'app/state/auth/auth.slice';
import { User } from 'app/core/models/user/user.model';
import { SignupCredentials } from 'app/core/models/auth/signup.model';
import { LoginCredentials } from 'app/core/models/auth/login.model';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { UserRole } from 'app/core/models/user/user-role.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  restoreSession(): AuthSession | undefined {
    return this.localStorageService.getItem('auth', ['expiresAt']) || undefined;
  }

  saveSession(sessionData: AuthSession): void {
    this.localStorageService.setItem('auth', sessionData);
  }

  clearSession(): void {
    this.localStorageService.removeItem('auth');
  }

  signup(credentials: SignupCredentials): Observable<User> {
    // TODO: implement HTTP call
    return of({
      id: '1',
      name: credentials.userName,
      role: credentials.role,
    });
  }

  login(credentials: LoginCredentials): Observable<AuthSession> {
    // TODO: implement HTTP call
    return of({
      user: {
        id: '1',
        name: credentials.userName,
        role: UserRole.User,
      },
      token: 'AaBbCcDdEeFf12345678',
      expiresAt: new Date(),
    }).pipe(tap((sessionData: AuthSession) => this.saveSession(sessionData)));
  }

  logout(): Observable<void> {
    // TODO: implement HTTP call
    return of(undefined).pipe(tap(() => this.clearSession()));
  }
}
