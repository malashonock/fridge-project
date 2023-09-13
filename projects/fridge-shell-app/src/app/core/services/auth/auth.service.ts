import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize, tap } from 'rxjs';

import { AuthSession } from '@shell/store/auth/auth.feature';
import { User } from '@shell/core/models/user/user.interface';
import { SignupCredentials } from '@shell/core/models/auth/signup.interface';
import { LoginCredentials } from '@shell/core/models/auth/login.interface';
import { LocalStorageService } from '@shell/core/services/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  public restoreSession(): AuthSession | undefined {
    return this.localStorageService.getItem('auth', ['expiresAt']) || undefined;
  }

  public saveSession(sessionData: AuthSession): void {
    this.localStorageService.setItem('auth', sessionData);
  }

  public clearSession(): void {
    this.localStorageService.removeItem('auth');
  }

  public signup(credentials: SignupCredentials): Observable<User> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordConfirm: _, ...userData } = credentials;

    return this.httpClient.post<User>('/auth/signup', userData);
  }

  public login(credentials: LoginCredentials): Observable<AuthSession> {
    return this.httpClient
      .post<AuthSession>('/auth/login', credentials)
      .pipe(tap((sessionData: AuthSession) => this.saveSession(sessionData)));
  }

  public logout(): Observable<void> {
    return this.httpClient
      .post<void>('/auth/logout', {})
      .pipe(finalize(() => this.clearSession()));
  }
}
