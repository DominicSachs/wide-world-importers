import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ContentLayoutComponent } from '@app/layout/content-layout/content-layout.component';
import { NavigationMenuComponent } from '@app/layout/navigation-menu/navigation-menu.component';
import { MaterialModule } from '@app/shared/modules/material-module/material.module';

describe('ContentLayoutComponent', () => {
  let component: ContentLayoutComponent;
  let fixture: ComponentFixture<ContentLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, NoopAnimationsModule, RouterTestingModule.withRoutes([])],
      declarations: [ContentLayoutComponent, NavigationMenuComponent]
    });
    fixture = TestBed.createComponent(ContentLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
