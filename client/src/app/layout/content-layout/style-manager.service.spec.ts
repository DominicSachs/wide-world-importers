import { StyleManager } from '@app/layout/content-layout/style-manager.service';
import { WindowRef } from '@app/shared/services/window.ref';

describe('StyleManager', () => {
  let sut: StyleManager;
  let windowRef: WindowRef;

  beforeEach(() => {
    windowRef = new WindowRef();
    sut = new StyleManager(windowRef);
  });

  it('toggleDarkTheme removes the dark theme', () => {
    jest.spyOn(sut, 'removeStyle');
    jest.spyOn(windowRef.nativeDocument.body.classList, 'remove');

    sut.isDark = true;
    sut.toggleDarkTheme();

    expect(sut.isDark).toBeFalsy();
    expect(sut.removeStyle).toHaveBeenCalledWith('dark-theme');
    expect(windowRef.nativeDocument.body.classList.remove).toHaveBeenCalledWith('dark-theme');
  });

  it('toggleDarkTheme adds the dark theme', () => {
    jest.spyOn(windowRef.nativeDocument.head, 'querySelector');
    jest.spyOn(windowRef.nativeDocument.body.classList, 'add');

    sut.isDark = false;
    sut.toggleDarkTheme();

    expect(sut.isDark).toBeTruthy();
    expect(windowRef.nativeDocument.head.querySelector).toHaveBeenCalledWith('link[rel="stylesheet"].style-manager-dark-theme');
    expect(windowRef.nativeDocument.body.classList.add).toHaveBeenCalledWith('dark-theme');
  });
});
