import * as moment from 'moment';
import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, ChangeDetectorRef} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

import {Course} from '../../courses-page/course/course.model';
import {CoursesService} from '../../courses-page/courses-list/services/courses.service';

@Component({
    selector: 'vc-course-form',
    templateUrl: './course-form.component.html',
    styleUrls: ['./course-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseFormComponent implements OnInit {
    @Input() public courseId: number;
    public courseForm: FormGroup;
    public headline: string;

    constructor(
        private courses: CoursesService,
        private router: Router,
        private fb: FormBuilder,
        private ref: ChangeDetectorRef
    ) {
        this.courseForm = fb.group({
            title: ['', [Validators.required, Validators.maxLength(50)]],
            description: ['', [Validators.required, Validators.maxLength(500)]],
            duration: [null, [Validators.required]],
            date: [null, [Validators.required]],
            author: [null, [Validators.required]],
            topRated: [false]
        });
    }

    get title() {
        return this.courseForm.get('title');
    }

    get description() {
        return this.courseForm.get('description');
    }

    get date() {
        return this.courseForm.get('date');
    }

    get duration() {
        return this.courseForm.get('duration');
    }

    get author() {
        return this.courseForm.get('author');
    }

    get topRated() {
        return this.courseForm.get('topRated');
    }

    public ngOnInit(): void {
        if (this.courseId) {
            this.courses.getCourseById(this.courseId).subscribe((course: Course) => {
                this._fillForm(course);
                this._updateHeadline(true, course.name);
            });
        } else {
            this._updateHeadline(false);
        }
    }

    public onFormSubmit(): void {
        const course = new Course();
        course.name = this.title.value;
        course.description = this.description.value;
        course.date = moment(this.date.value, 'DD/MM/YYYY', true).format();
        course.length = this.duration.value;
        course.isTopRated = this.topRated.value;
        course.authors = this.author.value;
        this._submitForm(course).subscribe(() => {
            this.router.navigate(['courses']);
        });
    }

    private _submitForm(course: Course): Observable<Course> {
        if (this.courseId) {
            course.id = this.courseId;
            return this.courses.updateCourse(course);
        } else {
            return this.courses.createCourse(course);
        }
    }

    private _updateHeadline(isEditPage: boolean, name?: string) {
        this.headline = isEditPage ? `Edit ${name} course` : 'New course';
    }

    private _fillForm(course: Course): void {
        const date = new Date(course.date);
        const authors = course.authors.map(item => ({id: item.id, name: `${item.name} ${item.lastName || ''}`}));
        this.title.setValue(course.name);
        this.description.setValue(course.description);
        this.date.setValue(`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`);
        this.duration.setValue(course.length);
        this.author.setValue(authors);
        this.topRated.setValue(course.isTopRated);
        this.ref.markForCheck();
    }
}
