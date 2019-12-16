import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';

import {Course} from './course.model';

@Component({
    selector: 'vc-course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class CourseComponent implements OnInit {
    @Input() public course: Course;
    @Output() public deleteCourse: EventEmitter<number> = new EventEmitter<number>();

    constructor(private router: Router) {}

    public ngOnInit(): void {}

    public delete(): void {
        this.deleteCourse.emit(this.course.id);
    }

    public edit(): void {
        this.router.navigate(['courses', this.course.id]);
    }
}
