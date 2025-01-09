import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SupplierEditComponent } from '@app/modules/supplier/edit/supplier-edit.component';

describe('EditComponent', () => {
  let sut: SupplierEditComponent;
  let fixture: ComponentFixture<SupplierEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplierEditComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
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
