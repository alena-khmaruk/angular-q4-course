import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRoute} from '@angular/router';
import {from, Observable} from 'rxjs';

import {CourseItemPageComponent} from './course-item-page.component';
import {CoursesService} from '../courses-page/courses-list/services/courses.service';
import {Course} from '../courses-page/course/course.model';

const MOCK_COURSE: Course = {
    id: 1,
    name: 'name',
    description: 'description',
    length: 20,
    isTopRated: true,
    date: new Date()
};

const coursesServiceStub: Partial<CoursesService> = {
    getCourseById(id: number): Observable<Course> {
        return from([MOCK_COURSE]);
    }
};

const activatedRouteStub: Partial<ActivatedRoute> = {
    params: from([{id: 1}])
};

describe('CourseItemPageComponent', () => {
    let component: CourseItemPageComponent;
    let fixture: ComponentFixture<CourseItemPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            imports: [RouterTestingModule],
            declarations: [CourseItemPageComponent],
            providers: [
                {provide: ActivatedRoute, useValue: activatedRouteStub},
                {provide: CoursesService, useValue: coursesServiceStub}
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CourseItemPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('11111111111', () => {
        expect(component.currentCourse).toEqual(MOCK_COURSE);
    });
});
