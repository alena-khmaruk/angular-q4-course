import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Store} from '@ngrx/store';

import {CourseItemState} from 'src/app/reducers/courseItem.reducer';
import {updateLength} from 'src/app/actions/courseItem.actions';

@Component({
    selector: 'vc-duration-input',
    templateUrl: './duration-input.component.html',
    styleUrls: ['./duration-input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DurationInputComponent implements OnInit {
    @Input() public duration: number;

    constructor(private store: Store<CourseItemState>) {}

    public ngOnInit(): void {}

    public onBlur(): void {
        this.store.dispatch(updateLength({length: this.duration}));
    }
}
