import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SupplierEditComponent } from '@app/modules/supplier/edit/supplier-edit.component';

describe('EditComponent', () => {
  let component: SupplierEditComponent;
  let fixture: ComponentFixture<SupplierEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplierEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
