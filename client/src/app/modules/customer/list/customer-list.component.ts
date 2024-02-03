import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MAT_TABLE } from '@app/import-groups';
import { CustomerListReponse } from '@app/modules/customer/customer.model';
import { CustomerService } from '@app/modules/customer/customer.service';
import { BaseTableComponent } from '@app/shared/components/base/base-table.component';
import { DataFilter } from '@app/shared/models/data-filter.model';
import { PagedResponse } from '@app/shared/models/paged-response.model';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
  imports: [AsyncPipe, MatIcon, ...MAT_TABLE, RouterLink],
  providers: [CustomerService]
  })
export class CustomerListComponent extends BaseTableComponent<CustomerListReponse> {
  displayedColumns = ['name', 'postalAddress', 'deliveryAddress', 'actions'];

  constructor(private customerService: CustomerService) {
    super('name', 'asc', 10);
  }

  protected override loadData(filter: DataFilter): Observable<PagedResponse<CustomerListReponse>> {
    return this.customerService.getCustomers(filter);
  }
}
