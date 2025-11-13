import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
    selector: 'app-address',
    imports: [MatError, MatFormField, MatInput, MatLabel, ReactiveFormsModule],
    templateUrl: './address.component.html',
    styleUrl: './address.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
  })
export class AddressComponent {
  readonly formGroup = input.required<FormGroup>();
}
