import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'vc-course-item-page',
    templateUrl: './course-item-page.component.html',
    styleUrls: ['./course-item-page.component.scss']
})
export class CourseItemPageComponent implements OnInit {
    public courseId: number;

    constructor(
        private router: ActivatedRoute
    ) {}

    public ngOnInit(): void {
        this.router.params
            .subscribe((params: {id: number}) => {
                this.courseId = params.id || null;
            });
    }

}
