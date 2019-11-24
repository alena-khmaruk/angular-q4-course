import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Course} from '../course/course.model';
import {CoursesService} from './services/courses.service';
import {FilterByNamePipe} from '../../../core/pipes/filter-by-name.pipe';

@Component({
    selector: 'vc-courses-list',
    templateUrl: './courses-list.component.html',
    styleUrls: ['./courses-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesListComponent implements OnInit {
    public coursesList: Course[];
    private initialCoursesList: Course[];

    constructor(
        private coursesService: CoursesService,
        private filterByName: FilterByNamePipe
    ) {}

    public ngOnInit(): void {
        const coursesList: Course[] = this.coursesService.getCourses();
        this.initialCoursesList = coursesList;
        this.coursesList = coursesList;
    }

    public deleteCourse(id: string): void {
        // TODO: fix deletion for filtered values
        if (window.confirm('Are you ready to delete this item?')) {
            this.coursesService.deleteCourse(id);
            this.initialCoursesList = this.coursesService.getCourses();
            this.coursesList = this.coursesService.getCourses();
        }
    }

    public filterCourses(searchValue: string): void {
        this.coursesList = this.filterByName.transform(this.initialCoursesList, searchValue);
    }

    public loadMoreCourses(): void {
        console.log('Load More Courses');
    }
}
