import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { CustomerListReponse } from '@app/modules/customer/customer.model';
import { CustomerService } from '@app/modules/customer/customer.service';
import { BaseTableComponent } from '@app/shared/components/base/base-table.component';
import { DataFilter } from '@app/shared/models/data-filter.model';
import { PagedResponse } from '@app/shared/models/paged-response.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [AsyncPipe, MatIconModule, MatPaginatorModule, MatSortModule, MatTableModule, RouterLink],
  providers: [CustomerService],
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
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
