import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { SupplierListReponse } from '@app/modules/supplier/supplier.model';
import { SupplierService } from '@app/modules/supplier/supplier.service';
import { BaseTableComponent } from '@app/shared/components/base/base-table.component';
import { DataFilter } from '@app/shared/models/data-filter.model';
import { PagedResponse } from '@app/shared/models/paged-response.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-supplier-list',
  standalone: true,
  imports: [AsyncPipe, MatIconModule, MatPaginatorModule, MatSortModule, MatTableModule, NgIf, RouterLink],
  providers: [SupplierService],
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.scss']
})
export class SupplierListComponent extends BaseTableComponent<SupplierListReponse> {
  displayedColumns = ['name', 'category', 'phone', 'fax', 'actions'];

  constructor(private supplierService: SupplierService) {
    super('name', 'asc', 20);
  }

  protected override loadData(filter: DataFilter): Observable<PagedResponse<SupplierListReponse>> {
    return this.supplierService.getSuppliers(filter);
  }
}
