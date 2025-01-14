import { HttpRequest, HttpResponse } from '@angular/common/http';
import { RequestCache } from '@app/shared/services/request-cache.service';
import { environment } from '@env/environment';

describe('RequestCache', () => {
  let testObject: RequestCache;

  beforeEach(() => testObject = new RequestCache());

  it('get returns undefined if there is no cached item', () => {
    const result = testObject.get(new HttpRequest('get', '/test', {}));

    expect(result).toBeUndefined();
  });

  it('get returns undefined if last read is expired', () => {
    const mockDate = new Date();
    mockDate.setDate(mockDate.getDate() + 10);
    const request = new HttpRequest('get', '/test', {});
    const response = new HttpResponse({ body: 'test' });

    testObject.put(request, response);
    jest.spyOn(Date, 'now').mockReturnValue(mockDate.valueOf());

    expect(testObject.get(request)).toBeUndefined();
  });

  it('put removes items if last read is expired', () => {
    const mockDate = new Date();
    mockDate.setDate(mockDate.getDate() + environment.cacheMilliseconds + 1);
    const request = new HttpRequest('get', '/test', {});
    const response = new HttpResponse({ body: 'test' });
    const request2 = new HttpRequest('get', '/test2', {});
    const response2 = new HttpResponse({ body: 'test2' });

    testObject.put(request, response);
    const dateSpy = jest.spyOn(Date, 'now').mockReturnValue(mockDate.valueOf());

    testObject.put(request2, response2);
    dateSpy.mockReturnValue(new Date().valueOf());

    expect(testObject.get(request)).toBeUndefined();
  });

  it('get returns cached item', () => {
    const request = new HttpRequest('get', '/test', {});
    const response = new HttpResponse({ body: 'test' });

    testObject.put(request, response);

    expect(testObject.get(request)).toBe(response);
  });
});
