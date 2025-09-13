import { DOCUMENT } from '@angular/common';
import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MockProvider } from 'ng-mocks';
import { AuthStatus } from '../../auth/auth.models';
import { AuthService } from '../../auth/auth.service';
import { WindowRef } from '../../shared/services/window.ref';
import { ContentLayoutComponent } from '@app/layout/content-layout/content-layout.component';

describe('ContentLayoutComponent', () => {
  let sut: ContentLayoutComponent;
  let fixture: ComponentFixture<ContentLayoutComponent>;
  let document: Document;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [MockProvider(AuthService, { authStatus: signal({} as AuthStatus) }), MockProvider(WindowRef), provideRouter([])]
    })
    .compileComponents();

    document = TestBed.inject(DOCUMENT);
    fixture = TestBed.createComponent(ContentLayoutComponent);
    sut = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('initializes isDarkMode with true', () => {
    expect(sut.isDarkMode).toBeTruthy();
  });

  it('toggleDarkTheme calls styleManager.toggleDarkTheme and sets isDarkMode', () => {
    vi.spyOn(document.body.classList, 'toggle');

    sut.toggleDarkTheme();

    expect(sut.isDarkMode()).toBeTruthy();
    expect(document.body.classList.toggle).toHaveBeenNthCalledWith(1, 'dark-mode');
  });
});
