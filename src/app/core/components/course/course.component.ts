import {Component, Input, OnInit} from '@angular/core';
import {Course} from '../../entities/course.entity';

@Component({
    selector: 'vc-course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.scss']
})

export class CourseComponent implements OnInit {
    @Input() course: Course;

    constructor() {
    }

    ngOnInit() {
    }

}
