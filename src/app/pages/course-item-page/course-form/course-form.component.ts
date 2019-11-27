import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'vc-course-form',
    templateUrl: './course-form.component.html',
    styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
    constructor() {}

    public ngOnInit(): void {}

    public saveCourse() {
        console.log('Save course');
    }
}
