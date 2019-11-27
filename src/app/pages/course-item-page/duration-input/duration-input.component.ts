import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
    selector: 'vc-duration-input',
    templateUrl: './duration-input.component.html',
    styleUrls: ['./duration-input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DurationInputComponent implements OnInit {
    public duration: number;

    constructor() {}

    public ngOnInit(): void {}

}
