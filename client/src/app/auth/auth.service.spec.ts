import { HttpClient } from '@angular/common/http';
import { fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { AuthResponse, AuthStatus, DEFAULT_AUTH_STATUS } from '@app/auth/auth.models';
import { AuthService } from '@app/auth/auth.service';
import { CacheService } from '@app/shared/services/cache.service';

describe('AuthService', () => {
  let sut: AuthService;
  let httpClient: HttpClient;
  let cacheService: CacheService;

  beforeEach(() => {
    httpClient = {
      get: () => of({}),
      post: () => of({})
    } as unknown as HttpClient;

    cacheService = {
      getItem: (_: string) => null,
      setItem: (_key: string, _value: string) => jest.fn(),
      removeItem: () => jest.fn()
    } as unknown as CacheService;

    sut = new AuthService(httpClient, cacheService);
  });

  it('login sets the token and publishes the auth status from the valid token', fakeAsync(async() => {
    const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDg0MDAxNDUsInN1YiI6IjEiLCJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20ifQ.VTY80IwT9x-z6H7m6RE-_GGOjPnmkjUhl-4wPMrmjTQ';
    jest.spyOn(httpClient, 'post').mockReturnValue(of({ accessToken: jwt } as AuthResponse));
    jest.spyOn(cacheService, 'setItem');
    jest.spyOn(cacheService, 'getItem').mockReturnValue(jwt);

    sut.login('test@example.com');
    const status: AuthStatus = sut.authStatus();

    expect(status.isAuthenticated).toBeTruthy();
    expect(status.userId).toBe(1);
    expect(cacheService.setItem).toHaveBeenCalledWith('jwt', jwt);
  }));

  it('login sets the token and publishes the default auth status because of the empty token', async() => {
    const token = '';
    jest.spyOn(httpClient, 'post').mockReturnValue(of({ accessToken: token } as AuthResponse));
    jest.spyOn(cacheService, 'setItem');
    jest.spyOn(cacheService, 'getItem').mockReturnValue(token);

    sut.login('test@example.com');
    const status: AuthStatus = sut.authStatus();

    expect(status).toBe(DEFAULT_AUTH_STATUS);
    expect(cacheService.setItem).toHaveBeenCalledWith('jwt', token);
  });

  it('logout calls removeItem and resets the auth status to default', fakeAsync(() => {
    jest.spyOn(cacheService, 'removeItem');
    let status = {} as AuthStatus;

    sut.logout(true);
    status = sut.authStatus();
    tick(50);

    expect(cacheService.removeItem).toHaveBeenCalledWith('jwt');
    expect(status).toBe(DEFAULT_AUTH_STATUS);
  }));

  it('logout does not call removeItem', () => {
    jest.spyOn(cacheService, 'removeItem');

    sut.logout(false);

    expect(cacheService.removeItem).not.toHaveBeenCalled();
  });

  it('getToken returns token from cache', () => {
    jest.spyOn(cacheService, 'getItem').mockReturnValue('token-value');

    const token = sut.getToken();

    expect(token).toBe('token-value');
    expect(cacheService.getItem).toHaveBeenCalledWith('jwt');
  });

  it('getToken returns empty string if cache is empty', () => {
    jest.spyOn(cacheService, 'getItem').mockReturnValue(null);

    const token = sut.getToken();

    expect(token).toBe('');
  });
});
