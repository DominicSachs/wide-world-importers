import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { MAT_TABLE } from '@app/import-groups';
import { CustomerListReponse } from '@app/modules/customer/customer.model';
import { CustomerService } from '@app/modules/customer/customer.service';
import { BaseTableComponent } from '@app/shared/components/base/base-table.component';
import { DataFilter } from '@app/shared/models/data-filter.model';
import { PagedResponse } from '@app/shared/models/paged-response.model';

@Component({
  selector: 'app-customer-list',
  imports: [AsyncPipe, MatIcon, ...MAT_TABLE, RouterLink],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss'
})
export class CustomerListComponent extends BaseTableComponent<CustomerListReponse> {
  readonly displayedColumns = ['name', 'postalAddress', 'deliveryAddress', 'actions'];

  constructor(private customerService: CustomerService) {
    super();
  }

  protected override loadData(filter: DataFilter): Observable<PagedResponse<CustomerListReponse>> {
    return this.customerService.getCustomers(filter);
  }
}
