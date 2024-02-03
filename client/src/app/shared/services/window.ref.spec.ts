import { WindowRef } from './window.ref';

describe('WindowRef', () => {
  let sut: WindowRef;

  beforeEach(() => {
    sut = new WindowRef();
  });

  it('provides native window instance', () => {
    expect(sut.nativeWindow).toBeDefined();
  });
});
