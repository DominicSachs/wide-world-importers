import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderListReponse } from '@app/modules/order/order.model';
import { DataFilter } from '@app/shared/models/data-filter.model';
import { PagedResponse } from '@app/shared/models/paged-response.model';
import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor(private httpClient: HttpClient) { }

  getOrders(filter: DataFilter, customerId?: number): Observable<PagedResponse<OrderListReponse>> {
    if (customerId) {
      return this.httpClient.get<PagedResponse<OrderListReponse>>(`${environment.apiUrl}/orders/${customerId}?${filter.toQueryString()}`);
    }

    return this.httpClient.get<PagedResponse<OrderListReponse>>(`${environment.apiUrl}/orders?${filter.toQueryString()}`);
  }
}
