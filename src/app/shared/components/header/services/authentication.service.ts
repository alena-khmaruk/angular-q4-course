import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {User} from '../../user/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private _user: ReplaySubject<User> = new ReplaySubject<User>();
    get user() {
        return this._user.asObservable();
    }

    get isAuthenticated(): boolean {
        return Boolean(this._user._getNow());
    }

    public logIn(email: string, password: string): void {
        console.log(`User successfully logged in via email: ${email} and password: ${password}`);
        this._user.next(new User('Alena', 'Khmaruk'));
        localStorage.setItem('token', new Date().toString());
    }

    public logOut(): void {
        this._user.next(null);
        localStorage.removeItem('token');
    }

    getUserInfo(): Observable<User> {
        return this.user;
    }
}
