import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth0JwtPayload, AuthResponse, AuthStatus, DEFAULT_AUTH_STATUS } from '@app/auth/auth.models';
import { CacheService } from '@app/shared/services/cache.service';
import { environment } from '@env/environment';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable, map, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService extends CacheService {
  readonly authStatus$ = new BehaviorSubject<AuthStatus>(DEFAULT_AUTH_STATUS);
  // readonly currentUser$ = new BehaviorSubject<IUser>(new User())

  constructor(private readonly httpClient: HttpClient) {
    super();
  }

  login(email: string): Observable<void> {
    const loginResponse$ = this.httpClient.post<AuthResponse>(`${environment.apiUrl}/auth/login`, { email })
      .pipe(
        map(v => {
          this.setToken(v.accessToken);
          return this.getAuthStatusFromToken();
        }),
        tap(s => this.authStatus$.next(s))
      );

    loginResponse$.subscribe();

    return of(void 0);
  }

  logout(clearToken?: boolean): void {
    if (clearToken) {
      this.clearToken();
    }

    setTimeout(() => this.authStatus$.next(DEFAULT_AUTH_STATUS), 0);
  }

  getToken(): string {
    return this.getItem('jwt') ?? '';
  }

  private clearToken(): void {
    this.removeItem('jwt');
  }

  private setToken(jwt: string): void {
    this.setItem('jwt', jwt);
  }

  private getAuthStatusFromToken(): AuthStatus {
    const token = jwtDecode<Auth0JwtPayload>(this.getToken());

    if (!token) {
      return DEFAULT_AUTH_STATUS;
    }

    return {
      isAuthenticated: token.email ? true : false,
      userId: parseInt(token.sub!, 10)
    };
  }
}
