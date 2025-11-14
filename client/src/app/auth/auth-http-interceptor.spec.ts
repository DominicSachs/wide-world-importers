import { HttpClient, HttpErrorResponse, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MockProvider } from 'ng-mocks';
import { AUTHORIZE_INTERCEPTOR } from '@app/auth/auth-http-interceptor';
import { AuthService } from '@app/auth/auth.service';

describe('AUTHORIZE_INTERCEPTOR (Angular TestBed)', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([AUTHORIZE_INTERCEPTOR])),
        provideHttpClientTesting(),
        MockProvider(AuthService, { getToken: vi.fn(), logout: vi.fn() }),
        MockProvider(Router, { navigate: () => vi.fn(), routerState: { snapshot: { url: '/current' } } } as unknown as Router)
      ]
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('adds authorization header', () => {
    authService.getToken.mockReturnValue('mock-token');

    http.get('/api/test').subscribe();

    const req = httpMock.expectOne('/api/test');
    expect(req.request.headers.get('authorization')).toBe('Bearer mock-token');
    req.flush({ ok: true });
  });

  it('calls logout and navigate on 401 error', () => {
    vi.spyOn(authService, 'getToken').mockReturnValue('expired-token');
    vi.spyOn(authService, 'logout');
    vi.spyOn(router, 'navigate');

    http.get('/api/protected').subscribe({
      next: res => {
        expect(res).toEqual({});
      }
    });

    const req = httpMock.expectOne('/api/protected');
    req.flush({}, { status: 401, statusText: 'Unauthorized' });

    expect(authService.logout).toHaveBeenCalledWith(true);
    expect(router.navigate).toHaveBeenCalledWith(['/login'], {
      queryParams: { redirectUrl: '/current' }
    });
  });

  it('rethrows non-401 errors', () => {
    vi.spyOn(authService, 'getToken').mockReturnValue('valid-token');
    vi.spyOn(authService, 'logout');
    vi.spyOn(router, 'navigate');

    let caughtError: HttpErrorResponse | null = null;

    http.get('/api/fail').subscribe({
      error: err => caughtError = err
    });

    const req = httpMock.expectOne('/api/fail');
    req.flush('Server error', { status: 500, statusText: 'Server Error' });

    expect(authService.logout).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
    expect(caughtError!.status).toBe(500);
  });
});
