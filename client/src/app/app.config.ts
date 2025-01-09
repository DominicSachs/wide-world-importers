import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { MAT_PAGINATOR_DEFAULT_OPTIONS } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { APP_ROUTES } from '@app/app.routes';
import { AUTHORIZE_INTERCEPTOR } from '@app/auth/auth-http-interceptor';
import { REQUEST_CACHE_INTERCEPTOR } from '@app/shared/interceptors/caching.interceptor';

export const APP_CONFIG: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([AUTHORIZE_INTERCEPTOR, REQUEST_CACHE_INTERCEPTOR])),
    provideRouter(APP_ROUTES, withComponentInputBinding()),
    importProvidersFrom(BrowserAnimationsModule),
    { provide: MAT_PAGINATOR_DEFAULT_OPTIONS, useValue: { showFirstLastButtons: true, pageSize: 10, pageSizeOptions: [5, 10, 25, 50] } }
  ]
};
