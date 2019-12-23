import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NO_ERRORS_SCHEMA, Pipe, PipeTransform} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

import {CoursesListComponent} from './courses-list.component';
import {CoursesService} from './services/courses.service';
import {Course} from '../course/course.model';
import {FilterByNamePipe} from '../../../core/pipes/filter-by-name.pipe';

const TEST_COURSE: Course = {
    id: 1,
    description: 'Test course description',
    name: 'Test course title',
    date: new Date(2019, 11, 2),
    length: 100,
    isTopRated: false
};

const coursesServiceStub: Partial<CoursesService> = {
    getCourses: jasmine.createSpy().and.returnValue(new BehaviorSubject([TEST_COURSE])),
    deleteCourse: jasmine.createSpy()
};

const filterByNamePipeStub: FilterByNamePipe = {
    transform(coursesList: Course[], filterValue: string): Course[] {
        return coursesList;
    }
};

@Pipe({name: 'orderBy'})
class MockOrderByPipe implements PipeTransform {
    transform(courses: Course[]): Course[] {
        return courses;
    }
}

describe('CoursesListComponent', () => {
    let component: CoursesListComponent;
    let fixture: ComponentFixture<CoursesListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CoursesListComponent, MockOrderByPipe],
            imports: [FormsModule, CommonModule],
            providers: [
                {provide: CoursesService, useValue: coursesServiceStub},
                {provide: FilterByNamePipe, useValue: filterByNamePipeStub}
            ],
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
        component.ngOnInit();
        fixture.detectChanges();
        expect(coursesService.getCourses).toHaveBeenCalled();
    });

    it('should init coursesList on component init', () => {
        expect(component.coursesList).toBeDefined();
        expect(component.coursesList).toEqual([TEST_COURSE]);
    });

    it('should call coursesService.deleteCourse method on deleteCourse method call  when confirmation=true', () => {
        const coursesService = TestBed.get(CoursesService);
        spyOn(window, 'confirm').and.returnValue(true);
        component.deleteCourse(1);
        expect(coursesService.deleteCourse).toHaveBeenCalledWith(1);
    });

    it('should not call coursesService.deleteCourse method on deleteCourse method call when confirmation=false', () => {
        const coursesService = TestBed.get(CoursesService);
        spyOn(window, 'confirm').and.returnValue(false);
        component.deleteCourse(1);
        expect(coursesService.deleteCourse).not.toHaveBeenCalled();
    });

    it('should call getCourses method with text fragment on filterCourses method call', () => {
        const coursesService = TestBed.get(CoursesService);
        component.filterCourses('search');
        expect(coursesService.getCourses).toHaveBeenCalledWith(
            {start: '0', count: '10', textFragment: 'search'}
        );
    });

    it('should call getCourses method with start = 10 on next button click', () => {
        const coursesService = TestBed.get(CoursesService);
        component.next();
        expect(coursesService.getCourses).toHaveBeenCalledWith(
            {start: '10', count: '10'}
        );
    });

    it('should call getCourses method with start = 10 on prev button click', () => {
        const coursesService = TestBed.get(CoursesService);
        component.next();
        component.next();
        coursesService.getCourses.calls.reset();
        component.prev();
        expect(coursesService.getCourses).toHaveBeenCalledWith(
            {start: '10', count: '10'}
        );
    });
});
