import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
    selector: 'vc-date-input',
    templateUrl: './date-input.component.html',
    styleUrls: ['./date-input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateInputComponent implements OnInit {
    constructor() {}

    public ngOnInit(): void {}
}
