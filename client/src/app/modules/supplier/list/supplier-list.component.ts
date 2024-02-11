import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MAT_TABLE } from '@app/import-groups';
import { SupplierListReponse } from '@app/modules/supplier/supplier.model';
import { SupplierService } from '@app/modules/supplier/supplier.service';
import { BaseTableComponent } from '@app/shared/components/base/base-table.component';
import { TableQueryStringDirective } from '@app/shared/directives/table-query-string.directive';
import { DataFilter } from '@app/shared/models/data-filter.model';
import { PagedResponse } from '@app/shared/models/paged-response.model';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.scss'],
  imports: [AsyncPipe, MatIcon, ...MAT_TABLE, RouterLink, TableQueryStringDirective],
  providers: [SupplierService]
})
export class SupplierListComponent extends BaseTableComponent<SupplierListReponse> {
  displayedColumns = ['name', 'category', 'phone', 'fax', 'actions'];

  constructor(private supplierService: SupplierService) {
    super();
    this.dataFilter.pageSize = 20;
  }

  protected override loadData(filter: DataFilter): Observable<PagedResponse<SupplierListReponse>> {
    return this.supplierService.getSuppliers(filter);
  }
}
