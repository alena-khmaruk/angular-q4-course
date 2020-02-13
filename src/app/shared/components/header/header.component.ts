import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Store, createFeatureSelector, createSelector, select} from '@ngrx/store';

import {User} from '../user/user.model';
import {AuthenticationService} from './services/authentication.service';
import {AuthState} from 'src/app/reducers/auth.reducer';

@Component({
    selector: 'vc-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public user$: Observable<User>;
    private _selectAuth = createFeatureSelector<AuthState>('auth');

    constructor(
        private authService: AuthenticationService,
        private router: Router,
        private store: Store<AuthState>
    ) {}

    public ngOnInit(): void {
        const selectUser = createSelector(this._selectAuth, this._getUser);
        this.user$ = this.store.pipe(select(selectUser));
    }

    public isLoginPage(): boolean {
        return this.router.url === '/login';
    }

    public logOut(): void {
        this.authService.logOut();
        this.router.navigate(['/login']);
    }

    public openLoginPage(): void {
        this.router.navigate(['/login']);
    }

    private _getUser(state: AuthState) {
        return state.user;
    }
}
