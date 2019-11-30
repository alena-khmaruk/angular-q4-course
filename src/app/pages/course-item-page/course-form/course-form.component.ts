import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Course} from '../../courses-page/course/course.model';
import {CoursesService} from '../../courses-page/courses-list/services/courses.service';

@Component({
    selector: 'vc-course-form',
    templateUrl: './course-form.component.html',
    styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
    @Input() public course: Course;

    public isEditPage: boolean;
    public newCourse: Course;

    constructor(
        private courses: CoursesService,
        private router: Router
    ) {}

    public ngOnInit(): void {
        this.isEditPage = Boolean(this.course);
        this.course = this.course || new Course();
        this.newCourse = Object.assign({}, this.course);
    }

    public saveCourse() {
        if (this.isEditPage) {
            this.courses.updateCourse(this.course.id, this.newCourse);
        } else {
            this.newCourse.id = `id_${Math.floor(Math.random() * 100)}`;
            this.courses.createCourse(this.newCourse);
        }
        this.router.navigate(['courses']);
    }

    public updateDate(creationDate: Date): void {
        this.newCourse.creationDate = creationDate;
    }

    public updateDuration(duration: number): void {
        this.newCourse.duration = duration;
    }
}
