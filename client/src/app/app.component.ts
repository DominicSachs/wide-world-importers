import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContentLayoutComponent } from '@app/layout/content-layout/content-layout.component';

@Component({
    selector: 'app-root',
    imports: [ContentLayoutComponent],
    template: '<app-content-layout></app-content-layout>',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {}
