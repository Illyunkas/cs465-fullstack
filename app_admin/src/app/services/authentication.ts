import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponse } from '../models/auth-response';
import { User } from '../models/user';
import { BROWSER_STORAGE } from '../storage';

@Injectable({ providedIn: 'root' })
export class Authentication {
  private readonly tokenKey = 'travlr-token';
  readonly loggedIn = signal(false);

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage,
  ) {
    this.loggedIn.set(this.hasValidToken());
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('/api/login', { email, password });
  }

  register(user: User, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('/api/register', { ...user, password });
  }

  getToken(): string {
    return this.storage.getItem(this.tokenKey) ?? '';
  }

  saveToken(token: string): void {
    this.storage.setItem(this.tokenKey, token);
    this.loggedIn.set(this.hasValidToken());
  }

  logout(): void {
    this.storage.removeItem(this.tokenKey);
    this.loggedIn.set(false);
  }

  isLoggedIn(): boolean {
    return this.loggedIn() && this.hasValidToken();
  }

  private hasValidToken(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return typeof payload.exp === 'number' && payload.exp > Date.now() / 1000;
    } catch {
      this.logout();
      return false;
    }
  }
}