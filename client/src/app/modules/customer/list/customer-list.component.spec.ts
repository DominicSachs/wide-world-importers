import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CustomerService } from '@app/modules/customer/customer.service';
import { CustomerListComponent } from '@app/modules/customer/list/customer-list.component';

describe('CustomerListComponent', () => {
  let sut: CustomerListComponent;
  let fixture: ComponentFixture<CustomerListComponent>;
  let service: CustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CustomerListComponent, HttpClientTestingModule, NoopAnimationsModule],
      providers: [CustomerService]
    });

    service = TestBed.inject(CustomerService);
    fixture = TestBed.createComponent(CustomerListComponent);
    sut = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('calls getCustomers on ngAfterViewInit', fakeAsync(() => {
    spyOn(service, 'getCustomers');

    sut.data$.subscribe();
    sut.ngAfterViewInit();

    expect(service.getCustomers).toHaveBeenCalledTimes(1);
  }));
});
