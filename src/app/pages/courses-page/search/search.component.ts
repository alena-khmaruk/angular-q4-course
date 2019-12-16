import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
    selector: 'vc-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {
    public searchValue: string;
    @Output() public filterCourses: EventEmitter<string> = new EventEmitter<string>();

    constructor() {}

    public ngOnInit(): void {}

    public searchCourse(): void {
        if (this.searchValue.length < 3) {
            console.log('String should contain more then 3 symbols');
            return;
        }
        this.filterCourses.emit(this.searchValue);
    }
}
