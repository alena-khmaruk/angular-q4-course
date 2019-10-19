import {CourseInterface} from '../interfaces/course.interface';

export class Course implements CourseInterface {
    public id: string;
    public title: string;
    public creationDate: Date;
    public duration: number;
    public description: string;

    constructor() {

    }
}
