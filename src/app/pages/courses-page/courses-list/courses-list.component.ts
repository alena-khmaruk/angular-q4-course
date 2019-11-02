import {Component, OnInit} from '@angular/core';
import {Course} from '../course/course.model';
import {CoursesService} from './services/courses.service';

@Component({
    selector: 'vc-courses-list',
    templateUrl: './courses-list.component.html',
    styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
    public coursesList: Course[];

    constructor(private coursesService: CoursesService) {}

    public ngOnInit(): void {
        this.coursesList = this.coursesService.getCourses();
    }

    public deleteCourse(id: string): void {
        console.log(`Course ${id} will be deleted`);
    }

    public loadMoreCourses(): void {
        console.log('Load More Courses');
    }
}
