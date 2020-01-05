import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {NavigationEnd, Router, RouterEvent} from '@angular/router';
import {BehaviorSubject, ReplaySubject} from 'rxjs';

import {BreadcrumbComponent} from './breadcrumb.component';
import {CoursesService} from '../../../pages/courses-page/courses-list/services/courses.service';
import {Course} from '../../../pages/courses-page/course/course.model';

const MOCK_COURSE: Course = {
    id: 1,
    name: 'name',
    description: 'description',
    length: 20,
    isTopRated: true,
    date: new Date()
};

const eventSubject = new ReplaySubject<RouterEvent>(1);

const routerMock = {
    navigate: jasmine.createSpy('navigate').and.returnValue(true),
    events: eventSubject.asObservable(),
    url: '/new'
};

const coursesServiceStub: Partial<CoursesService> = {
    deleteCourse: jasmine.createSpy(),
    getCourseById: jasmine.createSpy().and.returnValue(new BehaviorSubject(MOCK_COURSE))
};

describe('BreadcrumbComponent', () => {
    let component: BreadcrumbComponent;
    let fixture: ComponentFixture<BreadcrumbComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BreadcrumbComponent],
            imports: [RouterTestingModule],
            providers: [
                {provide: Router, useValue: routerMock},
                {provide: CoursesService, useValue: coursesServiceStub}
            ]
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

    xit('should set breadcrumbs with course name', () => {
        eventSubject.next(new NavigationEnd(3, '/courses/1', '/courses/1'));
        fixture.detectChanges();
        expect(component.breadcrumbs).toEqual({values: ['Courses', 'name'], links: ['/courses']});
    });
});
