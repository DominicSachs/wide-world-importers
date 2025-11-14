import { EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MockProvider } from 'ng-mocks';
import { firstValueFrom, of } from 'rxjs';
import { OrderListComponent } from '@app/modules/order/list/list.component';
import { OrderListReponse } from '@app/modules/order/order.model';
import { OrderService } from '@app/modules/order/order.service';
import { PagedResponse } from '@app/shared/models/paged-response.model';

describe('OrderListComponent', () => {
  let sut: OrderListComponent;
  let fixture: ComponentFixture<OrderListComponent>;
  let service: OrderService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        MockProvider(OrderService, { getOrders: () => of({ items: [], count: 0 }) })
      ]
    });

    service = TestBed.inject(OrderService);
    fixture = TestBed.createComponent(OrderListComponent);
    sut = fixture.componentInstance;
    fixture.detectChanges();
    vi.spyOn(sut, 'paginator').mockReturnValue({ page: new EventEmitter<PageEvent>() } as MatPaginator);
    vi.spyOn(sut, 'sort').mockReturnValue({ sortChange: new EventEmitter<Sort>() } as MatSort);
  });

  it('calls getOrders on ngAfterViewInit', async () => {
    const mockResult = { count: 1, items: [{ customerName:'test' }] } as PagedResponse<OrderListReponse>;
    vi.spyOn(service, 'getOrders').mockReturnValue(of(mockResult));

    sut.ngAfterViewInit();

    const response = await firstValueFrom(sut.data$);
    expect(response).toStrictEqual(mockResult);
    expect(service.getOrders).toHaveBeenCalledTimes(1);
  });
});
