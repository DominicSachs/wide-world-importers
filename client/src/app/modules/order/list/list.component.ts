import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { MAT_TABLE } from '@app/import-groups';
import { OrderListReponse } from '@app/modules/order/order.model';
import { OrderService } from '@app/modules/order/order.service';
import { BaseTableComponent } from '@app/shared/components/base/base-table.component';
import { DataFilter } from '@app/shared/models/data-filter.model';
import { PagedResponse } from '@app/shared/models/paged-response.model';

@Component({
  selector: 'app-order-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  imports: [AsyncPipe, DatePipe, MatIcon, ...MAT_TABLE, RouterLink]
})
export class OrderListComponent extends BaseTableComponent<OrderListReponse> {
  readonly id = input<number>();
  displayedColumns = ['customerPurchaseOrderNumber', 'orderedOn', 'expectedDeliveryOn', 'customerName', 'contactName', 'lastEditedByName', 'lastEditedAt', 'actions'];

  constructor(private orderService: OrderService) {
    super();
  }

  protected override loadData(filter: DataFilter): Observable<PagedResponse<OrderListReponse>> {
    return this.orderService.getOrders(filter, this.id());
  }
}
