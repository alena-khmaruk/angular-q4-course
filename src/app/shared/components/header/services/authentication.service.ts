import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../../user/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private _user: BehaviorSubject<User> = new BehaviorSubject<User>(null);
    private _token: string;

    constructor() {
        this._token = localStorage.getItem('token');
        if (this._token) {
            this._user.next(new User('Alena', 'Khmaruk'));
        }
    }

    get user() {
        return this._user.asObservable();
    }

    get isAuthenticated(): boolean {
        return Boolean(this._user.getValue());
    }

    public logIn(email: string, password: string): void {
        console.log(`User successfully logged in via email: ${email} and password: ${password}`);
        this._user.next(new User('Alena', 'Khmaruk'));
        this._token = new Date().toString();
        localStorage.setItem('token', this._token);
    }

    public logOut(): void {
        this._user.next(null);
        localStorage.removeItem('token');
    }

    getUserInfo(): Observable<User> {
        return this.user;
    }
}
