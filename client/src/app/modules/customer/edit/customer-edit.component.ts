import { AsyncPipe } from '@angular/common';
import { Component, OnInit, input, numberAttribute } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { CustomerEditResponse } from '@app/modules/customer/customer.model';
import { CustomerService } from '@app/modules/customer/customer.service';
import { AddressComponent } from '@app/modules/customer/edit/address/address.component';

@Component({
  selector: 'app-customer-edit',
  imports: [
    AddressComponent,
    AsyncPipe,
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatError,
    MatFormField,
    MatLabel,
    MatInput,
    ReactiveFormsModule
  ],
  templateUrl: './customer-edit.component.html',
  styleUrl: './customer-edit.component.scss'
})
export class CustomerEditComponent implements OnInit {
  readonly id = input.required({ transform: numberAttribute });
  readonly editForm = new FormGroup({
    name: new FormControl('', { nonNullable: true , validators: [Validators.required] }),
    phone: new FormControl('', { nonNullable: true , validators: [Validators.required] }),
    fax: new FormControl('', { nonNullable: true , validators: [Validators.required] }),
    postalAddress: new FormGroup({
      addressLine1: new FormControl('', { nonNullable: true , validators: [Validators.required] }),
      addressLine2: new FormControl(''),
      postalCode: new FormControl('', { nonNullable: true , validators: [Validators.required] }),
      city: new FormControl('', { nonNullable: true , validators: [Validators.required] })
    }),
    deliveryAddress: new FormGroup({
      addressLine1: new FormControl('', { nonNullable: true , validators: [Validators.required] }),
      addressLine2: new FormControl(''),
      postalCode: new FormControl('', { nonNullable: true , validators: [Validators.required] }),
      city: new FormControl('', { nonNullable: true , validators: [Validators.required] })
    })
  });

  customer$!: Observable<CustomerEditResponse>;

  constructor(private router: Router, private customerService: CustomerService) { }

  ngOnInit(): void {
    this.customer$ = this.customerService.getCustomer(this.id()).pipe(tap(c => this.editForm.patchValue(c)));
  }

  save(): void {
    if (this.editForm.invalid) {
      return;
    }

    const request = { ...this.editForm.value, id: this.id() } as CustomerEditResponse;
    this.customerService.update(request).subscribe();
  }

  cancel(): void {
    this.editForm.reset();
    this.router.navigateByUrl('/customers');
  }
}
