import { Component, Input, OnInit, numberAttribute } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerEditResponse } from '@app/modules/customer/customer.model';
import { CustomerService } from '@app/modules/customer/customer.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent implements OnInit {
  editForm: FormGroup;
  customer$!: Observable<CustomerEditResponse>;

  @Input({ transform: numberAttribute })
  id = 0;

  constructor(private fb: UntypedFormBuilder, private router: Router, private customerService: CustomerService) {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      fax: ['', Validators.required],
      postalAddress: fb.group({
        addressLine1: ['', Validators.required],
        addressLine2: [''],
        postalCode: ['', Validators.required],
        city: ['', Validators.required]
      }),
      deliveryAddress: fb.group({
        addressLine1: ['', Validators.required],
        addressLine2: [''],
        postalCode: ['', Validators.required],
        city: ['', Validators.required]
      })
    });
  }

  ngOnInit(): void {
    this.customer$ = this.customerService.getCustomer(this.id).pipe(tap(c => this.editForm.patchValue(c)));
  }

  save(): void {
    if (this.editForm.invalid) {
      return;
    }

    const request = { ...this.editForm.value, id: this.id } as CustomerEditResponse;
    this.customerService.update(request).subscribe();
  }

  cancel(): void {
    this.editForm.reset();
    this.router.navigateByUrl('/customers');
  }
}
