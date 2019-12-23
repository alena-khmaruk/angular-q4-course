import {TestBed} from '@angular/core/testing';
import {Router} from '@angular/router';
import {HttpClientTestingModule} from '@angular/common/http/testing';

import {AuthGuard} from './auth.guard';
import {AuthenticationService} from '../shared/components/header/services/authentication.service';

const authServiceMock = {
    isAuthenticated: true
};

const routerMock = {
    navigate: jasmine.createSpy('navigate').and.returnValue(true),
    parseUrl: jasmine.createSpy('parseUrl').and.returnValue('parsed_url')
};

describe('AuthGuard', () => {
    const routeMock: any = {snapshot: {}};
    const routeStateMock: any = {snapshot: {}, url: '/courses'};

    let authService;
    let guard: AuthGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AuthGuard,
                {provide: Router, useValue: routerMock},
                {provide: AuthenticationService, useValue: authServiceMock}
            ],
            imports: [HttpClientTestingModule]
        });
        guard = TestBed.get(AuthGuard);
        authService = TestBed.get(AuthenticationService);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });

    it('should redirect an unauthenticated user to the login route', () => {
        authService.isAuthenticated = false;
        guard.canActivate(routeMock, routeStateMock);
        expect(routerMock.parseUrl).toHaveBeenCalledWith('/login');
    });

    it('should allow the authenticated user to access app', () => {
        authService.isAuthenticated = true;
        expect(guard.canActivate(routeMock, routeStateMock)).toEqual(true);
    });
});
