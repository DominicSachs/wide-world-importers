import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { MockProvider } from 'ng-mocks';
import { firstValueFrom, of } from 'rxjs';
import { CustomerEditResponse } from '@app/modules/customer/customer.model';
import { CustomerService } from '@app/modules/customer/customer.service';
import { CustomerEditComponent } from '@app/modules/customer/edit/customer-edit.component';

describe('CustomerEditComponent', () => {
  let sut: CustomerEditComponent;
  let fixture: ComponentFixture<CustomerEditComponent>;
  let router: Router;
  let service: CustomerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        MockProvider(CustomerService, { getCustomer: () => of({}), update: () => of(void 0) } as unknown as CustomerService),
        provideNoopAnimations()
      ]
    })
    .compileComponents();

    service = TestBed.inject(CustomerService);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(CustomerEditComponent);
    fixture.componentRef.setInput('id', 1);
    sut = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('ngOnInit patches the form if async data is loaded', async () => {
    const mockResult = {
      name: 'test', phone: '111', fax: '111',
      postalAddress: { addressLine1: 'pl1', addressLine2: '', postalCode: 'pc1', city: 'pcy1' },
      deliveryAddress: { addressLine1: 'dl1', addressLine2: '', postalCode: 'dc1', city: 'dcy1' }
    } as CustomerEditResponse;

    vi.spyOn(service, 'getCustomer').mockReturnValue(of(mockResult));
    vi.spyOn(sut.editForm,'patchValue');

    sut.ngOnInit();
    await firstValueFrom(sut.customer$);

    expect(sut.editForm.patchValue).toHaveBeenNthCalledWith(1, mockResult);
  });

  it('save calls customerService.update if form is valid', () => {
    vi.spyOn(service, 'update').mockReturnValue(of(void 0));
    const model = {
      name: 'test', phone: '111', fax: '111',
      postalAddress: { addressLine1: 'pl1', addressLine2: '', postalCode: 'pc1', city: 'pcy1' },
      deliveryAddress: { addressLine1: 'dl1', addressLine2: '', postalCode: 'dc1', city: 'dcy1' }
    } as CustomerEditResponse;

    sut.ngOnInit();
    sut.editForm.patchValue(model);
    sut.save();

    expect(service.update).toHaveBeenCalledWith({ ...model, id: sut.id() });
  });

  it('save does not call customerService.update if form is invalid', () => {
    vi.spyOn(service, 'update');

    sut.ngOnInit();
    sut.editForm.controls['name'].setValue(null!);
    sut.save();

    expect(service.update).not.toHaveBeenCalled();
  });

  it('cancel resets the edit form and navigates to list', () => {
    vi.spyOn(sut.editForm, 'reset');
    vi.spyOn(router, 'navigateByUrl');

    sut.editForm.controls.name.setValue('test');
    sut.cancel();

    expect(sut.editForm.reset).toHaveBeenCalled();
    expect(sut.editForm.controls.name.value).toEqual('');
    expect(router.navigateByUrl).toHaveBeenCalledWith('/customers');
  });
});
