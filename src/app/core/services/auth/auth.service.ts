import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { AuthSession } from 'app/state/auth/auth.slice';
import { User } from 'app/core/models/user/user.model';
import { SignupCredentials } from 'app/core/models/auth/signup.model';
import { LoginCredentials } from 'app/core/models/auth/login.model';
import { LocalStorageService } from '../local-storage/local-storage.service';

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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordConfirm: _, ...userData } = credentials;

    return this.httpClient.post<User>(
      'http://localhost:3000/api/auth/signup',
      userData
    );
  }

  login(credentials: LoginCredentials): Observable<AuthSession> {
    return this.httpClient
      .post<AuthSession>('http://localhost:3000/api/auth/login', credentials)
      .pipe(tap((sessionData: AuthSession) => this.saveSession(sessionData)));
  }

  logout(): Observable<void> {
    return this.httpClient
      .post<void>('http://localhost:3000/api/auth/logout', {})
      .pipe(tap(() => this.clearSession()));
  }
}
