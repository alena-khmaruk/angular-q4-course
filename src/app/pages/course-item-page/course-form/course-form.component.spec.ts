import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {BrowserTestingModule} from '@angular/platform-browser/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';

import {CourseFormComponent} from './course-form.component';

describe('CourseFormComponent', () => {
    let component: CourseFormComponent;
    let fixture: ComponentFixture<CourseFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [BrowserTestingModule],
            declarations: [CourseFormComponent],
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

    it('should call console.log method on saveCourse method call', () => {
        spyOn(console, 'log');
        component.saveCourse();
        expect(console.log).toHaveBeenCalled();
    });
});
