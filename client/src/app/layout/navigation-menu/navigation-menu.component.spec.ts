import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoreModule } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DirectivesModule } from '../../shared/directives/directives.module';
import { FeatureToggleModule } from '../../shared/feature-toggle/feature-toggle.module';
import { MaterialModule } from '../../shared/modules/material.module';
import { SharedModule } from '../../shared/modules/shared.module';
import { NavigationMenuComponent } from './navigation-menu.component';
import { NavigationMenuItem } from './navigation-menu.model';

describe('SidenavComponent', () => {
  let testObject: NavigationMenuComponent;
  let fixture: ComponentFixture<NavigationMenuComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule, DirectivesModule, FeatureToggleModule, SharedModule, MaterialModule, RouterTestingModule.withRoutes([])],
      declarations: [NavigationMenuComponent]
    });

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(NavigationMenuComponent);
    testObject = fixture.componentInstance;
  });

  it('should create', () => expect(testObject.items.length).toBe(6));

  it('isActive returns true', () => {
    spyOnProperty(router, 'url', 'get').and.returnValue('/test/1');

    const result = testObject.isActive({ routeMatch: '/test' } as NavigationMenuItem);

    expect(result).toBeTruthy();
  });

  it('isActive returns false', () => {
    const result = testObject.isActive({ routeMatch: '/abc' } as NavigationMenuItem);

    expect(result).toBeFalsy();
  });
});
