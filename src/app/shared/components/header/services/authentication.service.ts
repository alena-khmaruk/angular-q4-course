import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../../user/user.model';

interface IToken {
    token: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private _user: BehaviorSubject<User> = new BehaviorSubject<User>(null);
    private _token: string;

    constructor(private http: HttpClient) {
        this._token = localStorage.getItem('token');
        if (this._token) {
            setTimeout(() => this.updateUser(this._token));
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

    public logIn(email: string, password: string): void {
        this.http.post<IToken>('/auth/login', {login: email, password}).subscribe(
            (res: IToken) => {
                this._token = res.token;
                localStorage.setItem('token', this._token);
                this.updateUser(this._token);
            }
        );

    }

    public logOut(): void {
        this._user.next(null);
        localStorage.removeItem('token');
    }

    getUserInfo(): Observable<User> {
        return this.user;
    }

    updateUser(token: string) {
        this.http.post<User>('/auth/userinfo', {token}).subscribe((user: any) => {
            const userInstance: User = new User(user.name.first, user.name.last);
            this._user.next(userInstance);
        });
    }
}
