import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { OrderListComponent } from '@app/modules/order/list/list.component';
import { OrderListReponse } from '@app/modules/order/order.model';
import { OrderService } from '@app/modules/order/order.service';
import { PagedResponse } from '@app/shared/models/paged-response.model';
import { firstValueFrom, of } from 'rxjs';

describe('OrderListComponent', () => {
  let sut: OrderListComponent;
  let fixture: ComponentFixture<OrderListComponent>;
  let service: OrderService;

  beforeEach(async () => {
    service = {
      getOrders: () => of({})
    } as unknown as OrderService;

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NoopAnimationsModule]
    })
    .overrideComponent(OrderListComponent, {
      add: {
        providers: [{ provide: OrderService, useValue: service }]
      },
      remove: {
        providers: [OrderService]
      }
    });

    fixture = TestBed.createComponent(OrderListComponent);
    sut = fixture.componentInstance;
    sut.paginator = {} as unknown as MatPaginator;
    sut.sort = {} as unknown as MatSort;
  });

  it('calls getOrders on ngAfterViewInit', fakeAsync(async () => {
    const mockResult = { count: 1, items: [{ customerName:'test' }] } as PagedResponse<OrderListReponse>;
    jest.spyOn(service, 'getOrders').mockReturnValue(of(mockResult));

    sut.ngAfterViewInit();
    tick(1);

    const response = await firstValueFrom(sut.data$);
    expect(response).toStrictEqual(mockResult);
    expect(service.getOrders).toHaveBeenCalledTimes(1);
  }));
});
