import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable, map, of, tap } from 'rxjs';
import { Auth0JwtPayload, AuthResponse, AuthStatus, DEFAULT_AUTH_STATUS } from '@app/auth/auth.models';
import { CacheService } from '@app/shared/services/cache.service';
import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly authSignal = signal(this.getAuthStatusFromToken());
  readonly authStatus = this.authSignal.asReadonly();

  constructor(private readonly httpClient: HttpClient, private readonly cacheService: CacheService) { }

  login(email: string): Observable<void> {
    const loginResponse$ = this.httpClient.post<AuthResponse>(`${environment.apiUrl}/auth/login`, { email })
      .pipe(
        map(v => {
          this.setToken(v.accessToken);
          return this.getAuthStatusFromToken();
        }),
        tap(s => this.authSignal.set(s))
      );

    loginResponse$.subscribe();

    return of(void 0);
  }

  logout(clearToken?: boolean): void {
    if (clearToken) {
      this.clearToken();
    }

    setTimeout(() => this.authSignal.set(DEFAULT_AUTH_STATUS), 0);
  }

  getToken(): string {
    return this.cacheService.getItem('jwt') ?? '';
  }

  private clearToken(): void {
    this.cacheService.removeItem('jwt');
  }

  private setToken(jwt: string): void {
    this.cacheService.setItem('jwt', jwt);
  }

  private getAuthStatusFromToken(): AuthStatus {
    const token = this.getToken();

    if (!token) {
      return DEFAULT_AUTH_STATUS;
    }

    const decoded = jwtDecode<Auth0JwtPayload>(this.getToken());

    return {
      isAuthenticated: decoded.email ? true : false,
      userId: parseInt(decoded.sub!, 10)
    };
  }
}
