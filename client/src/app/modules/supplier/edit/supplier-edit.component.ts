import { AsyncPipe } from '@angular/common';
import { Component, input, numberAttribute, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatOption } from '@angular/material/core';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { Observable, tap } from 'rxjs';
import { SupplierEditReponse } from '@app/modules/supplier/supplier.model';
import { SupplierService } from '@app/modules/supplier/supplier.service';
import { KeyValueItem } from '@app/shared/models/key-value-item.model';

@Component({
  selector: 'app-edit',
  templateUrl: './supplier-edit.component.html',
  styleUrl: './supplier-edit.component.scss',
  imports: [
    AsyncPipe,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatError,
    MatFormField,
    MatLabel,
    MatInput,
    MatOption,
    MatSelect,
    ReactiveFormsModule
  ]
})
export class SupplierEditComponent implements OnInit {
  readonly id = input.required({ transform: numberAttribute });
  readonly editForm = new FormGroup({
    name: new FormControl('', { nonNullable: true , validators: [Validators.required] }),
    categoryId: new FormControl(0, { nonNullable: true , validators: [Validators.required] }),
    phone: new FormControl('', { nonNullable: true , validators: [Validators.required] }),
    fax: new FormControl('', { nonNullable: true , validators: [Validators.required] }),
    websiteUrl: new FormControl('', { nonNullable: true , validators: [Validators.required] }),
    reference: new FormControl<string | undefined>(undefined),
    deliveryMethodId: new FormControl<number | undefined>(undefined),
    comments: new FormControl<string | undefined>(undefined)
  });
  supplier$!: Observable<SupplierEditReponse>;
  categories$!: Observable<KeyValueItem<number, string>[]>;
  deliveryMethods$!: Observable<KeyValueItem<number, string>[]>;

  constructor(private supplierService: SupplierService) { }

  ngOnInit(): void {
    this.categories$ = this.supplierService.getCategories();
    this.deliveryMethods$ = this.supplierService.getDeliveryMethods();
    this.supplier$ = this.supplierService.getSupplier(this.id()).pipe(tap(s => this.editForm.patchValue(s)));
  }
}
