import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationMenuComponent } from '@app/layout/navigation-menu/navigation-menu.component';

describe('NavigationMenuComponent', () => {
  let testObject: NavigationMenuComponent;
  let fixture: ComponentFixture<NavigationMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NavigationMenuComponent]
    });

    fixture = TestBed.createComponent(NavigationMenuComponent);
    testObject = fixture.componentInstance;
  });

  it('should create', () => {
    expect(testObject.items.length).toBe(4);
  });
});
