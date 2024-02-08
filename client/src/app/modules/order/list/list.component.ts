import { AsyncPipe, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MAT_TABLE } from '@app/import-groups';
import { OrderListReponse } from '@app/modules/order/order.model';
import { OrderService } from '@app/modules/order/order.service';
import { BaseTableComponent } from '@app/shared/components/base/base-table.component';
import { DataFilter } from '@app/shared/models/data-filter.model';
import { PagedResponse } from '@app/shared/models/paged-response.model';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-order-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  imports: [AsyncPipe, DatePipe, MatIcon, ...MAT_TABLE, RouterLink],
  providers: [OrderService]
})
export class OrderListComponent extends BaseTableComponent<OrderListReponse> {
  displayedColumns = ['customerPurchaseOrderNumber', 'orderedOn', 'expectedDeliveryOn', 'customerName', 'contactName', 'lastEditedByName', 'lastEditedAt', 'actions'];

  constructor(private orderService: OrderService) {
    super('orderedOn', 'desc', 10);
  }

  protected override loadData(filter: DataFilter): Observable<PagedResponse<OrderListReponse>> {
    return this.orderService.getOrders(filter);
  }
}

