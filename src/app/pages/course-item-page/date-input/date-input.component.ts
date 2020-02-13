import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Store} from '@ngrx/store';

import {CourseItemState} from 'src/app/reducers/courseItem.reducer';
import {updateDate} from 'src/app/actions/courseItem.actions';

@Component({
    selector: 'vc-date-input',
    templateUrl: './date-input.component.html',
    styleUrls: ['./date-input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateInputComponent implements OnInit {
    @Input() public dateCreation: Date;

    constructor(private store: Store<CourseItemState>) {}

    public ngOnInit(): void {}

    public onBlur(): void {
        const date: Date = new Date(this.dateCreation);
        this.store.dispatch(updateDate({date}));
    }
}
