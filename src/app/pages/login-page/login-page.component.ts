import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

import {AuthenticationService} from '../../shared/components/header/services/authentication.service';

@Component({
    selector: 'vc-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent implements OnInit {
    public email: string;
    public password: string;

    constructor(
        private authService: AuthenticationService,
    ) {}

    public ngOnInit(): void {}

    public logIn(): void {
        this.authService.logIn(this.email, this.password);
    }
}
