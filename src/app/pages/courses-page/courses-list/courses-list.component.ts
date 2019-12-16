import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import {Course} from '../course/course.model';
import {CoursesService, IFilterParams} from './services/courses.service';

const ITEMS_SET_COUNT = 10;

@Component({
    selector: 'vc-courses-list',
    templateUrl: './courses-list.component.html',
    styleUrls: ['./courses-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesListComponent implements OnInit {
    public coursesList: Observable<Course[]>;
    private _count = ITEMS_SET_COUNT;
    private _start = 0;

    constructor(
        private coursesService: CoursesService
    ) {}

    public ngOnInit(): void {
        this.coursesList = this.coursesService.getCourses(this._generateParams());
    }

    public deleteCourse(id: number): void {
        if (window.confirm('Are you ready to delete this item?')) {
            this.coursesService.deleteCourse(id);
            this._start = 0;
            this.coursesList = this.coursesService.getCourses(this._generateParams());
        }
    }

    public filterCourses(searchValue: string): void {
        const requestParams: Partial<IFilterParams> = this._generateParams();
        requestParams.textFragment = searchValue;
        this.coursesList = this.coursesService.getCourses(requestParams);
    }

    public prev(): void {
        this._start -= ITEMS_SET_COUNT;
        this.coursesList = this.coursesService.getCourses(this._generateParams());
    }

    public next(): void {
        this._start += ITEMS_SET_COUNT;
        this.coursesList = this.coursesService.getCourses(this._generateParams());
    }

    private _generateParams(): Partial<IFilterParams> {
        return {
            start: this._start.toString(),
            count: this._count.toString()
        };
    }
}
