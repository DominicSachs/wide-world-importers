import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderListReponse } from '@app/modules/order/order.model';
import { DataFilter } from '@app/shared/models/data-filter.model';
import { PagedResponse } from '@app/shared/models/paged-response.model';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable()
export class OrderService {
  constructor(private httpClient: HttpClient) { }

  getOrders(filter: DataFilter): Observable<PagedResponse<OrderListReponse>> {
    return this.httpClient.get<PagedResponse<OrderListReponse>>(`${environment.apiUrl}/orders?${filter.toQueryString()}`);
  }
}
