import { Component, Input, numberAttribute } from '@angular/core';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class OrderDetailComponent {
  @Input({ transform: numberAttribute })
  id = 0;
}
