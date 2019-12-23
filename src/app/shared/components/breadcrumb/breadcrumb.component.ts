import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterEvent} from '@angular/router';
import {filter} from 'rxjs/operators';

import {BREADCRUMBS} from '../../../core/.breadcrumbsConfig';
import {CoursesService} from '../../../pages/courses-page/courses-list/services/courses.service';
import {Course} from '../../../pages/courses-page/course/course.model';

@Component({
    selector: 'vc-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
    public breadcrumbs: {values: string[], links: string[]};

    constructor(private router: Router, private courses: CoursesService) {}

    public ngOnInit(): void {
        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe((event: RouterEvent) => this.updateBreadcrumbs(event.url));
    }

    public updateBreadcrumbs(url: string): void {
        this.breadcrumbs = BREADCRUMBS[url] || BREADCRUMBS.default;
        if (url.includes('/courses/') && !url.includes('/new')) {
            const id = parseInt(url.replace('/courses/', ''), 10);
            this.courses.getCourseById(id).subscribe((course: Course) => {
                const courseTitle = course.name;
                this.breadcrumbs.values = ['Courses', courseTitle];
                this.breadcrumbs.links = ['/courses'];
            });
        }
    }
}
