import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Course} from './course.model';

@Component({
    selector: 'vc-course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.scss']
})

export class CourseComponent implements OnInit {
    @Input() course: Course;
    @Output() deleteCourse: EventEmitter<string> = new EventEmitter<string>();

    constructor() {
    }

    ngOnInit() {
    }

    public delete(): void {
        this.deleteCourse.emit(this.course.id);
    }

    public edit(): void {
        console.log(`Course ${this.course.id} will be edited`);
    }
}
