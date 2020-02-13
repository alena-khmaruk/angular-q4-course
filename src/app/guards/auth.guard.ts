import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Store, select} from '@ngrx/store';

import {AppState} from '../app.module';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private store: Store<AppState>
    ) {}

    getToken(): Observable<string> {
        return this.store.pipe(select((state) => state.auth.token));
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const tree: UrlTree = this.router.parseUrl('/login');
        return this.getToken().pipe(
            map((token: string) => {
                if (token) {
                    return true;
                }
                return tree;
            })
        );
    }

}
