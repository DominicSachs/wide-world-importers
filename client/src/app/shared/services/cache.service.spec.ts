import { CacheService } from '@app/shared/services/cache.service';
import { WindowRef } from '@app/shared/services/window.ref';

describe('CachService', () => {
  let sut: CacheService;
  let windowRef: WindowRef;

  beforeEach(() => {
    windowRef = {
      nativeWindow: {
        localStorage: {
          getItem: () => {},
          setItem: () => {},
          removeItem: () => {}
        }
      }
    } as unknown as WindowRef;

    sut = new CacheService(windowRef);
  });

  test.each([
    ['', null],
    [null, null],
    ['value', 'value']
  ])('getItem calls localStorage.getItem  for %p to %p', (cacheValue: string | null, expected: string | null) => {
    spyOn(windowRef.nativeWindow.localStorage, 'getItem').and.returnValue(cacheValue);

    const result = sut.getItem('the-key');

    expect(result).toBe(expected);
    expect(windowRef.nativeWindow.localStorage.getItem).toHaveBeenCalledWith('the-key');
  });

  it('removeItem calls localStorage.removeItem', () => {
    spyOn(windowRef.nativeWindow.localStorage, 'removeItem');

    sut.removeItem('the-key');

    expect(windowRef.nativeWindow.localStorage.removeItem).toHaveBeenCalledWith('the-key');
  });
});
