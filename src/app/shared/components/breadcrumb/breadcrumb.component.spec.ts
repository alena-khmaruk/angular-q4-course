import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {NavigationEnd, NavigationStart, Router, RouterEvent} from '@angular/router';
import {ReplaySubject} from 'rxjs';

import {BreadcrumbComponent} from './breadcrumb.component';

const eventSubject = new ReplaySubject<RouterEvent>(1);

const routerMock = {
    navigate: jasmine.createSpy('navigate'),
    events: eventSubject.asObservable(),
    url: '/new'
};

describe('BreadcrumbComponent', () => {
    let component: BreadcrumbComponent;
    let fixture: ComponentFixture<BreadcrumbComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BreadcrumbComponent],
            imports: [RouterTestingModule],
            providers: [{provide: Router, useValue: routerMock}]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BreadcrumbComponent);
        component = fixture.componentInstance;
        component.breadcrumbs = {values: [], links: []};
        fixture.detectChanges();
    });

    afterEach(() => {
        component.breadcrumbs = {values: [], links: []};
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set new breadcrumbs after NavigationEnd event', () => {
        eventSubject.next(new NavigationEnd(1, '/courses', '/new'));
        fixture.detectChanges();
        expect(component.breadcrumbs).toEqual({values: ['Courses'], links: []});
    });

    it('should set empty breadcrumbs after navigate to unknown url', () => {
        eventSubject.next(new NavigationEnd(2, '/fff', '/courses'));
        fixture.detectChanges();
        expect(component.breadcrumbs).toEqual({values: [], links: []});
    });
});
