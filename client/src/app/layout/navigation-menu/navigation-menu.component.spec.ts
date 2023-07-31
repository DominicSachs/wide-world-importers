import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationMenuComponent } from '@app/layout/navigation-menu/navigation-menu.component';
import { MaterialModule } from '@app/shared/modules/material-module/material.module';

describe('NavigationMenuComponent', () => {
  let testObject: NavigationMenuComponent;
  let fixture: ComponentFixture<NavigationMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [NavigationMenuComponent]
    });

    fixture = TestBed.createComponent(NavigationMenuComponent);
    testObject = fixture.componentInstance;
  });

  it('should create', () => {
    expect(testObject.items.length).toBe(4);
  });
});
