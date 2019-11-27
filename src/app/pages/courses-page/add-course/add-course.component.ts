import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
    selector: 'vc-add-course',
    templateUrl: './add-course.component.html',
    styleUrls: ['./add-course.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddCourseComponent implements OnInit {

    constructor() {}

    public ngOnInit(): void {}

}
