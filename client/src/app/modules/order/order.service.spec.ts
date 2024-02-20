import { HttpClient } from '@angular/common/http';
import { fakeAsync } from '@angular/core/testing';
import { OrderListReponse } from '@app/modules/order/order.model';
import { OrderService } from '@app/modules/order/order.service';
import { DataFilter } from '@app/shared/models/data-filter.model';
import { PagedResponse } from '@app/shared/models/paged-response.model';
import { environment } from '@env/environment';
import { of } from 'rxjs';

describe('OrderService', () => {
  let httpClient: HttpClient;
  let sut: OrderService;

  beforeEach(() => {
    httpClient = {
      get: () => of({})
    } as unknown as HttpClient;

    sut = new OrderService(httpClient);
  });

  it('gets a list of Orders and sets the correct query string', fakeAsync(() => {
    const pagedResult = {
      items: [
        { id: 1, customerPurchaseOrderNumber: 'CPON 1' },
        { id: 2, customerPurchaseOrderNumber: 'CPON 2' }
      ],
      count: 2
    } as PagedResponse<OrderListReponse>;

    const filter = new DataFilter();
    filter.sortColumn = 'name';

    jest.spyOn(httpClient, 'get').mockReturnValue(of(pagedResult));

    let result = {} as PagedResponse<OrderListReponse>;
    sut.getOrders(filter).subscribe(s => result = s);

    expect(httpClient.get).toHaveBeenCalledWith(`${environment.apiUrl}/orders?page=0&pageSize=10&sortColumn=name&sortDirection=0`);
    expect(result.count).toBe(2);
  }));
});
