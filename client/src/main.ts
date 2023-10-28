import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from '@app/app.component';
import { APP_CONFIG } from '@app/app.config';

// eslint-disable-next-line no-console
bootstrapApplication(AppComponent, APP_CONFIG).catch(err => console.error(err));
