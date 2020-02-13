import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Store, select} from '@ngrx/store';

import {AppState} from '../app.module';

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
    private _token: string;

    constructor(private store: Store<AppState>) {
        store.pipe(select(state => state.auth.token)).subscribe((token: string) => {
            this._token = token;
        });
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        if (request.url.includes('login')) {
            return next.handle(request);
        }

        const nRequest = request.clone({
            setHeaders: {Authorization: this._token}
        });

        return next.handle(nRequest);
    }
}
