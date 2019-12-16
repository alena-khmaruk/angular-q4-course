import {Component, OnInit} from '@angular/core';
import {User} from '../user/user.model';
import {AuthenticationService} from './services/authentication.service';
import {Router} from '@angular/router';

@Component({
    selector: 'vc-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public user: User;

    constructor(
        private authService: AuthenticationService,
        private router: Router
    ) {}

    public ngOnInit(): void {
        this.authService.getUserInfo().subscribe((user: User) => {
            this.user = user;
            if (user) {
                this.router.navigateByUrl('/courses');
            }
        });
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
}
