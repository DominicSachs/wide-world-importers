import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { MAT_PAGINATOR_DEFAULT_OPTIONS } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { APP_ROUTES } from '@app/app.routes';

export const APP_CONFIG: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(APP_ROUTES, withComponentInputBinding()),
    importProvidersFrom(BrowserAnimationsModule),
    { provide: MAT_PAGINATOR_DEFAULT_OPTIONS, useValue: { showFirstLastButtons: true, pageSize: 10, pageSizeOptions: [5, 10, 25, 50] } }
  ]
};
