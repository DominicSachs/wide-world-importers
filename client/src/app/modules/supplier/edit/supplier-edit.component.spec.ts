import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { SupplierService } from '../supplier.service';
import { SupplierEditComponent } from '@app/modules/supplier/edit/supplier-edit.component';

describe('EditComponent', () => {
  let sut: SupplierEditComponent;
  let fixture: ComponentFixture<SupplierEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [MockProvider(SupplierService, { getSupplier: () => of({}) } as unknown as SupplierService), provideNoopAnimations()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierEditComponent);
    fixture.componentRef.setInput('id', 1);
    sut = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  });
});
