import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Course} from './course.model';

@Component({
    selector: 'vc-course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class CourseComponent implements OnInit {
    @Input() public course: Course;
    @Output() public deleteCourse: EventEmitter<string> = new EventEmitter<string>();

    constructor() {}

    public ngOnInit(): void {}

    public delete(): void {
        this.deleteCourse.emit(this.course.id);
    }

    public edit(): void {
        console.log(`Course ${this.course.id} will be edited`);
    }
}
