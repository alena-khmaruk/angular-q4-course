import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'vc-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
    public breadcrumbs: string[];

    constructor() {}

    public ngOnInit(): void {
        this.breadcrumbs = ['Courses'];
    }
}
