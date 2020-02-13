import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

import {Course} from '../../courses-page/course/course.model';
import {CoursesService} from '../../courses-page/courses-list/services/courses.service';
import { Store, select, createFeatureSelector } from '@ngrx/store';
import { CourseItemState } from 'src/app/reducers/courseItem.reducer';
import { updateName, updateDescription, updateCourse } from 'src/app/actions/courseItem.actions';

@Component({
    selector: 'vc-course-form',
    templateUrl: './course-form.component.html',
    styleUrls: ['./course-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseFormComponent implements OnInit, OnChanges {
    @Input() public course: Course;

    public isEditPage: boolean;
    public headline: string;
    private _selectCourseItem = createFeatureSelector<CourseItemState>('courseItem');
    private _courseToSubmit: Course = new Course();

    constructor(
        private courses: CoursesService,
        private router: Router,
        private store: Store<CourseItemState>
    ) {
        store.pipe(select(this._selectCourseItem)).subscribe((state: CourseItemState) => {
            this._courseToSubmit.name = state.name;
            this._courseToSubmit.length = state.length;
            this._courseToSubmit.date = state.date;
            this._courseToSubmit.description = state.description;
            this._courseToSubmit.id = state.id;
            this._courseToSubmit.isTopRated = state.isTopRated;
        });
    }

    public ngOnInit(): void {
        this.isEditPage = Boolean(this.course);
        this._updateHeadline(this.isEditPage);
        this.course = this.course || new Course();
        this.store.dispatch(updateCourse({course: this.course}));
    }

    public ngOnChanges(): void {
        this.store.dispatch(updateCourse({course: this.course}));
        this.isEditPage = Boolean(this.course);
        this._updateHeadline(this.isEditPage);
    }

    public saveCourse() {
        this._submitForm().subscribe(() => {
            this.router.navigate(['courses']);
        });
    }

    public updateName() {
        this.store.dispatch(updateName({name: this.course.name}));
    }

    public updateDescription() {
        this.store.dispatch(updateDescription({description: this.course.description}));
    }

    private _submitForm(): Observable<Course> {
        if (this.isEditPage) {
            return this.courses.updateCourse(this._courseToSubmit);
        } else {
            return this.courses.createCourse(this._courseToSubmit);
        }
    }

    private _updateHeadline(isEditPage: boolean) {
        this.headline = isEditPage ? `Edit ${this.course.name} course` : 'New course';
    }
}
