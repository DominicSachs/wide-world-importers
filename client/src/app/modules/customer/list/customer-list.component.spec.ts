import { EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MockProvider } from 'ng-mocks';
import { firstValueFrom, of } from 'rxjs';
import { CustomerListReponse } from '@app/modules/customer/customer.model';
import { CustomerService } from '@app/modules/customer/customer.service';
import { CustomerListComponent } from '@app/modules/customer/list/customer-list.component';
import { PagedResponse } from '@app/shared/models/paged-response.model';

describe('CustomerListComponent', () => {
  let sut: CustomerListComponent;
  let fixture: ComponentFixture<CustomerListComponent>;
  let service: CustomerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [MockProvider(CustomerService, { getCustomers: () => of({}) } as unknown as CustomerService)]
    })
    .compileComponents();

    service = TestBed.inject(CustomerService);
    fixture = TestBed.createComponent(CustomerListComponent);
    sut = fixture.componentInstance;
    vi.spyOn(sut, 'paginator').mockReturnValue({ page: new EventEmitter<PageEvent>() } as MatPaginator);
    vi.spyOn(sut, 'sort').mockReturnValue({ sortChange: new EventEmitter<Sort>() } as MatSort);
  });

  it('calls getCustomers on ngAfterViewInit', fakeAsync(async () => {
    const mockResult = { count: 1, items: [{ name:'test' }] } as PagedResponse<CustomerListReponse>;
    vi.spyOn(service, 'getCustomers').mockReturnValue(of(mockResult));

    sut.ngAfterViewInit();
    tick(1);

    const response = await firstValueFrom(sut.data$);
    expect(response).toStrictEqual(mockResult);
    expect(service.getCustomers).toHaveBeenCalledTimes(1);
  }));
});
