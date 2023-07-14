import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

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

  restoreSession(): Observable<AuthSession | undefined> {
    return of(
      this.localStorageService.getItem('auth', ['expiresAt']) || undefined
    );
  }

  saveSession(sessionData: AuthSession): Observable<void> {
    return of(this.localStorageService.setItem('auth', sessionData));
  }

  clearSession(): Observable<void> {
    return of(this.localStorageService.removeItem('auth'));
  }

  signup(credentials: SignupCredentials): Observable<User> {
    throw new Error('Method not implemented!');
  }

  login(credentials: LoginCredentials): Observable<AuthSession> {
    throw new Error('Method not implemented!');
    return of(undefined as unknown as AuthSession).pipe(
      tap((sessionData: AuthSession) => this.saveSession(sessionData))
    );
  }

  logout(): Observable<void> {
    throw new Error('Method not implemented!');
    return of(undefined).pipe(tap(() => this.clearSession()));
  }
}
