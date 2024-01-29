import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ContentLayoutComponent } from '@app/layout/content-layout/content-layout.component';
import { StyleManager } from '@app/layout/content-layout/style-manager.service';

describe('ContentLayoutComponent', () => {
  let sut: ContentLayoutComponent;
  let fixture: ComponentFixture<ContentLayoutComponent>;
  let styleManager: StyleManager;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NoopAnimationsModule, RouterTestingModule.withRoutes([])]
    });

    styleManager = TestBed.inject(StyleManager);
    fixture = TestBed.createComponent(ContentLayoutComponent);
    sut = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('toggleDarkTheme calls styleManager.toggleDarkTheme and sets isDarkMode', () => {
    spyOn(styleManager, 'toggleDarkTheme');

    sut.isDarkMode = false;
    sut.toggleDarkTheme();

    expect(sut.isDarkMode).toBeTrue();
    expect(styleManager.toggleDarkTheme).toHaveBeenCalled();
  });
});
