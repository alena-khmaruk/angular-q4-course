import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
    selector: 'vc-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    public searchValue: string;
    @Output() public filterCourses: EventEmitter<string> = new EventEmitter<string>();

    constructor() {}

    public ngOnInit(): void {}

    public searchCourse(): void {
        this.filterCourses.emit(this.searchValue);
    }
}
