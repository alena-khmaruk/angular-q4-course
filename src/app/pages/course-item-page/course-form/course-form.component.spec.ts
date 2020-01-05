import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {BrowserTestingModule} from '@angular/platform-browser/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';

import {CourseFormComponent} from './course-form.component';
import {CoursesService} from '../../courses-page/courses-list/services/courses.service';

const MOCK_COURSE = {
    id: 1,
    name: 'name',
    description: 'description',
    length: 20,
    isTopRated: true,
    date: new Date()
};

const coursesServiceMock: Partial<CoursesService> = {
    updateCourse: jasmine.createSpy().and.returnValue(new BehaviorSubject(true)),
    createCourse: jasmine.createSpy().and.returnValue(new BehaviorSubject(true))
};

describe('CourseFormComponent', () => {
    let component: CourseFormComponent;
    let fixture: ComponentFixture<CourseFormComponent>;
    let router;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [BrowserTestingModule, RouterTestingModule],
            declarations: [CourseFormComponent],
            providers: [{provide: CoursesService, useValue: coursesServiceMock}],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CourseFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        router = TestBed.get(Router);
        spyOn(router, 'navigate').and.returnValue(true);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should update dateCreation on updateDate method call', () => {
        const date = new Date('2017/11/11');
        component.updateDate(date);
        expect(component.course.date).toEqual(date);
    });

    it('should update duration on updateDuration method call', () => {
        const duration = 100;
        component.updateDuration(duration);
        expect(component.course.length).toEqual(duration);
    });

    it('should call authService.createCourse with new course', () => {
        const coursesService = TestBed.get(CoursesService);
        component.course.name = 'NewTitle';
        component.saveCourse();
        expect(coursesService.createCourse).toHaveBeenCalledWith(component.course);
    });

    it('should call authService.updateCourse with updatedCourse course', () => {
        const coursesService = TestBed.get(CoursesService);
        component.course.name = 'NewTitle';
        component.isEditPage = true;
        component.saveCourse();
        expect(coursesService.updateCourse).toHaveBeenCalledWith(component.course);
    });

    it('should call router.navigate method on saveCourse method call', () => {
        component.saveCourse();
        expect(router.navigate).toHaveBeenCalledWith(['courses']);
    });

    it('should set headline to "New course" when course equals null', () => {
        component.course = null;
        component.ngOnChanges();
        expect(component.headline).toBe('New course');
    });

    it('should set headline to "Edit {name} course" when course exists', () => {
        component.course = MOCK_COURSE;
        component.ngOnChanges();
        expect(component.headline).toBe('Edit name course');
    });
});
