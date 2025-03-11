
import { HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CACHE_HEADER } from '@app/app.constants';
import { RequestCache } from '@app/shared/services/request-cache.service';

export const REQUEST_CACHE_INTERCEPTOR: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const cache = inject(RequestCache);

  if (req.method !== 'GET' || !req.headers.has(CACHE_HEADER)) {
    return next(req);
  }

  const cachedResponse = cache.get(req);
  if (cachedResponse) {
    return of(cachedResponse);
  }

  const headers = req.headers.delete(CACHE_HEADER);
  const requestWithoutCacheHeader = req.clone({ headers: headers });

  return next(requestWithoutCacheHeader).pipe(
    tap(event => {
      if (event instanceof HttpResponse) {
        cache.put(req, event);
      }
    })
  );
};
