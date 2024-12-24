import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderDetailComponent } from '@app/modules/order/detail/detail.component';

describe('OrderDetailComponent', () => {
  let component: OrderDetailComponent;
  let fixture: ComponentFixture<OrderDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    });

    fixture = TestBed.createComponent(OrderDetailComponent);
    fixture.componentRef.setInput('id', 0);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
