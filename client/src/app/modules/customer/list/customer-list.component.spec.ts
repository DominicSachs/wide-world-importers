import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CustomerService } from '@app/modules/customer/customer.service';
import { CustomerListComponent } from '@app/modules/customer/list/customer-list.component';
import { of } from 'rxjs';

describe('CustomerListComponent', () => {
  let sut: CustomerListComponent;
  let fixture: ComponentFixture<CustomerListComponent>;
  let service: CustomerService;

  beforeEach(async () => {
    service = {
      getCustomers: () => of([])
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
  });

  it('calls getCustomers on ngAfterViewInit', fakeAsync(() => {
    const spy = spyOn(service, 'getCustomers');

    fixture.detectChanges();
    spy.calls.reset();

    sut.data$.subscribe();
    sut.ngAfterViewInit();

    expect(spy).toHaveBeenCalledTimes(1);
  }));
});
