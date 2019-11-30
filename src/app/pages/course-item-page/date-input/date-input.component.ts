import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'vc-date-input',
    templateUrl: './date-input.component.html',
    styleUrls: ['./date-input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateInputComponent implements OnInit {
    @Input() public dateCreation: Date;
    @Output() public updateDate: EventEmitter<Date> = new EventEmitter<Date>();

    constructor() {}

    public ngOnInit(): void {}

    public onBlur(): void {
        this.updateDate.emit(new Date(this.dateCreation));
    }
}
