import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, BehaviorSubject} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';

import {User} from '../../user/user.model';

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
    private _user: BehaviorSubject<User> = new BehaviorSubject<User>(null);
    private _token: string;

    constructor(private http: HttpClient) {
        this._token = localStorage.getItem('token');
        this._saveUser = this._saveUser.bind(this);
        if (this._token) {
            setTimeout(() => this.requestUserInfo(this._token).subscribe(this._saveUser));
        }
    }

    get user() {
        return this._user.asObservable();
    }

    get token() {
        return this._token;
    }

    get isAuthenticated(): boolean {
        return Boolean(this._token);
    }

    public logIn(login: string, password: string): void {
        this.http.post<IToken>('/auth/login', {login, password})
            .pipe(
                tap((res: IToken) => {
                    this._token = res.token;
                    localStorage.setItem('token', res.token);
                }),
                switchMap((res: IToken) => this.requestUserInfo(res.token))
            )
            .subscribe(this._saveUser);

    }

    public logOut(): void {
        this._user.next(null);
        localStorage.removeItem('token');
    }

    public getUser(): Observable<User> {
        return this.user;
    }

    public requestUserInfo(token: string) {
        return this.http.post<IUser>('/auth/userinfo', {token});
    }

    private _saveUser(user: IUser) {
        const userInstance: User = new User(user.name.first, user.name.last);
        this._user.next(userInstance);
    }
}
