import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {By} from '@angular/platform-browser';
import {NO_ERRORS_SCHEMA, Pipe, PipeTransform} from '@angular/core';

import {CoursesListComponent} from './courses-list.component';
import {CoursesService} from './services/courses.service';
import {Course} from '../course/course.model';
import {FilterByNamePipe} from '../../../core/pipes/filter-by-name.pipe';

const TEST_COURSE: Course = {
    id: 'test_id',
    description: 'Test course description',
    title: 'Test course title',
    creationDate: new Date(2019, 11, 2),
    duration: 100,
    topRated: false
};

const coursesServiceStub: Partial<CoursesService> = {
    getCourses(): Course[] {
        return [TEST_COURSE];
    },
    deleteCourse(id: string): void {}
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

    it('should call coursesService.deleteCourse method on deleteCourse method call  when confirmation=true', () => {
        const coursesService = TestBed.get(CoursesService);
        spyOn(coursesService, 'deleteCourse');
        spyOn(window, 'confirm').and.returnValue(true);
        component.deleteCourse('test_id');
        expect(coursesService.deleteCourse).toHaveBeenCalledWith('test_id');
    });

    it('should not call coursesService.deleteCourse method on deleteCourse method call when confirmation=false', () => {
        const coursesService = TestBed.get(CoursesService);
        spyOn(coursesService, 'deleteCourse');
        spyOn(window, 'confirm').and.returnValue(false);
        component.deleteCourse('test_id');
        expect(coursesService.deleteCourse).not.toHaveBeenCalled();
    });

    it('should call transform method of the pipe on filterCourses method call', () => {
        const filterByName = TestBed.get(FilterByNamePipe);
        spyOn(filterByName, 'transform');
        component.filterCourses('search');
        expect(filterByName.transform).toHaveBeenCalledWith([TEST_COURSE], 'search');
    });
});
