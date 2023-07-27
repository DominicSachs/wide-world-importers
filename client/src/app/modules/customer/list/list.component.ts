import { Component } from '@angular/core';
import { CustomerListReponse } from '@app/modules/customer/customer.model';
import { CustomerService } from '@app/modules/customer/customer.service';
import { BaseTableComponent } from '@app/shared/components/base/base-table.component';
import { DataFilter } from '@app/shared/models/data-filter.model';
import { PagedResponse } from '@app/shared/models/paged-response.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-customer-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
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
