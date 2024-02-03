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
    [null, null],
    ['{ "value": 1 }', { value: 1 }]
  ])('getItem calls localStorage.getItem  for %p to %p', (cacheValue: string | null, expected: string | object | null) => {
    jest.spyOn(windowRef.nativeWindow.localStorage, 'getItem').mockReturnValue(cacheValue);

    const result = sut.getItem('the-key');

    expect(result).toStrictEqual(expected);
    expect(windowRef.nativeWindow.localStorage.getItem).toHaveBeenCalledWith('the-key');
  });

  test.each([
    ['value', 'value'],
    [{ value: 1 }, JSON.stringify({ value: 1 })]
  ])('setItem calls localStorage.setItem  for %p to %p', (cacheValue: string | object, expected: string) => {
    jest.spyOn(windowRef.nativeWindow.localStorage, 'setItem');

    sut.setItem('the-key', cacheValue);

    expect(windowRef.nativeWindow.localStorage.setItem).toHaveBeenCalledWith('the-key', expected);
  });

  it('removeItem calls localStorage.removeItem', () => {
    jest.spyOn(windowRef.nativeWindow.localStorage, 'removeItem');

    sut.removeItem('the-key');

    expect(windowRef.nativeWindow.localStorage.removeItem).toHaveBeenCalledWith('the-key');
  });
});
