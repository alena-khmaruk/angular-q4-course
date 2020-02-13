import {Component, OnInit} from '@angular/core';
import {Store, select, createSelector, createFeatureSelector} from '@ngrx/store';
import {Observable} from 'rxjs';

import {Course} from '../course/course.model';
import {CoursesService, IFilterParams} from './services/courses.service';
import {LoadingStateService} from '../../../shared/components/loading/services/loading-state.service';
import {updateCoursesList, incrementOffset, decrementOffset, resetOffset, updateFilterOption} from '../../../actions/courses.actions';
import {CoursesState} from '../../../reducers/courses.reducer';

@Component({
    selector: 'vc-courses-list',
    templateUrl: './courses-list.component.html',
    styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
    public courses$: Observable<Course[]>;
    public coursesState$: Observable<CoursesState>;
    public isLoading = true;
    private _offset = 0;
    private _count = 10;
    private _filter = '';
    private _selectCourses = createFeatureSelector<CoursesState>('courses');

    constructor(
        private coursesService: CoursesService,
        private loadingState: LoadingStateService,
        private store: Store<CoursesState>
    ) {
        const selectList = createSelector(this._selectCourses, this._getCoursesList);
        this.courses$ = store.pipe(select(selectList));
        this.coursesState$ = store.pipe(select(this._selectCourses));
        this.coursesState$.subscribe((newState: CoursesState) => {
            this._offset = newState.offset;
            this._count = newState.count;
            this._filter = newState.filter;
        });
    }

    public ngOnInit(): void {
        this.loadingState.show.subscribe((value) => this.isLoading = value);
        this._updateCoursesList();
    }

    public deleteCourse(id: number): void {
        if (window.confirm('Are you ready to delete this item?')) {
            this.coursesService.deleteCourse(id);
            this.store.dispatch(resetOffset());
            this._updateCoursesList();
        }
    }

    public filterCourses(searchValue: string): void {
        this.store.dispatch(updateFilterOption({filter: searchValue}));
        this._updateCoursesList();
    }

    public prev(): void {
        this.store.dispatch(decrementOffset());
        this._updateCoursesList();
    }

    public next(): void {
        this.store.dispatch(incrementOffset());
        this._updateCoursesList();
    }

    private _updateCoursesList(): void {
        const params: Partial<IFilterParams> = {
            start: this._offset.toString(),
            count: this._count.toString(),
            textFragment: this._filter
        };
        this.loadingState.updateState(true);
        this.coursesService.getCourses(params)
            .subscribe((courses: Course[]) => {
                this.store.dispatch(updateCoursesList({courses}));
                this.loadingState.updateState(false);
            });
    }

    private _getCoursesList(state: CoursesState): Course[] {
        return state.list;
    }
}
