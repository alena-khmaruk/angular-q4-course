import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
    selector: 'vc-course-item-page',
    templateUrl: './course-item-page.component.html',
    styleUrls: ['./course-item-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseItemPageComponent implements OnInit {

    constructor() {}

    public ngOnInit(): void {}

}
