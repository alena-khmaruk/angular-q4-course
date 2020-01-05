import {Component, OnInit} from '@angular/core';

import {Course} from '../course/course.model';
import {CoursesService, IFilterParams} from './services/courses.service';
import {LoadingStateService} from '../../../shared/components/loading/services/loading-state.service';

const ITEMS_SET_COUNT = 10;

@Component({
    selector: 'vc-courses-list',
    templateUrl: './courses-list.component.html',
    styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
    public coursesList: Course[] = [];
    public isLoading = true;
    private _count = ITEMS_SET_COUNT;
    private _start = 0;

    constructor(
        private coursesService: CoursesService,
        private loadingState: LoadingStateService
    ) {}

    public ngOnInit(): void {
        this.loadingState.show.subscribe((value) => this.isLoading = value);
        this._updateCoursesList(this._generateParams());
    }

    public deleteCourse(id: number): void {
        if (window.confirm('Are you ready to delete this item?')) {
            this.coursesService.deleteCourse(id);
            this._start = 0;
            this._updateCoursesList(this._generateParams());
        }
    }

    public filterCourses(searchValue: string): void {
        const requestParams: Partial<IFilterParams> = this._generateParams();
        requestParams.textFragment = searchValue;
        this._updateCoursesList(requestParams);
    }

    public prev(): void {
        this._start -= ITEMS_SET_COUNT;
        this._updateCoursesList(this._generateParams());
    }

    public next(): void {
        this._start += ITEMS_SET_COUNT;
        this._updateCoursesList(this._generateParams());
    }

    private _generateParams(): Partial<IFilterParams> {
        return {
            start: this._start.toString(),
            count: this._count.toString()
        };
    }

    private _updateCoursesList(params: Partial<IFilterParams>): void {
        this.loadingState.updateState(true);
        this.coursesService.getCourses(params)
            .subscribe((courses: Course[]) => {
                this.coursesList = courses;
                this.loadingState.updateState(false);
            });
    }
}
