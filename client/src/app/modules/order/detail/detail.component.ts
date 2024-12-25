import { Component, input, numberAttribute } from '@angular/core';

@Component({
    selector: 'app-detail',
    imports: [],
    templateUrl: './detail.component.html',
    styleUrl: './detail.component.scss'
})
export class OrderDetailComponent {
  readonly id = input.required({ transform: numberAttribute });
}
