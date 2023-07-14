import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthSession } from 'app/state/auth/auth.slice';
import { User } from 'app/core/models/user/user.model';
import { SignupCredentials } from 'app/core/models/auth/signup.model';
import { LoginCredentials } from 'app/core/models/auth/login.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  getSession(): Observable<AuthSession | undefined> {
    throw new Error('Method not implemented!');
  }

  signup(credentials: SignupCredentials): Observable<User> {
    throw new Error('Method not implemented!');
  }

  login(credentials: LoginCredentials): Observable<AuthSession> {
    throw new Error('Method not implemented!');
  }

  logout(): Observable<void> {
    throw new Error('Method not implemented!');
  }
}
