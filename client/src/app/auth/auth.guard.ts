import { EnvironmentInjector, Injectable, runInInjectionContext } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthService } from '@app/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private readonly authService: AuthService, private readonly router: Router, private injector: EnvironmentInjector) { }

  canActivate(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.validateLogin(route);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, _state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.validateLogin(childRoute);
  }

  canLoad(_route: Route, _segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.validateLogin();
  }

  private validateLogin(route?: ActivatedRouteSnapshot): Observable<boolean> {
    return runInInjectionContext(this.injector, () => toObservable(this.authService.authStatus).pipe(
      map(authStatus => {
        const isLoginAllowed = authStatus.isAuthenticated;

        if (!isLoginAllowed) {
          this.router.navigate(['login'], { queryParams: { redirectUrl: this.getResolvedUrl(route) } });
        }

        return isLoginAllowed;
      }),
      take(1)
    ));
  }

  private getResolvedUrl(route?: ActivatedRouteSnapshot): string {
    if (!route) {
      return '';
    }

    return route.pathFromRoot.map(r => r.url.map(segment => segment.toString()).join('/')).join('/').replace('//', '/');
  }
}
