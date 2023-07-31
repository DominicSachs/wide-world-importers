import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MasterDataComponent } from '@app/modules/master-data/master-data.component';
import { MaterialModule } from '@app/shared/modules/material-module/material.module';

describe('MasterDataComponent', () => {
  let component: MasterDataComponent;
  let fixture: ComponentFixture<MasterDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, RouterTestingModule.withRoutes([])],
      declarations: [MasterDataComponent]
    });
    fixture = TestBed.createComponent(MasterDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
