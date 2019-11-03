import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {By} from '@angular/platform-browser';
import {NO_ERRORS_SCHEMA} from '@angular/core';

import {CoursesListComponent} from './courses-list.component';
import {CoursesService} from './services/courses.service';
import {Course} from '../course/course.model';

const TEST_COURSE: Course = {
    id: 'test_id',
    description: 'Test course description',
    title: 'Test course title',
    creationDate: new Date(2019, 11, 2),
    duration: 100
};

let coursesServiceStub: Partial<CoursesService>;

coursesServiceStub = {
    getCourses(): Course[] {
        return [TEST_COURSE];
    }
};

describe('CoursesListComponent', () => {
    let component: CoursesListComponent;
    let fixture: ComponentFixture<CoursesListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CoursesListComponent],
            imports: [FormsModule, CommonModule],
            providers: [{provide: CoursesService, useValue: coursesServiceStub}],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CoursesListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call getCourses method on component init', () => {
        const coursesService = TestBed.get(CoursesService);
        spyOn(coursesService, 'getCourses');
        component.ngOnInit();
        fixture.detectChanges();
        expect(coursesService.getCourses).toHaveBeenCalled();
    });

    it('should init coursesList on component init', () => {
        expect(component.coursesList).toBeDefined();
        expect(component.coursesList).toEqual([TEST_COURSE]);
    });


    it('should call loadMoreCourses method on button click', () => {
        spyOn(component, 'loadMoreCourses');
        const loadButton = fixture.debugElement.query(By.css('#load-courses'));
        loadButton.nativeElement.click();
        expect(component.loadMoreCourses).toHaveBeenCalled();
    });

    it('should call console.log method on loadMoreCourses method call', () => {
        spyOn(console, 'log');
        component.loadMoreCourses();
        expect(console.log).toHaveBeenCalled();
    });

    it('should call console.log method on deleteCourse method call', () => {
        spyOn(console, 'log');
        component.deleteCourse('test_id');
        expect(console.log).toHaveBeenCalled();
    });
});
