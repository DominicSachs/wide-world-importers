import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CustomerListReponse } from '@app/modules/customer/customer.model';
import { CustomerService } from '@app/modules/customer/customer.service';
import { CustomerListComponent } from '@app/modules/customer/list/customer-list.component';
import { PagedResponse } from '@app/shared/models/paged-response.model';
import { firstValueFrom, of } from 'rxjs';

describe('CustomerListComponent', () => {
  let sut: CustomerListComponent;
  let fixture: ComponentFixture<CustomerListComponent>;
  let service: CustomerService;

  beforeEach(async () => {
    service = {
      getCustomers: () => of({})
    } as unknown as CustomerService;

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NoopAnimationsModule]
    })
    .overrideComponent(CustomerListComponent, {
      add: {
        providers: [{ provide: CustomerService, useValue: service }]
      },
      remove: {
        providers: [CustomerService]
      }
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerListComponent);
    sut = fixture.componentInstance;
    sut.paginator = {} as unknown as MatPaginator;
    sut.sort = {} as unknown as MatSort;
  });

  it('calls getCustomers on ngAfterViewInit', fakeAsync(async () => {
    const mockResult = { count: 1, items: [{ name:'test' }] } as PagedResponse<CustomerListReponse>;
    jest.spyOn(service, 'getCustomers').mockReturnValue(of(mockResult));

    sut.ngAfterViewInit();
    tick(1);

    const response = await firstValueFrom(sut.data$);
    expect(response).toStrictEqual(mockResult);
    expect(service.getCustomers).toHaveBeenCalledTimes(1);
  }));
});
