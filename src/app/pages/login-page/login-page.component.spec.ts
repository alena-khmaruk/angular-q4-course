import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {Component} from '@angular/core';

import {LoginPageComponent} from './login-page.component';
import {AuthenticationService} from '../../shared/components/header/services/authentication.service';

const authServiceStub: Partial<AuthenticationService> = {
    logIn(): void {}
};

@Component({
    selector: 'vc-blank',
    template: '<div></div>'
})
export class BlankComponent {}

describe('LoginPageComponent', () => {
    let component: LoginPageComponent;
    let fixture: ComponentFixture<LoginPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LoginPageComponent, BlankComponent],
            imports: [FormsModule, RouterTestingModule.withRoutes(
                [{path: 'courses', component: BlankComponent}]
            )],
            providers: [
                {provide: AuthenticationService, useValue: authServiceStub}
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call authService.logIn method on login method call', () => {
        const authService = TestBed.get(AuthenticationService);
        spyOn(authService, 'logIn');
        component.logIn();
        expect(authService.logIn).toHaveBeenCalled();
    });
});
