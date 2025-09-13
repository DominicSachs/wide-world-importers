import { HttpClient, HttpErrorResponse, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AUTHORIZE_INTERCEPTOR } from '@app/auth/auth-http-interceptor';
import { AuthService } from '@app/auth/auth.service';

describe('AUTHORIZE_INTERCEPTOR', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;
  let router: Router;

  beforeEach(() => {
    router = {
      navigate: () => vi.fn(),
      routerState: {
        snapshot: {}
      }
    }as unknown as Router;

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([AUTHORIZE_INTERCEPTOR])),
        provideHttpClientTesting(),
        { provide: Router, useValue: router }
      ]
    });

    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('redirects to login and call logout', fakeAsync(() => {
    vi.spyOn(router, 'navigate');
    vi.spyOn(authService, 'logout');

    const url = '/api';

    httpClient.get(url).subscribe();

    const request = httpTestingController.expectOne(url);
    request.flush('', { status: 401, statusText: 'Unauthorized' });
    tick(100);

    expect(authService.logout).toHaveBeenCalledWith(true);
    expect(router.navigate).toHaveBeenCalledWith(['/login'], { queryParams: { redirectUrl: undefined } });
  }));

  it('does not redirect to login and return error', fakeAsync(() => {
    vi.spyOn(router, 'navigate');
    let expectedError: HttpErrorResponse;
    const url = '/api';

    httpClient.get(url).subscribe({ next: () => vi.fn(), error: (err: HttpErrorResponse) => { expectedError = err; } });

    const request = httpTestingController.expectOne(url);
    request.flush('', { status: 400, statusText: 'BadRequest' });

    expect(expectedError!.status).toBe(400);
    expect(router.navigate).not.toHaveBeenCalled();
  }));

  it('returns 200', fakeAsync(() => {
    vi.spyOn(router, 'navigate');
    let expectedError: HttpErrorResponse;
    let expectedResult: object;
    const url = '/api';

    httpClient.get(url).subscribe({ next: v => expectedResult = v, error: (err: HttpErrorResponse) => { expectedError = err; } });

    const request = httpTestingController.expectOne(url);
    request.flush('Ok', { status: 200, statusText: 'Ok' });

    expect(expectedResult!.toString()).toBe('Ok');
    expect(expectedError!).toBeUndefined();
    expect(router.navigate).not.toHaveBeenCalled();
  }));
});
