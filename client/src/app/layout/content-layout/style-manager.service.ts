import { Injectable } from '@angular/core';
import { WindowRef } from '@app/shared/services/window.ref';

@Injectable({ providedIn: 'root' })
export class StyleManager {
  isDark = false;

  constructor(private readonly windowRef: WindowRef) { }

  toggleDarkTheme(): void {
    if (this.isDark) {
      this.removeStyle('dark-theme');
      this.windowRef.nativeDocument.body.classList.remove('dark-theme');
      this.isDark = false;
    } else {
      const href = 'dark-theme.css';
      this.getLinkElementForKey('dark-theme').setAttribute('href', href);
      this.windowRef.nativeDocument.body.classList.add('dark-theme');
      this.isDark = true;
    }
  }

  removeStyle(key: string): void {
    const existingLinkElement = this.getExistingLinkElementByKey(key);
    if (existingLinkElement) {
      this.windowRef.nativeDocument.head.removeChild(existingLinkElement);
    }
  }

  private getLinkElementForKey(key: string): Element {
    return this.getExistingLinkElementByKey(key) || this.createLinkElementWithKey(key);
  }

  private getExistingLinkElementByKey(key: string): Element | null {
    return this.windowRef.nativeDocument.head.querySelector(
      `link[rel="stylesheet"].${this.getClassNameForKey(key)}`
    );
  }

  private createLinkElementWithKey(key: string): HTMLLinkElement {
    const linkEl = document.createElement('link');
    linkEl.setAttribute('rel', 'stylesheet');
    linkEl.classList.add(this.getClassNameForKey(key));
    document.head.appendChild(linkEl);
    return linkEl;
  }

  private getClassNameForKey(key: string): string {
    return `style-manager-${key}`;
  }
}
