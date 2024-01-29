import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  standalone: true,
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
  imports: [MatError, MatFormField, MatInput, MatLabel, ReactiveFormsModule]
})
export class AddressComponent {
  @Input()
  formGroup!: FormGroup;
}
