import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CommonModule} from '@angular/common';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BehaviorSubject} from 'rxjs';

import {HeaderComponent} from './header.component';
import {AuthenticationService} from './services/authentication.service';
import {User} from '../user/user.model';

const user = new User('first', 'last');
const currentUser = new BehaviorSubject(null);

const authServiceStub: Partial<AuthenticationService> = {
    getUser: jasmine.createSpy().and.returnValue(currentUser),
    logOut: jasmine.createSpy()
};

const routerStub = {
    navigate: jasmine.createSpy().and.returnValue(true)
};

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, RouterTestingModule, HttpClientTestingModule],
            declarations: [HeaderComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: AuthenticationService, useValue: authServiceStub},
                {provide: Router, useValue: routerStub}
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set user when the user was logged in', () => {
        currentUser.next(user);
        expect(component.user).toEqual(user);
    });

    it('should call logOut method of AuthService on logOut method call', () => {
        const authService: AuthenticationService = TestBed.get(AuthenticationService);
        component.logOut();
        expect(authService.logOut).toHaveBeenCalled();
    });

    it('should call navigate method with /login url on openLoginPage method call', () => {
        const router: Router = TestBed.get(Router);
        component.openLoginPage();
        expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });
});
