import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {CoursesService} from '../courses-page/courses-list/services/courses.service';
import {Course} from '../courses-page/course/course.model';

@Component({
    selector: 'vc-course-item-page',
    templateUrl: './course-item-page.component.html',
    styleUrls: ['./course-item-page.component.scss']
})
export class CourseItemPageComponent implements OnInit {
    public currentCourse: Course;

    constructor(
        private router: ActivatedRoute,
        private courses: CoursesService
    ) {}

    public ngOnInit(): void {
        this.router.params.subscribe((params: {id: number}) => {
            if (params.id) {
                this.courses.getCourseById(params.id).subscribe((course: Course) => {
                    this.currentCourse = course;
                });
            }
        });
    }

}
