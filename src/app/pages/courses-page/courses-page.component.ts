import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
    selector: 'vc-courses-page',
    templateUrl: './courses-page.component.html',
    styleUrls: ['./courses-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesPageComponent implements OnInit {

    constructor() {}

    public ngOnInit(): void {}

}
