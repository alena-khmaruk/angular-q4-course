import {Component, OnInit} from '@angular/core';
import {Course} from '../../entities/course.entity';

@Component({
    selector: 'vc-courses-list',
    templateUrl: './courses-list.component.html',
    styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
    coursesList: Course[];
    constructor() {
        this.coursesList = [
            {
                id: 'id_1',
                title: 'Video 1',
                creationDate: new Date(),
                description: 'Description for Video 1',
                duration: 4
            },
            {
                id: 'id_2',
                title: 'Video 2',
                creationDate: new Date(),
                description: 'Description for Video 2',
                duration: 4
            },
            {
                id: 'id_3',
                title: 'Video 3',
                creationDate: new Date(),
                description: 'Description for Video 3',
                duration: 4
            },
        ];
    }

    ngOnInit() {
    }

}
