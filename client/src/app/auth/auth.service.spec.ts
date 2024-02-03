import { HttpClient } from '@angular/common/http';
import { fakeAsync, tick } from '@angular/core/testing';
import { AuthStatus, DEFAULT_AUTH_STATUS } from '@app/auth/auth.models';
import { AuthService } from '@app/auth/auth.service';
import { CacheService } from '@app/shared/services/cache.service';
import { of } from 'rxjs';

describe('AuthService', () => {
  let sut: AuthService;
  let httpClient: HttpClient;
  let cacheService: CacheService;

  beforeEach(() => {
    httpClient = {
      get: () => of({})
    } as unknown as HttpClient;

    cacheService = {
      getItem: (_: string) => {},
      removeItem: () => {}
    } as unknown as CacheService;

    sut = new AuthService(httpClient, cacheService);
  });

  it('logout calls removeItem and resets the auth status to default', fakeAsync(() => {
    jest.spyOn(cacheService, 'removeItem');
    let status = {} as AuthStatus;

    sut.logout(true);
    sut.authStatus$.subscribe(s => status = s);
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
