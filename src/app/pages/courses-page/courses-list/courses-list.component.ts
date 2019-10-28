import {Component, OnInit} from '@angular/core';
import {Course} from '../course/course.model';
import {COURSES_LIST} from '../../../core/.courses';

@Component({
    selector: 'vc-courses-list',
    templateUrl: './courses-list.component.html',
    styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
    public coursesList: Course[];
    constructor() {
    }

    public ngOnInit(): void {
        this.coursesList = COURSES_LIST;
    }

    public deleteCourse(id: string): void {
        console.log(`Course ${id} will be deleted`);
    }

    public loadMoreCourses(): void {
        console.log('Load More Courses');
    }
}
