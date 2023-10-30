import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { CustomerEditResponse } from '@app/modules/customer/customer.model';
import { CustomerService } from '@app/modules/customer/customer.service';
import { CustomerEditComponent } from '@app/modules/customer/edit/customer-edit.component';
import { of } from 'rxjs';

describe('CustomerEditComponent', () => {
  let sut: CustomerEditComponent;
  let fixture: ComponentFixture<CustomerEditComponent>;
  let router: Router;
  let service: CustomerService;

  beforeEach(async () => {
    service = {
      getCustomer: () => of({} as CustomerEditResponse),
      update: () => of(void 0)
    } as unknown as CustomerService;

    await TestBed.configureTestingModule({
      imports: [CustomerEditComponent, HttpClientTestingModule, NoopAnimationsModule, ReactiveFormsModule]
    })
    .overrideComponent(CustomerEditComponent, {
      add: {
        providers: [{ provide: CustomerService, useValue: service }]
      },
      remove: {
        providers: [CustomerService]
      }
    })
    .compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(CustomerEditComponent);
    sut = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('ngOnInit patches the form if async data is loaded', fakeAsync(() => {
    const mockResult = {
      name: 'test', phone: '111', fax: '111',
      postalAddress: { addressLine1: 'pl1', addressLine2: '', postalCode: 'pc1', city: 'pcy1' },
      deliveryAddress: { addressLine1: 'dl1', addressLine2: '', postalCode: 'dc1', city: 'dcy1' }
    } as CustomerEditResponse;

    spyOn(service, 'getCustomer').and.returnValue(of(mockResult));
    spyOn(sut.editForm,'patchValue');

    sut.ngOnInit();
    sut.customer$.subscribe();

    expect(sut.editForm.patchValue).toHaveBeenCalledOnceWith(mockResult);
  }));

  it('save calls customerService.update if form is valid', () => {
    spyOn(service, 'update').and.returnValue(of(void 0));
    const model = {
      name: 'test', phone: '111', fax: '111',
      postalAddress: { addressLine1: 'pl1', addressLine2: '', postalCode: 'pc1', city: 'pcy1' },
      deliveryAddress: { addressLine1: 'dl1', addressLine2: '', postalCode: 'dc1', city: 'dcy1' }
    } as CustomerEditResponse;

    sut.ngOnInit();
    sut.id = 1;
    sut.editForm.patchValue(model);
    sut.save();

    expect(service.update).toHaveBeenCalledWith({ ...model, id: sut.id });
  });

  it('save does not call customerService.update if form is invalid', () => {
    spyOn(service, 'update');

    sut.ngOnInit();
    sut.editForm.controls['name'].setValue(null);
    sut.save();

    expect(service.update).not.toHaveBeenCalled();
  });

  it('cancel resets the edit form and navigates to list', () => {
    sut.editForm = new FormGroup({
      name: new FormControl('test-name')
    });

    spyOn(sut.editForm, 'reset').and.callThrough();
    spyOn(router, 'navigateByUrl');

    sut.cancel();

    expect(sut.editForm.reset).toHaveBeenCalled();
    expect(sut.editForm.controls['name'].value).toEqual(null);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/customers');
  });
});
