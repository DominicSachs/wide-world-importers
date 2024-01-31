import { Injectable } from '@angular/core';
import { WindowRef } from '@app/shared/services/window.ref';

@Injectable({ providedIn: 'root' })
export class CacheService {
  constructor(private readonly windowRef: WindowRef) { }

  getItem<T>(key: string): T | null {
    const data = this.windowRef.nativeWindow.localStorage.getItem(key);

    return data != null ? JSON.parse(data) : null;
  }

  setItem(key: string, data: object | string): void {
    if (typeof data === 'string') {
      this.windowRef.nativeWindow.localStorage.setItem(key, data);
    }

    this.windowRef.nativeWindow.localStorage.setItem(key, JSON.stringify(data));
  }

  removeItem(key: string): void {
    this.windowRef.nativeWindow.localStorage.removeItem(key);
  }
}
