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
      imports: [HttpClientTestingModule, NoopAnimationsModule, RouterTestingModule.withRoutes([])],
      providers: [StyleManager]
    })
    .compileComponents();

    styleManager = TestBed.inject(StyleManager);
    styleManager.isDark = true;
    fixture = TestBed.createComponent(ContentLayoutComponent);
    sut = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('initializes isDarkMode with true', () => {
    expect(sut.isDarkMode).toBeTruthy();
  });

  it('toggleDarkTheme calls styleManager.toggleDarkTheme and sets isDarkMode', () => {
    jest.spyOn(styleManager, 'toggleDarkTheme');

    sut.isDarkMode = false;
    sut.toggleDarkTheme();

    expect(sut.isDarkMode).toBeTruthy();
    expect(styleManager.toggleDarkTheme).toHaveBeenCalled();
  });
});
