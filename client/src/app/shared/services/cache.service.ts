export abstract class CacheService {
  protected getItem<T>(key: string): T | null {
    const data = localStorage.getItem(key);

    return data != null ? JSON.parse(data) : null;
  }

  protected setItem(key: string, data: object | string): void {
    if (typeof data === 'string') {
      localStorage.setItem(key, data);
    }

    localStorage.setItem(key, JSON.stringify(data));
  }

  protected removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  protected clear(): void {
    localStorage.clear();
  }
}
