/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

export interface RequestCacheEntry {
  url: string;
  response: HttpResponse<any>;
  lastRead: number;
}

// eslint-disable-next-line max-classes-per-file
@Injectable({ providedIn: 'root' })
export class RequestCache {
  private readonly cache = new Map<string, RequestCacheEntry>();

  get(req: HttpRequest<any>): HttpResponse<any> | undefined {
    const url = req.urlWithParams;
    const cached = this.cache.get(url);

    if (!cached) {
      return undefined;
    }

    const isExpired = cached.lastRead < Date.now() - environment.cacheMilliseconds;

    return isExpired ? undefined : cached.response;
  }

  put(req: HttpRequest<any>, response: HttpResponse<any>): void {
    const url = req.urlWithParams;
    const newEntry = { url: url, response: response, lastRead: Date.now() };
    this.cache.set(url, newEntry);
    this.removeExpiredCacheEntries();
  }

  private removeExpiredCacheEntries(): void {
    const expired = Date.now() - environment.cacheMilliseconds;
    this.cache.forEach(entry => {
      if (entry.lastRead < expired) {
        this.cache.delete(entry.url);
      }
    });
  }
}
