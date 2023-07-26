import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { AuthSession } from 'app/state/auth/auth.feature';
import { User } from 'app/core/models/user/user.interface';
import { SignupCredentials } from 'app/core/models/auth/signup.interface';
import { LoginCredentials } from 'app/core/models/auth/login.interface';
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

    return this.httpClient.post<User>('/auth/signup', userData);
  }

  login(credentials: LoginCredentials): Observable<AuthSession> {
    return this.httpClient
      .post<AuthSession>('/auth/login', credentials)
      .pipe(tap((sessionData: AuthSession) => this.saveSession(sessionData)));
  }

  logout(): Observable<void> {
    return this.httpClient
      .post<void>('/auth/logout', {})
      .pipe(tap(() => this.clearSession()));
  }
}
