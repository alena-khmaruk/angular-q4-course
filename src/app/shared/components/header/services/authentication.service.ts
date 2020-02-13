import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {switchMap, tap} from 'rxjs/operators';
import {Store, select} from '@ngrx/store';

import {User} from '../../user/user.model';
import {AuthState} from 'src/app/reducers/auth.reducer';
import {updateUser, login, logout} from 'src/app/actions/auth.actions';

interface IToken {
    token: string;
}

interface IUser {
    id: string;
    name: {
        first: string,
        last: string
    };
}

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    constructor(private http: HttpClient, private store: Store<AuthState>) {
        const token = localStorage.getItem('token');
        this._saveUser = this._saveUser.bind(this);
        if (token) {
            store.dispatch(login({token}));
            setTimeout(() => this.requestUserInfo(token).subscribe(this._saveUser));
        }
    }

    public logIn(email: string, password: string): void {
        this.http.post<IToken>('/auth/login', {login: email, password})
            .pipe(
                tap((res: IToken) => {
                    this.store.dispatch(login({token: res.token}));
                    localStorage.setItem('token', res.token);
                }),
                switchMap((res: IToken) => this.requestUserInfo(res.token))
            )
            .subscribe(this._saveUser);

    }

    public logOut(): void {
        this.store.dispatch(logout());
        localStorage.removeItem('token');
    }

    public requestUserInfo(token: string) {
        return this.http.post<IUser>('/auth/userinfo', {token});
    }

    private _saveUser(userInfo: IUser) {
        const user: User = new User(userInfo.name.first, userInfo.name.last);
        this.store.dispatch(updateUser({user}));
    }
}
