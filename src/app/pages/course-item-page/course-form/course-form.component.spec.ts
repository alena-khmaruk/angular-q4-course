import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {BrowserTestingModule} from '@angular/platform-browser/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';

import {CourseFormComponent} from './course-form.component';
import {CoursesService} from '../../courses-page/courses-list/services/courses.service';

const coursesServiceMock: Partial<CoursesService> = {
    updateCourse: jasmine.createSpy(),
    createCourse: jasmine.createSpy()
};

describe('CourseFormComponent', () => {
    let component: CourseFormComponent;
    let fixture: ComponentFixture<CourseFormComponent>;

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
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should update dateCreation on updateDate method call', () => {
        const date = new Date('2017/11/11');
        component.updateDate(date);
        expect(component.newCourse.creationDate).toEqual(date);
    });

    it('should update duration on updateDuration method call', () => {
        const duration = 100;
        component.updateDuration(duration);
        expect(component.newCourse.duration).toEqual(duration);
    });

    it('should call authService.createCourse with new course', () => {
        const coursesService = TestBed.get(CoursesService);
        component.newCourse.title = 'NewTitle';
        component.saveCourse();
        expect(coursesService.createCourse).toHaveBeenCalledWith(component.newCourse);
    });

    it('should call authService.updateCourse with updatedCourse course', () => {
        const coursesService = TestBed.get(CoursesService);
        component.newCourse.title = 'NewTitle';
        component.isEditPage = true;
        component.saveCourse();
        expect(coursesService.updateCourse).toHaveBeenCalledWith(component.newCourse.id, component.newCourse);
    });

    it('should call router.navigate method on saveCourse method call', () => {
        const router = TestBed.get(Router);
        spyOn(router, 'navigate');
        component.saveCourse();
        expect(router.navigate).toHaveBeenCalledWith(['courses']);
    });
});
