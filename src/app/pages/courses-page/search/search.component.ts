import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'vc-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    public searchValue: string;
    constructor() {
    }

    ngOnInit() {
    }

    searchCourse() {
        console.log(this.searchValue);
    }
}
