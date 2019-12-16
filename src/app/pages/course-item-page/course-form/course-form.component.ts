import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

import {Course} from '../../courses-page/course/course.model';
import {CoursesService} from '../../courses-page/courses-list/services/courses.service';

@Component({
    selector: 'vc-course-form',
    templateUrl: './course-form.component.html',
    styleUrls: ['./course-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseFormComponent implements OnInit, OnChanges {
    @Input() public course: Course;

    public isEditPage: boolean;
    public newCourse: Course;
    public headline: string;

    constructor(
        private courses: CoursesService,
        private router: Router
    ) {}

    public ngOnInit(): void {
        this.isEditPage = Boolean(this.course);
        this.course = this.course || new Course();
        this._updateHeadline(this.isEditPage);
    }

    public ngOnChanges(changes): void {
        this.isEditPage = Boolean(this.course);
        this._updateHeadline(this.isEditPage);
    }

    public saveCourse() {
        this._submitForm().subscribe(() => {
            this.router.navigate(['courses']);
        });
    }

    public updateDate(creationDate: Date): void {
        this.course.date = creationDate;
    }

    public updateDuration(duration: number): void {
        this.course.length = duration;
    }

    private _submitForm(): Observable<Course> {
        if (this.isEditPage) {
            return this.courses.updateCourse(this.course);
        } else {
            return this.courses.createCourse(this.course);
        }
    }

    private _updateHeadline(isEditPage: boolean) {
        this.headline = isEditPage ? `Edit ${this.course.name} Course` : 'New course';
    }
}
