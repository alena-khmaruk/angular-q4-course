import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {Directive, Input, Pipe, PipeTransform} from '@angular/core';

import {CourseComponent} from './course.component';
import {Course} from './course.model';

@Pipe({name: 'time'})
class MockTimePipe implements PipeTransform {
    transform(value: number): string {
        return '1h 40m';
    }
}

@Directive({
    selector: '[vcCoursePlateBorder]'
})
class MockPlateDirective {
    @Input() public vcCoursePlateBorder: Date;
}

const TEST_COURSE: Course = {
    id: 'test_id',
    description: 'Test course description',
    duration: 100,
    creationDate: new Date(2019, 11, 2),
    title: 'Test course title',
    topRated: true
};

describe('CourseComponent', () => {
    let component: CourseComponent;
    let fixture: ComponentFixture<CourseComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                CourseComponent,
                MockTimePipe,
                MockPlateDirective
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CourseComponent);
        component = fixture.componentInstance;
        component.course = TEST_COURSE;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render course title in a h4 tag', () => {
        const titleElement = fixture.debugElement.query(By.css('h4'));
        expect(titleElement.nativeElement.textContent.toLowerCase())
            .toContain(TEST_COURSE.title.toLowerCase());
    });

    it('should render course description', () => {
        const titleElement = fixture.debugElement.query(By.css('.vc-course__description'));
        expect(titleElement.nativeElement.textContent)
            .toContain(TEST_COURSE.description);
    });

    it('should render course duration in right format', () => {
        const durationElement = fixture.debugElement.query(By.css('.vc-course__info-text'));
        expect(durationElement.nativeElement.textContent)
            .toContain('1h 40m');
    });

    it('should call delete method on button click', () => {
        spyOn(component, 'delete');
        const deleteButton = fixture.debugElement.query(By.css('#delete-course'));
        deleteButton.nativeElement.click();
        expect(component.delete).toHaveBeenCalled();
    });

    it('should emit deleteCourse event on delete method call', () => {
        let testId = '';
        component.deleteCourse.subscribe((value) => testId = value);
        component.delete();
        expect(testId).toBe(TEST_COURSE.id);
    });

    it('should call edit method on button click', () => {
        spyOn(component, 'edit');
        const editButton = fixture.debugElement.query(By.css('#edit-course'));
        editButton.nativeElement.click();
        expect(component.edit).toHaveBeenCalled();
    });

    it('should call console.log method on edit method call', () => {
        spyOn(console, 'log');
        component.edit();
        expect(console.log).toHaveBeenCalled();
    });
});
