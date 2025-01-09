import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/auth.service';
import { of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const AUTHORIZE_INTERCEPTOR: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const authRequest = req = req.clone({ setHeaders: { authorization: `Bearer ${authService.getToken()}` } });

  return next(authRequest).pipe(
    catchError(err => {
      if (err.status === 401) {
        authService.logout(true);
        router.navigate(['/login'], { queryParams: { redirectUrl: router.routerState.snapshot.url } });

        return of(<HttpEvent<unknown>>{});
      }

      return throwError(() => err);
    })
  );
};
