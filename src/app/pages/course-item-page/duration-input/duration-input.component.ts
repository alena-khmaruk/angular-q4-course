import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'vc-duration-input',
    templateUrl: './duration-input.component.html',
    styleUrls: ['./duration-input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DurationInputComponent implements OnInit {
    @Input() public duration: number;
    @Output() public updateDuration: EventEmitter<number> = new EventEmitter<number>();

    constructor() {}

    public ngOnInit(): void {}

    public onBlur(): void {
        this.updateDuration.emit(this.duration);
    }
}
