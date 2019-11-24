import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterEvent} from '@angular/router';

import {BREADCRUMBS} from '../../../core/.breadcrumbsConfig';

@Component({
    selector: 'vc-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
    public breadcrumbs: {values: string[], links: string[]};

    constructor(private router: Router) {}

    public ngOnInit(): void {
        this.router.events.subscribe((event: RouterEvent) => {
            if (event instanceof NavigationEnd) {
                this.breadcrumbs = BREADCRUMBS[event.url] || BREADCRUMBS.default;
            }
        });
    }
}
