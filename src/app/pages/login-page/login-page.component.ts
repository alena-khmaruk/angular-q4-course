import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../shared/components/header/services/authentication.service';

@Component({
    selector: 'vc-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
    public email: string;
    public password: string;

    constructor(
        private authService: AuthenticationService,
        public router: Router
    ) {}

    public ngOnInit(): void {}

    public logIn(): void {
        this.authService.logIn(this.email, this.password);
        this.router.navigateByUrl('/courses');
    }
}
